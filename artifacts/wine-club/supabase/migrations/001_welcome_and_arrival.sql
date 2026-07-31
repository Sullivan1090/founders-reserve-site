-- ============================================================
-- Run this once in your Supabase SQL editor (Dashboard → SQL)
-- before deploying the welcome + arrival features.
-- ============================================================

-- 1. Add first-login welcome flag to member profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS has_seen_welcome BOOLEAN NOT NULL DEFAULT FALSE;

-- 2. Featured arrival table (single-row, admin-updatable)
CREATE TABLE IF NOT EXISTS featured_arrival (
  id       INT PRIMARY KEY DEFAULT 1,
  wine_name   TEXT NOT NULL DEFAULT '',
  vintage     TEXT NOT NULL DEFAULT '',
  youtube_id  TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- 3. RLS: authenticated members can read; admin writes via service role
ALTER TABLE featured_arrival ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'featured_arrival' AND policyname = 'members can read featured_arrival'
  ) THEN
    CREATE POLICY "members can read featured_arrival"
      ON featured_arrival FOR SELECT TO authenticated USING (true);
  END IF;
END $$;

-- 4. Seed initial featured wine (no-op if row already exists)
INSERT INTO featured_arrival (id, wine_name, vintage, youtube_id, description)
VALUES (
  1,
  '2023 J.O. Sullivan Founders Reserve Cabernet Sauvignon',
  '2023',
  '',
  ''
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Run this once in your Supabase SQL editor (Dashboard → SQL)
-- before deploying the Notes from the Estate feature.
-- ============================================================

-- 1. Estate notes table
CREATE TABLE IF NOT EXISTS estate_notes (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title               TEXT        NOT NULL DEFAULT '',
  slug                TEXT        UNIQUE NOT NULL DEFAULT '',
  body                TEXT        NOT NULL DEFAULT '',
  cover_image_url     TEXT,
  author_name         TEXT,
  published_at        TIMESTAMPTZ,
  is_published        BOOLEAN     NOT NULL DEFAULT FALSE,
  notification_message TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. RLS: authenticated members can read published posts; admin writes via service role
ALTER TABLE estate_notes ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'estate_notes' AND policyname = 'members can read published estate notes'
  ) THEN
    CREATE POLICY "members can read published estate notes"
      ON estate_notes FOR SELECT TO authenticated
      USING (is_published = TRUE AND published_at <= NOW());
  END IF;
END $$;

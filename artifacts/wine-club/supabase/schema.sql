-- =============================================================
-- Wine Club — Supabase Schema
-- Run this in your Supabase project's SQL Editor
-- =============================================================

-- ─────────────────────────────────────────
-- 1. profiles (extends auth.users)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email         TEXT NOT NULL,
  full_name     TEXT,
  membership_tier TEXT NOT NULL DEFAULT 'basic'
                CHECK (membership_tier IN ('basic', 'premium', 'elite')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create a profile row whenever a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ─────────────────────────────────────────
-- 2. videos (members-only video library)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.videos (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT NOT NULL,
  description   TEXT,
  thumbnail_url TEXT,
  video_url     TEXT NOT NULL,
  category      TEXT NOT NULL DEFAULT 'tasting'
                CHECK (category IN ('tasting', 'pairing', 'cellar', 'education', 'interview')),
  duration      TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated members can view videos"
  ON public.videos FOR SELECT
  TO authenticated
  USING (true);


-- ─────────────────────────────────────────
-- 3. releases (gated wine releases)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.releases (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug           TEXT UNIQUE NOT NULL,
  title          TEXT NOT NULL,
  description    TEXT,
  thumbnail_url  TEXT,
  video_url      TEXT,
  content        TEXT,
  required_tier  TEXT NOT NULL DEFAULT 'basic'
                 CHECK (required_tier IN ('basic', 'premium', 'elite')),
  release_date   DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.releases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated members can view releases"
  ON public.releases FOR SELECT
  TO authenticated
  USING (true);


-- ─────────────────────────────────────────
-- 4. Sample data
-- ─────────────────────────────────────────
INSERT INTO public.videos (title, description, category, duration, video_url) VALUES
  ('2023 Burgundy Vintage Overview',
   'A deep dive into the exceptional growing season and what to expect from the cellar.',
   'tasting', '18:32', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
  ('Pairing Bordeaux with Game',
   'Chef-guided pairing session featuring classic left-bank Bordeaux selections.',
   'pairing', '24:15', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
  ('Cellar Tour: A Legendary Estate',
   'Exclusive access to one of the world''s most prestigious wine estates in Burgundy.',
   'cellar', '31:44', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
  ('Understanding Terroir',
   'A masterclass on how soil, climate, and geography shape a wine''s character.',
   'education', '42:10', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
  ('Natural Wine — Myth vs. Reality',
   'An honest conversation about natural wine production with three leading winemakers.',
   'interview', '55:20', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
  ('Champagne Without Compromise',
   'Exploring grower Champagnes that punch far above their price point.',
   'tasting', '28:05', 'https://www.youtube.com/embed/dQw4w9WgXcQ')
ON CONFLICT DO NOTHING;

INSERT INTO public.releases (slug, title, description, required_tier, release_date, content) VALUES
  ('2021-napa-selection',
   '2021 Napa Valley Selection',
   'Three bottles from our curated Napa Valley allocation — exceptional structure and length.',
   'basic', '2024-01-15',
   'Our January allocation brings three landmark Napa Valley reds from the celebrated 2021 vintage. Expect deep cassis, polished tannins, and cellaring potential of 10–15 years. Shipment includes tasting notes and a pairing guide.'),
  ('2020-rhone-cru',
   '2020 Northern Rhône Cru',
   'A rare six-bottle parcel of single-vineyard Syrah from a tiny Cornas producer.',
   'premium', '2024-02-01',
   'Six bottles of single-vineyard Syrah from a tiny family estate in Cornas. The 2020 growing season delivered concentration without excess — dark olive, smoked meat, violet. Available exclusively to Premium and Elite members. Includes a personal note from the winemaker.'),
  ('2019-grand-cru-burgundy',
   '2019 Grand Cru Burgundy',
   'Two bottles of Grand Cru Burgundy from one of the appellation''s most sought-after producers.',
   'elite', '2024-03-01',
   'The pinnacle of the season. Two bottles of Grand Cru Pinot Noir from a revered domaine whose wines rarely appear outside of Europe. The 2019 vintage is generational — silken texture, extraordinary aromatic complexity, and a finish that lingers for minutes. Reserved for our Elite circle only.')
ON CONFLICT DO NOTHING;

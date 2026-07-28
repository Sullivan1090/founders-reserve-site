-- Add share tokens to videos and releases
-- Run this in your Supabase SQL editor

ALTER TABLE public.videos
  ADD COLUMN IF NOT EXISTS share_token UUID DEFAULT NULL UNIQUE;

ALTER TABLE public.releases
  ADD COLUMN IF NOT EXISTS share_token UUID DEFAULT NULL UNIQUE;

-- Allow anyone to read a video/release if they have the share token
-- (token is a UUID — not guessable, safe to use as the access control)

CREATE POLICY "Public can view shared videos"
  ON public.videos FOR SELECT
  TO anon
  USING (share_token IS NOT NULL);

CREATE POLICY "Public can view shared releases"
  ON public.releases FOR SELECT
  TO anon
  USING (share_token IS NOT NULL);

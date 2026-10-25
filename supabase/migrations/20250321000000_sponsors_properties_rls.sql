-- Migration: sponsors + properties RLS
-- This file lives in the runtime Supabase migrations folder so Supabase will apply it.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.sponsors (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name text NOT NULL,
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sponsors_select_own"
  ON public.sponsors
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "sponsors_update_own"
  ON public.sponsors
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE TABLE IF NOT EXISTS public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id uuid NOT NULL REFERENCES public.sponsors (id) ON DELETE CASCADE,
  title text NOT NULL,
  short_description text,
  listing_url text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS properties_sponsor_id_idx
  ON public.properties (sponsor_id);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "properties_select_own"
  ON public.properties
  FOR SELECT
  TO authenticated
  USING (sponsor_id = auth.uid());

CREATE POLICY "properties_insert_own"
  ON public.properties
  FOR INSERT
  TO authenticated
  WITH CHECK (sponsor_id = auth.uid());

CREATE POLICY "properties_update_own"
  ON public.properties
  FOR UPDATE
  TO authenticated
  USING (sponsor_id = auth.uid())
  WITH CHECK (sponsor_id = auth.uid());

CREATE POLICY "properties_delete_own"
  ON public.properties
  FOR DELETE
  TO authenticated
  USING (sponsor_id = auth.uid());

-- Review pass:
-- [x] RLS enabled on every sponsor-owned table
-- [x] No open USING (true) on sponsor/property data
-- [x] INSERT/UPDATE policies include WITH CHECK tied to auth.uid()
-- [x] Column list and FKs match docs/data-model-and-rls-matrix.md
--
-- Concrete policy fix recorded here:
-- - Added WITH CHECK to sponsors_update_own to ensure auth.uid() is preserved on updates.
-- - Added WITH CHECK to properties_update_own to guarantee sponsor_id remains owned by the same auth user.

-- supabase/migrations/20250321000000_sponsors_properties_rls.sql
-- Scaffold shape only — column names and policy rules MUST match
-- docs/data-model-and-rls-matrix.md (adjust types/FKs to your matrix).

-- Sponsors profile linked 1:1 with auth.users
CREATE TABLE IF NOT EXISTS public.sponsors (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name text NOT NULL,
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

-- Properties owned by a sponsor
CREATE TABLE IF NOT EXISTS public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id uuid NOT NULL REFERENCES public.sponsors (id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
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

-- Review checklist (must all be true against your matrix):
-- [ ] RLS enabled on every sponsor-owned table
-- [ ] No open USING (true) on sponsor/property data
-- [ ] INSERT/UPDATE policies include WITH CHECK tied to auth.uid()
-- [ ] Column list and FKs match docs/data-model-and-rls-matrix.md
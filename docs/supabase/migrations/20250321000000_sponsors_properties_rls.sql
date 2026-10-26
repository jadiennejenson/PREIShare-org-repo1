-- supabase/migrations/20250321000000_property_listings.sql
-- Scaffold: implement columns/types from docs/data-model/property-listings-schema.md.
-- Owner column must match auth.users (uuid) so RLS can use auth.uid().

create extension if not exists "pgcrypto";

create table if not exists public.property_listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text,
  address_line1 text,
  city text,
  state text,
  postal_code text,
  country text default 'US',
  price_cents integer check (price_cents is null or price_cents >= 0),
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists property_listings_owner_id_idx
  on public.property_listings (owner_id);

create index if not exists property_listings_status_idx
  on public.property_listings (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists property_listings_set_updated_at on public.property_listings;
create trigger property_listings_set_updated_at
before update on public.property_listings
for each row
execute function public.set_updated_at();

alter table public.property_listings enable row level security;

-- Sponsors only see their own rows
create policy "property_listings_select_own"
  on public.property_listings
  for select
  to authenticated
  using (owner_id = auth.uid());

-- Sponsors may insert only as themselves
create policy "property_listings_insert_own"
  on public.property_listings
  for insert
  to authenticated
  with check (owner_id = auth.uid());

-- Sponsors may update only their own rows
create policy "property_listings_update_own"
  on public.property_listings
  for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- Sponsors may delete only their own rows
create policy "property_listings_delete_own"
  on public.property_listings
  for delete
  to authenticated
  using (owner_id = auth.uid());

-- Optional: deny anon entirely by omitting policies for the anon role.

-- ============================================================
-- docs/data-model/rls-policy-review.md (structure to produce)
-- ============================================================
-- # RLS policy review — property_listings
--
-- ## Migration file
-- - Path: supabase/migrations/20250321000000_property_listings.sql
-- - What it creates: table, indexes, updated_at trigger, RLS + policies
--
-- ## How to apply
-- 1. Open Supabase Dashboard → SQL → New query
-- 2. Paste the full migration contents
-- 3. Run and confirm success
-- 4. Table Editor → property_listings → confirm RLS enabled
--
-- ## Policies (plain language)
-- | Policy | Operation | Who | Rule |
-- |--------|-----------|-----|------|
-- | ...    | SELECT    | authenticated | owner_id = auth.uid() |
-- | ...    | INSERT    | authenticated | with check owner_id = auth.uid() |
-- | ...    | UPDATE    | authenticated | using + with check owner_id = auth.uid() |
-- | ...    | DELETE    | authenticated | owner_id = auth.uid() |
--
-- ## Alignment with design doc
-- - Columns match property-listings-schema.md: yes/no + notes
-- - Missing policies: none | list gaps
-- - Overly open grants: none | list any USING (true) / public roles
--
-- ## Risks and open questions
-- - e.g. Should published listings be readable by other sponsors later?
-- - Service role bypasses RLS — keep service key server-only (next steps)
--
-- ## Sign-off
-- - Reviewed by: <your name>
-- - Date: <today>
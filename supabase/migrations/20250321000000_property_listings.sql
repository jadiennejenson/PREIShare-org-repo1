-- ...existing code...

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.property_listings (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users(id) on delete cascade,
  title text not null,
  address_line_1 text not null,
  address_line_2 text,
  city text not null,
  state text not null,
  postal_code text,
  country text not null default 'US',
  price numeric(12,2) not null check (price >= 0),
  bedrooms integer check (bedrooms >= 0),
  bathrooms numeric(3,1) check (bathrooms >= 0),
  square_feet integer check (square_feet >= 0),
  listing_status text not null default 'draft'
    check (listing_status in ('draft', 'active', 'paused', 'sold', 'archived')),
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists property_listings_owner_idx
  on public.property_listings (owner);

create index if not exists property_listings_status_idx
  on public.property_listings (listing_status);

create index if not exists property_listings_owner_status_idx
  on public.property_listings (owner, listing_status);

alter table public.property_listings enable row level security;

create policy "property_listings_select_own"
on public.property_listings
for select
using (owner = auth.uid());

create policy "property_listings_insert_own"
on public.property_listings
for insert
with check (owner = auth.uid());

create policy "property_listings_update_own"
on public.property_listings
for update
using (owner = auth.uid())
with check (owner = auth.uid());

create policy "property_listings_delete_own"
on public.property_listings
for delete
using (owner = auth.uid());

create trigger set_property_listings_updated_at
before update on public.property_listings
for each row
execute procedure public.set_updated_at();
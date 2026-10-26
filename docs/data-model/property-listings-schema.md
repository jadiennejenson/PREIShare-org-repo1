# Property Listings Data Model & Auth Boundaries

> Sprint 4 design doc for PREIshare. This is the source of truth for the property-listings migration and the row-level security plan.
> Inputs: docs/requirements/sponsor-auth-and-listings-brief.md and docs/setup/supabase-env-checklist.md

## 1. Purpose

PREIshare sponsors sign in to create, update, and manage their own property listings. Listings are stored in Supabase/Postgres as real records, not mock browser state. The browser never receives the service-role secret, and each listing remains tied to the authenticated sponsor who created it.

## 2. Canonical table: property_listings

| Column | Type (Postgres) | Nullable | Notes |
|--------|-----------------|----------|-------|
| `id` | `uuid` | no | Primary key; default `gen_random_uuid()` |
| `owner_id` | `uuid` | no | FK → `auth.users(id)`; sponsor who owns the row |
| `title` | `text` | no | Short display title for the listing |
| `description` | `text` | yes | Longer description of the property |
| `address_line1` | `text` | no | Street address |
| `city` | `text` | no | Listing city |
| `region` | `text` | yes | State or province |
| `postal_code` | `text` | yes | Postal or ZIP code |
| `country` | `text` | no | Default `'US'` for this sprint |
| `price` | `numeric(12,2)` | no | Asking price/share price; must be `>= 0` |
| `status` | `text` | no | One of: `draft`, `published`, `archived` |
| `created_at` | `timestamptz` | no | Default `now()` |
| `updated_at` | `timestamptz` | no | Default `now()`; updated on every change |

### Required constraints
- `price >= 0`
- `status` must be one of `draft`, `published`, `archived`
- `country` is stored as a text value; default is `'US'`
- `owner_id` must reference `auth.users(id)`

### Indexes
- Primary key on `id`
- Index on `owner_id` for sponsor “my listings” queries
- Optional index on `status` if dashboards frequently filter by lifecycle state

### Out of scope for this sprint
- Media/image tables
- Full-text search or embeddings
- Shared ownership across multiple sponsors
- Public listing discovery beyond authenticated sponsor flows

## 3. Ownership model and delete behavior

Every listing row belongs to exactly one signed-in sponsor. The `owner_id` field is not client-controlled; it is set from the authenticated user session on insert and kept immutable for regular updates.

We are choosing:
- `ON DELETE CASCADE` on `owner_id` → `auth.users(id)`

This means when a sponsor account is deleted, that sponsor’s property listings are deleted with it. This is the simplest and safest choice for the current sprint because it prevents orphaned rows and keeps the table aligned with the owner’s identity.

The application must never allow a client to set a different `owner_id` than the signed-in user. All ownership enforcement is done server-side and by database-level RLS.

## 4. Row Level Security (RLS) plan

RLS is enabled on `property_listings`. No policy means no access; anonymous users cannot read or mutate listings in this sprint.

| Policy name | Command | Who | Rule |
|-------------|---------|-----|------|
| `listings_select_own` | SELECT | authenticated | `owner_id = auth.uid()` |
| `listings_insert_own` | INSERT | authenticated | `owner_id = auth.uid()` (WITH CHECK) |
| `listings_update_own` | UPDATE | authenticated | `owner_id = auth.uid()` (USING + WITH CHECK) |
| `listings_delete_own` | DELETE | authenticated | `owner_id = auth.uid()` |

Notes:
- Anonymous users have no listing access.
- There is no public read-all policy for published listings in this sprint.
- The service-role key is not used in browser code and is not exposed to the client.
- The service-role key is for server-side admin or maintenance tasks only.

## 5. Server vs browser operation map

| Operation | Runs where | Client type | Notes |
|-----------|------------|-------------|-------|
| Sign up / sign in / sign out | Browser + Supabase Auth | Browser with anon/public key and session | No service-role key in the browser |
| Protected-route session check | Server loader / middleware | Server Supabase client with user cookies/session | Redirect if no session |
| List my listings | Server loader | Server client as the signed-in user | RLS applies; preferred for trusted data |
| Create listing | Server action | Server client as the signed-in user | `owner_id` set from session |
| Update / archive listing | Server action | Server client as the signed-in user | RLS blocks cross-owner edits |
| Admin bulk jobs | Server only | Service-role | Never bundled into client code |

### Environment boundary reminder
- Public values: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Server-only values: service-role key and database credentials
- Never expose secrets through `VITE_*` variables

## 6. Database implementation requirements

The migration must create the table with:
- `owner_id` as a FK to `auth.users(id)`
- `ON DELETE CASCADE` on that foreign key
- `updated_at` set on write
- `country` default `'US'`
- `status` constrained to `draft`, `published`, and `archived`
- `price` validation to enforce non-negative values

The migration is the only place SQL is introduced. We do not create ad-hoc database changes from the dashboard without a corresponding migration in source control.

## 7. Acceptance checks for the migration

- [ ] `property_listings` exists with the exact columns above
- [ ] `owner_id` points to `auth.users(id)`
- [ ] `owner_id` delete behavior is `ON DELETE CASCADE`
- [ ] RLS is enabled with owner-only SELECT/INSERT/UPDATE/DELETE policies
- [ ] No public listing-read policy is present
- [ ] `country` defaults to `'US'`
- [ ] `status` only allows `draft`, `published`, `archived`
- [ ] Migration file is recorded in the repo and versioned

## 8. Decision summary

This sprint is intentionally narrow: sponsors can manage only their own listings, and listings are always tied to the authenticated sponsor account. The schema and RLS rules enforce that boundary at the database layer so the application does not need to trust client-side data.
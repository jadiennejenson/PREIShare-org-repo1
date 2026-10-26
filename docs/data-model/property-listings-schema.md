# Property Listings Data Model & Auth Boundaries

> Sprint 4 design doc for PREIshare. Source of truth for migrations and RLS.
> Inputs: docs/requirements/sponsor-auth-and-listings-brief.md,
>         docs/setup/supabase-env-checklist.md

## 1. Purpose

Sponsors sign in and manage **real** property listings stored in Postgres.
No mock arrays in the browser. Secrets (service-role key) never ship to the client.

## 2. Entity: `property_listings`

| Column | Type (Postgres) | Nullable | Notes |
|--------|-----------------|----------|-------|
| `id` | `uuid` | no | Primary key; default `gen_random_uuid()` |
| `owner_id` | `uuid` | no | FK → `auth.users(id)`; the sponsor who owns the row |
| `title` | `text` | no | Short display name |
| `description` | `text` | yes | Longer listing copy |
| `address_line1` | `text` | no | Street address |
| `city` | `text` | no | |
| `region` | `text` | yes | State / province |
| `postal_code` | `text` | yes | |
| `country` | `text` | no | Default `'US'` unless brief says otherwise |
| `price` | `numeric(12,2)` | no | Asking or share price; always >= 0 |
| `status` | `text` | no | One of: `draft`, `published`, `archived` |
| `created_at` | `timestamptz` | no | Default `now()` |
| `updated_at` | `timestamptz` | no | Default `now()`; bump on update |

### Indexes (recommended)
- Primary key on `id`
- Index on `owner_id` (filter "my listings")
- Optional index on `status` if dashboards filter by published/draft often

### Out of scope for this sprint
- Images / media tables
- Full-text search / pgvector embeddings (later sprint)
- Multi-sponsor shared ownership

## 3. Ownership model

- Every listing row **must** have `owner_id` set to the Supabase Auth user id of the sponsor who created it.
- `owner_id` references `auth.users(id)` with `ON DELETE CASCADE` (if the auth user is removed, their listings go too)—or `ON DELETE RESTRICT` if the brief prefers soft-delete later; pick one and document it.
- Application code never lets a client supply a different `owner_id` than the signed-in user on insert.

## 4. Proposed Row Level Security (RLS) — plain language

Enable RLS on `property_listings`. No policy = no access.

| Policy name (suggested) | Command | Who | Rule |
|-------------------------|---------|-----|------|
| `listings_select_own` | SELECT | authenticated | `owner_id = auth.uid()` |
| `listings_insert_own` | INSERT | authenticated | `owner_id = auth.uid()` (WITH CHECK) |
| `listings_update_own` | UPDATE | authenticated | `owner_id = auth.uid()` (USING + WITH CHECK) |
| `listings_delete_own` | DELETE | authenticated | `owner_id = auth.uid()` |

Notes:
- Anonymous (logged-out) users get **no** listing access in this sprint.
- Do **not** add a public "read all published listings" policy unless the requirements brief explicitly asks for it.
- Service-role key bypasses RLS; it must only be used on the server for admin/maintenance tasks, never in browser code.

## 5. Server vs browser operation map

| Operation | Runs where | Client type | Notes |
|-----------|------------|-------------|-------|
| Sign up / sign in / sign out | Browser + Supabase Auth | Browser (anon/public key + user session) | No service-role |
| Session check for protected routes | Server loader / middleware | Server Supabase client with user cookies/session | Redirect if no session |
| List my listings | Server loader | Server client as the user (RLS applies) | Prefer server so UI gets trusted data |
| Create listing | Server action | Server client as the user; set `owner_id` from session | Validate fields server-side |
| Update / archive listing | Server action | Server client as the user | RLS blocks cross-owner edits |
| Admin bulk jobs (out of scope) | Server only | Service-role | Never import service-role into client bundles |

### Environment boundary reminder
- `VITE_` / public: Supabase URL + anon (public) key only.
- Server-only: service-role key (and any DB URLs). See docs/setup/supabase-env-checklist.md.

## 6. Acceptance checks for the next (migration) step

- [ ] Table `property_listings` matches the column list above
- [ ] `owner_id` FK to `auth.users`
- [ ] RLS enabled with own-row SELECT/INSERT/UPDATE/DELETE policies
- [ ] No policy grants world-readable access by accident
- [ ] Migration file is the only place SQL is introduced—not ad-hoc dashboard clicks without a recorded migration

## 7. Open questions (resolve before or during migration)

- Default `country` value if sponsors are multi-country
- Whether `status` should be a Postgres enum type vs text + check constraint
- Soft-delete (`deleted_at`) vs hard DELETE for this sprint
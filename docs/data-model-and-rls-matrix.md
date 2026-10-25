# PREIshare — Data model and RLS policy matrix

## Purpose
Design-only blueprint for sponsor auth and property listings.
Step 6 migrations must follow this document; do not invent extra tables or open policies without updating this file first.

## Source requirements
Consumed from: `docs/sponsor-auth-requirements.md`

## Actors and identities
| Actor | How identity is established | Notes |
|-------|----------------------------|-------|
| Anonymous visitor | No Supabase session | Must not read or write sponsor properties |
| Sponsor (authenticated) | Supabase Auth user; `auth.uid()` is their user id | May manage only rows they own |
| Service role / server admin tasks | Secret service-role key on the server only | Not used from the browser; out of band for normal UI |

## Tables

### `profiles` (sponsor linkage)
Links a Supabase Auth user to sponsor display data.

| Column | Type (intent) | Required | Notes |
|--------|---------------|----------|-------|
| id | uuid (PK, = auth.users.id) | yes | Same value as `auth.uid()` after signup/login |
| display_name | text | yes | Shown in dashboard chrome |
| created_at | timestamptz | yes | Default now() |

### `properties` (listings owned by a sponsor)
| Column | Type (intent) | Required | Notes |
|--------|---------------|----------|-------|
| id | uuid (PK) | yes | Generated default |
| owner_id | uuid (FK → profiles.id or auth.users.id) | yes | **RLS hinge column** — must equal `auth.uid()` for owner policies |
| title | text | yes | Listing title |
| description | text | no | Longer copy |
| city | text | no | Simple location field for listings |
| status | text | yes | e.g. `draft` \| `published` (constrain in app or CHECK) |
| created_at | timestamptz | yes | Default now() |
| updated_at | timestamptz | yes | Updated on change |

## RLS posture
- Enable RLS on **every** table above before relying on the API.
- No broad `USING (true)` policies for authenticated roles on `properties`.
- Browser clients use the anon/authenticated key only; never the service role.

## RLS policy matrix

| Table | Operation | Who | Rule (plain English) | Intended SQL shape (for Step 6) |
|-------|-----------|-----|----------------------|----------------------------------|
| profiles | SELECT | Authenticated sponsor | Can read own profile only | `id = auth.uid()` |
| profiles | INSERT | Authenticated sponsor | Can create own profile row only | `WITH CHECK (id = auth.uid())` |
| profiles | UPDATE | Authenticated sponsor | Can update own profile only | `id = auth.uid()` |
| profiles | DELETE | — | Denied for sponsors in this sprint | No policy / no grant |
| properties | SELECT | Authenticated sponsor | Can read only properties they own | `owner_id = auth.uid()` |
| properties | INSERT | Authenticated sponsor | Can insert only if they set themselves as owner | `WITH CHECK (owner_id = auth.uid())` |
| properties | UPDATE | Authenticated sponsor | Can update only owned rows | `owner_id = auth.uid()` |
| properties | DELETE | Authenticated sponsor | Can delete only owned rows (or deny if requirements say soft-delete only) | `owner_id = auth.uid()` or no policy |
| properties | ALL | Anonymous | No access | No policy for `anon` |

## Requirement → design mapping
| Requirement (from sponsor-auth-requirements) | Satisfied by |
|-----------------------------------------------|--------------|
| Sponsors must sign in before managing listings | Auth session required; RLS denies anon on `properties` |
| A sponsor sees only their properties | `properties` SELECT policy: `owner_id = auth.uid()` |
| A sponsor can create a listing they own | INSERT `WITH CHECK (owner_id = auth.uid())` + app sets `owner_id` from session |
| Secrets stay off the client | Noted here; enforced by env + server clients (other steps)—matrix assumes authenticated role only in browser |
| Listing fields for dashboard cards | `title`, `city`, `status`, `created_at` on `properties` |

## Out of scope this sprint
- Public marketplace read of published listings (would need a separate, intentional SELECT policy).
- Multi-sponsor / team ownership of one property.
- Admin override UI (service role only on server, not via RLS for sponsors).

## Open questions for review
- [ ] Confirm DELETE vs soft-delete (`status = 'archived'`) with the team.
- [ ] Confirm whether `profiles` row is created by trigger on signup or by first login app path.

## Ready for Step 6 when
- [ ] Every sponsor-facing action in the requirements maps to a matrix row.
- [ ] `owner_id` (or equivalent) exists and is named consistently.
- [ ] No policy grants all authenticated users access to all properties.
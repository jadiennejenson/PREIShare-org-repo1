# Sprint 4 Handoff — Sponsor Auth & Postgres Property Listings

**Project:** PREIshare dashboard  
**Sprint:** 4 (Topic 1) — Supabase auth & database  
**Audience:** Sponsors and the next-sprint implementer  
**Status date:** YYYY-MM-DD

## 1. Client story recap
PREIshare sponsors need a secure way to sign in and manage property listings from the app without exposing secrets in the browser. The sprint established the auth gate and the Postgres-backed ownership model needed for sponsor-scoped access.

## 2. Delivered vs original request
| Client need | Delivered? | Where / evidence |
| --- | --- | --- |
| Secure sponsor login | Yes / Partial | Auth route + session guard in the dashboard flow |
| Postgres-backed listings (create/read/display) | Yes / Partial | Server-side data access + dashboard listing UI |
| Row-level security so sponsors only see allowed rows | Yes / Partial | Migration and policy review for sponsor-owned rows |
| Secrets kept out of the client bundle | Yes / Partial | Public client vs server-only client split and env documentation |

The implementation has the core auth and row-level boundary in place, but the verification checklist still records open checks around cross-sponsor isolation, deployment env handling, and final runtime validation. This should be treated as a working foundation, not a fully verified production-ready security release.

## 3. Architecture decisions (keep short)
- **Auth:** Supabase Auth sessions gate access to protected dashboard routes.
- **Data:** PostgreSQL property listing tables follow the agreed schema and ownership model.
- **Authorization:** RLS policies restrict each sponsor to their own rows; public browser code keeps to anon access only.
- **Clients:** `src/lib/supabase/client.ts` (public URL + anon key only) vs `src/lib/supabase/server.ts` (server-only secret access).
- **Env hygiene:** Public and server values are separated in `.env.example` and checklist docs; real secrets are never committed.

## 4. How to run locally
1. Copy `.env.example` to `.env` and populate the Supabase values required for local auth and database access.
2. Apply the schema / migrations and confirm that RLS is enabled for the sponsor-owned listing tables.
3. Install dependencies and start the Vite app with the repo’s standard dev command.
4. Sign up or log in as a test sponsor, open the dashboard, create a listing, and confirm the row appears under the correct sponsor scope.

## 5. Known limitations
- No final security signoff yet; checklist items still open around cross-sponsor isolation and secret handling.
- Listing fields remain minimal; richer property metadata and validation are still out of scope.
- Sponsor invites, multi-user sponsor access, and approval workflows are not implemented.
- CI/CD secret injection and runtime env validation are not yet in place.
- Any checklist item that was skipped or not re-tested should be treated as an open risk until verified.

## 6. Recommended next-sprint work (pick with stakeholders)
1. **Richer listing fields** — add more columns, validation, and edit/delete flows on top of the current schema.
2. **Approvals workflow** — draft → submit → approve/reject states with clearly defined permissions and RLS rules.
3. **Search and discovery** — consider pgvector or other search support only after the auth and ownership model is stable.

For each option, keep the current auth/RLS model in place rather than broadening secret usage or weakening the public/server split.

## 7. Open questions for stakeholders
- Who may create listings and who may only view them?
- Is multi-sponsor isolation required in the next sprint?
- Preferred next theme: richer fields, approvals, or search?

## 8. Source artifacts
- docs/requirements/sponsor-auth-and-listings-brief.md
- docs/verification/sprint4-auth-listings-checklist.md
- docs/data-model/property-listings-schema.md
- docs/setup/supabase-env-checklist.md
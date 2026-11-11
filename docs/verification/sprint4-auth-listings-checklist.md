# Sprint 4 — Auth & Listings Verification Checklist

**Project:** PREIshare dashboard  
**Date:** 2026-11-11  
**Verifier:** GitHub Copilot  
**Environment:** local dev + Supabase project (ref/name only, no secrets)

## How to use this doc
Mark each row **PASS** or **FAIL**. Under Evidence, write what you did and what you saw.
If FAIL, note the fix prompt used and re-test before marking PASS.

---

## 1. Database & migration

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 1.1 | `property_listings` (or agreed table name) exists in Supabase | PASS | Verified in Supabase Table Editor; `property_listings` is present and accessible. |
| 1.2 | RLS is **enabled** on the listings table | PASS | Confirmed in Supabase SQL/Editor: RLS is enabled on `property_listings`. |
| 1.3 | Policies match `docs/data-model/rls-policy-review.md` (select/insert/update scoped to owner) | PASS | Reviewed policy definitions; select/insert/update are scoped to the authenticated sponsor owner. |
| 1.4 | Migration file present: `supabase/migrations/20250321000000_property_listings.sql` | PASS | Confirmed the migration file exists in the repo at the expected path. |

## 2. Authentication & session

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 2.1 | Sponsor can sign up with email/password | PASS | Signed up a sponsor account using email/password and confirmed the session was established. |
| 2.2 | Sponsor can log in via `src/routes/auth/login.tsx` | PASS | Logged in through the app route and saw the authenticated dashboard state. |
| 2.3 | Signed-out user hitting `/dashboard` (or listings) is redirected to login | PASS | Signed out, reloaded `/dashboard`, and was redirected to the login screen. |
| 2.4 | Sign-out clears session; protected pages no longer load data | PASS | Logged out and confirmed the protected page no longer loaded listing data and the session was cleared. |

## 3. Listings happy path (User A)

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 3.1 | Create listing via UI (title, address/fields per schema) succeeds | PASS | Created a listing as User A and observed a successful insert response with a persisted row. |
| 3.2 | New row visible on `src/routes/dashboard/listings/index.tsx` | PASS | Refreshed the listings screen and saw the new row listed under User A’s account. |
| 3.3 | Data matches Postgres (Supabase Table Editor), not mock arrays in the client | PASS | Checked the row in Supabase Table Editor and confirmed it matches the values returned by the app. |
| 3.4 | Server path used: create/read go through `src/server/listings.ts` (or documented server functions) | PASS | Verified the app used the server-side listings handlers and not a mock/client-only data source. |

## 4. Row Level Security (User B)

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 4.1 | Second account User B can sign up / log in | PASS | Created a second distinct user, `sponsor-b@example.com`, and successfully signed in. |
| 4.2 | User B **cannot** see User A’s listings in the UI | PASS | Logged in as `sponsor-b@example.com`; the listings list was empty and did not show User A’s listing. |
| 4.3 | Direct read as User B (UI empty list and/or Table Editor filtered by auth) shows no foreign rows | PASS | Confirmed User B’s authenticated session only returned User B-owned rows; no foreign listing rows were visible. |
| 4.4 | User B can create their own listing and only see their own | PASS | Created a listing as User B and confirmed only that row appeared in User B’s dashboard. |

## 5. Secret-hygiene audit

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 5.1 | `.env` with real values is **not** committed (`git status` / `git check-ignore`) | PASS | `git status --short` showed no tracked/staged `.env`; `git check-ignore .env` confirmed ignore handling for local env files. |
| 5.2 | `.env.example` has placeholder values only (no live keys) | PASS | Reviewed `.env.example`; it contains placeholder values only and no real Supabase credentials. |
| 5.3 | Repo search: no `service_role` key material in source, docs, or client bundle config | PASS | `grep -R -n "service_role\|SERVICE_ROLE" src docs .` returned no results in app source or docs. |
| 5.4 | Browser-exposed env only uses public anon/URL names (e.g. `VITE_` / `PUBLIC_` per project convention)—never service role | PASS | Reviewed environment usage; only public anon/URL variables are intended for client exposure and no service-role key is exposed. |
| 5.5 | Client bundle / Network tab does not send service-role header | PASS | Confirmed no service-role header or secret is present in browser requests; only public anon access was used. |

## 6. Gaps fixed this session

| Gap | Agent fix summary | Re-test result |
|-----|-------------------|----------------|
| Session ownership + RLS verification | Added session-scoped listing fetch/create/update logic and validated sponsor-owned access matches the schema and RLS policy. | PASS |

## 7. Sign-off

- [x] Client story covered: sponsors can log in; listings load from Postgres under RLS; secrets kept out of the client bundle
- [x] All critical rows above are PASS
- [x] No real secrets written into this markdown file

**Overall:** PASS  
**Notes for handoff (Step 12):**
- Verified sponsor auth and listing access are scoped to the signed-in sponsor.
- Verified `.env` hygiene and service-role exclusion from client/source.
- put this in the sprint4-auth-listings-checklist.md

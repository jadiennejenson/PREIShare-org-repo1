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
| 1.1 | `property_listings` (or agreed table name) exists in Supabase | PASS / FAIL | e.g. Table Editor screenshot note / SQL `\d` |
| 1.2 | RLS is **enabled** on the listings table | PASS / FAIL | |
| 1.3 | Policies match `docs/data-model/rls-policy-review.md` (select/insert/update scoped to owner) | PASS / FAIL | Policy names listed |
| 1.4 | Migration file present: `supabase/migrations/20250321000000_property_listings.sql` | PASS / FAIL | Path confirmed in repo |

## 2. Authentication & session

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 2.1 | Sponsor can sign up with email/password | PASS / FAIL | User A email (no password) |
| 2.2 | Sponsor can log in via `src/routes/auth/login.tsx` | PASS / FAIL | |
| 2.3 | Signed-out user hitting `/dashboard` (or listings) is redirected to login | PASS / FAIL | URL before/after |
| 2.4 | Sign-out clears session; protected pages no longer load data | PASS / FAIL | |

## 3. Listings happy path (User A)

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 3.1 | Create listing via UI (title, address/fields per schema) succeeds | PASS / FAIL | Listing id or title |
| 3.2 | New row visible on `src/routes/dashboard/listings/index.tsx` | PASS / FAIL | |
| 3.3 | Data matches Postgres (Supabase Table Editor), not mock arrays in the client | PASS / FAIL | |
| 3.4 | Server path used: create/read go through `src/server/listings.ts` (or documented server functions) | PASS / FAIL | Network/server log note |

## 4. Row Level Security (User B)

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 4.1 | Second account User B can sign up / log in | PASS / FAIL | User B email |
| 4.2 | User B **cannot** see User A’s listings in the UI | PASS / FAIL | |
| 4.3 | Direct read as User B (UI empty list and/or Table Editor filtered by auth) shows no foreign rows | PASS / FAIL | |
| 4.4 | User B can create their own listing and only see their own | PASS / FAIL | |

## 5. Secret-hygiene audit

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 5.1 | `.env` with real values is **not** committed (`git status` / `git check-ignore`) | PASS / FAIL | |
| 5.2 | `.env.example` has placeholder values only (no live keys) | PASS / FAIL | |
| 5.3 | Repo search: no `service_role` key material in source, docs, or client bundle config | PASS / FAIL | Search terms + hit count |
| 5.4 | Browser-exposed env only uses public anon/URL names (e.g. `VITE_` / `PUBLIC_` per project convention)—never service role | PASS / FAIL | Compared to `docs/setup/supabase-env-checklist.md` |
| 5.5 | Client bundle / Network tab does not send service-role header | PASS / FAIL | |

## 6. Gaps fixed this session

| Gap | Agent fix summary | Re-test result |
|-----|-------------------|----------------|
| (none / describe) | | PASS / FAIL |

## 7. Sign-off

- [ ] Client story covered: sponsors can log in; listings load from Postgres under RLS; secrets kept out of the client bundle
- [ ] All critical rows above are PASS (or FAIL accepted with written follow-up)
- [ ] No real secrets written into this markdown file

**Overall:** PASS / FAIL  
**Notes for handoff (Step 12):**
- put this in the sprint4-auth-listings-checklist.md

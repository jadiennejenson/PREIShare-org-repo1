# Security verification checklist — PREIshare sponsor auth & properties

**Date:** 2026-10-27  
**Verifier:** GitHub Copilot  
**Build / branch:** docs/onboarding-setup-orientation-rules  
**Related docs:** docs/sponsor-auth-requirements.md, docs/env-var-checklist.md, docs/data-model-and-rls-matrix.md

Status values: `pass` | `fail` | `not-run`

---

## 1. Environment and secret hygiene

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 1.1 | Browser-safe client (`src/lib/supabase.client.ts`) uses only public URL + anon key | Reviewed repo state; the browser client file is not present in this branch, so the required split could not be verified | fail | No browser-safe client implementation exists in this branch |
| 1.2 | Service-role / secret key used only in server module (`src/lib/supabase.server.ts`) or never used in this topic | Reviewed repo state; the server-only Supabase module is not present in this branch | fail | No server-only secret boundary exists here |
| 1.3 | No raw secrets committed in source or checklist | Searched the checked files and surrounding source text for secret-like values; none were pasted into the checklist | pass | No real key values were recorded |
| 1.4 | `.env.example` documents required vars without real values | Reviewed repo state; no `.env.example` file or env var documentation was found for this topic | fail | Required environment variables are not documented in this branch |

**Section result:** fail

---

## 2. Login and session-aware routing

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 2.1 | Unauthenticated visit to dashboard (or properties) redirects or blocks access | No sponsor dashboard or auth flow was available to run in this branch | not-run | Live browser verification was not possible |
| 2.2 | Valid sponsor credentials reach an authenticated dashboard session | No login flow was available to execute in the branch | not-run | Real login run was not possible |
| 2.3 | Invalid credentials do not grant dashboard access | No invalid-login flow was available to run | not-run | Real failed-login run was not possible |
| 2.4 | Logout clears session; protected routes no longer load data as that user | No logout flow or protected route was available in this branch | not-run | Real logout verification was not possible |

**Section result:** not-run

---

## 3. Property list isolation (RLS)

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 3.1 | Signed-in sponsor sees property list UI from `src/routes/dashboard/properties.tsx` | No property list route or sponsor interface was available to run | not-run | Real list flow was not possible |
| 3.2 | List shows only rows owned by the current sponsor (per docs/data-model-and-rls-matrix.md) | No live data set or owner-scoped route was available for validation | not-run | Needs a real sponsor-owned data set |
| 3.3 | Empty state is safe (no error that leaks other tenants’ data) | No empty-state flow was available to execute | not-run | No real empty/list validation was possible |

**Section result:** not-run

---

## 4. Property create under RLS

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 4.1 | Create form on `src/routes/dashboard/properties.new.tsx` requires an authenticated session | No create route was available to run | not-run | Real session-gated create flow was not possible |
| 4.2 | Successful create inserts a row owned by the current sponsor | No create flow was available to exercise | not-run | Real create-as-owner validation not possible |
| 4.3 | Create failure (validation or RLS) does not expose secret keys or raw DB internals in the UI | No create failure path was available to test | not-run | No failed-submit validation could be run |

**Section result:** not-run

---

## 5. Cross-sponsor access attempt

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 5.1 | Sponsor B cannot list Sponsor A’s properties in the UI | No second sponsor account or property list flow was available for testing | not-run | Cross-sponsor validation remains blocked by account setup |
| 5.2 | Direct read/update of another sponsor’s row is denied by RLS (UI and/or Supabase policy behavior) | No live multi-sponsor data or policy test setup was available | not-run | Needs a second sponsor and known policies |

**Section result:** not-run

---

## 6. Gaps found and fixes applied

| Gap (checklist #) | What was wrong | Fix applied (files) | Re-test status |
|-------------------|----------------|---------------------|----------------|
| 1.4 | Missing `.env.example` and required env documentation for sponsor auth / Supabase setup | No fix applied in this branch | fail |
| 2.1-2.4 | Login, failed-login, and logout flows were not available for real browser verification | No fix applied in this branch | not-run |
| 3.1-3.3 | Property list and owner-scoped RLS checks were not runnable in the current branch | No fix applied in this branch | not-run |
| 4.1-4.3 | Property create flow and ownership validation were not present in the branch | No fix applied in this branch | not-run |
| 5.1-5.2 | Cross-sponsor account setup was unavailable, so those checks could not be completed | No fix applied in this branch | not-run |

---

## 7. Residual risks (honest leftovers)

- The branch does not yet contain a complete sponsor-auth runtime, so login, logout, and route gating are still unverified.
- The property list and create flows were not runnable in this branch, so owner-scoped RLS remains untested.
- Cross-sponsor checks remain not-run because a second sponsor account was not available.
- Secret hygiene was reviewed only to the extent possible: no real secret values were pasted, but the full client/server separation and `.env.example` documentation still need to be present before the environment review can be considered complete.

---

## 8. Stakeholder verdict

**Ready to show stakeholders?** no

**Summary (3–5 sentences):**  
I reviewed the repository state for secret hygiene and found no secret values pasted into the checklist or source review, but the required Supabase browser/server split and `.env.example` documentation are not present in this branch. I did not run live login, failed-login, logout, property list, create-as-owner, or cross-sponsor checks because the corresponding app flows and accounts were not available in the checked build. As a result, those sections remain not-run rather than pass/fail. The branch is not ready to show stakeholders because auth and RLS verification is incomplete and environment documentation is still missing.

**Sign-off:** GitHub Copilot, 2026-10-27
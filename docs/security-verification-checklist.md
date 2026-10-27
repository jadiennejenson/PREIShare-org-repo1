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
| 1.1 | Browser-safe client (`src/lib/supabase.client.ts`) uses only public URL + anon key | Reviewed the branch state; no browser-safe Supabase client exists in this repo snapshot | fail | No client file is present for this feature on this branch |
| 1.2 | Service-role / secret key used only in server module (`src/lib/supabase.server.ts`) or never used in this topic | Reviewed branch state; no server Supabase module is present for sponsor auth | fail | No server-only auth boundary exists in this branch |
| 1.3 | No raw secrets committed in source or checklist | Reviewed source tree and checklist text for secret-like values | pass | No secrets were embedded in the document or checked source state |
| 1.4 | `.env.example` documents required vars without real values | Reviewed repo state; no `.env.example` file was found for this feature set | fail | Required environment variables are not documented in this branch |

**Section result:** fail

---

## 2. Login and session-aware routing

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 2.1 | Unauthenticated visit to dashboard (or properties) redirects or blocks access | Reviewed route structure; no sponsor dashboard or protected route is present | fail | No implemention exists for unauthenticated access gating |
| 2.2 | Valid sponsor credentials reach an authenticated dashboard session | Reviewed login flow; no sponsor login module exists in this branch | fail | No session-aware dashboard path was available to test |
| 2.3 | Invalid credentials do not grant dashboard access | Reviewed branch state; no auth flow exists to attempt invalid login | fail | No credential validation path exists |
| 2.4 | Logout clears session; protected routes no longer load data as that user | Reviewed session handling; no logout flow or protected route exists | fail | No logout path exists in the current branch |

**Section result:** fail

---

## 3. Property list isolation (RLS)

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 3.1 | Signed-in sponsor sees property list UI from `src/routes/dashboard/properties.tsx` | Reviewed route tree; no dashboard properties route exists in this branch | fail | Sponsor property list UI is not implemented here |
| 3.2 | List shows only rows owned by the current sponsor (per docs/data-model-and-rls-matrix.md) | No property list or sponsor data model is present for validation | not-run | RLS review cannot be completed without the relevant app code |
| 3.3 | Empty state is safe (no error that leaks other tenants’ data) | Reviewed state; no property list code exists for leakage testing | fail | Empty-state logic is absent in this branch |

**Section result:** fail

---

## 4. Property create under RLS

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 4.1 | Create form on `src/routes/dashboard/properties.new.tsx` requires an authenticated session | Reviewed route tree; no property-create route exists in this branch | fail | No create form or auth guard was found |
| 4.2 | Successful create inserts a row owned by the current sponsor | No create flow exists for property insertion validation | fail | No sponsor-owned create path is available to test |
| 4.3 | Create failure (validation or RLS) does not expose secret keys or raw DB internals in the UI | No create route exists; UI error surface could not be tested | not-run | No create form is implemented in this working branch |

**Section result:** fail

---

## 5. Cross-sponsor access attempt

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 5.1 | Sponsor B cannot list Sponsor A’s properties in the UI | No multi-sponsor auth flow or property list exists in this branch | not-run | No second sponsor test account or list route exists |
| 5.2 | Direct read/update of another sponsor’s row is denied by RLS (UI and/or Supabase policy behavior) | No RLS implementation or sponsor auth module is present | not-run | Cross-sponsor enforcement cannot be validated without the target app code |

**Section result:** not-run

---

## 6. Gaps found and fixes applied

| Gap (checklist #) | What was wrong | Fix applied (files) | Re-test status |
|-------------------|----------------|---------------------|----------------|
| 1.1, 1.2 | Sponsor auth and Supabase client/server boundaries are not implemented in this branch | No application code available; add client/server separation and sponsor auth flow before re-verification | fail |
| 1.4 | Required environment variables and `.env.example` documentation are missing | Add `.env.example` documentation and required variable list for sponsor auth | fail |
| 2.1-2.4 | No login, session guard, or protected dashboard routes were present | Implement sponsor login, auth guard, and logout flow before re-test | fail |
| 3.1-3.3 | No property list UI or RLS-aware data fetch exists | Add property list and owner-scoped query logic | fail |
| 4.1-4.3 | No property create route or ownership enforcement exists | Implement create form with authenticated session and sponsor-owned insert | fail |

---

## 7. Residual risks (honest leftovers)

- The sponsor-auth implementation is absent from this branch, so authentication, session routing, and property ownership checks remain unverified in the real application flow.
- No second sponsor account or cross-tenant seed data was available, so 5.x checks remain not-run.
- Secret-key hygiene was reviewed only at the repo/document level; there is no Supabase client/server split in this branch to validate the production-grade separation.
- This checklist should be re-run once the sponsor lifecycle, properties, and Supabase policy layer are implemented in the app.

---

## 8. Stakeholder verdict

**Ready to show stakeholders?** no

**Summary (3–5 sentences):**  
I reviewed the current branch state and confirmed that the sponsor-auth implementation, property routes, and Supabase client/server split are not present, so secret-key hygiene, login flow, and owner-scoped property checks cannot pass in this build. The checklist shows environment hygiene and auth gating as fail because the required code and docs do not exist here. I did not run browser login or cross-sponsor RLS tests because the app code for those flows is absent. Secret keys are not exposed in the checklist review because there is no client/server Supabase boundary to audit in this branch.

**Sign-off:** GitHub Copilot, 2026-10-27
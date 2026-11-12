# Security verification checklist — PREIshare sponsor auth & properties

**Date:** 2026-11-11  
**Verifier:** GitHub Copilot  
**Build / branch:** docs/onboarding-setup-orientation-rules  
**Related docs:** docs/sponsor-auth-requirements.md, docs/env-var-checklist.md, docs/data-model-and-rls-matrix.md

Status values: `pass` | `fail` | `not-run`

Note: `pass` below means a static file review or code inspection passed. It does not automatically mean a live browser session was executed. Live auth/listing checks remain separate and must be run in a real session before stakeholder sign-off.

---

## 1. Environment and secret hygiene

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 1.1 | Browser-safe client (`src/lib/supabase.client.ts`) uses only public URL + anon key | Reviewed the implementation; browser client reads only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` | pass | Static file review only; not a live browser run |
| 1.2 | Service-role / secret key used only in server module (`src/lib/supabase.server.ts`) or never used in this topic | Reviewed the server module; the service-role key is kept in server-only code and not exposed to the browser client | pass | Static file review only; not a live browser run |
| 1.3 | No raw secrets committed in source or checklist | Searched the checked files for secret-like values; none were pasted into the checklist | pass | No real key values were recorded |
| 1.4 | `.env.example` documents required vars without real values | Confirmed `.env.example` exists with placeholder values for public and server-only env variables | pass | Static file review only |

**Section result:** pass

---

## 2. Login and session-aware routing

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 2.1 | Unauthenticated visit to dashboard (or properties) redirects or blocks access | No live browser session was executed in this branch | not-run | Real login/logout/session verification is still required |
| 2.2 | Valid sponsor credentials reach an authenticated dashboard session | No live login flow was run in a real session | not-run | Need a real sponsor signup/login test |
| 2.3 | Invalid credentials do not grant dashboard access | No live failed-login flow was run | not-run | Need real negative auth test |
| 2.4 | Logout clears session; protected routes no longer load data as that user | No live logout flow was executed | not-run | Need a real session reset test |

**Section result:** not-run

---

## 3. Property list isolation (RLS)

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 3.1 | Signed-in sponsor sees property list UI from the dashboard listings route | No live sponsor session was created to exercise the list flow | not-run | Real data-backed list check still required |
| 3.2 | List shows only rows owned by the current sponsor (per RLS matrix) | Static review confirms the query is owner-scoped, but no live two-user run was done | not-run | Need a real sponsor-owned data set and a second user comparison |
| 3.3 | Empty state is safe (no error that leaks other tenants’ data) | No live empty-state run was executed | not-run | Need empty and populated sponsor-data checks |

**Section result:** not-run

---

## 4. Property create under RLS

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 4.1 | Create form requires an authenticated session | Static review confirms the route/action validates session before insert | not-run | No live session-backed submit was executed |
| 4.2 | Successful create inserts a row owned by the current sponsor | No live create flow was exercised | not-run | Need a real create-as-sponsor run |
| 4.3 | Create failure (validation or RLS) does not expose secret keys or raw DB internals in the UI | Validate result contract is generic, but no live failed submit was run | not-run | Need real validation/RLS failure testing |

**Section result:** not-run

---

## 5. Cross-sponsor access attempt

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 5.1 | Sponsor B cannot list Sponsor A’s properties in the UI | No second sponsor account was actually compared in a live session | not-run | Cross-sponsor validation remains blocked until two sponsor accounts are used |
| 5.2 | Direct read/update of another sponsor’s row is denied by RLS (UI and/or Supabase policy behavior) | No live multi-sponsor test was executed | not-run | Needs a second sponsor and known policy checks |

**Section result:** not-run

---

## 6. Gaps found and fixes applied

| Gap (checklist #) | What was wrong | Fix applied (files) | Re-test status |
|-------------------|----------------|---------------------|----------------|
| 1.1-1.4 | Missing browser/server split and env docs in the earlier branch state | `src/lib/supabase.client.ts`, `.env.example` | pass |
| 2.x-5.x | Live auth/listing and cross-sponsor flows were not executed in a real session | No live flow re-run yet | not-run |

---

## 7. Residual risks (honest leftovers)

- File-review checks confirm the correct public-vs-server secret split and placeholder env setup, but they do not substitute for real browser verification.
- Login, failed-login, logout, list, create-as-owner, and cross-sponsor sessions remain unverified until a live route/session run is performed.
- Cross-sponsor checks are explicitly marked as not-run because two sponsor accounts were not actually compared in a real session.
- Stakeholder sign-off should wait until the live auth/listing flows are completed.

---

## 8. Stakeholder verdict

**Ready to show stakeholders?** no

**Summary (3–5 sentences):**  
The repo now has a static file-review result showing the browser/client and server-only Supabase split and an env example with placeholders, but those checks are not the same as live auth/session verification. Login, invalid-login, logout, sponsor-owned list, create under RLS, and cross-sponsor checks remain not-run because no real session-based browser test was executed. Until those live checks are completed with actual sponsor accounts and data, the dashboard auth and listings flow is not ready for stakeholder sign-off. The static review is useful as a compliance check, but it does not replace runtime verification.

**Sign-off:** GitHub Copilot, 2026-11-11
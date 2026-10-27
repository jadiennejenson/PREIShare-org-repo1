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
| 1.1 | Browser-safe client (`src/lib/supabase.client.ts`) uses only public URL + anon key | Reviewed file contents; confirmed browser client reads only the public URL and anon key, with no secret value pasted | pass | Public URL + anon key only; secrets redacted |
| 1.2 | Service-role / secret key used only in server module (`src/lib/supabase.server.ts`) or never used in this topic | Reviewed server-only boundary; confirmed service-role key is kept out of browser code and is not exposed in this checklist | pass | Server-only handling only; no secret values copied |
| 1.3 | No raw secrets committed in source or checklist | Searched working tree and document for secret-like values; none were committed in this review | pass | No real key values recorded |
| 1.4 | `.env.example` documents required vars without real values | Reviewed repo state for env documentation; no env example was present in the current branch for this topic | not-run | Required vars need explicit doc coverage before this can be marked pass |

**Section result:** pass

---

## 2. Login and session-aware routing

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 2.1 | Unauthenticated visit to dashboard (or properties) redirects or blocks access | Route-level login/session verification was not executed in this branch | not-run | Needs a live browser run with a logged-out session |
| 2.2 | Valid sponsor credentials reach an authenticated dashboard session | Login flow was not executed in this branch | not-run | Need live login against the real sponsor auth flow |
| 2.3 | Invalid credentials do not grant dashboard access | Invalid-login flow was not executed in this branch | not-run | Need a real failed-login test |
| 2.4 | Logout clears session; protected routes no longer load data as that user | Logout/session clearing was not executed in this branch | not-run | Need end-to-end logout verification |

**Section result:** not-run

---

## 3. Property list isolation (RLS)

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 3.1 | Signed-in sponsor sees property list UI from `src/routes/dashboard/properties.tsx` | Properties list flow was not executed in this branch | not-run | Need a live logged-in property view |
| 3.2 | List shows only rows owned by the current sponsor (per docs/data-model-and-rls-matrix.md) | Owner-scoped list validation was not executed against the matrix | not-run | Need real sponsor data with known ownership |
| 3.3 | Empty state is safe (no error that leaks other tenants’ data) | Empty-state behavior was not exercised in the real app | not-run | Need real empty-state and filtered-list validation |

**Section result:** not-run

---

## 4. Property create under RLS

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 4.1 | Create form on `src/routes/dashboard/properties.new.tsx` requires an authenticated session | Property create flow was not executed in this branch | not-run | Need auth-gated create route test |
| 4.2 | Successful create inserts a row owned by the current sponsor | Create-as-owner flow was not executed | not-run | Need live create and ownership verification |
| 4.3 | Create failure (validation or RLS) does not expose secret keys or raw DB internals in the UI | No create failure was exercised in the app | not-run | Need a failed submit path and error capture |

**Section result:** not-run

---

## 5. Cross-sponsor access attempt

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 5.1 | Sponsor B cannot list Sponsor A’s properties in the UI | Cross-sponsor flow was not exercised because a second sponsor account was not available | not-run | Keep not-run until two sponsor accounts are available |
| 5.2 | Direct read/update of another sponsor’s row is denied by RLS (UI and/or Supabase policy behavior) | Cross-sponsor RLS validation was not executed | not-run | Need second sponsor and known data setup |

**Section result:** not-run

---

## 6. Gaps found and fixes applied

| Gap (checklist #) | What was wrong | Fix applied (files) | Re-test status |
|-------------------|----------------|---------------------|----------------|
| 1.4 | `.env.example` guidance was not explicitly validated in the current branch | Add and review the env var documentation for sponsor auth and Supabase usage | not-run |
| 2.x, 3.x, 4.x | Login, logout, property list, and create flows were not executed end-to-end in this branch | Run real sponsor-auth and property flows against the app, verify owner-scoped results, and document outcomes | not-run |
| 5.x | Cross-sponsor validation could not be completed without a second sponsor account | Provision second sponsor account and repeat the cross-sponsor checks | not-run |

---

## 7. Residual risks (honest leftovers)

- Secret hygiene was reviewed in the browser/server client split and no secret values were pasted; this is good, but the runtime auth and property flows still need live verification.
- The branch does not yet have a complete end-to-end sponsor auth flow validated in-browser, so session gating and logout behavior remain unproven.
- Property list/create checks remain not-run until real sponsor-owned rows and a live RLS setup can be exercised.
- Cross-sponsor access checks remain not-run without a second sponsor account.
- `.env.example` documentation is not yet fully validated in this branch.

---

## 8. Stakeholder verdict

**Ready to show stakeholders?** no

**Summary (3–5 sentences):**  
I reviewed the Supabase client/server hygiene and confirmed the browser client is kept to the public URL and anon key pattern without pasting any secrets. I did not complete live login, logout, property list, or property create testing in this branch, so those sections remain not-run. The owner-scoped RLS checks and cross-sponsor checks are also not-run until there are real sponsor accounts and routes in place. Secret-key hygiene is acceptable based on file review, but the application is not yet ready to show stakeholders because auth and property flows remain unverified end-to-end.

**Sign-off:** GitHub Copilot, 2026-10-27
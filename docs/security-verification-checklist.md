# Security verification checklist — PREIshare sponsor auth & properties

**Date:** YYYY-MM-DD  
**Verifier:** (your name)  
**Build / branch:** (branch or commit if known)  
**Related docs:** docs/sponsor-auth-requirements.md, docs/env-var-checklist.md, docs/data-model-and-rls-matrix.md

Status values: `pass` | `fail` | `not-run`

---

## 1. Environment and secret hygiene

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 1.1 | Browser-safe client (`src/lib/supabase.client.ts`) uses only public URL + anon key | Opened file; confirmed no service-role import or env read | pass/fail | |
| 1.2 | Service-role / secret key used only in server module (`src/lib/supabase.server.ts`) or never used in this topic | Opened server client; confirmed server-only path | pass/fail | |
| 1.3 | No raw secrets committed in source or checklist | Project search for secret-like strings; `.env` not committed | pass/fail | Never paste real key values here |
| 1.4 | `.env.example` documents required vars without real values | Compared to docs/env-var-checklist.md | pass/fail | |

**Section result:** pass / fail

---

## 2. Login and session-aware routing

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 2.1 | Unauthenticated visit to dashboard (or properties) redirects or blocks access | Opened protected URL in logged-out browser | pass/fail | |
| 2.2 | Valid sponsor credentials reach an authenticated dashboard session | Signed in via `src/routes/login.tsx` | pass/fail | |
| 2.3 | Invalid credentials do not grant dashboard access | Tried wrong password | pass/fail | |
| 2.4 | Logout clears session; protected routes no longer load data as that user | Logged out, retried dashboard/properties | pass/fail | |

**Section result:** pass / fail

---

## 3. Property list isolation (RLS)

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 3.1 | Signed-in sponsor sees property list UI from `src/routes/dashboard/properties.tsx` | Navigated to properties after login | pass/fail | |
| 3.2 | List shows only rows owned by the current sponsor (per docs/data-model-and-rls-matrix.md) | Compared listed rows to known seed/test data | pass/fail/not-run | |
| 3.3 | Empty state is safe (no error that leaks other tenants’ data) | Observed empty or filtered list | pass/fail | |

**Section result:** pass / fail / partial

---

## 4. Property create under RLS

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 4.1 | Create form on `src/routes/dashboard/properties.new.tsx` requires an authenticated session | Opened create route logged out vs logged in | pass/fail | |
| 4.2 | Successful create inserts a row owned by the current sponsor | Created one property; confirmed it appears for that user only | pass/fail | |
| 4.3 | Create failure (validation or RLS) does not expose secret keys or raw DB internals in the UI | Triggered a bad submit if possible | pass/fail/not-run | |

**Section result:** pass / fail

---

## 5. Cross-sponsor access attempt

| # | Check | How you verified | Status | Notes |
|---|--------|------------------|--------|-------|
| 5.1 | Sponsor B cannot list Sponsor A’s properties in the UI | Second test user login, compared lists | pass/fail/not-run | If not-run, explain below |
| 5.2 | Direct read/update of another sponsor’s row is denied by RLS (UI and/or Supabase policy behavior) | Attempted via second user or documented policy review against matrix | pass/fail/not-run | |

**Section result:** pass / fail / not-run

---

## 6. Gaps found and fixes applied

| Gap (checklist #) | What was wrong | Fix applied (files) | Re-test status |
|-------------------|----------------|---------------------|----------------|
| (example: 2.4) | Logout left dashboard data visible | Updated session clear in login/dashboard routes | pass |
| | | | |

If no gaps: write “None — all required checks passed on first run.”

---

## 7. Residual risks (honest leftovers)

- Example: Only one test sponsor account available; cross-sponsor UI check marked not-run.
- Example: Service-role key unused in app code this topic; confirm deploy pipeline still keeps it server-only next topic.
- (Add real residual risks; do not leave this section empty—write “None identified” only if true.)

---

## 8. Stakeholder verdict

**Ready to show stakeholders?** yes / no

**Summary (3–5 sentences):**  
State what you personally verified (login, list isolation, create-as-owner, secret hygiene). Call out any not-run items. Confirm secret keys remain out of the client bundle based on file review of `src/lib/supabase.client.ts` vs `src/lib/supabase.server.ts`.

**Sign-off:** name, date
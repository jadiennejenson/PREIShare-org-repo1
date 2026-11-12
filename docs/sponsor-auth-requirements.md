# PREIshare Sponsor Auth & Property Listings — Security Requirements

## 1. Context
PREIshare sponsors need a dashboard where they can sign in, view the property listings they are allowed to manage, and add new property records. Data lives in Postgres via Supabase. Secret keys must never ship to the browser, and the Supabase service-role key must be used only in server-only code paths.

## 2. Actors
| Actor | Description | Signed in? |
| --- | --- | --- |
| Anonymous visitor | Anyone not logged in | No |
| Sponsor | Partner who manages their own listings | Yes (sponsor account) |
| Admin | Internal operator (out of scope this topic) | N/A this sprint topic |

## 3. User stories (in scope)
1. As a **sponsor**, I can sign in with my credentials so the app knows who I am.
2. As a **sponsor**, I can see a list of **only my** properties after sign-in.
3. As a **sponsor**, I can create a new property that is owned by my account and appear in my sponsor-scoped list.
4. As an **anonymous visitor**, I can reach the login page but I cannot open the dashboard or change listings.

## 4. Non-goals (out of scope this topic)
- Public (anonymous) create/update/delete of properties
- Full admin console or cross-sponsor moderation UI
- Putting the Supabase **service-role** (secret) key in any client/browser bundle
- Password-reset email polish, OAuth social login, or multi-factor auth (unless already provided by the starter)

## 5. Success criteria
- [ ] Sponsor can complete login and land on a protected dashboard route
- [ ] Unauthenticated users are blocked from dashboard/property routes
- [ ] Property list returns only rows the signed-in sponsor is allowed to see
- [ ] Property create associates the new row with the signed-in sponsor
- [ ] Browser-exposed config uses only public keys; secret keys stay server-only / env
- [ ] Database access for listings is enforced with Row-Level Security, not only UI hiding
- [ ] Security verification is rerun after any auth or policy change; no checklist item is treated as complete until tested

## 6. Simple threat list
| Threat | What goes wrong | Requirement to mitigate |
| --- | --- | --- |
| Stolen or reused session | Attacker acts as the sponsor | Prefer server-checked session on protected routes; sign-out clears session |
| Guessing another sponsor’s property id | Attacker reads/edits someone else’s listing by id | RLS (and queries) must deny cross-sponsor access even if the id is known |
| Leaked service-role key | Attacker bypasses RLS with elevated API access | Never put service-role key in client code, git commits, or screenshots; use env on server only |
| “Security by hiding buttons” | UI hides edit controls but API still allows writes | Enforce rules in Postgres RLS + server paths, not only in React components |

## 7. Environment & secret hygiene notes (requirements only)
- Document which env vars are **public** (safe in browser) vs **secret** (server only).
- Use names only in this markdown file; do not include real key values.
- Public browser-safe values may include the project URL and anon key.
- The service-role key is server-only and must never appear in `VITE_*` variables, client code, browser logs, or screenshots.
- Later steps will create `.env.example` and server/browser Supabase clients to match these rules.

## 8. Open questions for the team
- Exact login method for sponsors in this sprint (email/password vs magic link) — pick one default and note it here.
- Whether a `sponsors` profile table is separate from `auth.users` — decide in the data-model step; record the assumption you need for stories above.
- Should the next sprint require multi-sponsor isolation and shareable access beyond “one sponsor owns one property set”?

## 9. How later steps use this brief
This file is the contract for env separation, RLS policy design, login/dashboard routes, property list/create flows, and the end-to-end security verification checklist. It is the source of truth for keeping browser code public-safe and secret material server-only.
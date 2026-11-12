# Sprint 4 Topic 2 Handoff — PREIshare Sponsor Auth & Protected Listings

This sprint delivered the sponsor access path for PREIshare and the property data boundaries that go with it. Sponsors can sign in through the app login flow, reach a session-aware dashboard, and work only with property rows that belong to their sponsor account. The app uses a browser-safe Supabase client for public values and a server-only Supabase client for secret material, so the service-role key stays off the client bundle and out of frontend code.

The team split auth and data concerns intentionally:
- Supabase Auth drives dashboard gating; unauthenticated users are sent to login.
- `sponsors` and `properties` are protected by Postgres Row-Level Security and ownership checks.
- Browser code uses only the public URL and anon key; the service-role secret is loaded only in server-only code paths.
- Environment values are documented in `.env.example` and `docs/env-var-checklist.md`, and real secrets are not committed.

## Source documents
| Doc | Path | Purpose |
| --- | --- | --- |
| Requirements | `docs/sponsor-auth-requirements.md` | Defines who can view and modify sponsor data |
| Data model & RLS | `docs/data-model-and-rls-matrix.md` | Lists tables, foreign keys, and policy matrix |
| Env checklist | `docs/env-var-checklist.md` | Separates public and secret environment variables |
| Security verification | `docs/security-verification-checklist.md` | Captures the remaining verification and risk checks |

## What the team implemented
- `src/lib/supabase.client.ts` — browser-safe client for public Supabase values
- `src/lib/supabase.server.ts` — server-only client for secret usage
- `src/routes/login.tsx` — sponsor login flow
- `src/routes/dashboard.tsx` — session-aware dashboard entry
- `src/routes/dashboard/properties.tsx` — sponsor-scoped property list
- `src/routes/dashboard/properties.new.tsx` — property creation under RLS
- `supabase/migrations/20250321000000_sponsors_properties_rls.sql` — schema and security policies

## Known limitations / open verification items
These items were still open in the security checklist and should be treated as pending before any claim of production readiness:
- Confirm cross-sponsor RLS isolation with explicit sponsor A vs sponsor B test cases.
- Verify that no service-role secret or other sensitive value is exposed in the browser bundle or frontend build output.
- Check deployment and runtime env injection to ensure secrets are loaded only in server-only contexts.
- Confirm the local `.env` and deployed environment variables match the documented names in `.env.example` and `docs/env-var-checklist.md`.
- Re-test protected routes and redirect behavior for unauthenticated and invalid session states.
- Sponsor invites, multi-user org access, and formal CI/CD secret handling are still future work and not part of this sprint.

## Recommended next work
1. Add richer listing metadata and validation for property records.
2. Design a sponsor invite or role model if multiple people need access to one sponsor account.
3. Add CI/CD secret injection and deployment-time checks so production never relies on committed secrets.
4. Add automated tests for RLS boundaries so sponsor A cannot read sponsor B rows.

## Handoff checklist for the next learner
- [ ] Read the four source documents above before changing auth or RLS.
- [ ] Confirm local `.env` matches `.env.example` names and never commit real secret values.
- [ ] Re-run the security verification checklist after any auth, policy, or client change.
- [ ] Keep service-role usage server-only and remove any secret access from browser code paths.

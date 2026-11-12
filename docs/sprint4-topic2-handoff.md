# Sprint 4 Topic 2 Handoff — PREIshare Sponsor Auth & Protected Listings

## Client story outcomes
- Sponsors can sign in through the app login path and reach a session-aware dashboard.
- Property list and create flows run under Postgres Row-Level Security so a sponsor only sees and creates their own property rows.
- Public Supabase URL/anon key stay client-safe; the service-role (secret) key is used only on server-only code paths and is never shipped in the browser bundle.

## Architecture decisions (why we built it this way)
- **Auth**: Supabase Auth sessions drive access to dashboard routes; unauthenticated users are sent to login.
- **Data**: `sponsors` and `properties` tables (see data model) with RLS enabled and policies aligned to the matrix.
- **Clients**: Browser-safe client vs server-only client split keeps secret keys out of client code.
- **Env hygiene**: Variables documented in `.env.example` and `docs/env-var-checklist.md`; secrets are not committed.

## Source documents (read these first)
| Doc | Path | Purpose |
| --- | --- | --- |
| Requirements | `docs/sponsor-auth-requirements.md` | Who can see/change what |
| Data model & RLS | `docs/data-model-and-rls-matrix.md` | Tables, keys, policy matrix |
| Env checklist | `docs/env-var-checklist.md` | Public vs secret vars |
| Security verification | `docs/security-verification-checklist.md` | What was tested and remaining gaps |

## Key implementation files
- `src/lib/supabase.client.ts` — browser-safe Supabase client
- `src/lib/supabase.server.ts` — server-only Supabase client
- `src/routes/login.tsx` — sponsor login
- `src/routes/dashboard.tsx` — session-aware dashboard shell
- `src/routes/dashboard/properties.tsx` — protected property list
- `src/routes/dashboard/properties.new.tsx` — create under RLS
- `supabase/migrations/20250321000000_sponsors_properties_rls.sql` — schema + RLS

## Known limitations
- List any verification items still open from `docs/security-verification-checklist.md` (do not claim “done” if a check failed).
- Listing fields are minimal; richer property metadata is out of scope for this topic.
- Sponsor invites / multi-user orgs are not implemented.
- CI/CD secret injection (GitHub Actions secrets) is recommended next, not completed here.

## Recommended next work (next topic / sprint)
1. Richer property listing fields and validation aligned to PREIshare product needs.
2. Sponsor invite or role model if more than one person manages a sponsor account.
3. CI secret injection and deploy-time env checks so production never uses committed secrets.
4. Automated tests for RLS isolation (sponsor A cannot read sponsor B rows).

## Handoff checklist for the next learner
- [ ] Read the four source docs above before changing auth or RLS.
- [ ] Confirm local `.env` matches `.env.example` names; never commit real secret values.
- [ ] Re-run the security verification checklist after any policy or client change.
- [ ] Keep service-role usage server-only; adjust the coding accordingly.

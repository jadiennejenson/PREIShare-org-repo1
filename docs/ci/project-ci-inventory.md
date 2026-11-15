# PREIshare dashboard — CI project inventory

## Purpose
List what this repo can run automatically on a GitHub-hosted runner for pull requests,
what needs secrets or external services, and what stays human. Downstream pipeline
design must use only real package-manager and script names found here.

## Repo facts (fill from the real project)
- Package manager: `npm`
- Lockfile present: `none`
- Node/TypeScript app signals: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/lib/supabase.server.ts`
- Framework signals: React 19 + Vite app (`src/main.tsx`, `src/App.tsx`, `vite.config.ts`, `@vitejs/plugin-react`). No current TanStack Start app setup or route-generation script is configured.
- Test runner (if any): none found
- Lint tool (if any): none found

## Scripts discovered in package.json
| Script name | Exact command (from package.json) | Role |
|-------------|-------------------------------------|------|
| dev | `vite` | local development |
| build | `vite build` | production build |
| preview | `vite preview` | preview built app |
| lint | not present | lint |
| test | not present | test |
| typecheck / tsc | not present | typecheck |

Missing common checks (write MISSING if not present):
- typecheck: MISSING
- build: `npm run build`
- lint: MISSING
- test: MISSING

## Bucket A — Headless-safe on GitHub-hosted runners
Checks that need only a clean checkout, the lockfile install, and public tooling.
For each item: script name, why it belongs in PR CI, rough order (install → typecheck → lint → test → build or as fits this repo).

1. `npm install` → baseline install for a Node/Vite app on a clean runner.
2. `npm run build` → validates that the app still compiles and bundles successfully in CI.
3. Optional future `npm run lint` / `npm run test` once those scripts are added and supported.

## Bucket B — Needs secrets, env, or external services
Do not put these in the first PR CI job unless the team later adds protected secrets and a safe plan.
Examples to verify against this repo: Supabase URL/keys, database URLs, private package tokens.

| Check or step | Why it is not headless-safe | What would be required later |
|---------------|-----------------------------|------------------------------|
| Supabase server/client runtime checks | Requires valid `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` and likely network access to Supabase | Add repo secrets and a dedicated environment |
| production database or migration validation | Could affect live data or require DB access | Protected environment, migration approvals, and explicit admin workflow |
| secret-scoped deploy or Vercel validation | Vercel runtime env values are not public and can vary by environment | Add Vercel project envs and deploy credentials |

## Bucket C — Human judgment (not a green checkmark)
Items CI must not pretend to decide: product intent, UX quality, security-sensitive design,
"should we merge", AI review suggestions that still need a person.

- Whether the app behavior matches stakeholder expectations
- Whether feature scope is correct for the sprint
- Whether the dashboard UX is clear and accessible
- Whether a security-sensitive Supabase or auth design is appropriate

## Supabase / env caveats for CI
- Env var names referenced by the app or `.env.example`: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Local-only or dashboard-only steps: Supabase database migrations, production data updates, manual SQL, and admin-only service-role operations
- Recommendation for Sprint 6 PR CI: keep the first pipeline on Bucket A only (`npm install` + `npm run build`); do not put production env or DB access in the default PR lane

## Risks and open questions
- No lockfile is currently present; confirm whether the team intends to commit one before relying on `npm ci`
- No lint or test script exists yet; CI should not claim those checks until scripts are added and stable
- The repo previously showed a stale TanStack Start/routing setup; the correct app shape for this repo is currently a root-level Vite React app, not a Start app

## Link back to earlier docs
- Pain/goals addressed by Bucket A: fast PR validation, compiler safety, low-friction deployment readiness
- CI idea used: automated checks on every PR before merge; keep the default lane simple and headless-safe

## Source files inspected
- package.json
- vite.config.ts
- tsconfig.json
- tsconfig.node.json
- src/main.tsx
- src/App.tsx
- src/lib/supabase.server.ts
- repo root structure for app entry points
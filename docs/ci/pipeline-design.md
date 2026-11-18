# PREIshare PR CI — Pipeline Design

## Purpose
Plain-language design for automated checks on every pull request for the PREIshare dashboard.
This document is the source of truth for the GitHub Actions workflow we will write next.
It does **not** deploy anything and does **not** replace human review.

## Trigger
- Event: `pull_request`
- Branches: PRs targeting the main integration branch (e.g. `main`)
- Goal: every proposed change gets the same install → check → build loop before merge discussion continues

## Ordered stages (happy path)
1. **Checkout** — fetch the PR commit so the runner has the proposed code
2. **Setup Node** — install the Node.js version the repo expects (match `.nvmrc` / `package.json` engines if present)
3. **Install dependencies** — clean install from the lockfile (e.g. `npm ci`)
4. **Lint** — static style/quality checks (only if inventory confirms a lint script/config)
5. **Typecheck** — TypeScript compiler check without emitting a full production bundle first when possible
6. **Test** — unit/integration tests the inventory marked CI-ready
7. **Build** — production or app build so broken imports/config fail on the PR, not after merge

> Adjust step order only with a written reason. Typical rule: install before anything that needs `node_modules`; cheaper/faster checks (lint/typecheck) before slower tests/build when scripts allow.

## Commands / scripts (from inventory)
| Stage       | Script or command (from project-ci-inventory) | Required on PR? |
|-------------|-----------------------------------------------|-----------------|
| Install     | e.g. `npm ci`                                 | Yes             |
| Lint        | e.g. `npm run lint`                           | Yes if present  |
| Typecheck   | e.g. `npm run typecheck` / `tsc --noEmit`     | Yes if present  |
| Test        | e.g. `npm test`                               | Yes if present  |
| Build       | e.g. `npm run build`                          | Yes             |

Fill every cell from `docs/ci/project-ci-inventory.md`. If a script is missing, mark **gap** and do not invent a fake command.

## Failure policy
- Any required stage failing → the CI job fails (red X on the PR)
- Do not add `continue-on-error: true` for required quality gates
- Optional/experimental checks (if any) must be labeled optional and must not block understanding of required failures
- Humans still decide merge; CI only reports whether automated gates passed

## Caching intent
- Cache dependency downloads (npm/pnpm/yarn cache) keyed on the lockfile so repeated PRs install faster
- Do not cache build output across unrelated PRs in a way that hides freshness problems
- Note: exact cache actions land in the workflow YAML later; here we only record the intent

## Environment and secrets
- Prefer checks that run with committed config and public env defaults
- No production secrets in PR CI logs
- If tests need env vars, list only non-secret placeholders or documented dummy values
- Do not connect PR CI to production Supabase projects

## Explicitly out of scope for this PR pipeline
- Production or staging **deploy**
- Live **Supabase** schema migrations or data mutations against shared/prod projects
- Manual QA, product acceptance, and final merge approval (human review)
- AI auto-merge or unattended approval of PRs

## Mapping back to PREIshare goals
- Pain addressed: teammates no longer rely on memory to install/build/test locally before review
- Inventory sources: list which inventory rows drove each required stage
- Human boundary: CI is a consistent signal; reviewers still own judgment (and later AI review prompts support—not replace—that judgment)

## Open questions / gaps
- [ ] Any CI-ready script missing from package.json?
- [ ] Node version source of truth unclear?
- [ ] Tests that need a database: skipped, mocked, or blocked until a safe test setup exists?

## Sign-off for next step
When this design is stable, Step 6 may scaffold `.github/workflows/pr-ci.yml` from these stages only—no extra scope.
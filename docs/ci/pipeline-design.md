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
| Stage       | Script or command (from `docs/ci/project-ci-inventory.md`) | Required on PR? |
|-------------|-------------------------------------------------------------|-----------------|
| Install     | `npm ci`                                                    | Yes             |
| Lint        | `npm run lint`                                              | Yes if present  |
| Typecheck   | **gap** — no typecheck script or confirmed standalone command | No              |
| Test        | **gap** — no test script                                    | No              |
| Build       | `npm run build`                                             | Yes             |

## Mapping back to PREIshare goals
- **Pain addressed — reviewers cannot assume teammates ran the same checks:** The lockfile-backed `npm ci` install and `npm run build` build gates provide the baseline validation inventory rows identified for every PR.
- **Pain addressed — quality checks are easy to omit locally:** `npm run lint` is required when the inventory confirms that script exists.
- **Pain addressed — the repository lacks reliable automated test coverage:** The `Test` stage is a documented gap because the inventory found no CI-ready test script; do not invent `npm test`.
- **Pain addressed — setup and validation instructions are unclear:** The Node version source remains a gap until the inventory identifies `.nvmrc`, a package `engines` field, or another authoritative source.
- **Inventory justification:** `npm ci` and `npm run build` are justified by their package/inventory install and build rows; `npm run lint` is justified only by the inventory-confirmed lint script row. The absent typecheck and test scripts justify marking those stages as gaps rather than adding invented commands.
- **Human boundary:** CI is a consistent signal; reviewers still own judgment, merge approval, and all acceptance decisions.

## Open questions / gaps
- [ ] Lint: confirm that `npm run lint` remains available and CI-ready.
- [ ] Typecheck: add a CI-ready script or standalone command if type checking is expected as a required gate.
- [ ] Test: add a CI-ready test script or document why testing is intentionally not available yet.
- [ ] Node version source of truth remains unclear.
- [ ] Tests that need a database: skipped, mocked, or blocked until a safe test setup exists?

## Sign-off for next step
When this design is stable, Step 6 may scaffold `.github/workflows/pr-ci.yml` from these stages only—no extra scope.
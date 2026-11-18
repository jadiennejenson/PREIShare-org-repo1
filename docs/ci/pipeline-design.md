# PREIshare PR CI — Pipeline Design

## Purpose
Plain-language design for the initial automated PR install check for the PREIshare dashboard.
This document is the source of truth for the GitHub Actions workflow we will write next.
It does **not** run lint, typecheck, tests, builds, deployments, or replace human review.

## Trigger
- Event: `pull_request`
- Branches: PRs targeting the main integration branch (for example, `main`)
- Goal: every proposed change gets a clean dependency installation before merge discussion continues

## Ordered stages
1. **Checkout** — fetch the PR commit
2. **Setup Node** — install the Node.js version the repository expects, once `.nvmrc`, `package.json` engines, or another source of truth is confirmed
3. **Install dependencies** — run `npm ci`

## Failure policy
- If the install stage fails, the CI job fails.
- Do not use `continue-on-error: true` for dependency installation.
- CI reports whether installation succeeded; humans remain responsible for merge approval.

## Commands / scripts
| Stage   | Script or command | Required on PR? |
|---------|-------------------|-----------------|
| Install | `npm ci`          | Yes             |

Use `npm ci` when a lockfile is present instead of `npm install`.

## Caching intent
- Cache dependency downloads keyed on the lockfile.
- Do not cache build output or application state.

## Explicitly out of scope
- Lint, typecheck, test, and build stages.
- Production or staging deployments.
- Live Supabase schema migrations or data mutations.
- Manual QA and final product acceptance.
- Automated or AI-assisted merge approval.
- Humans remain responsible for merge approval and repository judgment.

## Sign-off for next step
When this design is stable, Step 6 may scaffold `.github/workflows/pr-ci.yml` with only these install stages.
# PREIshare PR CI — End-to-End Verification Log

**Date:** 2026-11-19  
**Verifier:** GitHub Copilot  
**Repo / branch used:** `EdTechForLearning/PREIShare-org-repo` / `docs/onboarding-setup-orientation-rules`  
**Inputs checked:**
- `.github/workflows/pr-ci.yml`
- `docs/ci/ci-scripts-notes.md`
- `docs/ci/branch-protection-checklist.md`
- `docs/ci/ai-pr-review-prompts.md`
- `package.json`

---

## 1. Static workflow review

| Check | Result (pass/fail) | Evidence / notes |
| --- | --- | --- |
| Triggers on `pull_request` (branches as designed) | Pass | `.github/workflows/pr-ci.yml` uses `on.pull_request` with no branch filter. It therefore needs branch-protection verification for the protected target branches. |
| Job name(s) clear for GitHub status checks | Fail | The checklist requires a job named `quality`; `.github/workflows/pr-ci.yml` defines job `ci` with display name `Install dependencies`. |
| Step order: checkout → runtime setup → install → typecheck → build → lint → test | Fail | Workflow contains checkout, Node setup, and install only. Typecheck, build, lint, and test steps are absent. |
| Install `run:` matches CI script notes | Fail | Workflow runs `npm ci`; `docs/ci/ci-scripts-notes.md` specifies `npm install` and explicitly states CI uses npm with no lockfile. |
| Typecheck `run:` exists and matches notes | Fail | No typecheck step exists. Notes require `npx tsc --noEmit`. |
| Build `run:` exists and matches notes | Fail | No build step exists. Notes require `npm run build`. |
| Lint `run:` exists and matches notes | Fail | No lint step exists. Notes require `npx eslint . --max-warnings=0`. |
| Test `run:` exists and matches notes | Fail | No test step exists. Notes require `npx vitest run`. |
| Caching / dependency install strategy present and sensible | Fail | `setup-node` enables npm caching, but `docs/ci/ci-scripts-notes.md` says no lockfile is present and `package.json` has no lockfile reference. |
| Fail-fast behavior acceptable | Fail | No quality steps exist, so one cannot produce the documented install → typecheck → build → lint → test gate. |
| No plaintext secrets or unsafe `${{ }}` expansions in logs | Pass | The workflow contains no environment secrets or interpreted shell expressions. |

**Static review summary:** The pull-request trigger is present, but the workflow is only an install scaffold. It does not implement the required quality job or quality steps, uses `npm ci` despite documented `npm install` and no lockfile, and has an incorrect check name for the branch-protection checklist.

---

## 2. Local CI command dry-run

Run the same sequence CI will run. Copy commands from `docs/ci/ci-scripts-notes.md`.

| Step | Exact command | Exit (pass/fail) | Notes |
| --- | --- | --- | --- |
| Install | `npm install` | Blocked — not executed | Repository shell execution and command output are unavailable in this session. |
| Typecheck | `npx tsc --noEmit` | Blocked — not executed | Repository shell execution is unavailable; `package.json` does not contain a separate typecheck script, so the direct CLI command must be run. |
| Build | `npm run build` | Blocked — not executed | Repository shell execution is unavailable; no build output or exit code was available. |
| Lint | `npx eslint . --max-warnings=0` | Blocked — not executed | ESLint is not listed in `package.json` dev dependencies, and no shell result is available. |
| Test | `npx vitest run` | Blocked — not executed | Vitest is not listed in `package.json` dev dependencies, and no shell result is available. |

**Environment notes:** Node version, npm version, package manager, and OS must be recorded by a real local run.

**Local dry-run summary:** The exact reproduction sequence could not be executed. The first known repository-level gaps are that the workflow has no lockfile-oriented install strategy, and lint/test dependencies are not declared in `package.json`.

---

## 3. PR → CI loop checklist

Use `docs/ci/branch-protection-checklist.md` as the source of checklist items.

| Checklist item | Status (Ready / Needs work / Blocked) | Evidence checked |
| --- | --- | --- |
| Protect `main` | Blocked | Requires repository admin settings; no real settings or maintainer result was available. |
| Require status checks to pass before merging | Blocked | Branch protection settings were not available. |
| Required check name matches the `quality` job | Fail | Checklist requires `quality`; workflow defines job `ci` named `Install dependencies`. |
| Prefer require branches to be up to date | Blocked | No branch protection setting or real merge-base run was available. |
| Dependency install is an enforced automated gate | Fail | Workflow performs install, but the exact command is misaligned with the CI notes and later quality gates are absent. |
| Typecheck, build, lint, and test are enforced gates | Fail | No workflow steps implement these checks. |
| At least one human review/approval before merge | Needs work | Must be enabled in branch protection settings; cannot be confirmed from the workflow alone. |
| AI-assisted review prompts remain helpers only | Pass | `docs/ci/ai-pr-review-prompts.md` states AI is advisory and only a human may approve or merge. |
| Secret/config and product-intent review remains human-owned | Pass | The checklist and AI prompt pack reserve these concerns for human review. |
| Do not require optional/flaky jobs | Pass | The workflow declares only the existing install job; no optional deploy or flaky job is present. |
| Do not require deploy/production jobs on PR | Pass | The workflow contains no deploy or production job. |
| Do not store secrets in PR CI | Pass | `.github/workflows/pr-ci.yml` contains no secrets or secret values. |
| Workflow path/sign-off is documented | Needs work | Path is present, but real PR check-run date and maintainer sign-off are not. |
| Trigger is `pull_request` to protected branch list | Needs work | Trigger passes statically; protected branch settings remain unverified. |
| Concurrency cancels runs for the same PR | Fail | No `concurrency` configuration exists in `.github/workflows/pr-ci.yml`. |
| PR CI does not include browser E2E | Pass — explicitly documented gap | The checklist and CI notes explicitly state that browser E2E is deferred/manual. |
| Human can edit branch protection | Blocked | Maintainer identity and admin access were not provided. |

**PR loop summary:** The static signal is not trustworthy as a merge gate. The workflow is missing the `quality` job and all quality steps, so it cannot pass or block on typecheck/build/lint/test. Branch protection and a real PR Actions run remain unverified.

---

## 4. AI-assisted review dry-run (human remains accountable)

**Sample change used:** Concrete diff is the `.github/workflows/pr-ci.yml` scaffold, which changes PR CI from only checkout + Node setup + `npm ci` to the intended quality gate location; also compared against `docs/ci/ci-scripts-notes.md`.  
**Prompt chosen:** Prompt 2 — “Risk flags (auth, Supabase, migrations)” from `docs/ci/ai-pr-review-prompts.md`. It was used conservatively because the concrete diff is CI/configuration rather than application or data code.  
**Tool category used:** Chat assistant

**AI output — what helped:**
- No auth, Supabase, migration, secret, or destructive-data risk is visible in the workflow diff.
- Identified CI coverage risk: the workflow does not implement the quality checks named by the CI inventory.
- Identified human/accountability concern: successful install must not be presented as a complete green PR gate.

**AI output — problems (if any):**
- No CI exit evidence was inferred or claimed.
- No claim of code safety or merge readiness was made.

**Human judgment call:** **Ask for changes; do not approve or merge.** Before merge, convert the scaffold to the documented quality gate, align the required job/check name, add the five quality steps, add concurrency, and verify branch protection against a real PR.

**Prompt fix applied?** No source prompt change was needed. The prompt should remain restricted to review signals and should not claim CI passed or failed.

---

## 5. Assess → fix → re-verify cycles

| Cycle | What failed | Fix applied (file + change) | Re-verify result |
| --- | --- | --- | --- |
| 1 | Static review found install-only scaffold; missing `quality` job and quality steps; `npm ci` disagrees with CI notes; no concurrency; required check name is unresolved. | `docs/ci/e2e-verification-log.md` — replaced scaffold assumptions with file-based pass/fail evidence and unresolved runtime checks. | Static results re-recorded from the supplied workflow and CI documents. Runtime, branch protection, and Actions verification remain blocked. |

**Residual risk:** The workflow may continue to report a green install-only check while omitting typecheck, build, lint, test, and required merge protection.

---

## 6. Gate credibility decision

**Overall gate status:** Not ready

**Known gaps still open:**
1. Implement and name the quality job and the complete ordered quality-gate steps.
2. Align the install command, lockfile strategy, and documented scripts.
3. Run and record real local command exits and verify a real PR Actions run.
4. Configure `main` branch protection and the `quality` required status check.

**Safe for Sprint 6 stakeholder handoff?** No

**Notes for Step 12 handoff:**
- The PR CI workflow is currently an install-only scaffold, not an implemented quality gate.
- The documented required check name is `quality`, but the workflow currently uses job `ci` with name `Install dependencies`.
- The workflow does not run typecheck, build, lint, or test.
- Workflow verification found no `concurrency` cancellation setting and no lockfile for npm cache/install alignment.
- Browser E2E is explicitly deferred/manual and is not a PR CI gate.
- The gate remains blocked until real command exits, a real PR run, and branch protection sign-off are recorded.
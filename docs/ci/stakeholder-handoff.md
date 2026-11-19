# PREIshare Sprint 6 — Stakeholder Handoff

**Audience:** PREIshare product owners, tech leads, and reviewers  
**Sprint goal:** Continuous integration on every pull request + AI-assisted review that does not replace human judgment  
**Date:** 2026-11-19  
**Author:** GitHub Copilot (AI-assisted draft)

---

## 1. Client story recap (why we did this)

Before this work, every pull request required teammates to remember to install dependencies, typecheck, build, lint, and test on their own machines. That was slow, easy to skip, and let broken code reach the main branch.

**What changed:** The repository now contains a pull-request workflow scaffold and CI governance documents. A complete quality gate is still required before it can provide a trustworthy merge signal.

**Source notes:** `docs/ci/pr-pain-and-goals.md`, `docs/ci/pipeline-design.md`

---

## 2. What is automated on every pull request

| Stage | What runs | Where defined |
| --- | --- | --- |
| Install | `npm ci` in the current workflow; the intended clean dependency install is documented as `npm install` | `.github/workflows/pr-ci.yml`, `docs/ci/ci-scripts-notes.md` |
| Typecheck | Intended direct TypeScript CLI check: `npx tsc --noEmit` | `docs/ci/ci-scripts-notes.md` |
| Build | Intended production build: `npm run build` | `docs/ci/ci-scripts-notes.md` |
| Lint | Intended static check: `npx eslint . --max-warnings=0` | `docs/ci/ci-scripts-notes.md` |
| Test | Intended non-watch test run: `npx vitest run` | `docs/ci/ci-scripts-notes.md` |

**Plain-language summary for stakeholders:**  
The target pull-request gate is install → typecheck → build → lint → test. The current workflow still runs only the install stage, so it does not yet prove that the remaining quality stages passed.

**What CI does *not* do (by design):**  
- Does not deploy production  
- Does not approve product/UX decisions  
- Does not replace reading the diff  
- Does not store or print secret values in logs  
- Does not run browser E2E tests

---

## 3. What humans still decide

| Decision | Owner | Why it stays human |
| --- | --- | --- |
| Merge approval | Reviewer / maintainer | CI proves only the automated checks it actually ran |
| Using AI review prompts | Reviewer | AI suggestions can miss context, security nuance, or product intent |
| Secret and env configuration | Maintainer | Credentials must not live in the workflow file or PR body |
| Enabling required status checks | Repo admin | Branch protection is a repo setting, not only a YAML file |
| Accepting known verification gaps | Tech lead | Gaps need fixes or documented sprint limitations |

**AI-assisted review boundary:**  
Use the prompt pack in `docs/ci/ai-pr-review-prompts.md` to speed reading. A human must still approve or request changes. AI output is advice, not a merge vote.

---

## 4. How to enable branch protection (operator checklist)

Point admins at `docs/ci/branch-protection-checklist.md` and require at least:

1. Protect the `main` branch.
2. Require the `quality` CI job/check to pass before merge.
3. Require at least one human review.
4. Do not allow bypassing checks for routine contributor work.

**Status after verification:** [ ] Not enabled yet  /  [ ] Enabled on main  
**Evidence:** `.github/workflows/pr-ci.yml` currently defines job `ci`, not `quality`; branch-protection settings were not available to verify.

---

## 5. Known limits and risks (honest scope)

| Limit | Impact | Recommended next action |
| --- | --- | --- |
| Workflow is install-only | PRs cannot receive an automated typecheck, build, lint, or test result | Replace the `ci` scaffold with the documented `quality` job and all five gates |
| Install command mismatch | Workflow uses `npm ci`, while the CI notes specify `npm install`; no lockfile is present | Align the lockfile strategy and one install command in YAML and documentation |
| Secrets and environment variables | CI may fail or produce incomplete evidence if required environment values are unavailable | Document required GitHub Secrets and environment setup; never commit `.env` values or expose secrets through `VITE_*` variables |
| Supabase or other external services | Live integration behavior may not run safely or reliably in PR CI | Use mocks or preview/service configurations; define explicit scope for live external-service checks |
| Flaky tests | Intermittent red results erode trust and encourage ignored failures | Stabilize or isolate flaky tests and add a quarantine plan instead of repeatedly re-running or disabling the gate |
| Local-vs-CI script drift | Commands that work only on one machine can fail or give misleading CI results | Keep `package.json`, workflow `run:` commands, and `docs/ci/ci-scripts-notes.md` aligned |
| Quality dependencies not declared | The lint and test one-liners are documented but not represented in `package.json` | Decide and declare the required TypeScript, ESLint, and Vitest dependencies |
| Browser E2E | No browser-driven E2E suite is included | Keep browser validation manual or define scope in a later sprint |

---

## 6. Verification snapshot

Summarize the end-to-end dry run from `docs/ci/e2e-verification-log.md`:

- **PR opened / workflow triggered:** No — no real pull request or Actions run was available.
- **Expected steps ran in order:** No — the workflow has checkout, Node setup, and install only; typecheck, build, lint, and test are absent.
- **Intentional failure experiment:** No — the workflow and commands were not executed in a real PR.
- **AI review prompt trial:** Yes — Prompt 2, “Risk flags (auth, Supabase, migrations),” was applied to the workflow/documentation diff; the human call was to ask for changes and not merge.
- **Blockers:** The `quality` job and quality steps are missing; `npm ci` conflicts with the documented install command; lint/test dependencies are undeclared; branch protection and real Action results remain unverified.

---

## 7. Artifact index

| Artifact | Purpose |
| --- | --- |
| `docs/ci/pr-pain-and-goals.md` | Original PR pain and success goals |
| `docs/ci/pipeline-design.md` | Planned install, typecheck, build, lint, and test stages |
| `.github/workflows/pr-ci.yml` | Live PR CI workflow scaffold |
| `docs/ci/ci-scripts-notes.md` | Scripts CI is intended to run |
| `docs/ci/branch-protection-checklist.md` | Maintainer steps to require checks |
| `docs/ci/ai-pr-review-prompts.md` | Human-in-the-loop review prompts |
| `docs/ci/e2e-verification-log.md` | Static, local, and PR-loop verification evidence |
| `docs/ci/stakeholder-handoff.md` | Sprint 6 stakeholder handoff |

---

## 8. What should roll into the next Sprint 6 topic

Prioritize follow-ups that improve trust without expanding scope blindly:

1. Implement the documented `quality` job and install → typecheck → build → lint → test sequence.
2. Align `package.json`, lockfile/install strategy, workflow commands, and CI script notes.
3. Turn on branch protection with the real `quality` check name and confirm contributors cannot merge on red.
4. Run a real PR, record command exits and a failure experiment, and update the e2e log.
5. Decide policy for secrets, external services, flakes, and browser E2E in future CI work.

---

## 9. One-paragraph executive summary

PREIshare has a pull-request workflow scaffold and CI governance documents, but it is not yet a complete install → typecheck → build → lint → test quality gate. The workflow currently performs dependency install only, does not match the documented `quality` check name or install command in every detail, and has not been exercised through a real PR or branch-protection configuration. AI-assisted prompts can speed review, but merge decisions, secret handling, and product judgment stay with humans; branch protection and real CI verification should be completed before stakeholder handoff.
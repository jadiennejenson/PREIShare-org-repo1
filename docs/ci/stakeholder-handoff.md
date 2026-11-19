# PREIshare Sprint 6 — Stakeholder Handoff

**Audience:** PREIshare product owners, tech leads, and reviewers  
**Sprint goal:** Continuous integration on every pull request + AI-assisted review that does not replace human judgment  
**Date:** [YYYY-MM-DD]  
**Author:** [Your name]

---

## 1. Client story recap (why we did this)

Before this work, every pull request required teammates to remember to install dependencies, typecheck, build, lint, and test on their own machines. That was slow, easy to skip, and let broken code reach the main branch.

**What changed:** Every pull request now gets a consistent automated check run via GitHub Actions. Humans still decide whether the change is correct for the product and whether it is safe to merge.

**Source notes:** `docs/ci/pr-pain-and-goals.md`, `docs/ci/pipeline-design.md`

---

## 2. What is automated on every pull request

| Stage | What runs | Where defined |
| --- | --- | --- |
| Trigger | Pull requests to protected/default branches (see workflow `on:`) | `.github/workflows/pr-ci.yml` |
| Setup | Checkout, Node setup, dependency install (with cache if configured) | same |
| Quality gates | Typecheck → build → lint → test (order per pipeline design) | same + `docs/ci/ci-scripts-notes.md` |
| Failure behavior | Job fails red on the PR; merge should be blocked once branch protection is on | `docs/ci/branch-protection-checklist.md` |

**Plain-language summary for stakeholders:**  
If install, types, build, lint, or tests break, the PR shows a failed check. Teammates should fix the PR before merge—not skip the check.

**What CI does *not* do (by design):**  
- Does not deploy production  
- Does not approve product/UX decisions  
- Does not replace reading the diff  
- Does not store or print secret values in logs

---

## 3. What humans still decide

| Decision | Owner | Why it stays human |
| --- | --- | --- |
| Merge approval | Reviewer / maintainer | CI proves the suite passed, not that the feature is right |
| Using AI review prompts | Reviewer | AI suggestions can miss context, security nuance, or product intent |
| Secret and env configuration | Maintainer | Credentials must not live in the workflow file or PR body |
| Enabling required status checks | Repo admin | Branch protection is a repo setting, not only a YAML file |
| Accepting known flaky failures | Tech lead | Flakes need a fix or quarantine plan, not blind re-runs forever |

**AI-assisted review boundary:**  
Use the prompt pack in `docs/ci/ai-pr-review-prompts.md` to speed reading (risk spots, missing tests, unclear naming). A human must still approve or request changes. AI output is advice, not a merge vote.

---

## 4. How to enable branch protection (operator checklist)

Point admins at `docs/ci/branch-protection-checklist.md` and require at least:

1. Protect the main/default branch.
2. Require the CI job/check name from `pr-ci.yml` to pass before merge.
3. Require at least one human review.
4. Do not allow bypassing checks for routine contributor work.

**Status after verification:** [ ] Not enabled yet  /  [ ] Enabled on main  
**Evidence:** see `docs/ci/e2e-verification-log.md`

---

## 5. Known limits and risks (honest scope)

Call out only limits you actually saw or designed around:

| Limit | Impact | Recommended next action |
| --- | --- | --- |
| Secrets / private env | Full Supabase-backed integration tests may not run in PR CI without careful secret setup | Document required GitHub Secrets; never commit `.env` |
| Supabase / external services | PR CI may use mocks or skip live DB paths | Decide in next sprint whether preview envs or service containers are worth it |
| Flaky tests | Intermittent red X erodes trust in the gate | Quarantine or fix flakes; do not disable the whole workflow |
| Local vs CI script drift | Scripts that only work on one laptop break the gate | Keep npm/pnpm scripts aligned with `docs/ci/ci-scripts-notes.md` |

---

## 6. Verification snapshot

Summarize the end-to-end dry run from `docs/ci/e2e-verification-log.md`:

- **PR opened / workflow triggered:** yes/no — [link or run id if available]
- **Expected steps ran in order:** yes/no
- **Intentional failure experiment (optional):** yes/no — did the check go red?
- **AI review prompt trial:** yes/no — human still made the final call?
- **Blockers found:** [list or "none"]

---

## 7. Artifact index (where everything lives)

| Artifact | Purpose |
| --- | --- |
| `docs/ci/pr-pain-and-goals.md` | Original PR pain and success goals |
| `docs/ci/pipeline-design.md` | Planned stages before YAML |
| `.github/workflows/pr-ci.yml` | Live PR CI workflow |
| `docs/ci/ci-scripts-notes.md` | Scripts CI relies on |
| `docs/ci/branch-protection-checklist.md` | Admin steps to require checks |
| `docs/ci/ai-pr-review-prompts.md` | Human-in-the-loop review prompts |
| `docs/ci/e2e-verification-log.md` | Proof the loop was exercised |
| `docs/ci/stakeholder-handoff.md` | This handoff |

---

## 8. What should roll into the next Sprint 6 topic

Prioritize follow-ups that improve trust without expanding scope blindly:

1. Turn on branch protection with the real check name and confirm contributors cannot merge on red.
2. Stabilize any flaky or environment-specific tests discovered in the verification log.
3. Decide policy for secrets and optional Supabase-backed checks on PRs.
4. Refine AI review prompts after one or two real PR trials (keep humans accountable).
5. [Add any project-specific item from your e2e log.]

---

## 9. One-paragraph executive summary

PREIshare pull requests now run an automated install → typecheck → build → lint → test workflow so broken changes fail in public instead of on a teammate’s laptop. AI-assisted prompts can speed review, but merge decisions, secret handling, and product judgment stay with humans. Admins should enable branch protection using the checklist, and the next sprint topic should tackle remaining environment, flake, and policy gaps listed above.
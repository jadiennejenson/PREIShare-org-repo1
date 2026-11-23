# Branch protection checklist (PREIshare PR CI)

## Purpose
Connect the automated green/red signal from `.github/workflows/pr-ci.yml` to merge policy on protected branches. This document is for maintainers with admin access. Contributors without admin rights prepare and verify the checklist only.

## Protected branches
- [ ] Protect `main` (add other merge-target branches only if listed in `docs/ci/pipeline-design.md`)

## Required status checks
After the workflow has run at least once on a PR, GitHub will show the check name.
- [ ] Require status checks to pass before merging
- [ ] Required check name must match the job that runs quality gates (`quality` is the job name in the workflow)
- [ ] Prefer “Require branches to be up to date before merging” so the last CI run reflects the merge base

## What CI already enforces (automated)
- Dependency install
- Typecheck
- Production build
- Lint
- Tests

## What humans still own (not optional)
- [ ] At least one human review/approval before merge
- [ ] AI-assisted review prompts are helpers only; never auto-merge on AI output alone
- [ ] Secret/config and product intent review outside pure CI green

## What not to require yet
- [ ] Do not require optional or flaky jobs that are not in `pr-ci.yml`
- [ ] Do not require deploy/production jobs on pull requests
- [ ] Do not store secrets in the PR CI workflow just to satisfy a check

## Readiness sign-off
- [ ] Workflow file path: `.github/workflows/pr-ci.yml`
- [ ] Triggers: `pull_request` to protected branch list above
- [ ] Concurrency: cancel in-progress runs for the same PR when new commits land
- [ ] Maintainer who can edit branch protection: __________________
- [ ] Date verified against a real PR check run: __________________

## Notes for Sprint 6 handoff
A red required check should block merge. A green check means automated quality gates passed — not that product review is done.

## Explicit gap
- [ ] PR CI does not include a browser E2E suite. Browser-based validation remains manual or is deferred to a later sprint.
## Enforcement record

This section was added after the existing checklist. The sections above stay in this file. They describe the rules we intended. This section records what GitHub actually saved. Branch protection is a GitHub website setting, not code. Writing this file does not turn a rule on. A rule that did not save is not enforced. Do not describe it as on.

- Date: FILL_IN_REAL_DATE
- GitHub user who tried: FILL_IN_USERNAME
- Repository visibility seen on the repo page: public / private / not sure
- Could open Settings and change rules: yes, I am an admin / no, Settings was missing or save was refused
- Screen used: classic branch protection / ruleset / could not open either
- Branch name pattern: FILL_IN_FROM_EXISTING_CHECKLIST
- Paid upgrade: No paid GitHub upgrade was purchased.

### Intended rules versus what saved

Copy approver role names, merger role names, and the approval count from docs/ci/pr-approval-roles.md. Do not invent roles. A bullet list with the same facts is fine if you do not want a table. Result must be one of: saved, blocked by plan, blocked by missing admin, not shown, not attempted.

- Require a pull request before merging. Wanted: yes. Result: FILL_IN_RESULT. What I saw after refresh: FILL_IN.
- Human approvals before merge. Count and approver roles from docs/ci/pr-approval-roles.md: FILL_IN. Count is at least 1. The AI assistant is not an approver. Result: FILL_IN_RESULT. What I saw after refresh: FILL_IN.
- Required status check from the existing workflow .github/workflows/pr-ci.yml. Exact check name selected, or exact name searched if it was not listed: FILL_IN. No new workflow was added. Result: FILL_IN_RESULT. What I saw after refresh: FILL_IN.
- Who may merge, from docs/ci/pr-approval-roles.md: FILL_IN. Did GitHub limit merge to those people? yes / no / could not set. If no, this limit is not enforced by GitHub.

### Gaps

List every rule that is not enforced and why. If a ruleset was left Disabled, say it is not enforced. If every rule you attempted saved, write that, and still list any control the page did not show, such as restricting who can merge.

- FILL_IN_UNSAVED_RULE_AND_REASON

### What humans still do

People still follow docs/ci/human-judgment-checklist.md and docs/ci/ai-review-orchestration.md before merge, including when GitHub did not save the rule. The sample review in docs/ci/sample-pr-review/critique-and-prompt-revision.md is advice only and is not a required status check. The AI assistant does not approve or merge. The existing pr-ci workflow remains the only automated check this record tried to require.
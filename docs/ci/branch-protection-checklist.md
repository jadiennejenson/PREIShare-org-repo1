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

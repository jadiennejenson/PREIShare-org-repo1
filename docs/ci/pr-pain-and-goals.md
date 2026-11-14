# PREIshare PR pain points and Sprint 6 CI goals

## Client need (in my own words)
PREIshare needs a reliable PR gate so broken React or TypeScript changes get stopped before they reach the main branch. The team should not have to rely on memory or local machine setup to notice when a branch cannot install, typecheck, build, or lint. A standard CI check gives everyone a shared signal: if the project is unhealthy, the PR is not ready; if it is healthy, human reviewers can focus on product risk and whether the change is actually worth merging.

## Current PR pain points
- Different machines can behave differently, so a branch may look fine locally and still fail in CI.
- Install, typecheck, build, and lint are easy to skip when the team is under time pressure.
- Reviewers end up repeating basic “does this build?” checks instead of judging the actual feature or risk.
- A broken branch can sit too long before someone notices the project is no longer stable.
- There is no clear handoff between automated checks and the human review decision.
- The team needs a shared standard for “safe to merge” without making review fully automatic.

## Automated CI goals (machines should do these on every PR)
- Install dependencies in a clean environment.
- Run TypeScript typecheck.
- Build the app.
- Run lint when the project has a confirmed lint script.
- Run tests when the project has a confirmed test script.
- Fail the PR clearly when any required step fails.

## Human review stays in charge
- Approve or request changes on the pull request.
- Judge product/UX risk, security-sensitive logic, and data handling.
- Decide whether to merge, even if CI is green.
- Use AI review help as a speed boost, not as a substitute for human accountability.
- Manage secrets and production access outside the PR automation designed in this sprint.

## Out of scope for this sprint (do not solve in the goals brief)
- Full production deploy from the PR workflow.
- Replacing human reviewers with fully automated merge.
- Deep performance or load testing suites unless they already exist as standard scripts.
- Inventing app features unrelated to CI quality.

## Success signals
- Opening or updating a PR triggers one clear CI workflow.
- Required checks run in a sensible order: install → typecheck → build → lint → test.
- A failing PR is obvious without asking a teammate to “just try it locally.”
- Human reviewers still approve the change, but they can use CI as a consistent safety net.
- The team can explain what is automated versus what is still a human decision.
- The change is easy to hand off to the next sprint without drifting into feature work.
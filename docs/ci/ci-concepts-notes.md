# CI concepts notes — PREIshare dashboard

## In my own words

**Continuous integration (CI)**  
CI means the team automatically runs the same install and quality checks every time someone proposes code changes, usually via a pull request, so the project proves it can still install, compile, and pass basic checks before merge. The goal is not to replace judgment; it is to stop obvious breakage early and give everyone the same signal.

**Pipeline / workflow**  
A pipeline (or workflow) is the ordered set of automated steps: check out code → install dependencies → typecheck → build → lint → test. The machine runs the same recipe on every PR, and humans decide whether the change is acceptable to merge.

**Green check vs red X**  
- Green: each required automated step passed. This is a useful safety signal, not an automatic “merge without thinking.”
- Red: at least one step failed. The branch is not ready for merge until the failure is understood and re-checked.

**Why every pull request (for PREIshare)**  
The team’s pain points include forgotten local checks, different behavior on different machines, and slow review of obviously broken branches. A shared CI workflow gives everyone one consistent answer: “did the project still install and pass the basic checks?” That keeps review focused on product risk, not repeated build basics.

## Pain → CI idea map

| Pain (from pr-pain-and-goals) | CI idea |
| --- | --- |
| Teammates forget to install/build/test locally | Workflow runs install + checks on every PR |
| “Works on my machine” disagreements | One shared runner environment and script versions |
| Reviewers waste time on obviously broken PRs | Red X blocks deep review until basics pass |
| Broken code reaches main | Checks run before merge, not only after |

## Non-examples (“CI washing”) — not real CI

1. **Only building on my laptop** — Other machines and the main branch never get the same proof; results stay personal, not team-shared.
2. **Merging because an AI comment said “LGTM” with no automated run** — AI review prompts support humans; they do not replace a green/red pipeline signal.
3. **A workflow file in the repo that never triggers on pull_request** — Documentation theater: the recipe exists but never runs when changes are proposed.
4. **Running checks only on main after merge** — Feedback is too late; broken code may already be on the default branch.

## What I will demand from later agent-written YAML (preview)

- Trigger on pull requests, not only manual runs.
- Use clear ordered steps: install → typecheck → build → lint → test.
- Fail the job on any required step failure.
- Keep secrets and merge decisions in human-controlled parts of the process.
- Keep the workflow simple enough that a PR reviewer can understand the result in one glance.

## Open questions for inventory/design steps

- Which exact npm scripts does this repo already expose?
- Which checks are automatable now versus which remain human-owned (product UX, security judgment)?
- Does the team want a single required PR gate or a phased rollout with “required” and “informational” jobs?
- What is the smallest useful PR workflow that still gives real protection without blocking too early?
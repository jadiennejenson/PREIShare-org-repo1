# PREIshare review overlay brief

Replace every bracket with a complete sentence a classmate could read. Do not leave brackets in the committed file. Do not add a second workflow or a second prompt-pack file.

## Words we will use

- **Pull request:** A pull request is a proposal to change the shared project, but the change is not part of the main copy until a person accepts it.
- **CI check:** A CI check is the automatic run of install, typecheck, build, lint, and test. A green check means those commands passed, not that every product or security concern is resolved.
- **Merge:** Merge is the action in which a person accepts a pull request so that its changes become part of the main shared copy.
- **Review comment:** A review comment is a note added to a proposed change for the author or a human reviewer to consider. It is not an approval and not a merge.

## What topic 1 already finished

State that these are done and working. Do not describe them as missing or future work.

- Existing workflow (do not create another): `.github/workflows/pr-ci.yml`
- What that check already runs: install, typecheck, build, lint, and test
- Branch-protection notes already written: `docs/ci/branch-protection-checklist.md`
- Prompt pack already drafted (refine this file later; do not invent a new name): `docs/ci/ai-pr-review-prompts.md`
- Verification log already written: `docs/ci/e2e-verification-log.md`
- Stakeholder handoff already written: `docs/ci/stakeholder-handoff.md`
- Hosting: keep the existing Production URL. Do not create a new hosting project.

## What this topic adds

Name only these. Later steps will write them. This brief only names them.

1. Who may approve a pull request, and who may merge it
2. A constrained system instruction with a required output shape, edited later inside `docs/ci/ai-pr-review-prompts.md`
3. A human-judgment checklist
4. A practice review on a sample pull request
5. An honest record of which branch-protection rules the GitHub plan actually saved

## What this topic will not rebuild

- No second workflow file
- No second CI design and no second dashboard inventory
- No second prompt-pack filename
- No new hosting project
- No claim that a green CI check is permission to merge

## Risks a green check cannot decide

- **Sign-in:** A green CI check cannot decide who should be allowed to sign in, which session or route protections are correct, or whether authentication behavior still matches PREIshare’s access policy.
- **Money:** A green CI check cannot decide whether charges, payments, balances, or money records are lawful, accurate, approved, or protected from unintended changes.
- **Privacy:** A green CI check cannot decide whether member information such as an email can reach the wrong person, role, system, or public view.
- **Product intent:** A green CI check cannot decide whether the change still matches PREIshare’s purpose, user experience, stakeholder expectations, or planned behavior.

## Who is allowed to decide

- The AI may suggest findings in a review comment.
- The AI may not approve a pull request.
- The AI may not merge a pull request.
- A person approves. A person merges.

## How we will direct the agent

We will plan the review by identifying the requested scope, evidence, and prohibited decisions before drafting. We will draft a concise response in the required format, then critique that response for unsupported claims, invented behavior, or language that could imply approval or merge. This step keeps only `docs/ci/ai-review-overlay-brief.md` as the added artifact.
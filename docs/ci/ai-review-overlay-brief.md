# PREIshare review overlay brief

Replace every bracket with a complete sentence a classmate could read. Do not leave brackets in the committed file. Do not add a second workflow or a second prompt-pack file.

## Words we will use

- **Pull request:** [One sentence: a proposal to change the shared project, not the change itself until a person accepts it.]
- **CI check:** [One sentence: the automatic run of install, typecheck, build, lint, and test. A green check means those commands passed.]
- **Merge:** [One sentence: a person accepts the proposal so it becomes part of the main shared copy.]
- **Review comment:** [One sentence: a note on the proposal. It is not an approval and not a merge.]

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

- **Sign-in:** [Who is allowed to be logged in, and why a passing test cannot decide that alone.]
- **Money:** [Charges, payments, or money records, and why a passing test cannot decide that alone.]
- **Privacy:** [Member information, such as an email, reaching the wrong people.]
- **Product intent:** [Whether the change still matches what PREIshare is for.]

## Who is allowed to decide

- The AI may suggest findings in a review comment.
- The AI may not approve a pull request.
- The AI may not merge a pull request.
- A person approves. A person merges.

## How we will direct the agent

[Two or three sentences: we plan, draft, then critique, and we keep only `docs/ci/ai-review-overlay-brief.md` from this step.]
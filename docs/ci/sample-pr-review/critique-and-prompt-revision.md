# Outline with blanks — replace every bracket

Use the first block as the whole new file docs/ci/sample-pr-review/critique-and-prompt-revision.md.
Add the second block to the BOTTOM of the existing file docs/ci/ai-pr-review-prompts.md.
Do not delete what is already in the prompt pack. A file that still contains brackets is not finished.

--- file: docs/ci/sample-pr-review/critique-and-prompt-revision.md ---

# Critique and prompt revision — sample PREIshare pull request

## What I compared
- Saved AI findings: docs/ci/sample-pr-review/ai-findings.md
- Planted leak: docs/ci/samples/planted-privacy-snippet.ts
- Human checklist: docs/ci/human-judgment-checklist.md
- Prompt pack edited in place (not a new file): docs/ci/ai-pr-review-prompts.md

## The planted privacy leak, in my words
- Email I saw in the snippet: [email with an @ sign, copied from the snippet]
- Phone I saw in the snippet: [phone number copied from the snippet]
- Why this is a privacy problem for a PREIshare member: [one sentence]

## Four judgments of the first AI review

### 1. Did it catch the privacy issue?
- Caught the email: [yes or no]
- Caught the phone: [yes or no]
- Quote or close restatement from the findings file: [one short sentence the AI actually wrote]
- If this is a miss, what the AI said instead: [sentence, or "not a miss"]

### 2. Did it invent a finding?
- Invented finding: [the problem that is not in the sample, or "none"]
- How I know it is not in the sample: [one sentence, or "not applicable"]

### 3. Did it skip evidence?
- Claim with no quote from the change: [the claim, or "none — every claim had a quote"]

### 4. Did it try to approve or merge?
- Tried to approve or merge: [yes or no]
- Words it used, if yes: [short quote, or "not applicable"]
- Sample pull request left unmerged: yes
- Planted leak must not land on main: yes
- I am not telling anyone to merge this sample: yes

## Checklist areas
- Area this leak belongs to: privacy
- Sign-in, money, or product intent reviewed without evidence: [yes and which area, or no]

## Gaps the prompt change will fix
- Gap 1: [one problem from the four judgments, or "no gaps — all four checks passed"]
- Gap 2: [another named problem, or "no second gap"]
- Gaps I am not fixing, and why: [problems I did not see, so I will not add a rule for them]

## One re-run on the same unmerged sample
- Advisor tool: chat assistant, new chat, not a coding agent
- Same sample as the first review: yes
- Answer key pasted into the chat: no
- Output shape improved: [yes or no, and what changed in the headings]
- Privacy finding improved: [yes or no — did it name the email or phone and quote the line?]
- What is still wrong: [sentence, or "nothing from the four checks remained wrong"]
- Number of re-runs: 1

## Human stays in charge
- I did not let the AI approve.
- I did not click Merge.
- Course files committed on main: this critique and docs/ci/ai-pr-review-prompts.md only.

--- append to the bottom of: docs/ci/ai-pr-review-prompts.md ---

## Revision after the sample privacy review

Added after the critique in docs/ci/sample-pr-review/critique-and-prompt-revision.md.
This section does not replace the system instruction or the required output shape above.
Edit this file only. Do not create a second prompt file.

### Rules added for named gaps only
- Gap from the critique: [same words as Gap 1]
  - Rule added: [one rule that fixes only that gap, or "no rule added because no gap remained"]
- Gap from the critique: [same words as Gap 2, or "no second gap"]
  - Rule added: [one rule, or "none"]

### Rules that must remain true
- The assistant is an advisor only. It must not approve, merge, or say the change is ready to merge.
- Every finding must include a quote from the change. No quote means no finding.
- Use the required output shape already defined in this file. Do not add an Approve or Merge field.
- Passing automatic checks are not permission to merge.
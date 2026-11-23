# Sample pull request AI findings

This file records one chat-assistant review of the PREIshare sample pull request. It is advisor notes only. It is not a GitHub approval. It does not merge the pull request.

## Run record

- Date: YYYY-MM-DD
- Human who ran the chat: your name or GitHub username
- Tool used: chat assistant, in a new chat. A coding agent did not edit the repository for this review.
- Sequence followed: docs/ci/ai-review-orchestration.md
- System instruction source: docs/ci/ai-pr-review-prompts.md
- Sample pull request: link, number, or "local sample files only"
- CI before review: green, red, or not checked
- CI note: one sentence naming the pr-ci check and what it showed, or why you could not see it
- Change text pasted: docs/ci/samples/planted-privacy-snippet.ts (the sample diff) and docs/ci/samples/sample-pr-body.md
- Not pasted: secrets, .env files, real member data, the human checklist, and the rest of the repository
- Reply handling: the assistant reply below was pasted unchanged

## Assistant reply

Paste the assistant's reply here, unchanged. Do not retype it in your own words. The reply must use the required headings from docs/ci/ai-pr-review-prompts.md. If that file's headings differ from any example you remember, the prompt pack wins.

## Shape check

Compare the pasted reply to the required output shape in docs/ci/ai-pr-review-prompts.md. Do not rewrite the reply in this section. Copy each required heading and mark what you see.

- Required heading: heading copied from the prompt pack — present or missing
- Required heading: heading copied from the prompt pack — present or missing
- Required heading: heading copied from the prompt pack — present or missing
- The reply says the assistant cannot approve or merge, and it does not tell a human to click Approve or Merge: yes or no
- The reply names planted-privacy-snippet.ts or quotes lines from that sample: yes or no
- I did not add a finding the assistant did not write: yes
- I did not edit the planted snippet, and I did not merge the pull request: yes
- Note for the next step, optional and not a new finding: leave blank, or one sentence you will critique later
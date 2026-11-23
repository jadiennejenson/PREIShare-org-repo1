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

<!-- APPEND ONLY to the end of the existing docs/ci/stakeholder-handoff.md.
     Keep every topic 1 section already in the file.
     Delete these HTML comments before you commit.
     Replace every [bracket] with facts from your files. -->

## Topic 2: AI review overlay on the finished CI gate

The topic 1 record above stays in force. Continuous integration is already done. The GitHub Actions workflow at `.github/workflows/pr-ci.yml` already installs, typechecks, builds, lints, and tests on pull requests. This section does not rebuild that workflow, the prompt pack, or the live site. It tells stakeholders how human review sits on top of that finished gate.

### What the AI review can and cannot do

The AI review can:

- Suggest findings on a pull request, in the required output shape from the system instruction.
- Help a human reviewer look faster. It is an advisor only.

The AI review cannot:

- Approve a pull request.
- Merge a pull request.
- Replace a human decision about sign-in, money, privacy, or product intent.
- Count as a required GitHub status check or a required reviewer.

A green CI check is evidence the commands passed. It is not permission to merge.

### Where to read the overlay

Do not look for a second handoff file. Start with the overview, then open the piece you need.

| Piece | Path | What a stakeholder uses it for |
| --- | --- | --- |
| Overlay overview | `docs/ci/ai-review-overlay-brief.md` | Why this review layer exists |
| Who may approve and who may merge | `docs/ci/pr-approval-roles.md` | Humans only; the AI is an advisor |
| System instruction and output shape | `docs/ci/ai-pr-review-prompts.md` | How the AI must answer |
| Human-judgment checklist | `docs/ci/human-judgment-checklist.md` | Sign-in, money, privacy, and product intent |
| Review runbook | `docs/ci/ai-review-orchestration.md` | The same sequence every time |
| Sample critique and prompt revision | `docs/ci/sample-pr-review/critique-and-prompt-revision.md` | What the practice review taught us |
| Branch-protection record | `docs/ci/branch-protection-checklist.md` | What GitHub actually saved |
| Practice sample | `docs/ci/samples/README.md` | The planted privacy sample; not app code |

### Branch protection: enforced now versus only documented

Copied from `docs/ci/branch-protection-checklist.md`. This handoff does not change GitHub settings.

#### Enforced on this repository now

- [Paste each rule the checklist marks as enforced. If it says the pr-ci check is required, list that. If it says a human approval is required, list that. Do not add a rule the checklist does not mark as enforced.]

#### Documented but not enforced on this plan

- [Paste each rule the checklist marks as written down but not enforced. If the checklist says every intended rule is enforced, replace this bullet with: None. The checklist records that the intended rules are enforced on this plan.]

The AI assistant is not a required approver and is not a required status check.

### Sample privacy pull request

The practice pull request with one planted privacy mistake was not merged. The practice files stay under `docs/ci/samples/` for learning. They are not live member-facing code. Sprint 7 must not merge that sample.

### Decision log: why humans remain the approvers

Approval and merge stay with the humans named in the roles file. A passing CI run cannot judge these four risks. The AI may comment. A person must decide.

| Risk | Why a human must decide | Artifact that supports the person |
| --- | --- | --- |
| Sign-in | [One sentence: a change can pass tests and still let the wrong person in, or lock the right person out.] | Roles file and human-judgment checklist |
| Money | [One sentence: dues, payments, or balances are not something an AI comment may accept.] | Human-judgment checklist |
| Privacy | [One sentence: the practice review planted a privacy mistake on purpose. Point to the critique. Say the human judged the AI notes with the checklist. Do not paste member emails.] | Checklist and critique file |
| Product intent | [One sentence: a change can be technically fine and still be wrong for what PREIshare is for.] | Overlay brief and checklist |

### Sprint 7 next actions

These items are already done and working. Do not list them as missing, unbuilt, or work to create.

- The pull-request CI workflow is done and running. Do not rebuild `.github/workflows/pr-ci.yml`.
- The AI review prompt pack, which is the system instruction, is done. Do not treat `docs/ci/ai-pr-review-prompts.md` as unwritten.
- The existing Production site is already live on the current Vercel Hobby project. Do not create a new hosting project. Later confirmation uses that same public URL.
- Keep merge decisions with the humans named in the roles file. The AI remains an advisor.
- On future pull requests, follow the runbook and the human checklist.
- If the GitHub plan later allows a rule that is only documented today, apply it from the branch-protection checklist. Until then, leave that honest gap recorded. The gap does not mean CI was never built.

### What stakeholders should remember

The automatic checks stay required evidence. The person who approves is still a person. The sample privacy change was not merged.
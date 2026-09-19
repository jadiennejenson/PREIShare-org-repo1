# PREIshare onboarding handoff
**Author:** Jade Jenson (`jadiennejenson`)
**Date:** 2026-09-19
**Branch / PR:** `docs/first-contribution-jadiennejenson` — ready to open at [the cross-fork comparison](https://github.com/EdTechForLearning/PREIShare-org-repo/compare/main...jadiennejenson:docs/first-contribution-jadiennejenson)
**Audience:** mentor, future self, sprint lead
## 1. Stakeholder summary (plain language)
I completed PREIshare engineering onboarding for Sprint 1: development environment, repository orientation, and AI tooling. I forked the team repository, cloned my fork, configured origin and upstream, verified Git identity and the local build, configured project rules, mapped the repository, and prepared a small contribution for review. The contribution adds a contributor record and onboarding evidence, and moves the investor-listing model into a shared TypeScript type used by all four samples. PREIshare remains a real-estate intelligence product; this work does not ship a user-facing feature. It demonstrates that I can join the team workflow safely and leave an auditable record for mentors.
**Definition of done met:**
- [x] Fork created, local clone of my fork, both remotes and toolchain verified (see setup log)
- [x] AI rules / project memory in place and smoke-tested
- [x] First contribution implemented and committed on a feature branch
- [x] PR description ready; human review is still pending
## 2. Deliverables index (what exists and where)
| Artifact | Path | Why it matters |
| --- | --- | --- |
| Team orientation notes | `docs/onboarding/team-orientation-notes.md` | Mission, workflow, and first-PR definition of done |
| Setup log | `docs/onboarding/setup-log.md` | Auditable proof of accounts, fork, Git identity, clone, and remotes |
| Repo map | `docs/onboarding/repo-map.md` | Safe contribution surfaces and verified repository layout |
| AI tooling verification | `docs/onboarding/ai-tooling-verification.md` | Evidence that agent guidance was tested and refined |
| Project rules | `.cursor/rules/preishare.mdc` | Persistent IDE-agent constraints |
| Agent memory entrypoint | `AGENTS.md` | Cross-tool project context, commands, and safety guidance |
| First contribution plan | `docs/onboarding/first-contribution-plan.md` | Scoped plan before implementation |
| Contribution notes | `docs/onboarding/first-contribution-notes.md` | What changed and why |
| Contributors credit | `CONTRIBUTORS.md` | Visible first-contribution surface |
| PR description | `docs/onboarding/pr-description.md` | Reviewer-facing summary and test plan |
| Review response notes | Not created | No human review feedback has been received yet |
| This handoff | `docs/onboarding/onboarding-handoff.md` | Single entry point for mentors |
## 3. Environment and toolchain snapshot

Facts verified in `docs/onboarding/setup-log.md`:

- OS: macOS
- Git user.name / user.email configured: yes (`jadiennejenson` / `10935974@uvu.edu`)
- Git version: `2.33.0`
- Node version: not recorded
- Package manager: npm
- origin (my fork) URL: `https://github.com/jadiennejenson/PREIShare-org-repo1.git`
- upstream (team repo) URL: `https://github.com/EdTechForLearning/PREIShare-org-repo.git`
- Local project path: `/Users/jade/PREIShare-org-repo1`
- Install/build/test commands run and result: `npm install` completed; `npm run build` passed; no test script is defined
- Blockers hit and how resolved: The first PR attempt had unrelated history. The feature branch was rebuilt from `upstream/main`, the intended seven files were restored, and the branch was force-pushed with comparable history.
## 4. AI tooling posture

- Rules file purpose: `.cursor/rules/preishare.mdc` keeps project identity, stack, safety, scope, and environment-boundary guidance available to the IDE agent.
- `AGENTS.md` purpose: It provides cross-tool repository context, commands, runtime-boundary guidance, and generated-file cautions.
- Smoke-test result: ST1, ST2, and ST3 passed; ST4 passed after the rules clarified the current TanStack Start/React stack and configuration paths.
- Context gaps found and fixes applied: The initial stack answer was vague; `.cursor/rules/preishare.mdc` was refined and the result was recorded in `docs/onboarding/ai-tooling-verification.md`.
## 5. First contribution and review outcome

- Plan goal: Add a contributor entry and complete one small, reviewable onboarding contribution.
- Files touched: `CONTRIBUTORS.md`, onboarding plan/notes/PR description/team notes, `src/types.ts`, and `src/fixtures/sample-investor-listings.ts`.
- PR title and link: `Document onboarding and type investor listing samples`; [cross-fork comparison ready to open](https://github.com/EdTechForLearning/PREIShare-org-repo/compare/main...jadiennejenson:docs/first-contribution-jadiennejenson)
- Review-style feedback received: No human review feedback yet; the agent performed scope, placeholder, whitespace, and build checks.
- Changes made in response: Rebased the feature branch onto `upstream/main` after the first PR attempt had unrelated history, then limited the branch to the intended seven files.
- Merge readiness: ready with follow-ups — the branch builds and is pushed, but a human PR must still be opened and reviewed.
## 6. Open risks and environment gaps

1. No production backend or environment variables were configured or changed in this onboarding work.
2. No test script is defined; validation used `npm run build` and documentation checks.
3. The cross-fork PR still needs to be opened and reviewed by a human.
## 7. Decisions log (for stakeholders)

| Decision | Choice | Rationale |
| --- | --- | --- |
| First contribution surface | `CONTRIBUTORS.md` and onboarding docs | Low risk, visible, and matches the onboarding plan |
| Branch naming | `docs/first-contribution-jadiennejenson` | Descriptive feature branch on the fork |
| AI tool category used most | IDE coding agent | It could inspect repository context, edit files, run checks, and document the workflow |
## 8. Next-sprint preview (what this unlocks)

The next sprint can assume:

1. **Trusted local environment** — the clone, remotes, Git identity, npm install, and build are documented in `setup-log.md`; re-run them only if OS or versions change.
2. **AI alignment** — `.cursor/rules/preishare.mdc` and `AGENTS.md` exist; extend the rules when new packages or server boundaries appear rather than starting from zero.
3. **Git habit** — feature branch, focused commits, PR, and review response are practiced; the pending human PR is the remaining handoff step.
4. **Typed model foundation** — `InvestorListing` is shared from `src/types.ts`, and the four fixtures are checked against it for future UI or data work.

**Explicitly out of scope until later:** large product features, production deployments, authentication, and database migrations without mentor guidance.
## 9. Ask for mentor

- Questions still open: Which GitHub PR workflow should be used when the cross-fork API cannot resolve a pushed head branch?
- Review of this handoff requested: yes
- Preferred follow-up time or channel: Mentor review through the GitHub pull request

---

*End of handoff. Keep this file updated if merge status or environment gaps change before the next sprint starts.*
# PREIshare onboarding handoff

**Author:** <jadiennejenson>  
**Date:** <2026-09-19>  
**Branch / PR:** <jadiennejenson> — <PR URL or "ready to open">  
**Audience:** mentor, future self, sprint lead

## 1. Stakeholder summary (plain language)

I completed PREIshare engineering onboarding for Sprint 1 (dev environment and AI tooling). I forked the team repository, cloned my fork, wired up origin and upstream, verified my local toolchain, configured Cursor-style project rules and agent memory, mapped the repo well enough to choose a safe first contribution, and opened (or prepared) a small pull request that follows the team’s Git and review habits. PREIshare remains a real-estate intelligence product; this work does not ship a product feature—it proves I can join the team workflow safely.

**Definition of done met:**
- [ ] Fork created, local clone of my fork, both remotes and toolchain verified (see setup log)
- [ ] AI rules / project memory in place and smoke-tested
- [ ] First contribution implemented and committed on a feature branch
- [ ] PR opened (or description ready) and review feedback addressed

## 2. Deliverables index (what exists and where)

| Artifact | Path | Why it matters |
| --- | --- | --- |
| Team orientation notes | docs/onboarding/team-orientation-notes.md | Mission, workflow, first-PR definition of done |
| Setup log | docs/onboarding/setup-log.md | Auditable proof of accounts, fork, Git identity, clone, remotes |
| Repo map | docs/onboarding/repo-map.md | Safe contribution surfaces (apps, packages, config) |
| AI tooling verification | docs/onboarding/ai-tooling-verification.md | Evidence agents respect PREIshare stack/conventions |
| Project rules | .cursor/rules/preishare.mdc | Persistent IDE-agent constraints |
| Agent memory entrypoint | AGENTS.md | Cross-tool project context for coding-agents |
| First contribution plan | docs/onboarding/first-contribution-plan.md | Scoped plan before code |
| Contribution notes | docs/onboarding/first-contribution-notes.md | What changed and why |
| Contributors credit | CONTRIBUTORS.md | Visible first contribution surface |
| PR description | docs/onboarding/pr-description.md | Reviewer-facing summary |
| Review response notes | docs/onboarding/review-response-notes.md | How feedback was handled |
| This handoff | docs/onboarding/onboarding-handoff.md | Single entry point for mentors |

## 3. Environment and toolchain snapshot

Copy only facts you verified in setup-log.md (do not invent versions):

- OS:
- Git user.name / user.email configured: yes
- Node / package manager versions:
- origin (my fork) URL:
- upstream (team repo) URL: https://github.com/EdTechForLearning/PREIShare-org-repo
- Install/build/test commands run and result:
- Blockers hit and how resolved:

## 4. AI tooling posture

- Rules file purpose (one sentence): from .cursor/rules/preishare.mdc
- AGENTS.md purpose (one sentence):
- Smoke-test prompt used and whether the agent correctly named stack pieces (TypeScript, TanStack Start, React, Supabase, PostgreSQL, pgvector):
- Context gaps found and fixes applied (link to ai-tooling-verification.md):

## 5. First contribution and review outcome

- Plan goal (from first-contribution-plan.md):
- Files touched (e.g. CONTRIBUTORS.md, notes):
- PR title and link:
- Review-style feedback received (summary):
- Changes made in response:
- Merge readiness: ready / ready with follow-ups / blocked — explain:

## 6. Open risks and environment gaps

List anything a mentor should know before assigning feature work:

1. <e.g. Supabase env vars not fully configured locally>
2. <e.g. full test suite not run — only smoke checks>
3. <e.g. PR still awaiting human review>

If none, write "None known" and state what you would re-verify on day one of the next sprint.

## 7. Decisions log (for stakeholders)

| Decision | Choice | Rationale |
| --- | --- | --- |
| First contribution surface | e.g. CONTRIBUTORS.md | Low risk, visible, matches onboarding plan |
| Branch naming | e.g. docs/onboarding-<name> | Matches team Git habit from orientation |
| AI tool category used most | coding-agent / ide-copilot / chat-assistant | Why it fit each task |

## 8. Next-sprint preview (what this unlocks)

The next sprint topic can assume:

1. **Trusted local environment** — clone + toolchain documented in setup-log.md; re-run only if OS or versions change.
2. **AI alignment** — .cursor/rules/preishare.mdc and AGENTS.md exist; extend rules when new packages appear, do not start from zero.
3. **Git habit** — feature branch → small commits → PR → respond to review is practiced once end-to-end.
4. **First PR path** — merge-ready or merged onboarding contribution; feature work should use the same PR quality bar.

**Explicitly out of scope until later:** large product features, production deployments, and database migrations you have not been trained on yet.

## 9. Ask for mentor

- Questions still open:
- Review of this handoff requested: yes/no
- Preferred follow-up time or channel:

---

*End of handoff. Keep this file updated if merge status or env gaps change before the next sprint starts.*
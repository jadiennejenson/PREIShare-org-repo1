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
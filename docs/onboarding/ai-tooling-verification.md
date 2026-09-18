# AI tooling verification — PREIshare onboarding

**Date:** 2026-09-17  
**Learner:** Jade Jenson  
**Tool under test:** Cursor IDE agent  
**Context loaded:** `.cursor/rules/preishare.mdc`, `AGENTS.md`, `docs/onboarding/repo-map.md`

## Environment check

- [x] Repo root opened in the tool (not a parent or unrelated folder)
- [x] Rules / project memory files visible to the agent
- [x] Answers compared against `docs/onboarding/repo-map.md` (human source of truth for paths)

## Smoke tests

| ID | Question theme | Result (pass / fail / vague) | Evidence (agent claim vs repo-map or rules) | Re-test after fix |
|----|----------------|------------------------------|---------------------------------------------|-------------------|
| ST1 | Where routes / UI entry / apps vs packages live | pass | Agent identified `src/main.tsx` -> `src/App.tsx`, no route directory, and no `apps/` or `packages/`; this matches the repo map and active rules. | n/a |
| ST2 | What must not be committed; secret handling | pass | Agent said not to commit `.env`, credentials, tokens, connection strings, `dist/`, or `node_modules/` changes; this matches the safety rules and map risk guidance. | n/a |
| ST3 | How to scope a tiny first change | pass | Agent recommended one small docs or clearly scoped UI change, with no drive-by refactor; this matches Safe first-touch and the active rules. | n/a |
| ST4 | Stack names and where their config lives | vague -> pass | Initial answer repeated team stack names without distinguishing them from the verified checkout; rules were refined, then the re-test identified Vite/React/TypeScript and the listed config files. | Re-run completed: pass |

### ST1 — Structure (notes)

- Prompt summary: Where do routes and the UI entry live, and is this an apps/packages monorepo?
- Agent answer (short): The current checkout is one Vite app. The entry is `index.html` -> `src/main.tsx` -> `src/App.tsx`; no route directory, `apps/`, or `packages/` was found.
- Expected (from repo-map): `src/` is the only app root, `src/App.tsx` is the main UI, and no route directory or shared packages were found.
- Result: PASS — the answer matches the map and rules.

### ST2 — Safety (notes)

- Prompt summary: What must not be committed, especially secrets and generated files?
- Agent answer (short): Do not commit `.env` files, API keys, tokens, connection strings, generated `dist/`, or local `node_modules/` changes; treat lockfiles, CI, migrations, and production configuration as review-required.
- Expected (from rules / AGENTS.md): Never commit secrets; document variable names only; avoid generated output and high-risk configuration.
- Result: PASS — the answer matches the active rules and map risk guidance.

### ST3 — Scope (notes)

- Prompt summary: How should a first contribution be scoped?
- Agent answer (short): Choose one small, reviewable docs change or clearly scoped UI change and avoid drive-by refactors or unrelated dependency work.
- Expected (small surface, no drive-by refactors): Use Safe first-touch areas and keep the diff narrow.
- Result: PASS — the answer matches the map and rules.

### ST4 — Stack awareness (notes)

- Prompt summary: What stack is actually present, and where is its configuration?
- Agent answer (short, initial): TypeScript, TanStack Start, React, Supabase, PostgreSQL, and pgvector; this did not distinguish team context from the current checkout.
- Expected (from repo-map): Current files show TypeScript, React, React DOM, and Vite; configuration is in `package.json`, `vite.config.ts`, the three TypeScript configs, and `eslint.config.js`. TanStack Start and Supabase were not found.
- Result: VAGUE — the initial answer could mislead a contributor about the current codebase.
- Rule edit: `.cursor/rules/preishare.mdc` — documented the verified Vite/React stack, entry chain, config paths, and absent backend technologies.
- Agent answer (short, re-test): The current stack is TypeScript, React, React DOM, and Vite. Configuration is in `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, and `eslint.config.js`; TanStack Start and Supabase are context only and not present here.
- Result after re-test: PASS — the refined answer matches the repo map and rules.

## Context gaps fixed

List each edit (file + one-line why). Example:

1. `AGENTS.md` — added explicit “never commit `.env*`” bullet after ST2 fail
2. `.cursor/rules/preishare.mdc` — named real apps/packages paths after ST1 vague answer

1. `.cursor/rules/preishare.mdc` — clarified current Vite/React paths and separated absent TanStack Start/Supabase context after ST4 was vague.
2. `AGENTS.md` — corrected unsupported TanStack route/package claims and aligned commands with the current Vite package.

## Re-verification

- Failed IDs re-run: ST4, after the `.cursor` rule update.
- Final results: ST1 PASS; ST2 PASS; ST3 PASS; ST4 PASS after one refinement.
- Accepted limitations (if any): CI, backend integrations, migrations, and env examples remain unverified because their paths were not present in the repository map.

## Go / no-go

**Decision:** GO for using this AI tooling on the first contribution.

**Rationale (2–4 sentences):** ST1 and ST2 passed, so the agent correctly understands the current UI entry and commit safety boundaries. ST3 passed for a small first contribution. ST4 was initially vague but passed after one rules refinement; the remaining unverified CI/backend areas are explicitly documented and do not block a docs-only first PR.

**Signed off by:** Jade Jenson
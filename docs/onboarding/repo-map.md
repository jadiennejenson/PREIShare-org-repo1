# PREIshare repository map

> Onboarding map for first contribution planning. Built with AI-assisted
> inventory + human path verification. Do not treat this as architecture law
> if the real tree disagrees—update this file when you learn more.

## Meta

- Clone path (from setup-log): `/Users/jade/PREIShare-org-repo1`
- Date mapped: `2026-09-17`
- Agent tool used: `coding-agent + manual listing`
- Mapper: `jadiennejenson`

## 1. Overview (5–8 sentences)

PREIshare appears to be organized as a single Vite package rather than a monorepo.
In plain language, the product code lives mainly in `src/`, with the browser entry in `src/main.tsx` and the main UI in `src/App.tsx`.
Project-tracker models, sample data, validation, and utilities are grouped under `src/project-tracker/`, `src/models/`, `src/data/`, and `src/utils/`.
No shared `packages/` or multiple `apps/` directories were found.
Docs and onboarding notes live in `docs/`, while static public assets live in `public/`.
This map documents the repository structure without editing application code.

## 2. Top-level inventory

| Path | Kind (app / package / config / docs / other) | One-sentence purpose | Verified by me? (yes/no) |
|------|-----------------------------------------------|----------------------|---------------------------|
| `.cursor/` | other | Local agent rules for PREIshare work. | yes |
| `README.md` | docs | Vite and React starter documentation. | yes |
| `dist/` | other | Generated production build output. | yes |
| `docs/` | docs | Onboarding and project documentation | yes |
| `eslint.config.js` | config | ESLint configuration for TypeScript and React files. | yes |
| `index.html` | app | Vite HTML entry document. | yes |
| `node_modules/` | other | Installed npm dependencies; generated locally. | yes |
| `package-lock.json` | config | npm dependency lockfile. | yes |
| `package.json` | config | Root package manifest and development scripts. | yes |
| `public/` | app | Static assets copied into the built application. | yes |
| `src/` | app | TypeScript and React application source. | yes |
| `tsconfig.app.json` | config | TypeScript settings for application source. | yes |
| `tsconfig.json` | config | Root TypeScript project configuration. | yes |
| `tsconfig.node.json` | config | TypeScript settings for Node/Vite configuration files. | yes |
| `vite.config.ts` | config | Vite development and build configuration. | yes |
| `.DS_Store` | other | macOS Finder metadata; unrelated to application behavior. | yes |

<!-- Add every top-level name you actually see. Delete example rows you do not have. -->

## 3. Frontend concerns (TypeScript, React, TanStack Start)

- Likely app root(s): `src/`
- Clues I used (file names, frameworks mentioned in package.json): `package.json` lists React, React DOM, TypeScript, and Vite; `src/main.tsx` mounts the React app; `src/App.tsx` renders the main screen.
- Entry / routes / UI areas worth knowing: `index.html`, `src/main.tsx`, `src/App.tsx`, `src/App.css`, and `src/index.css`; no route directory was found.
- How this area relates to user-facing screens: `App.tsx` renders a Project Tracker summary and active-project list using data and utilities from `src/`.

## 4. Backend / data concerns (Supabase, PostgreSQL, pgvector, APIs)

- Supabase or data config paths: `src/data/` contains local project data; Supabase configuration was not found.
- Migrations / SQL / schema-related paths: not found yet.
- Env examples (NOT secret values): not found yet.
- Notes on what a beginner should not touch in production data: no production data integration is visible in this tree; do not add credentials or modify any future migration, schema, or production data configuration without review.

## 5. Tooling and CI

- TypeScript / lint / format config: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, and `eslint.config.js`; no formatter config was found.
- CI workflows (e.g. GitHub Actions): not found yet; no `.github/` directory was present.
- Editor or agent config already present: `.cursor/rules/preishare.mdc`.
- Scripts from package manifests that look like dev/build/test: `dev`, `build`, and `preview`; no test script is defined.

## 6. Safe first-touch vs do-not-edit-yet

### Safe first-touch (good candidates for a tiny onboarding PR)

| Path or area | Why it is relatively safe | Risk if handled carelessly |
|--------------|---------------------------|----------------------------|
| `docs/onboarding/` | Docs-only; helps the team | Misleading docs |
| `docs/ai/` | Documentation and project-memory content; no runtime impact. | Outdated guidance |
| `docs/onboarding/repo-map.md` | Repository inventory; helps contributors orient themselves. | Incorrect path or workflow claims |
| `README.md` | Project documentation with no direct runtime behavior. | Wrong setup instructions |

### Do not edit yet (wait until you have tests, review, and a real task)

| Path or area | Why wait | What could break |
|--------------|----------|------------------|
| CI under `.github/` or equivalent | Shared pipeline | Everyone’s builds |
| `package-lock.json` and root package/config files | Dependency graph and build behavior | Install or build failures |
| `dist/` and `node_modules/` | Generated output and installed dependencies | Noisy or misleading changes |
| Supabase / migrations / production env | Data and secrets; these paths were not found yet | Data loss or leaked secrets |
| Shared packages used by multiple apps | No shared package directory was found, but future additions could have wide blast radius | Multiple features regress |
| Auth, payments, or vector/search core | These areas were not found yet; treat any future implementation as high complexity | Security or relevance bugs |

## 7. Open questions for the team

- CI workflow location and required checks could not be verified because no `.github/` directory was present.
- Whether `dist/` is intentionally committed or only local build output should be confirmed with the team.
- The repository currently has one visible app entry, but the team should confirm whether `src/` is the long-term product source of truth.
- No shared UI package or backend/data package was found; ownership should be clarified if those are introduced later.

## 8. How I will use this map next

- Configure AI project rules/memory using the paths above (next tooling steps).
- Pick a first contribution only from **Safe first-touch** unless a mentor expands scope.
- Revisit and edit this file when a path claim is proven wrong.
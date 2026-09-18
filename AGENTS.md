<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `npx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `npx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

# PREIshare contributor guide

This repository contains PREIshare, a root-level React 19 and Vite application. It is not currently a monorepo: there are no `apps/` or `packages/` directories.

## Read these first

- `.cursor/rules/preishare.mdc` is the primary project rules file. Follow it for architecture, security, environment variables, generated files, and validation expectations.
- `docs/onboarding/` contains the repository map and domain onboarding material. Start with `docs/onboarding/repo-map.md` when locating code or deciding where a change belongs.

## Repository shape

- `src/main.tsx` mounts the React application and `src/App.tsx` renders the current user-facing screen.
- `src/data/`, `src/models/`, `src/project-tracker/`, and `src/utils/` contain the current project-tracker data and helpers.
- `src/App.css` and `src/index.css` contain the current application styles.
- Root configuration lives in `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, and `package.json`.
- `dist/` and `node_modules/` are generated or installed output and should not be edited directly.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

Run `npm run build` before considering an application change complete. No test script or route-generation script is currently defined in `package.json`.

## Runtime boundaries

Keep browser-only APIs behind appropriate client execution boundaries if they are added later, and never expose secrets through `VITE_*` environment variables.

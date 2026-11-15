# CI scripts notes — PREIshare dashboard

## Package manager
- CI uses: npm
- Lockfile present: none

## Scripts CI calls (must match package.json and pr-ci.yml)
| CI step | package.json script / one-liner | Exact local command | Purpose |
|---------|--------------------------------|---------------------|---------|
| Install | `npm install` | `npm install` | Install dependencies for a clean workspace |
| Typecheck | `npx tsc --noEmit` | `npx tsc --noEmit` | TypeScript check without emitting build artifacts |
| Build | `npm run build` | `npm run build` | Production build |
| Lint | `npx eslint . --max-warnings=0` | `npx eslint . --max-warnings=0` | Static quality check |
| Test | `npx vitest run` | `npx vitest run` | Non-watch test run that exits cleanly |

## Real commands in this repo
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Intentional gaps
- No `typecheck` script is defined in `package.json`; CI uses the direct TypeScript CLI instead.
- No `lint` script is defined in `package.json`; CI uses the documented one-liner `npx eslint . --max-warnings=0`.
- No `test` script is defined in `package.json`; CI uses the documented one-liner `npx vitest run`.
- PR CI has no browser E2E suite. Browser-driven checks remain manual or are deferred to a later sprint.

## How to reproduce CI locally
1. `npm install`
2. `npx tsc --noEmit`
3. `npm run build`
4. `npx eslint . --max-warnings=0`
5. `npx vitest run`

## Why this order
- Install first so dependencies are available.
- Typecheck next to catch syntax and typing failures early.
- Build after typecheck to validate the production bundle.
- Lint before test to catch style/static issues before runtime tests.
- Use `vitest run` instead of watch mode so the CI runner exits successfully.

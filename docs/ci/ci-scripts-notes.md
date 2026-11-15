# CI scripts notes — PREIshare dashboard

## Package manager
- CI uses: npm
- Lockfile present: none

## Scripts CI calls (must match package.json and pr-ci.yml)
| CI step | package.json script / command | Exact local command | Purpose |
|---------|------------------------------|---------------------|---------|
| Install | `npm install` | `npm install` | Install dependencies for a clean workspace |
| Typecheck | direct TypeScript CLI | `npx tsc --noEmit` | Type-check without emitting build artifacts |
| Build | `npm run build` | `npm run build` | Production build |

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
- No `typecheck` script exists in `package.json`
- No `lint` script exists in `package.json`
- No `test` script exists in `package.json`
- No lockfile is currently committed; CI should use `npm install` until a lockfile is added

## How to reproduce CI locally
1. git checkout the PR branch
2. npm install
3. npx tsc --noEmit
4. npm run build
5. Fix until both steps pass, then push

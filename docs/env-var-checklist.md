# Environment variable checklist

Use this checklist before committing or deploying any PREIshare change that touches Supabase or server-side configuration.

## 1. Keep secrets out of the browser

- Never expose the Supabase service-role key to client-side code.
- Never put secrets in `VITE_*` variables.
- Treat `.env`, `.env.local`, and any secrets in deployment settings as confidential.

## 2. Safe browser variables

These are the only values that may be used in browser code:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

These are safe only because the browser is restricted by Supabase RLS. Do not assume they are privileged.

## 3. Server-only variables

These values must stay on the server and must not be imported into browser bundles:

- `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS and must only be read in server-only code.
- `SUPABASE_URL`
- Any database credentials or admin tokens

Use server-only config in trusted execution environments such as server actions, loaders, middleware, or deployment secrets. Do not import `SUPABASE_SERVICE_ROLE_KEY` into browser or client-side modules.

## 4. Local setup

- Copy `.env.example` to `.env` or `.env.local`.
- Replace placeholders with real project values from the Supabase dashboard.
- Keep `.env` and `.env.local` out of source control.
- Commit only `.env.example` with placeholder values.

## 5. Release and deployment checks

Before pushing changes, confirm:

- [ ] No real secret appears in repository files.
- [ ] Browser code reads only `VITE_*` public values.
- [ ] Server code reads `SUPABASE_*` values without exposing them to the client.
- [ ] `.env` and `.env.local` are ignored by Git.
- [ ] The deployed app does not leak the service-role key in logs or bundled assets.

## 6. Required file pattern

Preferred pattern:

```env
# Client-safe values
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Server-only values
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## 7. Decision summary

This project follows the principle that browser environment variables are public-facing and server variables are secret-bearing. The safest rule is simple: if it can bypass RLS or alter production data, it stays off the client.

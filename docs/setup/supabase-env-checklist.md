# .env.example — commit this file. Never put real keys here.
# Copy to .env.local (or .env) for local development and fill in values
# from Supabase → Project Settings → API.
#
# PUBLIC / BROWSER-SAFE (safe to expose in the client bundle)
# These are used by the app for sponsor sign-in and reading public listings.
# Keep them VITE_ so Vite can inject them at build/runtime for the browser.
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key

# SERVER-ONLY SECRETS (never prefix for client exposure; never import in browser code)
# Use these only in server routes, loaders, edge functions, or admin jobs.
# Service role bypasses Row Level Security and must never be shipped to the browser.
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ---------------------------------------------------------------------------
# docs/setup/supabase-env-checklist.md
# ---------------------------------------------------------------------------

## Purpose
Configure the Supabase environment for PREIshare so sponsor authentication and
listing reads work in the front end while service-role secrets remain server-only.

## Required setup
- [ ] Supabase project created or selected for PREIshare
- [ ] Project URL copied from Supabase → Project Settings → API
- [ ] anon/public key copied for the browser-safe env variables
- [ ] service_role key copied only for local server usage and never committed
- [ ] database password stored in a password manager, not in the repo

## Repo policy
- [ ] `.env.example` committed with placeholder values only
- [ ] Local `.env` or `.env.local` created from the example and filled with real values locally
- [ ] `.gitignore` includes `.env`, `.env.local`, and related env patterns
- [ ] `git status` does not list the real env file as untracked-to-add by mistake
- [ ] No real key material appears in tracked files or docs

## Public vs server-only rules
- [ ] Browser-safe vars use the public prefix (e.g. `VITE_SUPABASE_URL`,
      `VITE_SUPABASE_ANON_KEY`)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` has no client/public prefix
- [ ] No file under `src/` reads or imports `SUPABASE_SERVICE_ROLE_KEY`
- [ ] No browser bundle contains server-only secrets
- [ ] Example files and checklist contain zero real key material

## Smoke checks before feature work
- [ ] Restart the dev server after creating or editing the local env file
- [ ] App still starts without URL/key errors
- [ ] Search the repo for the service_role key string — zero hits in tracked files
- [ ] Confirm browser-safe vars are the only ones used by client code

## Handoff notes
- Public client vars are for the front-end build and permit RLS-protected sponsor
  auth/listing reads in the browser.
- Server-only secrets stay in local `.env.local` or deployment secret storage,
  never in the browser bundle or repo.
- Do not create or commit a real `.env.local` in this repository; keep it local
  and private on your machine.
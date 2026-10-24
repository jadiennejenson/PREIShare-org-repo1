# .env.example — commit this file. Never put real keys here.
# Copy to .env.local (or .env) for local development and fill in values
# from Supabase → Project Settings → API.
#
# PUBLIC / BROWSER-SAFE (may be exposed to the client bundle)
# Use whatever public prefix your TanStack Start + Vite template expects
# (commonly VITE_). These values are NOT secret when RLS is enabled.
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key

# SERVER-ONLY SECRETS (never prefix for client exposure; never import in browser code)
# Service role bypasses Row Level Security — server routes/loaders only.
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: same URL without a public prefix for server code that reads non-VITE_ vars
SUPABASE_URL=https://your-project-ref.supabase.co

# ---------------------------------------------------------------------------
# docs/setup/supabase-env-checklist.md (companion artifact — also commit)
# ---------------------------------------------------------------------------
# # Supabase environment setup checklist (PREIshare Sprint 4)
#
# ## Purpose
# Configure Supabase URL and keys for the TanStack Start dashboard so sponsors
# can authenticate and listings can load from Postgres without shipping
# service-role secrets to the browser.
#
# ## Source requirements
# See docs/requirements/sponsor-auth-and-listings-brief.md (auth, listings,
# secret-hygiene sections).
#
# ## Supabase project
# - [ ] Supabase project created (or selected) for PREIshare
# - [ ] Project URL copied from Project Settings → API
# - [ ] anon/public key copied
# - [ ] service_role key copied and stored only in a local untracked env file
# - [ ] Database password stored in a password manager (not in the repo)
#
# ## Repo files
# - [ ] `.env.example` committed with placeholder values only
# - [ ] Local `.env` or `.env.local` created from the example and filled with real values
# - [ ] `.gitignore` includes `.env`, `.env.local`, and related env patterns
# - [ ] `git status` does not list the real env file as untracked-to-add by mistake
#
# ## Public vs server-only rules
# - [ ] Browser-safe vars use the template’s public prefix (e.g. VITE_SUPABASE_URL,
#       VITE_SUPABASE_ANON_KEY)
# - [ ] SUPABASE_SERVICE_ROLE_KEY has NO public/client prefix
# - [ ] No file under src/ that runs in the browser reads SUPABASE_SERVICE_ROLE_KEY
# - [ ] Checklist and example files contain zero real key material
#
# ## Smoke checks before feature work
# - [ ] Restart the dev server after creating/editing the local env file
# - [ ] App still starts (env typos often surface as empty URL/key errors later)
# - [ ] Search the repo for the service_role key string — zero hits in tracked files
#
# ## Handoff notes
# - Hosting providers need the same split: public vars for the client build,
#   service-role only in server/runtime secret storage.
# - Next steps (later in this sprint): data model, migrations/RLS, then Supabase
#   clients that read these env names.
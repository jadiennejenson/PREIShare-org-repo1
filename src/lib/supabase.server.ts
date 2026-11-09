/**
 * Server-side Supabase utilities for the application.
 *
 * This module provides the canonical way to initialize Supabase clients in server-only code.
 * It validates required environment variables at runtime and exposes a session-aware client
 * for cookie-based auth and RLS-protected access, as well as a privileged service-role client
 * for trusted administrative operations that intentionally bypass row-level security.
 *
 * The shared `supabase` client exported from this module is intended for server-side use only
 * and is configured with session persistence disabled to avoid unexpected client state leakage.
 *
 * @remarks Do not import this module into pure client components. It is designed for
 * server environments and relies on runtime env vars such as `SUPABASE_URL`,
 * `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
 *
 * @see docs/env-var-checklist.md
 */
import { createClient } from '@supabase/supabase-js'

/**
 * @module supabase.server
 * Exports:
 *   - createSupabaseServerClient: Session-aware Supabase client for server-side use (RLS, cookies)
 *   - createSupabaseServiceRoleClient: Privileged Supabase client for admin/server jobs (bypasses RLS)
 *   - supabase: Shared server-only Supabase client (no session persistence)
 */

// src/lib/supabase.server.ts
// Server-only module. Do not import this file from pure client components.
// Match env names to your docs/env-var-checklist.md (.env.example).



function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing server env ${name}. See docs/env-var-checklist.md.`)
  }
  return value
}

/** Session-aware server client for sponsor auth + RLS (uses anon key + cookies). */
export function createSupabaseServerClient(cookieStore: {
  get: (key: string) => { value: string } | undefined
  set?: (key: string, value: string, options?: Record<string, unknown>) => void
  remove?: (key: string, options?: Record<string, unknown>) => void
}) {
  const url = requireEnv('SUPABASE_URL', process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL)
  const anonKey = requireEnv(
    'SUPABASE_ANON_KEY',
    process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY
  )

  return createClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: Record<string, unknown> | undefined) {
        cookieStore.set?.(name, value, options)
      },
      remove(name: string, options: Record<string, unknown> | undefined) {
        cookieStore.remove?.(name, options)
      },
    },
  })
}

/**
 * Privileged admin client — ONLY on the server, ONLY when you truly need to
 * bypass RLS (migrations, trusted admin jobs). Prefer createSupabaseServerClient
 * for normal sponsor dashboard reads/writes so RLS still applies.
 */
export function createSupabaseServiceRoleClient() {
  const url = requireEnv('SUPABASE_URL', process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL)
  const serviceRoleKey = requireEnv(
    'SUPABASE_SERVICE_ROLE_KEY',
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export const supabase = createClient(
  requireEnv('SUPABASE_URL', process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL),
  requireEnv('SUPABASE_ANON_KEY', process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY),
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
)

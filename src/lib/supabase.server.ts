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

const supabaseUrl = requireEnv('SUPABASE_URL', process.env.SUPABASE_URL) // Ensure this is the public URL
const supabaseAnonKey = requireEnv('SUPABASE_ANON_KEY', process.env.SUPABASE_ANON_KEY) // Ensure this is the anon key
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Should not be used in client

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

function createClient(
  url: string,
  serviceRoleKey: string,
  arg2: {
    auth?: { persistSession: boolean; autoRefreshToken: boolean };
    cookies?: {
      get: (name: string) => string | undefined;
      set?: (name: string, value: string, options?: Record<string, unknown>) => void;
      remove?: (name: string, options?: Record<string, unknown>) => void;
    };
  }
) {
  throw new Error("Function not implemented.")
}

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabaseBrowserInstance: SupabaseClient | null = null

export const getSupabaseBrowser = (): SupabaseClient => {
  if (!supabaseBrowserInstance) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Check .env and docs/env-var-checklist.md.'
      )
    }

    supabaseBrowserInstance = createClient(supabaseUrl, supabaseAnonKey)
  }

  return supabaseBrowserInstance
}

export const supabaseBrowser = getSupabaseBrowser()
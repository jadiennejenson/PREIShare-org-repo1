// src/routes/dashboard.tsx — layout/guard scaffold
import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { createSupabaseServerClient } from '../lib/supabase.server'
import { createBrowserSupabaseClient } from '../lib/supabase.client'
import { AppShell } from '../components/layout/AppShell'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const supabase = supabaseServerClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw redirect({ to: '/login' })
    }

    return { session }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  const navigate = useNavigate()
  const { session } = Route.useRouteContext()

  async function handleSignOut() {
    const supabase = createBrowserSupabaseClient()
    await supabase.auth.signOut()
    navigate({ to: '/login' })
  }

  return (
    <AppShell user={session.user} onSignOut={handleSignOut}>
      <Outlet />
    </AppShell>
  )
}

function supabaseServerClient() {
  return createSupabaseServerClient()
}
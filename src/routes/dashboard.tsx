// src/routes/dashboard.tsx — layout/guard scaffold
import { createFileRoute, Link, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { createServerSupabaseClient } from '../lib/supabase.server'
import { createBrowserSupabaseClient } from '../lib/supabase.client'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const supabase = createServerSupabaseClient()
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
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <p className="text-sm text-gray-500">PREIshare sponsor dashboard</p>
          <p className="font-medium">{session.user.email}</p>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/dashboard" className="text-sm underline">
            Home
          </Link>
          <button type="button" onClick={handleSignOut} className="text-sm underline">
            Sign out
          </button>
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
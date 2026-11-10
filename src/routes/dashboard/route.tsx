import { Outlet, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { AppShell } from '../../components/layout/AppShell'
import { getUser, signOut } from '../../lib/auth/session'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const user = await getUser()

    if (!user) {
      throw redirect({ to: '/auth/login' })
    }

    return { user }
  },
  component: DashboardRoute,
})

function DashboardRoute() {
  const navigate = useNavigate()
  const { user } = Route.useRouteContext()

  async function handleSignOut() {
    await signOut()
    navigate({ to: '/auth/login' })
  }

  return (
    <AppShell title="Investor Dashboard" user={user} onSignOut={handleSignOut}>
      <Outlet />
    </AppShell>
  )
}

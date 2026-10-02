import { Outlet, createFileRoute } from '@tanstack/react-router'
import AppShell from '../components/AppShell' // added

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    // wrap layout content in the shared shell so child routes render inside it
    <AppShell>
      <div data-area="dashboard-layout">
        <p>PREIshare investor dashboard layout</p>
        {/* Child routes render here */}
        <Outlet />
      </div>
    </AppShell>
  )
}
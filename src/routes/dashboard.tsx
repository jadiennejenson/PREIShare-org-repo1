import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppShell } from '../components/layout/AppShell'



function DashboardLayout() {
  return (
    <AppShell title="Investor Dashboard">
      <Outlet />
    </AppShell>
  )
}
// src/components/layout/AppShell.tsx
import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

type AppShellProps = {
  title?: string
  user?: unknown
  onSignOut?: () => void | Promise<void>
  children: ReactNode
}

/**
 * Shared investor chrome: sidebar + header + main content region.
 * Child routes render inside `children` (wired from the dashboard layout route).
 */
export function AppShell({
  title = 'Investor Dashboard',
  user: _user,
  onSignOut: _onSignOut,
  children,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell-main-column">
        <Header title={title} />
        <main className="app-shell-content" id="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}

// Expected usage inside src/routes/dashboard.tsx (shape only — adapt to your route APIs):
// import { AppShell } from '../components/layout/AppShell'
// // In the dashboard layout component, wrap the outlet/children:
// return <AppShell>{/* outlet or children here */}</AppShell>
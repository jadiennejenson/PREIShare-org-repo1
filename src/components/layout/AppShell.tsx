// src/components/layout/AppShell.tsx
import type { ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { NavItems } from './NavItems'

type AppShellProps = {
  children?: ReactNode
}

/**
 * Shared investor chrome: sidebar + header + main content region.
 * Child routes render inside `children` (wired from the dashboard layout route).
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-body">
        <Sidebar>
          <NavItems />
        </Sidebar>
        <main className="app-main" id="main-content">
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
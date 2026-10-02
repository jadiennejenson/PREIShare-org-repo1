// --- src/routes/__root.tsx ---
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Outlet />
    </div>
  )
}
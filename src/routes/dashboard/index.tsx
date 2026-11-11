import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/dashboard/')({
  component: DashboardHome,
})

function DashboardHome() {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <p className="text-sm text-slate-600">
        Placeholder home for the sponsor dashboard.
      </p>
    </section>
  )
}
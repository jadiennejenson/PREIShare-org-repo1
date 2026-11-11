import { createFileRoute } from '@tanstack/react-router'
import { MetricCard } from '../../components/dashboard/MetricCard'
import { PortfolioSummary } from '../../components/dashboard/PortfolioSummary'
import { RecentActivity } from '../../components/dashboard/RecentActivity'


export const Route = createFileRoute('/dashboard/')({
  component: DashboardHome,
})

const metrics = [
  { label: 'Portfolio value', value: '$1.24M', hint: 'Across 12 active investments' },
  { label: 'Active investments', value: '12', hint: '4 new this quarter' },
  { label: 'Distributions', value: '$184K', hint: 'YTD cash returns' },
]

function DashboardHome() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            hint={metric.hint}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <PortfolioSummary
          items={[]}
          emptyMessage="No portfolio positions yet."
        />
        <RecentActivity
          items={[]}
          emptyMessage="No recent activity yet."
        />
      </section>
    </div>
  )
}
import { createFileRoute } from '@tanstack/react-router'
import {
  StatsCard,
  PortfolioSummary,
  RecentActivity,
} from '../../components/dashboard'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHomePage,
})

function DashboardHomePage() {
  return (
    <div className="dashboard-home">
      <div className="stats-row">
        <StatsCard label="Total portfolio value" value="$1.24M" />
        <StatsCard label="Open deals" value="12" />
        <StatsCard label="Contributions YTD" value="$420K" />
      </div>

      <div className="dashboard-main">
        <PortfolioSummary />
        <RecentActivity />
      </div>
    </div>
  )
}
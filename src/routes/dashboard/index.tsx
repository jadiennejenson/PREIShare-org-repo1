import { createFileRoute } from '@tanstack/react-router'


function StatsCard() {
  return (
    <main>
      <h1>Dashboard overview</h1>
      <p>Placeholder for portfolio value, open deals, and recent activity.</p>
    </main>
  )
}

function RecentActivity() {
  return (
    <section className="recent-activity">
      <h2>Recent Activity</h2>
      <ul>
        <li>Portfolio snapshot updated (mock)</li>
        <li>Featured deal moved to “Open” status (mock)</li>
        <li>Member profile record reviewed (mock)</li>
      </ul>
    </section>
  );
}

/* Inline fallback PortfolioSummary to avoid missing module */
function PortfolioSummary() {
    return (
        <section className="portfolio-summary">
            <h2>Portfolio Summary</h2>
            <p>Summary content placeholder.</p>
        </section>
    );
}

export default function Dashboard() {
    // ...existing code...
    return (
        <div className="dashboard-home">
            {/* Stats row */}
            <div className="stats-row">
                <StatsCard />
                <StatsCard />
                <StatsCard />
            </div>

            {/* Main content */}
            <div className="dashboard-main">
                <PortfolioSummary />
                <RecentActivity />
            </div>
        </div>
    );
}
// ...existing code...


function DashboardHomePage() {
  return (
    <main>
      <h1>Dashboard overview</h1>
      <p>Placeholder for portfolio value, open deals, and recent activity.</p>
    </main>
  )
}
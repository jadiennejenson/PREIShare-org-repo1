// --- src/routes/index.tsx ---
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute()({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">
          PREIshare
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Investor dashboard shell
        </h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          Mock-only route shell for the investor experience. This landing page is intentionally simple and does not yet include portfolio, deals, or profile views.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Portfolio value</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">$1.24M</p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Net contributions</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">$420K</p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Open deals</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">08</p>
        </div>
      </section>

      <section className="mt-8 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">Recent activity</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>Portfolio snapshot updated (mock)</li>
          <li>Featured deal moved to “Open” status (mock)</li>
          <li>Member profile record reviewed (mock)</li>
        </ul>
      </section>
    </main>
  );
}
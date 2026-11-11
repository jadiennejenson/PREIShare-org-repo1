# PREIshare Investor Dashboard — Stakeholder Handoff

**Sprint focus:** Responsive investor dashboard shell (TanStack Start routes + React UI)
**Audience:** PREIshare product stakeholders and the next implementation topic owners
**Date:** 2026-11-11
**Prepared by:** GitHub Copilot

## 1. Demo today (what investors can click)

- Visit `/dashboard` to open the investor home base inside the app shell.
- Desktop: persistent sidebar navigation + header branding/actions region.
- Narrow widths: sidebar collapses; mobile navigation pattern is available and tested.
- Home composition shows:
  - Metric cards (placeholder/mock values)
  - Portfolio summary region (mock)
  - Recent activity list (mock)
  - Empty-state messaging when a list has no items

**Out of scope for this demo:** live Supabase data, login/auth gates, editing holdings, or production deployment hardening.

## 2. Requirements traceability

| Success criterion (from requirements brief) | Status | Evidence |
| --- | --- | --- |
| Dashboard shell is available at `/dashboard` with a shared layout and home view | Met | `src/routes/dashboard/route.tsx`, `src/routes/dashboard/index.tsx` |
| Dashboard UI exposes a responsive shell for mobile, tablet, and desktop widths | Met | `src/components/dashboard/AppShell.tsx`, `Sidebar.tsx`, `MobileNav.tsx`, `docs/responsive-qa-checklist.md` |
| Investor home page includes summary widgets for overview data and empty states | Met | `src/routes/dashboard/index.tsx`, `MetricCard`, `PortfolioSummary`, `RecentActivity` |

## 3. Decisions made (so the next topic does not re-litigate them)

- **Routing:** Dashboard lives under a TanStack Start file-based route tree (`src/routes/dashboard/route.tsx` layout + `src/routes/dashboard/index.tsx` home).
- **Shell regions:** AppShell composes Header, Sidebar/MobileNav, and main content outlet per the dashboard component architecture.
- **Widgets:** MetricCard, PortfolioSummary, and RecentActivity are separate components so data wiring later does not require a full rewrite of the page.
- **Responsive approach:** Sidebar is kept for desktop; the mobile experience uses the hamburger menu pattern and a compact stacked layout at narrow widths.

## 4. Known limitations (honest baseline)

- **Mock data only:** metrics, portfolio figures, and activity rows are placeholders—not PostgreSQL/Supabase.
- **Auth not wired:** any investor can open the shell routes; no session or role checks yet.
- **No mutations:** read-only UI shell; no forms that persist changes.
- **QA residual risk:** no open blockers from the responsive checklist; the dashboard shell passed the mobile/tablet/desktop checks currently tracked in `docs/responsive-qa-checklist.md`.

## 5. Recommended next sprint work

1. Connect loaders/server functions to Supabase for real portfolio and activity reads.
2. Add authentication and protect `/dashboard` for signed-in investors only.
3. Replace mock props with typed API/DTO shapes; keep presentational components stable.
4. Re-run the responsive QA checklist against real content lengths (long names, empty vs full lists).
5. Stakeholder demo script: happy path on mobile + desktop with one real portfolio fixture.

## 6. Artifact index (for handoff package)

- Requirements: `docs/preishare-dashboard-requirements.md`
- Routing plan: `docs/dashboard-routing-plan.md`
- Component architecture: `docs/dashboard-component-architecture.md`
- Responsive QA: `docs/responsive-qa-checklist.md`
- Routes: `src/routes/dashboard/route.tsx`, `src/routes/dashboard/index.tsx`
- Shared shell/widgets: `src/components/dashboard/AppShell.tsx`, `Header.tsx`, `Sidebar.tsx`, `MobileNav.tsx`, `MetricCard.tsx`, `PortfolioSummary.tsx`, `RecentActivity.tsx`
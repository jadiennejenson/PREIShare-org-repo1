# PREIshare investor dashboard scope

This sprint is only the investor dashboard shell. It is not a live portfolio product, and it should never imply an active data feed or account management flow.

## What this dashboard is

The investor-facing dashboard is a private home base inside the PREIshare app. The goal is to make the investor feel oriented, show a few summary metrics, and prove the app can navigate among dashboard sections without exposing unbuilt features.

The shell should include:

- a product header with brand and user context
- a responsive sidebar or mobile nav
- a main content region for route-specific panels
- metric cards on the home page
- a recent activity area with placeholder content
- empty states that clearly say the data is mock or not yet connected

The dashboard is intentionally a shell, not a real investment console.

## IA and route purpose

The dashboard area is organized around a single home route and a small set of placeholder sub-sections used to validate navigation and shell composition.

- `/dashboard` is the home screen
- nested dashboard sections are placeholders for future portfolio, deals, and profile views
- route pages render inside the shared shell, not as standalone screens
- auth, market data, and portfolio operations stay out of scope for this sprint

The navigation labels should not be manually duplicated across the app. The source of truth is the shared nav config or NavItems data. The sidebar simply renders that data. The current hardcoded list is only a temporary implementation detail and should not become the canonical label set.

## Component boundaries

Each UI element has one clear job:

- AppShell owns the page layout: header, navigation, content region, spacing, and composition
- AppShell does not own metric presentation logic
- StatsCard owns only a single metric block: label, value, and optional helper text
- the dashboard home page composes StatsCard instances as needed
- recent activity panels own only the recent-item list and empty-state messaging
- nav config owns the route labels and route map

This keeps responsibilities non-overlapping and matches the shell we are building.

## Responsive and mock-only behavior

The dashboard must remain usable on mobile, tablet, and desktop widths. On narrow screens, the nav should collapse into a mobile pattern rather than hiding the route structure entirely.

All summary numbers and activity entries are placeholder content. They should be clearly marked as mock or not yet connected so stakeholders do not confuse the shell with live financial data.

## Out of scope

This sprint does not include:

- real Supabase queries
- account balances or holdings
- payment flows or document management
- tax export tools
- live charts or time-series analysis
- user auth or permission UI
- any product behavior that exceeds the dashboard shell

## Definition of done

The shell is complete when:

- the dashboard home route loads in the browser
- header, nav, metrics, and activity regions appear in the shell
- the nav remains usable on narrow screens
- the layout matches the app-shell composition model
- metric display remains limited to StatsCard responsibilities
- the dashboard reads as a placeholder product shell rather than a finished fintech app
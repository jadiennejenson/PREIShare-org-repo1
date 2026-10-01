# PREIshare investor dashboard scope

This sprint is only the investor dashboard shell. It is not a live portfolio product and it should not imply connected account data or real market activity.

## Dashboard purpose

The investor dashboard is a private home base inside PREIshare. It should help a signed-in investor understand where they are, scan a few summary numbers, and navigate among a small set of dashboard sections without exposing incomplete features.

The shell includes:

- a branded header
- a responsive sidebar or mobile nav
- a main content region
- summary metric cards on the home page
- a recent-activity area with placeholder entries
- empty states that clearly say the content is mock or not yet connected

The dashboard is intentionally a shell, not a complete investment console.

## Route intent

The dashboard lives under `/dashboard` and is structured to prove navigation and layout before deeper product features are added.

- `/dashboard` is the home screen
- nested dashboard sections are placeholder routes for future portfolio, deals, and profile views
- route content renders inside the shared shell instead of replacing it
- auth, live balances, and portfolio operations stay out of scope for this sprint

The navigation labels should not be manually duplicated across the app. The source of truth is the shared nav config or NavItems data. The sidebar renders that data; it does not define the canonical labels.

## Component ownership

Each UI element has one clear responsibility:

- AppShell owns the page-level layout: header, nav, main content region, spacing, and composition
- AppShell does not own metric rendering
- StatsCard owns only a single metric block: label, value, and optional helper text
- the home page composes StatsCard instances as needed
- recent activity widgets own the list and empty-state messaging
- nav config owns the route labels and route map

This matches the shell we are building and avoids overlap between layout and data presentation.

## Responsive and mock-only behavior

The dashboard must remain usable on mobile, tablet, and desktop widths. On narrow screens, the navigation should collapse into a usable mobile pattern rather than hiding the route structure completely.

All summary numbers and recent activity entries are placeholder content. They should be explicitly labeled as mock or not yet connected so stakeholders do not confuse the shell with live financial data.

## Out of scope

This sprint does not include:

- live Supabase queries
- real balances or holdings
- payments or document management
- tax export tools
- live charts or time-series analysis
- auth or permissions UI
- any fintech behavior beyond the dashboard shell

## Definition of done

The dashboard is complete when:

- the dashboard home route loads in the browser
- header, nav, metrics, and activity regions are present
- nav remains usable on narrow screens
- layout follows the AppShell composition model
- metric display stays inside StatsCard responsibilities
- the dashboard reads like a placeholder product shell rather than a finished investment app
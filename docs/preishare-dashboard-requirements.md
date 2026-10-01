# PREIshare investor dashboard — IA and component decisions

This dashboard is a private investor landing area, not a market data product. The current sprint is limited to a shell that proves navigation, layout, and placeholder content work across desktop and mobile widths.

## IA and route intent

The dashboard entry point is a `/dashboard` area. The shell should feel like a controlled workspace rather than a one-off page. We are keeping the app structure straightforward:

- `/dashboard` is the home screen
- nested dashboard sections are lightweight placeholder routes used to prove navigation works
- route-level page content remains secondary to the overall shell and navigation model
- no auth, real account data, or live portfolio calculations are in scope

The navigation model should be centralized. The actual labels and menu structure live in the nav data source (for example, NavItems or navConfig), while the sidebar component is responsible only for rendering the passed structure. That means the current hardcoded “Home / Portfolio / Deals / Profile” list is a temporary implementation detail, not the source of truth. The source of truth should remain the shared config so labels and route mapping stay consistent.

## Component ownership

We are explicitly separating responsibilities to match the app structure and avoid overlap:

- AppShell owns the page-level layout: top header, sidebar navigation, content container, and overall spacing
- AppShell is also the place for the dashboard shell composition, not the place for metric-specific rendering
- StatsCard owns only metric display: a single summary value, label, and optional trend or helper text
- the dashboard home page can compose multiple StatsCard instances, but the cards themselves do not decide page layout
- activity widgets should render recent items or empty-state placeholders without dictating shell structure
- the sidebar should consume nav config data, not embed product logic or page layout concerns

This keeps the design consistent with the code we have started: page composition belongs in the shell, and metric cards remain focused on the “what is this number?” question.

## Navigation and empty-state behavior

The shell should provide a clear investor-facing structure with recognizable labels such as Home, Portfolio, Deals, and Profile, even if the screens are placeholders for now. On mobile, the sidebar should collapse into a usable menu pattern rather than disappearing entirely.

The page content should be intentionally transparent about missing data. Placeholder sections should say they are not live yet and should not imply that actual balances or activity are connected. This is especially important in the dashboard home page where metrics and recent activity are just scaffolding for future data integration.

## Scope boundaries

In this sprint, we are deliberately not building:

- live market or portfolio data
- auth flows or user-account management
- document vaults, payments, or tax exports
- advanced charting with time-series data
- a deep fintech architecture beyond the dashboard shell

We are only proving that the investor dashboard shell is navigable, readable, and responsive.

## Definition of done

The dashboard is done for this sprint when:

- the investor can open the dashboard home route
- the header, nav, metrics, and activity regions are present in the shell
- the mobile layout still permits navigation
- the placeholder content is clearly labeled as non-live
- the route and component responsibilities match the implementation
- the dashboard reads like a shell for future investor tools, not a complete product
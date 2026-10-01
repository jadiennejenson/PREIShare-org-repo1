# docs/dashboard-ia.md (scaffold — your edited version should cover these sections)

# PREIshare Investor Dashboard — Information Architecture

## Purpose
Map of investor-facing pages for the dashboard shell (mock data only).
No auth flows, admin tools, or live API contracts in this sprint.

## URL map and page purposes

| URL path | Route name | Nav label | Page purpose | Primary content |
|----------|------------|-----------|--------------|-----------------|
| `/dashboard` | Dashboard home | Home | Quick scan of portfolio value and activity | Stats row, portfolio summary, recent activity |
| `/dashboard/portfolio` | Portfolio | Portfolio | Review holdings at a glance | Portfolio table (mock rows) |
| `/dashboard/deals` | Deals | Deals | See open / featured deals | Deals list (mock cards or rows) |
| `/dashboard/profile` | Profile | Profile | View member profile details | Profile card (mock member fields) |

## Navigation rules
- Shared chrome: left sidebar (desktop) + top header; main content on the right/below.
- Active nav item should match the current URL path.
- Labels stay short and investor-friendly (Home, Portfolio, Deals, Profile).
- Nested under `/dashboard` so a parent layout can wrap all investor pages.

## Out of scope for this shell
- Sign-in / sign-up pages
- Live Supabase queries
- Admin or sponsor tools
- Payments or document vaults

## Notes for later route files
Parent layout route: `dashboard`  
Child routes: index (home), `portfolio`, `deals`, `profile`

---

# docs/component-plan.md (scaffold — edit responsibilities so they do not overlap)

# PREIshare Investor Dashboard — Component Inventory

## Scope
Reusable UI pieces for a responsive shell with **mock data only**.
Components present structure and placeholder content; they do not call real APIs.

## Layout components (shared chrome)

| Component | Responsibility | Used on | Must NOT do |
|-----------|----------------|---------|-------------|
| `AppShell` | Page frame: combines Sidebar, Header, and main content area | All `/dashboard/*` pages | Own page-specific widgets or fetch data |
| `Sidebar` | Branding + primary nav region on larger screens | AppShell | Duplicate header page title logic; hardcode deal rows |
| `Header` | Top bar: page title and simple user/placeholder area | AppShell | Define the full nav list (nav config lives once) |
| `NavItems` / `navConfig` | Single source of nav labels + paths | Sidebar (and mobile nav if added later) | Render stats or tables |

## Dashboard home widgets

| Component | Responsibility | Used on | Must NOT do |
|-----------|----------------|---------|-------------|
| `StatsCard` | Show one metric label + value (+ optional hint) | Dashboard home (and reusable elsewhere) | Fetch data; own page layout |
| `PortfolioSummary` | Short snapshot of portfolio value / allocation | Dashboard home | Replace the full portfolio table page |
| `RecentActivity` | Simple list of recent mock events | Dashboard home | Own global navigation |

## Page-level shells

| Component | Responsibility | Used on | Must NOT do |
|-----------|----------------|---------|-------------|
| `PortfolioTable` | Tabular mock holdings | Portfolio page | Live market data |
| `DealsList` | List/cards of mock open deals | Deals page | Checkout or subscribe flows |
| `ProfileCard` | Mock member name, contact, preferences | Profile page | Password change or auth |

## Composition rules
1. One job per component — if two rows describe the same job, merge or delete one.
2. Layout components wrap pages; page widgets never re-implement the shell.
3. Mock data may be inline constants for this sprint; real Supabase comes later.
4. Names above are locked for later agent prompts — do not rename without updating both docs.

## Mapping check (IA ↔ components)
- Home → StatsCard, PortfolioSummary, RecentActivity inside AppShell
- Portfolio → PortfolioTable inside AppShell
- Deals → DealsList inside AppShell
- Profile → ProfileCard inside AppShell
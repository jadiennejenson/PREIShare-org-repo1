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

# Component plan

The dashboard should be built as a small set of focused components with single responsibilities. This keeps the shell predictable and prevents layout logic from being mixed into display-only widgets.

## AppShell

AppShell is the page-frame component. It owns:

- the overall dashboard layout
- header rendering
- sidebar or mobile nav placement
- main content region
- shell spacing and composition

AppShell should not decide how a metric is displayed. It only provides the structure of the page.

## Sidebar and nav config

The sidebar renders navigation items from a central nav data source. The nav labels and route mappings live in the shared config, such as NavItems or navConfig.

The sidebar should not maintain separate hardcoded labels in multiple places. If a route name or label changes, the config change should be the single source of truth.

## StatsCard

StatsCard is a presentational component for one summary metric. It owns:

- the label
- the value
- optional helper text or delta copy
- styling for the metric tile

StatsCard does not own page layout, routing, or the dashboard shell. It should never be responsible for arranging multiple cards or deciding where they appear.

## Activity list and empty state

The recent activity area should render list items or a generic empty state. It is scoped to showing recent actions or placeholder data and should not control shell layout or page composition.

## Division of responsibilities

The current plan is:

- AppShell: layout and composition
- nav config: labels and route metadata
- sidebar: render nav data
- StatsCard: metric display only
- activity panel: recent-item list or empty state
- page routes: screen content only

This keeps the component map simple and aligns with the dashboard shell we are building.
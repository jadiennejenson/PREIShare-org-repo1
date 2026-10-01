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

The dashboard should be built as a small set of components with single, non-overlapping responsibilities. This keeps the shell predictable and prevents layout logic from being mixed into display-only widgets.

## AppShell

AppShell owns the page frame:

- overall dashboard layout
- header rendering
- sidebar or mobile nav placement
- main content region
- shell spacing and page composition

AppShell should not decide how a metric is styled or rendered. It only provides the frame.

## Nav config and sidebar

The sidebar renders navigation items from a central source of truth. The labels and route metadata live in the shared nav config, such as NavItems or navConfig.

The sidebar should not maintain a separate hardcoded list of labels. If the navigation changes, the config changes once and the sidebar reflects it.

## StatsCard

StatsCard is a presentational component for a single metric. It owns:

- the label
- the value
- optional helper text or delta copy
- styling for the metric tile

StatsCard does not own layout, route composition, or dashboard shell structure. Its only job is to display one summary metric.

## Activity list

The recent-activity panel is responsible for rendering:

- recent items
- empty-state messaging
- mock-list presentation

It does not govern the shell or route layout.

## Ownership boundary

The current plan is:

- AppShell: layout and composition
- nav config: labels and route metadata
- sidebar: render nav data
- StatsCard: metric display only
- activity panel: recent-item list or empty state
- route files: page content only

This keeps the UI structure clear and aligned with the dashboard shell being built.
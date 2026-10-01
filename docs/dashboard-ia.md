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

# Dashboard IA

The investor dashboard lives under `/dashboard` and is intentionally simple. It exists to prove routing, shell composition, and responsive navigation before deeper product work is added.

## Route structure

- `/dashboard` — dashboard home with summary metrics and recent activity
- `/dashboard/portfolio` — placeholder portfolio section
- `/dashboard/deals` — placeholder deals or opportunities section
- `/dashboard/profile` — placeholder profile or account-context section

These routes are not full-featured in this sprint. They exist to demonstrate that the shared dashboard shell can render different pages while keeping a consistent frame.

## Navigation model

The sidebar should render navigation from a central config rather than a hardcoded list. The canonical labels and route map live in the shared nav data, such as NavItems or navConfig. The sidebar is a renderer, not the source of truth.

This keeps labels aligned with routes and avoids drift between the sidebar UI and the app’s actual route configuration.

## Shell behavior

The dashboard shell is the persistent frame around all route content:

- header for brand and user context
- sidebar or mobile nav
- main content region
- consistent spacing and page structure

Every route shares this shell. Route content is inserted into the shell rather than replacing it.

## Mock-only content

The home page uses placeholder metric cards and a recent activity list. These should make it clear that the data is not live yet. The shell must not imply that balances, portfolio values, or transactions are connected.

## Scope alignment

This IA is limited to route proofing, shell stability, and placeholder messaging. It does not include auth, payments, live investment data, or deeper fintech features. The result should read like a stable dashboard foundation for future investor tools.


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

The investor dashboard is a routed section under `/dashboard`. The IA is intentionally simple so the shell can prove navigation and layout before deeper product features are added.

## Route structure

- `/dashboard` — home dashboard shell with summary metrics and recent activity
- `/dashboard/portfolio` — placeholder section for portfolio content
- `/dashboard/deals` — placeholder section for deal or opportunity content
- `/dashboard/profile` — placeholder section for investor profile or account context

These routes are not intended to be fully featured in this sprint. They simply prove that the app shell can switch between sections and keep a consistent frame around page content.

## Navigation model

The sidebar should render navigation from a central config rather than a hardcoded component list. Labels and route targets belong in one data source, such as NavItems or navConfig. The sidebar is a renderer, not the canonical source of truth.

This keeps the UI consistent and avoids drift between label text, route names, and future navigation changes.

## Shell behavior

The dashboard shell is the persistent frame around all route content:

- header for branding and user context
- sidebar or mobile nav
- main content region
- consistent spacing and page structure

This shell is shared by every dashboard route. Route content is inserted inside it rather than replacing the frame itself.

## Mock-only content decisions

The home page uses placeholder metric cards and a recent activity list. The content should signal that the data is still mock or not yet connected. The dashboard shell must not imply that live portfolio values or trade flows are already available.

## Scope alignment

This IA is intentionally limited to route proofing, layout stability, and placeholder messaging. It does not include auth flows, payments, or live investment data. The current shell should read like a stable foundation for future investor tools, not a complete product experience.


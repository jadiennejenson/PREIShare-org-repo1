# PREIshare Dashboard Routing Plan

## Purpose
Map investor-facing dashboard URLs to TanStack Start route files before any UI generation.
Source requirements: `docs/preishare-dashboard-requirements.md`.

## Current app inventory (as found)
| File / folder | Likely URL | Notes |
| --- | --- | --- |
| `src/routes/__root.tsx` | (app root layout) | Existing shared root — do not replace casually |
| `src/routes/index.tsx` | `/` | Existing marketing or app home |
| _(add every route file you actually found)_ | | |

## Planned dashboard route tree

```text
/dashboard                 → layout route (shell: header + sidebar + outlet)
/dashboard                 → index (investor home: metrics, portfolio summary, activity)
/dashboard/portfolio       → placeholder child (future portfolio detail)
/dashboard/activity        → placeholder child (future full activity feed)
```

## File map (exact files to create in a later step)
| URL | Role | File to create | Wraps / renders |
| --- | --- | --- | --- |
| `/dashboard` | Layout route | `src/routes/dashboard/route.tsx` | Shared dashboard chrome; renders child via Outlet |
| `/dashboard` | Index page | `src/routes/dashboard/index.tsx` | Investor dashboard home content |
| `/dashboard/portfolio` | Placeholder | `src/routes/dashboard/portfolio.tsx` (or `portfolio/index.tsx` if folder form) | Stub page / “coming soon” |
| `/dashboard/activity` | Placeholder | `src/routes/dashboard/activity.tsx` | Stub page / “coming soon” |

## Layout vs page responsibilities
- **Layout (`route.tsx`)**: persistent navigation regions only (header, sidebar/mobile nav slot, main outlet). No metric card business content.
- **Index (`index.tsx`)**: dashboard home composition (summary widgets). Uses the parent layout.
- **Placeholders**: minimal pages so nav links have real targets; full UI comes in later topics.

## Navigation labels (for sidebar / mobile nav later)
| Label | Path | Requirement link |
| --- | --- | --- |
| Overview | `/dashboard` | Investor home base / portfolio metrics entry |
| Portfolio | `/dashboard/portfolio` | Deeper portfolio tools (placeholder) |
| Activity | `/dashboard/activity` | Recent activity expansion (placeholder) |

## Out of scope for this plan
- Component prop designs and styling tokens (next architecture step)
- Auth guards and loader data shape (later sprints unless already in starter)
- API routes and Supabase queries

## Success criteria for implementation steps
- Visiting `/dashboard` shows the layout shell and home index content region.
- Child placeholder paths render inside the same layout (not a blank full-page replace of the shell).
- No unrelated existing routes were deleted during dashboard work.

## Open questions
- _(List anything unclear from the starter tree or requirements brief.)_
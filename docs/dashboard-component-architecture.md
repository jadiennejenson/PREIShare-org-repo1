# PREIshare Dashboard — Component Architecture & Responsive Layout Map

## Purpose
Blueprint for the investor dashboard shell as implemented in the current sprint. This document reflects the real route and component structure used for the `/dashboard` experience and intentionally keeps live data and auth concerns out of scope.

## Sources
- docs/preishare-dashboard-requirements.md
- docs/dashboard-routing-plan.md
- src/routes/dashboard/route.tsx
- src/routes/dashboard/index.tsx
- src/components/dashboard/*

## Layout regions
| Region | Role | Typical components |
|--------|------|--------------------|
| Header | Top bar: product name, section title, user placeholder | Header |
| Sidebar | Vertical nav on tablet/desktop | Sidebar |
| Mobile nav | Menu pattern on small screens | MobileNav |
| Main | Scrollable content area for the current route and widgets | Route outlet + widgets |

AppShell is the frame that places Header, Sidebar/MobileNav, and Main together.

## Component inventory

### AppShell
- Responsibility: Outer dashboard frame; arranges header, nav, and main content.
- Parent: Dashboard layout route.
- Children: Header, Sidebar, MobileNav, main content slot.
- Props: `children`, `title`, `sidebar` (optional).
- Actual file: `src/components/dashboard/AppShell.tsx`

### Header
- Responsibility: Top bar with PREIshare branding and a simple investor placeholder user badge.
- Parent: AppShell.
- Children: none required.
- Props: `title?`, `actions?`.
- Actual file: `src/components/dashboard/Header.tsx`

### Sidebar
- Responsibility: Desktop/tablet navigation with the agreed dashboard items.
- Parent: AppShell.
- Children: nav links for `/dashboard` and other dashboard routes defined by the routing plan.
- Props: no required props in the current implementation; uses a shared `navItems` array.
- Actual file: `src/components/dashboard/Sidebar.tsx`

### MobileNav
- Responsibility: Small-screen menu pattern; toggles the dashboard navigation list.
- Parent: AppShell.
- Children: same destinations as Sidebar.
- Props: none required in the current implementation; menu state stays local.
- Actual file: `src/components/dashboard/MobileNav.tsx`

### MetricCard
- Responsibility: One reusable metric tile for overview stats.
- Parent: Dashboard home.
- Props: `label`, `value`, `hint`.
- Actual file: `src/components/dashboard/MetricCard.tsx`

### PortfolioSummary
- Responsibility: Summary panel for placeholder portfolio data.
- Parent: Dashboard home.
- Props: `items`, `emptyMessage`.
- Actual file: `src/components/dashboard/PortfolioSummary.tsx`

### RecentActivity
- Responsibility: List panel for placeholder recent investor activity.
- Parent: Dashboard home.
- Props: `items`, `emptyMessage`.
- Actual file: `src/components/dashboard/RecentActivity.tsx`

## Composition (dashboard home)
The dashboard home route composes roughly:
1. Grid of `MetricCard` items
2. `PortfolioSummary`
3. `RecentActivity`

Current implementation:
- `src/routes/dashboard/index.tsx` renders a row of investor metrics with placeholder values.
- `PortfolioSummary` and `RecentActivity` are passed empty arrays plus readable empty messages so the shell is intentional without live data.

## Responsive behavior
| Viewport | Approx width | Nav behavior | Main content |
|----------|--------------|--------------|--------------|
| Mobile | < 768px | Sidebar hidden; `MobileNav` rendered near the header | Single column; cards stack vertically |
| Tablet | 768px–1024px | Sidebar visible, narrow layout; mobile nav hidden | Two-column card grid where space allows |
| Desktop | > 1024px | Sidebar visible and fixed/sticky in the shell | Multi-column cards; summary + activity side-by-side when space allows |

Notes for implementers:
- Touch targets on mobile controls should be easy to tap.
- Header should remain usable without crowding the content.
- Main content is scrollable and remains a stable region for route widgets.
- Do not rely on hover-only interactions for mobile-critical actions.

## File targets
- `src/routes/dashboard/route.tsx`
- `src/routes/dashboard/index.tsx`
- `src/components/dashboard/AppShell.tsx`
- `src/components/dashboard/Header.tsx`
- `src/components/dashboard/Sidebar.tsx`
- `src/components/dashboard/MobileNav.tsx`
- `src/components/dashboard/MetricCard.tsx`
- `src/components/dashboard/PortfolioSummary.tsx`
- `src/components/dashboard/RecentActivity.tsx`

## Out of scope
- Real Supabase/PostgreSQL data fetching
- Authentication and session guards
- Editing portfolio holdings or account settings
- Charts libraries, PDF export, or heavy visual widgets
- Design-system extraction or animation-heavy UI

## Success criteria for this blueprint
- Each named component has one clear responsibility.
- The route + component arrangement matches the current TanStack file-based route tree.
- Mobile / tablet / desktop nav behavior is explicit.
- The dashboard home includes the required summary widgets and empty-state support.
- Out-of-scope items remain intentionally excluded to avoid unnecessary feature creep.
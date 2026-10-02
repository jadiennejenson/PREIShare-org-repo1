// src/components/layout/NavItems.tsx
// Renders nav links from navConfig and marks the active route.

import { Link, useRouterState } from '@tanstack/react-router';
import { dashboardNavItems } from './navConfig';

export function NavItems() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <nav aria-label="Dashboard">
      <ul className="nav-list">
        {dashboardNavItems.map((item) => {
          const isActive =
            item.path === '/dashboard'
              ? pathname === '/dashboard' || pathname === '/dashboard/'
              : pathname === item.path || pathname.startsWith(`${item.path}/`);

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={isActive ? 'nav-link nav-link-active' : 'nav-link'}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Wiring expectations (agent should update existing files):
// - Sidebar.tsx imports and renders <NavItems /> instead of hardcoded anchors.
// - Header.tsx reads the current pathname (or accepts title from AppShell)
//   and shows getPageTitle(pathname) so the heading matches the active area.
// - Labels stay investor-friendly and match docs/investor-dashboard-brief.md.
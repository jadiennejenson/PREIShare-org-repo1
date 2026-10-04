// src/components/layout/NavItems.tsx
// Renders nav links from navConfig and marks the active route.

import { dashboardNavItems } from './navConfig';

export function NavItems() {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname : '/dashboard';

  return (
    <ul className="nav-items">
      {dashboardNavItems.map((item) => {
        const isActive =
          pathname === item.path || pathname.startsWith(item.path + '/');
        return (
          <li key={item.path}>
            <a href={item.path} className={isActive ? 'active' : undefined}>
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

// Wiring expectations (agent should update existing files):
// - Sidebar.tsx imports and renders <NavItems /> instead of hardcoded anchors.
// - Header.tsx reads the current pathname (or accepts title from AppShell)
//   and shows getPageTitle(pathname) so the heading matches the active area.
// - Labels stay investor-friendly and match docs/investor-dashboard-brief.md.
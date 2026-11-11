// src/components/dashboard/MobileNav.tsx
import { useState } from 'react'
import { Link } from '@tanstack/react-router'

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  // Keep this list identical to Sidebar
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="rounded border px-3 py-2 text-sm"
        aria-expanded={open}
        aria-controls="mobile-dashboard-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Close menu' : 'Open menu'}
      </button>
      {open ? (
        <nav
          id="mobile-dashboard-menu"
          aria-label="Dashboard"
          className="mt-2 rounded border bg-white p-3"
        >
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block rounded px-3 py-2 text-sm"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  )
}
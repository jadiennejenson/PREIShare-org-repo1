import { Link } from '@tanstack/react-router'

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Listings', to: '/dashboard/listings' },
]

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-56 md:flex-col md:border-r md:bg-slate-50 p-4">
      <p className="mb-4 text-sm font-semibold text-slate-700">PREIshare</p>
      <nav aria-label="Dashboard">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block rounded px-3 py-2 text-sm text-slate-800 hover:bg-slate-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
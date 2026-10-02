import { Outlet } from '@tanstack/react-router' // optional if you want to render nested routes here
import './AppShell.css'

export default function AppShell({ children }: { children?: React.ReactNode }) {
	// simple shell: sidebar + main content area
	return (
		<div className="app-shell">
			<aside className="app-shell__sidebar" aria-label="Sidebar">
				{/* minimal sidebar — replace with real nav later */}
				<nav>
					<ul>
						<li>Overview</li>
						<li>Portfolio</li>
						<li>Deals</li>
					</ul>
				</nav>
			</aside>

			<main className="app-shell__main">
				{children}
				{/* Optionally render nested routes here if preferred */}
				{/* <Outlet /> */}
			</main>
		</div>
	)
}

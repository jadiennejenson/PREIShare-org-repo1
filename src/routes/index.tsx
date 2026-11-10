import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>PREIshare Investor Dashboard</h1>
      <p>Welcome to the PREIshare investor dashboard shell.</p>
    </main>
  )
}
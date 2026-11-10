import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem',
        background: '#f4f8fb',
        color: '#102a43',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <section
        style={{
          maxWidth: '720px',
          width: '100%',
          padding: '2.5rem',
          borderRadius: '16px',
          background: '#ffffff',
          boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
        }}
      >
        <p
          style={{
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 700,
            color: '#2b6cb0',
          }}
        >
          PREIshare
        </p>
        <h1 style={{ margin: '0.5rem 0 1rem', fontSize: '2.5rem' }}>
          Investor Dashboard
        </h1>
        <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.6 }}>
          Welcome to the PREIshare investor dashboard shell.
        </p>
      </section>
    </main>
  )
}
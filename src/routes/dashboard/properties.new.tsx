// src/routes/dashboard/properties.new.tsx
// Scaffold shape — your agent should produce an equivalent TanStack Start route.
// Names may differ slightly; the security behavior must match.

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../lib/supabase.server'
// Adjust import path to match your project layout if needed.

// Server mutation: insert runs with the caller's session.
// RLS WITH CHECK should enforce ownership (e.g. owner_id = auth.uid()).
// Do NOT trust a client-supplied owner/sponsor id.
export const createProperty = createServerFn({ method: 'POST' })
  .validator((data: { title: string; address: string; description?: string }) => data)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { ok: false as const, error: 'You must be signed in to add a property.' }
    }

    const { data: row, error } = await supabase
      .from('properties')
      .insert({
        title: data.title.trim(),
        address: data.address.trim(),
        description: data.description?.trim() ?? null,
        // Ownership from the session — matches RLS WITH CHECK (auth.uid()).
        // If your migration uses a different column name, match the matrix/migration.
        owner_id: user.id,
      })
      .select('id')
      .single()

    if (error) {
      // Surface the real failure — never pretend success when RLS or constraints reject.
      return { ok: false as const, error: error.message }
    }

    return { ok: true as const, id: row.id }
  })

export const Route = createFileRoute('/dashboard/properties/new')({
  component: NewPropertyPage,
})

function NewPropertyPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPending(true)

    const result = await createProperty({
      data: { title, address, description },
    })

    setPending(false)

    if (!result.ok) {
      setError(result.error)
      return
    }

    // Only navigate away after a confirmed insert.
    navigate({ to: '/dashboard/properties' })
  }

  return (
    <main>
      <h1>Add property</h1>
      <p>New listings are saved for your sponsor account only (enforced by RLS).</p>

      <form onSubmit={onSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={pending}
          />
        </label>
        <label>
          Address
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            disabled={pending}
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={pending}
          />
        </label>

        {error ? <p role="alert">{error}</p> : null}

        <button type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Create property'}
        </button>
      </form>
    </main>
  )
}

// Also ensure src/routes/dashboard/properties.tsx links here, e.g.:
// <Link to="/dashboard/properties/new">Add property</Link>
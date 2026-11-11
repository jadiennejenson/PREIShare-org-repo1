import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ListingForm } from '~/components/listings/ListingForm'
// import { createListing } from '~/server/listings'

export const Route = createFileRoute('/dashboard/listings/new')({
  component: NewListingPage,
})

function NewListingPage() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(values: {
    title: string
    city: string
    description?: string
  }) {
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      // Call createListing server function with validated values.
      // On success: navigate({ to: '/dashboard/listings' })
      // On failure: setErrorMessage(result.error)
      void values
      await Promise.resolve()
      navigate({ to: '/dashboard/listings' })
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Could not create listing.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section aria-labelledby="new-listing-heading">
      <h1 id="new-listing-heading">Add a property listing</h1>
      <ListingForm
        onSubmit={handleSubmit}
        submitLabel="Create listing"
        errorMessage={errorMessage}
        isSubmitting={isSubmitting}
      />
    </section>
  )
}

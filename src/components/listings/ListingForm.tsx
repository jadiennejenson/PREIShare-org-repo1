export type ListingFormValues = {
  title: string
  city: string
  description?: string
}

export type ListingFormProps = {
  onSubmit: (values: ListingFormValues) => void | Promise<void>
  submitLabel?: string
  errorMessage?: string | null
  isSubmitting?: boolean
}

export function ListingForm({
  onSubmit,
  submitLabel = 'Save listing',
  errorMessage = null,
  isSubmitting = false,
}: ListingFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const form = event.currentTarget
        const data = new FormData(form)

        void onSubmit({
          title: String(data.get('title') ?? ''),
          city: String(data.get('city') ?? ''),
          description: String(data.get('description') ?? '') || undefined,
        })
      }}
    >
      {errorMessage ? <p role="alert">{errorMessage}</p> : null}

      <div>
        <label htmlFor="listing-title">Title</label>
        <input
          id="listing-title"
          name="title"
          type="text"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="listing-city">City</label>
        <input
          id="listing-city"
          name="city"
          type="text"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="listing-description">Description</label>
        <textarea id="listing-description" name="description" disabled={isSubmitting} />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}

import { createFileRoute, Link } from '@tanstack/react-router'
import { ListingCard } from '~/components/listings/ListingCard'
import { listMyListings } from '~/server/listings'

export const Route = createFileRoute('/dashboard/listings/')({
  loader: async () => {
    return listMyListings()
  },
  component: ListingsIndexPage,
})

function ListingsIndexPage() {
  const result = Route.useLoaderData()

  if (!result || result.ok === false) {
    return (
      <section aria-labelledby="listings-heading">
        <h1 id="listings-heading">Your property listings</h1>
        <p role="alert">
          {result?.error ?? 'Could not load your listings right now.'}
        </p>
        <Link to="/dashboard/listings/new">Add listing</Link>
      </section>
    )
  }

  const listings = result.listings

  if (listings.length === 0) {
    return (
      <section aria-labelledby="listings-heading">
        <h1 id="listings-heading">Your property listings</h1>
        <p>No properties yet. Add your first listing to get started.</p>
        <Link to="/dashboard/listings/new">Add listing</Link>
      </section>
    )
  }

  return (
    <section aria-labelledby="listings-heading">
      <header>
        <h1 id="listings-heading">Your property listings</h1>
        <Link to="/dashboard/listings/new">Add listing</Link>
      </header>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            <ListingCard listing={listing} />
          </li>
        ))}
      </ul>
    </section>
  )
}

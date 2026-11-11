import { createFileRoute, Link } from '@tanstack/react-router'
import { ListingCard } from '~/components/listings/ListingCard'
// Import the real list loader/action from earlier step, e.g.:
// import { listMyListings } from '~/server/listings'

export const Route = createFileRoute('/dashboard/listings/')({
  // loader should call listMyListings (server) for the signed-in sponsor
  component: ListingsIndexPage,
})

function ListingsIndexPage() {
  // Read loader data from the route.
  // Handle: loading (if applicable), error, empty array, and success list.
  const listings: Array<{
    id: string
    title: string
    city: string
    status: string
  }> = [] // replace with loader data

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

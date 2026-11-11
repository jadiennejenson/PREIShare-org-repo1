export type ListingCardProps = {
  listing: {
    id: string
    title: string
    city: string
    status: string
  }
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article aria-label={listing.title}>
      <h2>{listing.title}</h2>
      <p>{listing.city}</p>
      <p>Status: {listing.status}</p>
    </article>
  )
}

import { z } from 'zod'

/** Allowed listing status values — keep in sync with the Postgres check/constraint. */
export const listingStatusSchema = z.enum([
  'draft',
  'active',
  'under_contract',
  'closed',
])

export const createListingSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  description: z.string().trim().max(5000).optional().default(''),
  address_line1: z.string().trim().min(1, 'Address is required').max(300),
  city: z.string().trim().min(1, 'City is required').max(120),
  state: z.string().trim().min(2, 'State is required').max(2),
  postal_code: z.string().trim().min(3, 'Postal code is required').max(20),
  price: z.coerce.number().nonnegative('Price must be zero or greater'),
  status: listingStatusSchema.default('draft'),
})

export const updateListingSchema = createListingSchema.partial().extend({
  id: z.string().uuid('Listing id must be a valid UUID'),
})

export type CreateListingInput = z.infer<typeof createListingSchema>
export type UpdateListingInput = z.infer<typeof updateListingSchema>

import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '~/lib/supabase/server'
import { requireSessionUser } from '~/lib/auth/session'
import {
  createListingSchema,
  updateListingSchema,
  type CreateListingInput,
  type UpdateListingInput,
} from '~/lib/listings/schema'

/**
 * @module listings
 * Exports:
 *   - createListing: Create a new property listing (server action)
 *   - updateListing: Update an existing property listing (server action)
 */

export const createListing = createServerFn({ method: 'POST' })
  .validator((input: unknown) => createListingSchema.parse(input))
  .handler(async ({ data }): Promise<ListingMutationResult> => {
    const user = await requireSessionUser()
    if (!user) {
      return { ok: false, error: 'You must be signed in to create a listing.' }
    }

    const input = data as CreateListingInput
    const supabase = getSupabaseServerClient()

    const { data: row, error } = await supabase
      .from('property_listings')
      .insert({
        ...input,
        sponsor_id: user.id, // ownership from session only
      })
      .select('*')
      .single()

    if (error || !row) {
      return {
        ok: false,
        error: 'Could not create listing. Check your input and try again.',
      }
    }

    return { ok: true, listing: row as ListingRow }
  })

export const updateListing = createServerFn({ method: 'POST' })
  .validator((input: unknown) => updateListingSchema.parse(input))
  .handler(async ({ data }): Promise<ListingMutationResult> => {
    const user = await requireSessionUser()
    if (!user) {
      return { ok: false, error: 'You must be signed in to update a listing.' }
    }

    const { id, ...patch } = data as UpdateListingInput
    if (Object.keys(patch).length === 0) {
      return { ok: false, error: 'No fields to update.' }
    }

    const supabase = getSupabaseServerClient()
    const { data: row, error } = await supabase
      .from('property_listings')
      .update(patch)
      .eq('id', id)
      .eq('sponsor_id', user.id)
      .select('*')
      .single()

    if (error || !row) {
      return {
        ok: false,
        error: 'Could not update listing. It may not exist or you may not own it.',
      }
    }

    return { ok: true, listing: row as ListingRow }
  })
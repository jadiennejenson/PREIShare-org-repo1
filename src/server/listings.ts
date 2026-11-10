import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '~/lib/supabase/server'
import { requireSessionUser } from '~/lib/auth/session'
import {
  createListingSchema,
  updateListingSchema,
  type CreateListingInput,
  type UpdateListingInput,
} from '~/lib/listings/schema'

export type ListingRow = {
  id: string
  sponsor_id: string
  title: string
  description: string | null
  address_line1: string
  city: string
  state: string
  postal_code: string
  price: number
  status: string
  created_at: string
  updated_at: string
}

export type ListingsResult =
  | { ok: true; listings: ListingRow[] }
  | { ok: false; error: string }

export type ListingMutationResult =
  | { ok: true; listing: ListingRow }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }

/** Loader: listings for the signed-in sponsor only (RLS + session). */
export const listMyListings = createServerFn({ method: 'GET' }).handler(
  async (): Promise<ListingsResult> => {
    const user = await requireSessionUser()
    if (!user) {
      return { ok: false, error: 'You must be signed in to view listings.' }
    }

    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from('property_listings')
      .select('*')
      .eq('sponsor_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return { ok: false, error: 'Could not load listings. Try again.' }
    }

    return { ok: true, listings: (data ?? []) as ListingRow[] }
  },
)

/** Action: create a listing owned by the session user — never trust body.sponsor_id. */
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

/** Action: update only if the row is visible under RLS for this sponsor. */
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

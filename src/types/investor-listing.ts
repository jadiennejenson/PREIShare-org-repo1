import type { Address } from './address';
import type { FinancialSummary } from './financial-summary';
import type { InvestorContact } from './investor-contact';
import type { Ownership } from './ownership';
import type { PropertyType } from './property-type';
import type { ListingStatus } from './listing-status';

/** Fields every investor listing has, regardless of status. */
export interface InvestorListingBase {
  /** Stable identity — do not reassign after create. */
  readonly id: string;
  /** Set once when the row is created. */
  readonly createdAt: string;
  /** May change when the listing is edited; still not a business key. */
  readonly updatedAt: string;

  title: string;
  propertyType: PropertyType;
  address: Address;
  financials: FinancialSummary;
  contacts: InvestorContact[];
  ownership: Ownership;
}

/**
 * Discriminated union: TypeScript uses `status` to know which shape you have.
 * Example rule: `closedAt` is required only when status is 'closed'.
 */
export type InvestorListing =
  | (InvestorListingBase & {
      status: 'draft' | 'active' | 'under_contract' | 'archived';
      /** Not used unless the listing is closed. */
      closedAt?: undefined;
    })
  | (InvestorListingBase & {
      status: 'closed';
      /** ISO date string — required when the listing is closed. */
      closedAt: string;
    });

// Optional helper aliases (nice for fixtures later; keep only if names stay simple)
export type ClosedInvestorListing = Extract<InvestorListing, { status: 'closed' }>;
export type OpenInvestorListing = Exclude<InvestorListing, { status: 'closed' }>;

// src/types/index.ts
// Re-export public types so fixtures import from one place.
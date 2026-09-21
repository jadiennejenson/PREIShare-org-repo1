import type { Address } from './address';
import type { FinancialSummary } from './financial-summary';
import type { InvestorContact } from './investor-contact';
import type { Ownership } from './ownership';
import type { PropertyType } from './property-type';
import type { ListingStatus } from './listing-status';

/**
 * Core PREIshare investor listing — scalar fields only.
 * Nested types (address, financials, contacts) and unions
 * (status, property type) are added in later steps.
 */

export interface InvestorListingBase {
  /** Stable unique id for this listing (assigned by the system). */
  readonly id: string;
  /** ISO-8601 datetime string when the listing was first created. */
  readonly createdAt: string;
  /** ISO-8601 datetime string when the listing was last updated. */
  readonly updatedAt: string;

  /** Short public headline shown in search results and cards. */
  title: string;
  /** Longer plain-text description of the investment opportunity. */
  summary: string;
  /** Asking price in whole US dollars (no currency symbol). */
  askingPrice: number;
  propertyType: PropertyType;
  address: Address;
  financials: FinancialSummary;
  /** One or more people associated with this listing. */
  contacts: InvestorContact[];
  /** Must match the id of one entry in contacts. */
  primaryContactId: string;
  ownership: Ownership;
}

export type InvestorListing =
  | (InvestorListingBase & {
      status: 'draft' | 'active' | 'under_contract' | 'archived';
      closedAt?: undefined;
    })
  | (InvestorListingBase & {
      status: 'closed';
      /** ISO date string — required when the listing is closed. */
      closedAt: string;
    });

export type ClosedInvestorListing = Extract<InvestorListing, { status: 'closed' }>;
export type OpenInvestorListing = Exclude<InvestorListing, { status: 'closed' }>;
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

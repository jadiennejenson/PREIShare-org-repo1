/**
 * Core PREIshare investor listing — scalar fields only.
 * Nested types (address, financials, contacts) and unions
 * (status, property type) are added in later steps.
 */
export interface InvestorListing {
  /** Stable unique id for this listing (assigned by the system). */
  id: string;

  /** Short public headline shown in search results and cards. */
  title: string;

  /** Longer plain-text description of the investment opportunity. */
  summary: string;

  /**
   * Asking price in whole US dollars (no currency symbol).
   * Example: 450000 means $450,000.
   */
  askingPrice: number;

  /** ISO-8601 datetime string when the listing was first created. */
  createdAt: string;

  /** ISO-8601 datetime string when the listing was last updated. */
  updatedAt: string;
}

import type { ListingStatus } from "./listing-status";
import type { PropertyType } from "./property-type";
import type { Address } from "./address";
import type { FinancialSummary } from "./financial-summary";

export interface InvestorListing {
  id: string;
  title: string;
  status: ListingStatus;
  propertyType: PropertyType;
  address: Address;
  financialSummary?: FinancialSummary;
  // ...other fields you already modeled stay here;
  // do not re-declare street/city/noi as flat duplicates
}

export interface InvestorListing {
  // ...other fields from the previous step stay as they are...
  status: ListingStatus;
  propertyType: PropertyType;
  // ...
}
import type { InvestorContact } from "./investor-contact";
import type { Ownership } from "./ownership";
// ...existing imports for Address, FinancialSummary, ListingStatus, PropertyType

export interface InvestorListing {
  // ...existing fields: id, title, status, propertyType, address, financials, etc.
  /** One or more people associated with this listing. */
  contacts: InvestorContact[];
  /**
   * Must match InvestorContact.id of one entry in `contacts`.
   * TypeScript cannot fully enforce "id exists in array" alone;
   * we still type it as string so callers pass an id, not a whole loose object.
   */
  primaryContactId: string;
  ownership: Ownership;
}
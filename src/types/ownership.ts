/** Who owns the property and how ownership is described for PREIshare. */
export interface Ownership {
  /** Person or entity name shown on the listing. */
  ownerName: string;
  /** Optional free-text about splits, trusts, or co-owners. */
  notes?: string;
  /** When known, percent owned by this owner (0–100). */
  ownershipPercent?: number;
}

// Relevant shape inside src/types/investor-listing.ts (other fields omitted)
import type { InvestorContact } from "./investor-contact";
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
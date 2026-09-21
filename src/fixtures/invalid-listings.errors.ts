// src/fixtures/invalid-listings.errors.ts
// INTENTIONAL TYPE ERRORS — this file should NOT typecheck cleanly.
// Each export demonstrates a failure mode documented in
// docs/type-safety/expected-type-errors.md

import type { InvestorListing } from "../types";

// Case: status spelled in a way the union does not allow
export const invalidStatusSpelling: InvestorListing = {
  id: "listing-bad-status",
  createdAt: "2026-09-01T12:00:00Z",
  updatedAt: "2026-09-01T12:00:00Z",
  title: "Downtown duplex offering",
  // @ts-expect-error intentional invalid status spelling
  status: "availble", // should error: not in ListingStatus union
  propertyType: "multi_family",
  address: {
    street: "100 Main St",
    city: "Austin",
    region: "TX",
    postalCode: "78701",
    country: "US"
  },
  financials: {
    askingPrice: 450000,
    noi: 32000,
    capRate: 0.071,
    occupancyRate: 0.92
  },
  contacts: [
    { id: "contact-bad-status", fullName: "Alex Rivera", email: "alex@example.com", role: "primary" }
  ],
  ownership: { ownerName: "Rivera Holdings", ownershipPercent: 100 }
};

// Case: required nested address field missing
export const missingAddressCity = {
  id: "listing-missing-city",
  createdAt: "2026-09-02T12:00:00Z",
  updatedAt: "2026-09-02T12:00:00Z",
  title: "Lakeview fourplex",
  status: "draft",
  propertyType: "multi_family",
  // @ts-expect-error intentional missing required city
  address: {
    street: "22 Lake Rd",
    // city missing on purpose
    region: "TX",
    postalCode: "78702",
    country: "US"
  },
  financials: {
    askingPrice: 520000,
    noi: 0,
    capRate: 0,
    occupancyRate: 0
  },
  contacts: [
    { id: "contact-missing-city", fullName: "Sam Lee", email: "sam@example.com", role: "primary" }
  ],
  ownership: { ownerName: "Lee Capital", ownershipPercent: 100 }
} satisfies InvestorListing;

// Case: numeric money field given as a string
export const priceAsString: InvestorListing = {
  id: "listing-price-string",
  createdAt: "2026-09-03T12:00:00Z",
  updatedAt: "2026-09-03T12:00:00Z",
  title: "Cedar Street portfolio slice",
  status: "active",
  propertyType: "single_family",
  address: {
    street: "9 Cedar St",
    city: "Dallas",
    region: "TX",
    postalCode: "75201",
    country: "US"
  },
  financials: {
    // @ts-expect-error intentional string value for a numeric money field
    askingPrice: "610000", // should error: string is not number
    noi: 41000,
    capRate: 0.067,
    occupancyRate: 0.9
  },
  contacts: [
    { id: "contact-price-string", fullName: "Jordan Kim", email: "jordan@example.com", role: "primary" }
  ],
  ownership: { ownerName: "Kim Investors", ownershipPercent: 100 }
};

// --- docs/type-safety/expected-type-errors.md (structure) ---
// # Expected type errors for invalid investor listings
//
// | id | business problem | rule that should catch it | expected TS kind |
// |----|------------------|---------------------------|------------------|
// | invalidStatusSpelling | status typo would break filters | ListingStatus string union | invalid string literal |
// | missingAddressCity | city required for display/maps | Address required fields | missing property |
// | priceAsString | money must be numeric for math | FinancialSummary.askingPrice: number | type not assignable |
//
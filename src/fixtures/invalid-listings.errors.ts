// src/fixtures/invalid-listings.errors.ts
// INTENTIONAL TYPE ERRORS — this file should NOT typecheck cleanly.
// Each export demonstrates a failure mode documented in
// docs/type-safety/expected-type-errors.md

import type { InvestorListing } from "../types";

// Case: status spelled in a way the union does not allow
export const invalidStatusSpelling: InvestorListing = {
  id: "listing-bad-status",
  title: "Downtown duplex offering",
  status: "active",
  propertyType: "multifamily",
  address: {
    line1: "100 Main St",
    city: "Austin",
    state: "TX",
    postalCode: "78701",
    country: "US"
  },
  financials: {
    askingPrice: 450000,
    noi: 30000,
    capRate: 0.067,
    currency: "USD"
  },
  contacts: [
    {
      id: "contact-alex-rivera",
      name: "Alex Rivera",
      email: "alex@example.com",
      role: "listing_agent"
    }
  ],
  ownership: {
    entityName: "Rivera Holdings",
    ownershipPercent: 100,
    isPrimary: true
  }
};

// Case: required nested address field missing

// --- docs/type-safety/expected-type-errors.md (structure) ---
// # Expected type errors for invalid investor listings
//
// | id | business problem | rule that should catch it | expected TS kind |
// |----|------------------|---------------------------|------------------|
// | invalidStatusSpelling | status typo would break filters | ListingStatus string union | invalid string literal |
// | missingAddressCity | city required for display/maps | Address required fields | missing property |
// | priceAsString | money must be numeric for math | FinancialSummary.askingPrice: number | type not assignable |
//
// Notes:
// - src/fixtures/invalid-listings.errors.ts is supposed to fail typechecking.
// - Do not "fix" those errors; update this table if you add/remove cases.
// - Happy-path samples live in src/fixtures/sample-investor-listings.ts and must stay valid.
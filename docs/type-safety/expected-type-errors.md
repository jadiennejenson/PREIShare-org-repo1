# Expected type errors for invalid investor listings

This document describes the type errors that invalid investor-listing fixtures are expected to demonstrate. The fixture file is intentionally not a clean typecheck target.

| ID | Business problem | Rule that should catch it | Expected TypeScript diagnostic |
| --- | --- | --- | --- |
| `invalidStatusSpelling` | A status typo would break filters and lifecycle-specific UI. | `ListingStatus` is a closed string union: `draft`, `active`, `under_contract`, `closed`, or `archived`. | Invalid string literal |
| `missingAddressCity` | An address without a city cannot support listing display, maps, or location filtering. | `Address.city` is a required string field. | Missing required property |
| `priceAsString` | A string price cannot be used safely for sorting, arithmetic, or financial summaries. | `FinancialSummary.askingPrice` must be a number when provided. | Type not assignable |

## Validation notes

- `src/fixtures/invalid-listings.errors.ts` is intentionally expected to fail typechecking; do not fix those examples just to make the package pass.
- Update this table when invalid cases are added or removed from that fixture.
- Happy-path samples live in `src/fixtures/sample-investor-listings.ts` and must remain valid against the shared `InvestorListing` type.
- The shared model is re-exported from `src/types/index.ts`, so fixtures should import from the shared types entrypoint rather than redefining the shape locally.

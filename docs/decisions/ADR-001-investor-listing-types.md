# ADR-001: Investor listing TypeScript types (PREIshare)

- **Status:** Accepted (Sprint 2, Topic 1)
- **Date:** 2026-09-20
- **Owners:** PREIshare types working group (learner + coach)
- **Related code:** `src/types/index.ts` (barrel export for the public types)

## Context

PREIshare investor listings were previously passed around as loose objects and ad-hoc JSON. That allowed production bugs such as missing prices, status values spelled several ways, and nested address fields that disappeared on some screens. Sprint 2 Topic 1 models the listing domain with strict TypeScript types so invalid shapes fail at compile time—before users see them.

The original business inputs for the model were documented in:

- Domain brief: `docs/domain/investor-listing-domain-brief.md` (not present in this checkout)
- Field inventory: `docs/domain/listing-field-inventory.md` (not present in this checkout)
- Safety evidence: `docs/type-safety/expected-type-errors.md` and `docs/type-safety/verification-checklist.md`

## Decision

We adopt a small, explicit types package centered on `InvestorListing`, with supporting types for status, property type, address, financial summary, investor contacts, and ownership. `InvestorListing` requires identity timestamps, title, property type, address, financials, contacts, and one ownership object. Call sites should import from `src/types/index.ts` rather than reaching into individual files when possible.

## Type choices mapped to business rules

| Business rule (plain language) | Type choice | Why this shape |
| --- | --- | --- |
| A listing must always have core identity and lifecycle fields | Required `id`, `createdAt`, `updatedAt`, title, property type, address, financials, contacts, and ownership properties on `InvestorListing` | Optional core fields reintroduce missing-record data bugs; `FinancialSummary.askingPrice` remains optional until the product makes it universally required |
| Listing workflow status may only be a known set of values | String union type for listing status (for example draft / active / under contract / closed / archived—use the exact members in `src/types/listing-status.ts`) | Free `string` allows typos and three spellings of the same status |
| Property category is a closed vocabulary | String union type for property type | Same reason as status: closed set, compile-time exhaustiveness |
| Street/city/region/postal data travels together | Nested `Address` object with required `street`, `city`, `region`, `postalCode`, and `country` | Prevents half-present address fields and keeps location shape consistent across screens |
| Money rollups are a structured summary, not one anonymous number | Nested `FinancialSummary` with required `noi`, `capRate`, and `occupancyRate`, plus optional `askingPrice` | Keeps financial concepts grouped while documenting that asking price is not yet required by the current type |
| Who to contact about a listing is structured data | `InvestorContact` (and arrays where multiple contacts are allowed) | Stops “contact” from being a random string blob |
| Ownership stakes/relationships are first-class | One required `Ownership` object with `ownerName`, optional `notes`, and optional `ownershipPercent` | Captures the current owner relationship without inventing a collection shape |
| Some statuses carry different required details | Discriminated union: `closed` requires `closedAt`; other allowed statuses must not provide it | Lets TypeScript require the right fields for the right status |
| Listing identity timestamps should not be reassigned casually in app code | `readonly` on `id`, `createdAt`, and `updatedAt` | Signals immutability intent for identity and audit fields at the type level |

## Alternatives considered

1. **Keep listings as `string` / `any` / untyped JSON**  
   Rejected: fastest short term, but pushes every bug to runtime and production.

2. **One giant flat interface with dozens of optional fields**  
   Rejected: optional everything recreates missing-field bugs; flat shapes hide address/financial structure.

3. **Enums (`enum`) for every closed vocabulary**  
   Deferred/avoided for this beginner package in favor of string union types, which stay simple to read in fixtures and error messages. Revisit only if runtime enum objects become a clear need.

4. **Runtime schema library (for example Zod) as the source of truth in this topic**  
   Out of scope for Topic 1. Compile-time types and fixtures come first; runtime validators can wrap the same decisions later.

## Consequences

**Positive**

- Invalid listings in `src/fixtures/invalid-listings.errors.ts` demonstrate the compiler rejecting bad data (see `docs/type-safety/expected-type-errors.md`).
- Valid samples in `src/fixtures/sample-investor-listings.ts` prove a realistic listing can be constructed.
- `npm run typecheck` is the shared gate before merge; intentional failures in the invalid fixture are marked with `@ts-expect-error`.

**Tradeoffs**

- Authors must use exact union members; “almost right” status strings fail typecheck by design.
- Nested objects mean fixtures and future API mappers must supply whole `Address` / `FinancialSummary` objects, not scattered fields.
- Discriminated/readonly choices add a small learning curve for beginners in exchange for stronger guarantees.

## Out of scope for Sprint 2 Topic 1

- Database tables, migrations, or Supabase row types; Supabase is product context only and is not integrated in this checkout
- HTTP API routes and request/response validation at runtime
- React form components and client-side validation UX
- Authentication, authorization, and multi-tenant rules
- pgvector / search indexing fields; the current listing model contains no verified search integration
- Changing production data or deploying a service

## Follow-ups (for the next topic / implementers)

1. Import domain types from `src/types/index.ts` when building UI or API layers.
2. Keep fixtures green under the typecheck script before expanding the model.
3. If product adds a new listing status or property type, extend the **union** and update fixtures + this ADR—do not widen the field back to free `string`.
4. Consider runtime validators that mirror these types once API boundaries land.
5. Use `docs/type-safety/verification-checklist.md` as the acceptance gate when types change.

## Evidence links

- Domain brief: referenced by the original topic materials, but not present in this checkout
- Field inventory: referenced by the original topic materials, but not present in this checkout
- Expected compile errors: `docs/type-safety/expected-type-errors.md`
- Verification checklist: `docs/type-safety/verification-checklist.md`
- Types entrypoint: `src/types/index.ts`
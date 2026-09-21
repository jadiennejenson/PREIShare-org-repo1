
# Investor listing type-safety verification

Use this checklist after changing the shared investor-listing types or fixtures.

## Standard check

From the repository root, install dependencies if needed and run:

```bash
npm install
npm run typecheck
```

The command should pass for the valid shared types and happy-path fixtures. It checks the TypeScript source included by `tsconfig.json` with strict compiler options enabled.

## Valid fixture review

- [ ] `src/types/index.ts` re-exports the public investor-listing types.
- [ ] `src/fixtures/sample-investor-listings.ts` imports the shared `InvestorListing` type instead of redefining it.
- [ ] Valid samples cover the supported status and property-type values.
- [ ] Nested address, financial, contact, and ownership values match their shared interfaces.

## Intentional invalid cases

`src/fixtures/invalid-listings.errors.ts` documents values that should be rejected by TypeScript. Compare its cases with `docs/type-safety/expected-type-errors.md` and do not remove an intentional error merely to make the example compile.

When checking an invalid case manually, run TypeScript against the case and confirm the diagnostic names the expected field or union value. Do not use the invalid fixture as the package's normal green typecheck target unless the examples are isolated from the main `tsconfig.json` include set.

## Before handoff

- [ ] `npm run typecheck` passes for the normal project source.
- [ ] The expected-error table matches the invalid fixture cases.
- [ ] No generated output, secrets, or unrelated application changes were added.
- [ ] The shared type remains the source used by UI, API, and persistence work in later topics.

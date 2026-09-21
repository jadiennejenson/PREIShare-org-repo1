# Investor listing types

This directory contains shared TypeScript models used by PREIshare investor listing features.

TypeScript checks the shape of objects while the code is being developed. That means a missing field, an incorrectly shaped nested value, or a misspelled allowed status can be reported before the app runs. These checks protect code that displays listings, sorts by price, or filters by status, but data received from an API still needs runtime validation.

Keep reusable domain shapes here instead of redefining them in fixtures or UI modules. The domain rules and field meanings belong in the [investor listing domain brief](../../docs/domain/investor-listing-domain-brief.md), which is the source of truth for these models.

Run the package typecheck with:

```bash
npm run typecheck
```

# Sprint 2 Topic 1 — Types Handoff: PREIshare Investor Listings

**Audience:** next sprint topic owners, PREIshare eng, product partners  
**Status:** Topic 1 (TypeScript foundations) complete — implementation topics not started  
**Date:** [fill in]

## 1. Client story recap

PREIshare was shipping investor listing data as loose objects and ad-hoc JSON. That let bad data reach production: missing prices, status strings spelled several ways, and nested address fields that disappeared on some screens. Sprint 2 Topic 1 modeled investor listings with **strict TypeScript types** so those mistakes fail at **compile time** (while the developer is still building) instead of in front of users.

## 2. What we shipped this topic

| Deliverable | Path | Why it matters |
| --- | --- | --- |
| Domain brief + field inventory | `docs/domain/` (from Topic 1 early steps) | Business rules before code |
| Types package (barrel) | `src/types/index.ts` | Single import surface for `InvestorListing` and related types |
| Core + nested + relationship types | `src/types/*.ts` | Interfaces, unions, nested objects, contacts, ownership |
| Valid fixtures | `src/fixtures/sample-investor-listings.ts` | Prove good listings type-check |
| Invalid / error cases + expected errors | `src/fixtures/invalid-listings.errors.ts`, `docs/type-safety/expected-type-errors.md` | Prove bad data is rejected |
| Typecheck script + verification checklist | `package.json`, `docs/type-safety/verification-checklist.md` | Repeatable safety gate |
| Decision record | `docs/decisions/ADR-001-investor-listing-types.md` | Stakeholder-facing type decisions |

**How to verify locally:** follow `docs/type-safety/verification-checklist.md` and run the project typecheck script defined in `package.json` (for example `npm run typecheck`). Valid fixtures must pass; intentional invalid cases must remain type errors as documented.

## 3. What we must NOT claim is done yet

- No TanStack Start UI or listing forms are built or wired to these types.
- No Supabase / PostgreSQL tables, migrations, or pgvector work from this model.
- No HTTP API routes, request/response validation at the network boundary, or auth rules.
- No runtime schema library (for example Zod) is required by this topic unless a later topic adds one on purpose.
- No production deployment of listing create/edit flows.

If a demo only shows green typecheck on fixtures, say: **“the data model is typed and verified; product surfaces are next.”**

## 4. Next sprint pickups (use the types — do not reinvent them)

### A. TanStack Start forms (UI)

- Build create/edit listing forms whose field names and option lists match `InvestorListing`, status unions, and property-type unions from `src/types`.
- Prefer importing types from `src/types/index.ts` rather than copying string literals into components.
- Use `src/fixtures/sample-investor-listings.ts` as realistic form defaults / Story-style examples.
- Acceptance sketch: a form cannot submit a status outside the union without a type or validation failure during development.

### B. Supabase / PostgreSQL schema alignment (data)

- Draft table columns that mirror required listing fields, nested address/financial concepts (as columns or related tables), and constrained status/property-type values.
- Document any intentional difference between TypeScript optional fields and database NULL rules in a follow-up ADR—do not silently diverge.
- Plan indexes and relationships (contacts, ownership) from the same domain brief that drove the types.
- Acceptance sketch: a row that would fail `InvestorListing` assignment is also rejected by DB constraints or insert validation.

### C. API boundaries (server)

- Define request/response shapes for list/get/create/update that re-export or compose `src/types` instead of anonymous JSON.
- Keep write endpoints from accepting free-form status strings; align with the same unions tightened in Topic 1.
- Add tests that send fixture-shaped payloads (valid) and known-bad payloads (invalid) at the boundary.
- Acceptance sketch: API handlers never widen listing status back to plain `string` without an explicit, documented escape hatch.

```text
Client pain (loose JSON)
        |
        v
 Domain brief + field inventory
        |
        v
 Strict TS types + fixtures + typecheck + ADR-001   <-- you are here
        |
        +--> TanStack Start forms (UI)
        +--> Supabase/PostgreSQL schema (data)
        +--> API routes & validation (boundary)
```

## 5. Prompting and review self-assessment

Complete in first person (example prompts below—replace with your real habits):

- **Prompting habit that helped:** …
- **Second prompting habit that helped:** …
- **Review habit that caught an agent mistake:** …
- **What I would do differently next topic:** …
- **Confidence (1–5) explaining InvestorListing to a teammate:** …

## 6. Handoff checklist for the next owner

- [ ] Read ADR-001 and this handoff before opening a UI or SQL PR
- [ ] Import listing types from `src/types/index.ts` only
- [ ] Keep `npm run typecheck` (or the script name in `package.json`) green on valid fixtures
- [ ] Do not delete intentional invalid fixture files; they document safety
- [ ] File a new ADR if product changes allowed statuses or required fields
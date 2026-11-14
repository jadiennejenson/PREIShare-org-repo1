# PREIshare semantic search — handoff

## 1. Client story recap
PREIshare helps people discover investment properties. Keyword search fails when a buyer types intent-heavy phrases (example: “quiet cabin near water with good rental upside”) that may never appear word-for-word in a listing. This tutorial shipped a beginner slice of semantic search: property text → embedding vector → pgvector storage → similarity ranking → minimal API + search UI.

## 2. Stakeholder goals ↔ deliverables
| Stakeholder goal | What we delivered | Where to look |
| --- | --- | --- |
| Search by meaning, not only exact words | Embedding generation + similarity search | `src/lib/embeddings/`, `src/lib/property-search.ts` |
| Store vectors next to property data | pgvector-enabled schema + properties table | `supabase/migrations/20250315000000_enable_pgvector_properties.sql` |
| Rankable matches for demo queries | `match_properties` SQL + TS helper | `supabase/migrations/20250315000001_match_properties_function.sql` |
| Something stakeholders can try | API route + simple search page | `src/routes/api/properties/search.ts`, `src/routes/search.tsx` |
| Proof it works on sample listings | Seed data + verification notes | `data/sample-properties.json`, `docs/semantic-search-verification.md` |

## 3. Architectural decisions (record what you actually chose)
- **What text is embedded:** `title + description`, with the canonical input string built as `{title}\n\n{description}` and optional location summary only when it is part of the model contract.
- **Embedding dimensions:** `1536`, matching the vector column type and the TypeScript `EMBEDDING_DIMENSIONS` contract.
- **Distance / similarity metric:** cosine-style similarity, using the pgvector operator chosen in the vector-search plan and kept consistent in the SQL and helper code.
- **Top-K / match count:** default `matchCount = 5` in the search helper and API path.
- **Where embeddings are created:** app-side TypeScript generation path, then stored in Supabase PostgreSQL; the embedding provider is called from the app code, not by raw SQL alone.
- **Seed / backfill path:** `scripts/seed-property-embeddings.ts` + `data/sample-properties.json`, with the script generating a vector per sample listing and upserting it into the `properties` table.

## 4. In scope vs out of scope (this tutorial)
**In scope (done for the demo slice)**
- Sample properties with stored embeddings
- One similarity search path (SQL function + TS helper)
- Minimal API + React search page
- Documented verification of a few example queries

**Out of scope (explicit non-goals for this handoff)**
- Production auth, rate limits, or multi-tenant isolation hardening
- Hybrid keyword + vector ranking
- Filters (price, beds, location, property type) combined with vectors
- Automatic re-embed on every property update in production
- Large evaluation sets / offline quality metrics dashboards
- CI pipeline that regenerates embeddings on every PR

## 5. Demo limitations (be honest)
- Results quality depends on small sample data; odd rankings may reflect thin coverage, not a broken metric.
- Embedding provider/model and API keys must be configured; without them, generation and search fail.
- No claim of production latency, cost controls, or full PREIshare catalog coverage.
- Ranking explainability is basic (similarity score + listing text) and not a full “why this matched” UI.

## 6. How to re-run the demo (handoff checklist)
1. Apply migrations (pgvector + properties + `match_properties`).
2. Configure env vars needed for Supabase and the embedding provider.
3. Run seed/backfill so sample rows have non-null embeddings.
4. Start the app; open the search page; try queries from `docs/semantic-search-requirements.md`.
5. Compare observed ranking notes in `docs/semantic-search-verification.md`.

## 7. Next actions for later Sprint 5 work
Make these concrete enough that another learner could pick one up:

1. **Filters + vector search** — Add structured filters (for example max price, beds, city) in SQL/API without dropping semantic ranking.
2. **Hybrid search** — Combine keyword or full-text signals with vector similarity; document how scores are merged.
3. **Re-embed on update** — When description/title changes, regenerate and store the vector; define idempotent backfill for null or stale rows.
4. **Grow the evaluation set** — Expand sample listings and a fixed query list with expected “good” matches for regression checks.
5. **CI considerations** — Decide what runs in CI (migrations lint, helper tests) vs what stays manual (live embedding API calls, cost).
6. **Observability** — Log query text (carefully), latency, and top scores to debug bad rankings later.

## 8. Open questions for mentor / next owner
- Confirm final production embedding model and dimension lock-in.
- Confirm the distance metric standard for PREIshare and keep it app-wide.
- Decide ownership of embedding cost budgets and key rotation.
- Prioritize the filter set for the next stakeholder demo.

## 9. Sources used for this handoff
- `docs/semantic-search-requirements.md`
- `docs/embedding-data-model.md`
- `docs/pgvector-setup-plan.md`
- `docs/semantic-search-verification.md`
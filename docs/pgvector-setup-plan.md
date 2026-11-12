# PREIshare pgvector setup plan

## Purpose
Enable semantic property search storage in Supabase PostgreSQL using pgvector,
aligned with `docs/embedding-data-model.md`. This plan is the contract for the
SQL migration step and the required schema verification—no application search UI work here.

## Source of truth
- Data model doc: `docs/embedding-data-model.md`
- Table (from model): `properties`
- Embedding column (from model): `embedding`
- Embedding dimension (from model): `1536`  <!-- replace with the actual model dimension once chosen -->
- Distance / ranking style for the demo: cosine-style similarity, using the pgvector operator documented in the vector-search notes

## Migration goals (what “done” means)
1. pgvector extension is available in the database.
2. `properties` table exists with listing fields from the data model plus a
   vector column with the fixed dimension above.
3. It is valid for `embedding` to be `NULL` until a backfill or seed job runs.
4. A beginner demo can run a similarity query later (if the SQL helper is a follow-up migration, say so clearly).
5. Verification queries prove extension + table + vector column shape.

## Safe migration order (must not be reordered)
| Order | Step | Why this order |
|------:|------|----------------|
| 1 | Enable extension `vector` (pgvector) | Vector column types and operators do not exist until the extension is installed. |
| 2 | Create `properties` table (or alter if it already exists) including `embedding vector(<dimension>)` and the other model columns | Table/column creation depends on the extension. |
| 3 | (Optional for tiny demos) Add a vector index | Indexes are not required to store vectors; add only after the column exists. For very small sample data, a sequential scan is fine. |
| 4 | Run verification SQL | Confirms the schema before any seed or app code. |

**Do not** create vector columns before enabling the extension.  
**Do not** invent a second dimension or a second embedding column name.  
**Do not** treat `NULL` embeddings as a final state for production search.

## Similarity approach (beginner demo)
- **Choice:** Use cosine-style similarity ranking consistently in later search SQL.
- **Why:** Buyers care about “meaning closeness,” and cosine-style scoring is a common default for text embeddings.
- **Tradeoff:** Exact scans over a handful of sample rows are simple and straightforward. Approximate indexes help at larger scale but are not required for the tutorial sample set.
- **Important:** The SQL and API must use the same distance/similarity convention as the vector-search notes. If the project later standardizes on cosine, then all query and comparison logic should match that.

## Index recommendation
- **Demo scale (tens of rows):** Index optional; document “no index required for sample seed.”
- **If adding an index anyway:** Create it only after the embedding column exists; many rows should be non-null before the index is useful; keep the plan’s dimension and distance style aligned with the index operator class.

## Environment values (high level — no secrets in this file)
List names only; real values live in local env or the Supabase dashboard:
- `SUPABASE_URL` — project API URL
- `SUPABASE_SERVICE_ROLE_KEY` or a migration-friendly DB URL — used by trusted server/seed paths; never expose to the browser
- `DATABASE_URL` or Supabase DB connection string — if migrations run via CLI
- Embedding provider API key name (for example `OPENAI_API_KEY`) — needed when generating vectors later, not required to enable pgvector itself

## Verification queries (run after migration)
Write the intent of each check; the implementation step can later refine the exact SQL:
1. Show that extension `vector` is installed.
2. Describe `properties` and confirm `embedding` is type `vector` with the planned dimension.
3. Insert or select a row with `NULL` embedding to prove nulls are allowed during early lifecycle states.
4. Compare two literal vectors with the chosen operator to prove pgvector operators work.

Example sketch (illustrative—match the chosen dimension):
```sql
-- 1) extension present
select * from pg_extension where extname = 'vector';

-- 2) column shape (Supabase SQL editor)
select column_name, data_type, udt_name
from information_schema.columns
where table_name = 'properties';

-- 3) nullability smoke test
select *
from properties
limit 1;

-- 4) operator smoke test (dimension must match)
-- select '[1,2,3]'::vector(3) <=> '[1,2,4]'::vector(3) as distance;
```

## Out of scope for this migration plan
- Generating real embeddings for listings (later module/seed steps)
- Search API routes and React UI
- Production RLS policies beyond the model already required
- Hybrid keyword + vector ranking, filters, or re-ranking
- Production ops, model billing, or high-scale batch jobs

## Handoff to next step
The next coding agent must implement only the ordered goals above, using names and dimension from the data model doc, and must not silently change vector size or table name.
The migration should be readable enough for a learner to understand why extension setup, fixed dimensions, and consistent distance metric all matter before any semantic search is attempted.
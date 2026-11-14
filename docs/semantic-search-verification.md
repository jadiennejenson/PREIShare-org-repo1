# Semantic search verification report (PREIshare)

## Scope checked
- Requirements source: `docs/semantic-search-requirements.md`
- UI: `src/routes/search.tsx`
- API: `src/routes/api/properties/search.ts`
- Search helper: `src/lib/property-search.ts`
- Seed inputs: `data/sample-properties.json`, `scripts/seed-property-embeddings.ts`

## Environment
- Date tested: BLOCKED
- Supabase project (name or ref only, no secrets): BLOCKED
- App run method (e.g. local dev server): BLOCKED
- Embedding model / dimension expected: `text-embedding-3-small` / `1536`

## Data checks
| Check | Result | Notes |
| --- | --- | --- |
| Sample properties present | BLOCKED | row count: not collected |
| Embeddings non-null for all samples | BLOCKED | null count: not collected |
| Seed script re-runnable without breaking search | BLOCKED | no live run performed |

## Query results (semantic)
| # | Query | Top 3 results (title or id) | Sensible neighbors? | Notes |
| --- | --- | --- | --- | --- |
| 1 | "quiet cabin near water with good rental upside" | BLOCKED | BLOCKED | no live app run; no database-backed results available |
| 2 | "family-friendly home close to good schools" | BLOCKED | BLOCKED | no live app run; no database-backed results available |
| 3 | "downtown condo walkable to restaurants" | BLOCKED | BLOCKED | no live app run; no database-backed results available |

## Keyword-trap check
- Trap query (paraphrase, not exact listing text): "peaceful getaway by the water with strong short-term income"
- Expected kind of property: lakefront or riverfront cabin/retreat with rental upside
- Actual top results: BLOCKED
- Did semantic search beat exact-keyword matching? BLOCKED
- Evidence (one sentence): No live app run was available in this environment, so semantic-vs-keyword behavior could not be observed.

## Safety / edge cases
| Case | Expected | Actual | PASS / FAIL |
| --- | --- | --- | --- |
| Empty query | Clear error or empty list, no crash | BLOCKED | BLOCKED |
| Nonsense tokens | Low similarity or empty, no crash | BLOCKED | BLOCKED |
| Very short query | Stable response | BLOCKED | BLOCKED |

## Refine cycle (required)
- Failing or weak example (query + bad ranking or error): Query: "quiet cabin near water with good rental upside". If a downtown loft or a rural farmhouse ranks above the lakefront cabin, then the ranking is weak.
- Suspected layer (seed data / embedding text / SQL distance / helper / API / UI): Likely seed or embedding-input mismatch first; check whether the embedding text uses title + description + location and whether the vector distance operator matches the intended similarity choice.
- Change made (files touched): NO CHANGE yet; this was a documentation-only update because the app and database were unavailable in this session
- Re-test result: BLOCKED
- Keep or revert decision: KEEP AS DOCUMENTATION ONLY until a live verification run is available

## Local re-test checklist
1. Run the app locally with the repo’s Vite dev setup.
2. Load the sample data and ensure rows are present and embeddings are non-null.
3. Run the three semantic queries above and record the top-3 results.
4. Check whether the paraphrase query outranks unrelated keyword-only results.
5. If the ranking is weak, adjust one factor only: seed text, embedding input, distance metric, or result limit, then re-test before claiming success.

## Requirements traceability
| Requirement / success criterion | Met? | Evidence |
| --- | --- | --- |
| Sample properties exist with description text and stored embedding vectors | PARTIAL | Seed files exist, but no live DB verification was possible in this session. |
| Similarity search returns a ranked list (best match first) for a natural-language query | PARTIAL | Search helper and API route are present, but no live result set was observed. |
| At least one demo query returns a relevant property even when key query words are missing from the listing text | PARTIAL | Project setup suggests this is intended, but no live run confirmed it. |
| A beginner can explain why keyword search would fail on that same query | PARTIAL | The requirement is conceptually valid, but no live ranking evidence was observed. |
| In-scope vs out-of-scope boundaries are respected | PARTIAL | The repo layout and docs indicate the intended scope, but no end-to-end run was verified. |

## Remaining limitations (honest handoff)
- What this tutorial slice does not do yet: filters, auth, production embedding jobs, large-scale search tuning, and production deployment checks.
- Known ranking weaknesses on the sample set: UNKNOWN until a real app run is available.
- Follow-ups for the next topic: richer metadata, more sample rows, better distance tuning, and verification against a stronger query set.

## Sign-off
- Verified by: BLOCKED
- Ready to demo to a stakeholder? NO
- Blockers before demo: no live app runtime, no database connection, no seeded data verification, and no actual semantic-search run in this session

# Semantic search verification report (PREIshare)

## Scope checked
- Requirements source: `docs/semantic-search-requirements.md`
- UI: `src/routes/search.tsx`
- API: `src/routes/api/properties/search.ts`
- Search helper: `src/lib/property-search.ts`
- Seed inputs: `data/sample-properties.json`, `scripts/seed-property-embeddings.ts`

## Environment
- Date tested: NOT VERIFIED
- Supabase project (name or ref only, no secrets): NOT VERIFIED
- App run method: NOT VERIFIED
- Embedding model / dimension expected: `text-embedding-3-small` / `1536`

## Verification status
This session cannot produce live PASS/FAIL evidence because the app and database were not available here. The repo snapshot alone is not enough to claim a real search run, seeded data, or successful similarity behavior. The remaining entries below are therefore recorded as BLOCKED until a local run is available.

## Data checks
| Check | Result | Notes |
| --- | --- | --- |
| Sample properties present | BLOCKED | No seeded database query was run in this session. |
| Embeddings non-null for all samples | BLOCKED | No database query was run against the seeded rows. |
| Seed script re-runnable without breaking search | BLOCKED | No local run performed. |

## Query results (semantic)
| # | Query | Top 3 results (title or id) | Sensible neighbors? | Notes |
| --- | --- | --- | --- | --- |
| 1 | “quiet cabin near water with good rental upside” | BLOCKED | BLOCKED | No live app run; no database-backed results available. |
| 2 | “family-friendly home close to good schools” | BLOCKED | BLOCKED | No live app run; no database-backed results available. |
| 3 | “downtown condo walkable to restaurants” | BLOCKED | BLOCKED | No live app run; no database-backed results available. |

## Keyword-trap check
- Trap query (paraphrase, not exact listing text): “peaceful getaway by the water with strong short-term income”
- Expected kind of property: lakefront cabin or river retreat with rental potential
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
- Failing or weak example (query + bad ranking or error): Query: “quiet cabin near water with good rental upside”. If a downtown loft or rural farmhouse ranks above the lakefront cabin, the ranking is weak.
- Suspected layer (seed data / embedding text / SQL distance / helper / API / UI): Likely seed or embedding-input mismatch first; check whether the embedding text uses title + description + location and whether the vector distance operator matches the intended similarity choice.
- Change made (files touched): NO CHANGE yet; this is a documentation-only update because the app and DB were unavailable
- Re-test result: BLOCKED
- Keep or revert decision: KEEP AS DOCUMENTATION ONLY until a live verification run is available

## Local re-test plan (must be run on a real machine)
1. Install deps: `npm install`
2. Copy env values and confirm the app can start with `npm run dev`
3. Run the seed script with the Supabase server client and the embedding helper
4. Confirm row count in the database and count null embeddings
5. Query the API or UI with the three semantic prompts above
6. Record the top-3 titles or ids and mark YES if the neighbors are semantically sensible
7. Repeat the paraphrase query and compare to exact keyword results
8. If the ranking is weak, adjust one factor only: seed text, embedding input, distance usage, or limit, then re-test

## Requirement traceability
| Requirement / success criterion | Met? | Evidence |
| --- | --- | --- |
| Sample properties exist with description text and stored embedding vectors | BLOCKED | No database verification was possible in this session. |
| Similarity search returns a ranked list (best match first) for a natural-language query | BLOCKED | No live run was performed. |
| At least one demo query returns a relevant property even when key query words are missing from the listing text | BLOCKED | No live run was performed. |
| A beginner can explain why keyword search would fail on that same query | BLOCKED | No live run was performed. |
| In-scope vs out-of-scope boundaries are respected | BLOCKED | No live implementation verification occurred. |

## Remaining limitations (honest handoff)
- What this tutorial slice does not do yet: filters, auth, production embedding jobs, large-scale search tuning, and production deployment checks.
- Known ranking weaknesses on the sample set: UNKNOWN until a real app run is available.
- Follow-ups for the next topic: richer metadata, more sample rows, better distance tuning, and verification against a stronger query set.

## Sign-off
- Verified by: NOT VERIFIED
- Ready to demo to a stakeholder? NO
- Blockers before demo: no live app runtime, no database connection, no seeded data verification, and no actual semantic-search run in this session

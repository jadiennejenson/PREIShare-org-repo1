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
- App run method (e.g. local dev server): NOT VERIFIED
- Embedding model / dimension expected: NOT VERIFIED

## Data checks
| Check | Result | Notes |
| --- | --- | --- |
| Sample properties present | NOT VERIFIED | row count: not collected |
| Embeddings non-null for all samples | NOT VERIFIED | null count: not collected |
| Seed script re-runnable without breaking search | NOT VERIFIED | not run yet |

## Query results (semantic)
| # | Query | Top 3 results (title or id) | Sensible neighbors? | Notes |
| --- | --- | --- | --- | --- |
| 1 | "quiet cabin near water with good rental upside" | NOT VERIFIED | NOT VERIFIED | Needs a live run against seeded rows |
| 2 | "family-friendly home close to good schools" | NOT VERIFIED | NOT VERIFIED | Needs a live run against seeded rows |
| 3 | "downtown condo walkable to restaurants" | NOT VERIFIED | NOT VERIFIED | Needs a live run against seeded rows |

## Keyword-trap check
- Trap query (paraphrase, not exact listing text): "peaceful getaway by the water with strong short-term income"
- Expected kind of property: lakefront or riverfront cabin/retreat with rental upside
- Actual top results: NOT VERIFIED
- Did semantic search beat exact-keyword matching? NOT VERIFIED
- Evidence (one sentence): Not verified yet; no live seed + app run has been recorded.

## Safety / edge cases
| Case | Expected | Actual | PASS / FAIL |
| --- | --- | --- | --- |
| Empty query | Clear error or empty list, no crash | NOT VERIFIED | NOT VERIFIED |
| Nonsense tokens | Low similarity or empty, no crash | NOT VERIFIED | NOT VERIFIED |
| Very short query | Stable response | NOT VERIFIED | NOT VERIFIED |

## Refine cycle (required)
- Failing or weak example (query + bad ranking or error): NOT VERIFIED
- Suspected layer (seed data / embedding text / SQL distance / helper / API / UI): NOT VERIFIED
- Change made (files touched): NOT VERIFIED
- Re-test result: NOT VERIFIED
- Keep or revert decision: HOLD until a real run is available

## Requirements traceability
| Requirement / success criterion | Met? | Evidence |
| --- | --- | --- |
| Sample properties exist with description text and stored embedding vectors | NOT VERIFIED | No live DB evidence yet |
| Similarity search returns a ranked list (best match first) for a natural-language query | NOT VERIFIED | No live run yet |
| At least one demo query returns a relevant property even when key query words are missing from the listing text | NOT VERIFIED | No live run yet |
| A beginner can explain why keyword search would fail on that same query | NOT VERIFIED | No live run yet |
| In-scope vs out-of-scope boundaries are respected | NOT VERIFIED | Not yet exercised in a live run |

## Remaining limitations (honest handoff)
- What this tutorial slice does not do yet: filters, auth, production embedding jobs, scale testing, and production deployment checks.
- Known ranking weaknesses on the sample set: not yet measured.
- Follow-ups for the next topic: richer metadata, more sample rows, distance tuning, and live verification against a stronger query set.

## Sign-off
- Verified by: NOT VERIFIED
- Ready to demo to a stakeholder? NO
- Blockers before demo: no live app runtime, no seeded database verification, no actual semantic-search result set

## Local re-test checklist
1. Run the app locally with the repo’s Vite dev setup.
2. Load the sample data and ensure rows are present and embeddings are non-null.
3. Run the three semantic queries above and record top-3 results.
4. Check whether the paraphrase query outranks unrelated keyword-only results.
5. If the ranking is weak, adjust one layer only (seed text, embedding input, distance metric, or result limit), then re-test before claiming success.

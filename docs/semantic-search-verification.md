# Semantic search verification report (PREIshare)

## Scope checked
- Requirements source: `docs/semantic-search-requirements.md`
- UI: `src/routes/search.tsx`
- API: `src/routes/api/properties/search.ts`
- Search helper: `src/lib/property-search.ts`
- Seed inputs: `data/sample-properties.json`, `scripts/seed-property-embeddings.ts`

## Environment
- Date tested: TBD
- Supabase project (name or ref only, no secrets): local demo project / project ref TBD
- App run method: `npm run dev`
- Embedding model / dimension expected: `text-embedding-3-small` / `1536`

## Data checks
| Check | Result | Notes |
| --- | --- | --- |
| Sample properties present | TBD | row count: TBD |
| Embeddings non-null for all samples | TBD | null count: TBD |
| Seed script re-runnable without breaking search | TBD | Confirm after a clean run |

## Query results (semantic)
| # | Query | Top 3 results (title or id) | Sensible neighbors? | Notes |
| --- | --- | --- | --- | --- |
| 1 | “quiet cabin near water with good rental upside” | TBD | YES / NO | Need to confirm cabin-like listings rank above unrelated properties |
| 2 | “family-friendly home close to good schools” | TBD | YES / NO | Compare school-friendly house descriptions to urban condo results |
| 3 | “downtown condo walkable to restaurants” | TBD | YES / NO | Confirm condo lifestyle beats rural or lakefront noise trips |

## Keyword-trap check
- Trap query (paraphrase, not exact listing text): “peaceful getaway by the water with strong short-term income”
- Expected kind of property: lakefront cabin or river retreat with rental potential
- Actual top results: TBD
- Did semantic search beat exact-keyword matching? YES / NO / TBD
- Evidence (one sentence): TBD; confirm that the top matches remain conceptually relevant even when exact words differ.

## Safety / edge cases
| Case | Expected | Actual | PASS / FAIL |
| --- | --- | --- | --- |
| Empty query | Clear error or empty list, no crash | TBD | TBD |
| Nonsense tokens | Low similarity or empty, no crash | TBD | TBD |
| Very short query | Stable response | TBD | TBD |

## Refine cycle (required)
- Failing or weak example (query + bad ranking or error): TBD
- Suspected layer (seed data / embedding text / SQL distance / helper / API / UI): TBD
- Change made (files touched): TBD
- Re-test result: TBD
- Keep or revert decision: TBD

## Requirements traceability
| Requirement / success criterion | Met? | Evidence |
| --- | --- | --- |
| Sample properties exist with description text and stored embedding vectors | YES / NO / PARTIAL | TBD |
| Similarity search returns a ranked list (best match first) for a natural-language query | YES / NO / PARTIAL | TBD |
| At least one demo query returns a relevant property even when key query words are missing from the listing text | YES / NO / PARTIAL | TBD |
| A beginner can explain why keyword search would fail on that same query | YES / NO / PARTIAL | TBD |
| In-scope vs out-of-scope boundaries are respected | YES / NO / PARTIAL | TBD |

## Remaining limitations (honest handoff)
- What this tutorial slice does not do yet: filters, auth, production embedding jobs, large-scale search tuning, and production deployment checks.
- Known ranking weaknesses on the sample set: TBD; document if the dataset is too small or if certain lifestyle intents are too similar.
- Follow-ups for the next topic: richer metadata, more sample rows, better distance tuning, and verification against a stronger query set.

## Sign-off
- Verified by: TBD
- Ready to demo to a stakeholder? YES / NO / TBD
- Blockers before demo: TBD

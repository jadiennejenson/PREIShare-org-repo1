# PREIshare embedding data model

## Purpose
Software-ready design for property listings and their embedding vectors.
This doc is the contract for pgvector migrations, TypeScript types, seed/backfill, and similarity search.
It is not SQL and not application code yet.

## Sources
- docs/semantic-search-requirements.md
- docs/embeddings-learner-notes.md
- docs/vector-search-learner-notes.md

## Overview
Each property is one investment listing PREIshare can show in search.
Each property has human-readable text and numeric fields, plus one embedding column:
a fixed-length list of numbers that captures the meaning of selected listing text.
Search compares a query embedding to stored property embeddings for similarity ranking—not only exact keyword matches.

## Identifiers
| Field | Type (logical) | Required | Notes |
|-------|----------------|----------|-------|
| id | UUID or stable text id | yes | Primary key; unique per listing |

## Core listing fields (this tutorial slice)
| Field | Type (logical) | Required | Notes |
|-------|----------------|----------|-------|
| title | text | yes | Short headline for the listing |
| description | text | yes | Main meaning source; the canonical text for embeddings |
| city | text | no | Optional display/filter; include only if in scope |
| price | number | no | Optional display; not used as the embedding itself |
| created_at | timestamp | yes | When the row was inserted |

Add other simple fields only if docs/semantic-search-requirements.md lists them as in-scope.
Do not expand into photos, auth, or payments in this model.

## What text is embedded
Canonical embedding input:
```
{title}\n\n{description}
```

Rules:
- Always build the embedding from this same recipe so re-embeds stay consistent.
- Do not embed price or ids as if they were narrative meaning.
- Store the raw title and description unchanged; the vector is a separate column derived from them.

## Embedding column
| Field | Type (logical) | Required | Notes |
|-------|----------------|----------|-------|
| embedding | vector(DIMENSION_TODO) | yes after backfill | Fixed dimension; same size for every row and query |

### Dimension placeholder
- Use `DIMENSION_TODO` until the embedding model is chosen in a later step.
- Example common default in demos: `1536`; if used, apply it consistently everywhere.
- Critical: query vectors and stored vectors must use the same model and same dimension. Mismatched sizes break inserts or search.
- When the real model is chosen, replace `DIMENSION_TODO` in this doc, the migration, and the TypeScript types in one pass.

### Nullability and backfill
- New rows may allow `embedding` to be null only as a temporary state during insert-then-embed.
- After seed/backfill, every searchable property should have a non-null embedding.
- Intended lifecycle: create listing text → generate embedding → store vector → eligible for semantic search.

## Separation of concerns
| Concern | Where it lives |
|---------|----------------|
| Human-readable listing | title, description, and scalar columns |
| Meaning for search | embedding vector column only |
| Similarity metric | Decided at query time; align with the vector-search notes (for example cosine similarity) |

Do not replace description with the vector. You need both: text for the UI and vector for ranking.

## In scope vs out of scope (data model)
**In scope**
- One properties table (or equivalent) with id, listing fields, embedding
- One embedding per property for this tutorial
- Clear embedding input recipe and dimension placeholder

**Out of scope**
- Multiple embedding versions per property
- User accounts, saved searches, permissions
- Full-text keyword indexes as a replacement for vectors
- Production model keys, rate limits, or batch-job infrastructure

## Consistency checklist (must pass before migration)
- [ ] Every field has a clear purpose tied to requirements
- [ ] Primary key defined
- [ ] Embedding input recipe is explicit
- [ ] Single dimension placeholder used consistently
- [ ] Raw text and vector are separate
- [ ] Null rules for embedding are stated
- [ ] Out-of-scope items are listed so the agent does not invent them later

## Open questions
- Exact embedding model name and final dimension
- Final similarity operator or distance metric in SQL
- Whether city and price are required for the demo seed set

## Handoff
Next: plan Supabase pgvector enablement and migration order using this doc as the schema contract.
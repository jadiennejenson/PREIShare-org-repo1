# PREIshare semantic search — requirements brief

## Problem (one paragraph)
PREIshare buyers discover investment properties by describing lifestyle and investment intent in everyday language. Keyword search only matches exact words in listing text, so queries like “quiet cabin near water with good rental upside” miss strong matches when those words never appear together. This tutorial adds a small semantic search slice: convert property descriptions into meaning-aware vectors, store them in Supabase PostgreSQL with pgvector, and rank sample listings by similarity so natural-language queries surface relevant properties even when the wording differs.

## Actors
| Actor | Goal |
| --- | --- |
| Property buyer / investor | Find listings that match intent, not only exact phrases |
| PREIshare operator (us) | Validate that sample semantic matches are understandable and trustworthy |
| Coding agent (assistant) | Produce migrations, embedding helpers, and UI only inside the stated scope |

## Example queries (must drive later tests)
1. “quiet cabin near water with good rental upside”  
   Good result: a cabin listing with a peaceful setting near a lake or river and strong rental potential, even if it does not use the exact words “quiet,” “cabin,” and “rental upside” in the same phrase.

2. “family-friendly home close to good schools”  
   Good result: a home near schools and suitable for family living, even if the listing describes “walkable neighborhood,” “school district,” or “kid-friendly layout” instead of the exact words from the query.

3. “downtown condo walkable to restaurants”  
   Good result: a condo near restaurants, nightlife, and walkable city amenities, even if the description emphasizes “urban living,” “food scene,” or “pedestrian access” instead of “walkable to restaurants.”

4. A near-miss control query that should not dominate results (e.g. pure farmland if samples are cabins/condos)  
   Good result: a property that actually matches the sample inventory and is not simply the closest word overlap; for instance, a rural property should not outrank a cabin or condo when the query is clearly about urban or lifestyle-oriented housing.

## Success criteria (observable)
- [ ] Sample properties exist with description text and stored embedding vectors
- [ ] A similarity search returns a ranked list (best match first) for a natural-language query
- [ ] At least one demo query returns a relevant property even when key query words are missing from the listing text
- [ ] A beginner can explain why keyword search would fail on that same query
- [ ] In-scope vs out-of-scope boundaries are respected in code and docs produced later
- [ ] The implementation remains compatible with the repo’s Vite app structure and does not add unrelated framework churn

## In scope for this tutorial
- Plain-language understanding of embeddings and vector similarity (later steps)
- Data model for properties + embedding vectors suitable for Supabase + pgvector
- Migration to enable pgvector and store vectors
- TypeScript helper to generate embeddings for property text
- Seed/backfill path for a small sample set
- Similarity search SQL + TypeScript helper
- Minimal server route or data layer and a simple React search page in the Vite app
- End-to-end verification notes and handoff doc

## Out of scope (explicit non-goals)
- Production embedding provider billing, rate-limit ops, or batch jobs at scale
- Map search, filters (price, beds), auth, payments, or messaging
- Advanced ranking (personalization, business rules, hybrid keyword + vector tuning beyond a basic demo)
- Perfect design polish or mobile app work
- Broad refactors unrelated to the semantic-search slice

## Assumptions and open questions
- Free-tier Supabase is enough for sample data
- Embedding model and vector dimension will be decided in the data-model step and must remain consistent end-to-end
- Open questions to resolve later: exact embedding provider, vector dimension, distance metric (for example cosine), how many sample listings to seed
- The tutorial should remain intentionally small and easy to reason about for a first pass

## Handoff note for later steps
Every implementation step should be checkable against the example queries and success criteria above. If a prompt would add out-of-scope work, cut it. Keep the work focused on a small but convincing semantic search demo that clearly shows the value over plain keyword matching.
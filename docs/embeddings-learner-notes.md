# Embeddings learner notes (PREIshare)

## Plain-language definition
An embedding is a list of numbers that stands for the meaning of a piece of text
(for us: a property description or a buyer’s search phrase). It is not a keyword
index and not a human-readable summary.

## Tiny intuition (not real model output)
Imagine a toy 3-number embedding just to picture “near” vs “far”:

- "lakefront cabin, quiet, strong Airbnb history" → [0.9, 0.8, 0.1]
- "waterfront cottage, peaceful, good short-term rental" → [0.88, 0.82, 0.12]  (nearby)
- "downtown loft near nightlife and offices" → [0.1, 0.2, 0.95]  (far from the cabin)

Real embeddings are much longer lists (often hundreds or thousands of numbers).
The idea is the same: similar meaning → similar number patterns.

## PREIshare examples from our requirements
- Buyer query I care about: "quiet cabin near water with good rental upside"
- Listing A (should feel close to the query): "Cozy lakefront cabin with a peaceful deck, fire pit, and a strong short-term rental history near the water."
- Listing B (should feel far): "Downtown condo steps from restaurants and offices with skyline views and no lake access."
- Why A is closer in meaning than B (in my words): A talks about a cabin, water, quiet surroundings, and rental potential; B is about an urban condo and nightlife, so it matches a different lifestyle and investment intent.

## Generation vs storage (do not mix these up)
| Stage | What happens | Where |
| --- | --- | --- |
| Generation | Text goes into an embedding model/API; a number-list comes back | App/code side (later: TypeScript module) |
| Storage | That number-list is saved with the property row | Database (later: Supabase PostgreSQL + pgvector) |

Search will later: embed the buyer’s query (generation) → compare to stored
property embeddings (storage + comparison). Ranking details are Step 3.

## Misconceptions to watch for when reviewing agent code later
- Thinking embeddings store the original sentence as text inside the vector
- Assuming two listings must share the same words to be “close”
- Forgetting every embedding from the same model must use the same list length (dimensions)
- Mixing up “create embedding” with “INSERT into database”
- Believing a higher or lower single number in the list is a human-readable score by itself

## What I can explain to a teammate in 60 seconds
Embeddings turn text into a pattern of meaning instead of a list of matching words. That is why a query like “quiet cabin near water with good rental upside” can still match a listing that says “peaceful lakefront cottage with strong Airbnb demand” even when the exact words do not line up. The model learns that “lakefront,” “water,” and “peaceful” are conceptually close to the query, even if they are not identical. We create a vector for the buyer’s phrase and a vector for each property description, then rank them by similarity. The result is a more natural search experience than exact keyword matching.

## Open questions before similarity ranking (Step 3)
- How do we turn “closeness” into an ordered list of properties?
- What happens if two different embedding models are mixed in one table?
- Which distance metric should we use for ranking (for example cosine similarity)?
- How many sample properties do we need before the demo feels convincing?
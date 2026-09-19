# Pull request description — first PREIshare contribution

**PR URL:** <!-- added after opening -->
**Base repository:** EdTechForLearning/PREIShare-org-repo
**Base branch:** main
**Head repository (my fork):** jadiennejenson/PREIShare-org-repo1
**Compare branch:** `docs/first-contribution-jadiennejenson`
**Author:** Jade Jenson (`jadiennejenson`)
**Date opened:** 2026-09-19

## Problem
The onboarding materials needed a completed contributor record, implementation notes,
and a handoff that a reviewer could audit. The investor-listing fixture also defined
`InvestorListing` locally instead of using a shared project model, so its samples were
not connected to a reusable type.

## Approach
- Added Jade Jenson to `CONTRIBUTORS.md` and documented the implementation in
  `docs/onboarding/first-contribution-notes.md`.
- Completed the onboarding plan, team notes, and PR description under `docs/onboarding/`.
- Moved `InvestorListing` into `src/types.ts` and imported it from
  `src/fixtures/sample-investor-listings.ts`, keeping the four typed samples and aggregate array.
- Kept the changes limited to onboarding documentation and the investor-listing type/fixture; no
  auth, migrations, secrets, dependencies, or generated output were changed.

## What reviewers should look at
- [x] `CONTRIBUTORS.md` — new entry is accurate, formatted like neighbors, and free of secrets
- [x] Diff contains only intended files (no accidental `.env`, build output, or editor junk)
- [x] Commit message explains the onboarding and typed-fixture changes

## Test plan
1. Open the Files changed tab and confirm the seven expected documentation/type/fixture paths appear.
2. Skim `CONTRIBUTORS.md` and the onboarding notes: entries render as valid Markdown.
3. Confirm `src/fixtures/sample-investor-listings.ts` imports `InvestorListing` from `src/types.ts`.
4. Run `npm run build` and confirm TypeScript and Vite complete successfully.
5. Search the diff for tokens, passwords, or local absolute paths — expect none.

## Screenshots / notes
No UI screenshots (the UI was not changed).
Implementation decisions and verification notes: see `docs/onboarding/first-contribution-notes.md`.

## Checklist before requesting review
- [x] Feature branch is pushed and up to date with this description
- [x] PR title is specific (not “update” or “fixes”)
- [x] Description states problem, approach, and test plan
- [x] I can explain every staged line if a reviewer asks
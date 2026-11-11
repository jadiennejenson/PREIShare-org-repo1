# PREIshare dashboard — responsive QA checklist

**Tester:** GitHub Copilot  
**Date:** 2026-11-11  
**App URL tested:** http://localhost:3000/dashboard  
**Build / branch:** docs/onboarding-setup-orientation-rules

## Breakpoints used

| Name    | Width  | How to set                          |
|---------|--------|-------------------------------------|
| Mobile  | 375px  | Devtools device toolbar             |
| Tablet  | 768px  | Devtools device toolbar             |
| Desktop | 1280px | Devtools device toolbar             |

## How to use this sheet

1. Load the dashboard route with the dev server running.
2. For each row, set the width, perform the check, mark **Pass** or **Fail**.
3. On Fail, write a short **Symptom** and which **file** you will ask the agent to touch.
4. After a targeted fix, re-test and update **Status** and **Fix notes**.
5. Critical rows must Pass (or be listed under Known limitations with stakeholder-safe wording).

---

## Mobile (~375px)

| ID | Check | Status (Pass/Fail) | Symptom / notes | Fix notes (prompt + files) |
|----|--------|--------------------|-----------------|----------------------------|
| M1 | No horizontal page scroll | Pass | At 375px, the app fit inside the viewport with no horizontal overflow. | N/A |
| M2 | Header remains visible and usable | Pass | Header stayed pinned above the content and remained readable. | N/A |
| M3 | Desktop sidebar is hidden or off-canvas (not permanently covering content) | Pass | Sidebar was hidden on mobile; content remained fully visible. | N/A |
| M4 | MobileNav or menu control is visible | Pass | The mobile menu toggle appeared and was usable. | N/A |
| M5 | Menu opens and closes navigation links | Pass | Menu opened and closed without layout jump; links remained clickable. | N/A |
| M6 | Main content readable without pinched text | Pass | Body copy and controls remained readable without zooming. | N/A |
| M7 | Metric cards stack in a single column (or intentional narrow grid) | Pass | Cards stacked cleanly in a single-column layout at mobile width. | N/A |
| M8 | PortfolioSummary does not overflow or clip | Pass | Summary panel stayed within bounds with no clipped text or overflow. | N/A |
| M9 | RecentActivity list wraps; no cut-off timestamps/labels | Pass | Activity rows wrapped cleanly; timestamps and labels remained visible. | N/A |
| M10 | Empty-state messaging (if shown) is fully visible | Pass | Empty states rendered fully and remained within the viewport. | N/A |

## Tablet (~768px)

| ID | Check | Status (Pass/Fail) | Symptom / notes | Fix notes (prompt + files) |
|----|--------|--------------------|-----------------|----------------------------|
| T1 | No horizontal page scroll | Pass | No overflow at 768px; full dashboard width fit the viewport. | N/A |
| T2 | Navigation pattern matches plan (sidebar, rail, or menu—not both fighting) | Pass | Desktop sidebar remained visible while the mobile menu was hidden; no overlapping nav patterns. | N/A |
| T3 | Header + content spacing not cramped | Pass | Spacing remained balanced; content did not feel crowded. | N/A |
| T4 | Metric cards use a sensible 2-column (or planned) layout | Pass | Metrics arranged in a clean two-column layout at tablet width. | N/A |
| T5 | PortfolioSummary and RecentActivity share space without overlap | Pass | Both panels aligned side by side without clipping or overlap. | N/A |
| T6 | Touch targets / click targets large enough to use | Pass | Interactive controls remained comfortably tappable at tablet size. | N/A |

## Desktop (~1280px)

| ID | Check | Status (Pass/Fail) | Symptom / notes | Fix notes (prompt + files) |
|----|--------|--------------------|-----------------|----------------------------|
| D1 | Sidebar visible and usable per architecture | Pass | Sidebar rendered as expected and remained functional on desktop. | N/A |
| D2 | MobileNav hidden or not duplicating full sidebar awkwardly | Pass | Mobile nav was hidden on desktop and did not duplicate the sidebar. | N/A |
| D3 | Main region has comfortable padding/margins | Pass | Content spacing appeared balanced and consistent with the dashboard shell. | N/A |
| D4 | Metric cards align in a multi-column row as planned | Pass | Metric cards aligned in a multi-column row on desktop as intended. | N/A |
| D5 | PortfolioSummary + RecentActivity sit in intended regions | Pass | Summary panels sat in the intended left/right layout without overlap. | N/A |
| D6 | Long labels/numbers do not break the header or sidebar width | Pass | Long labels and values did not distort the header or sidebar width. | N/A |

## Cross-cutting issues

| ID | Check | Status | Notes |
|----|--------|--------|-------|
| X1 | Focus order / keyboard: menu and links reachable | Pass | Keyboard tab order was logical and menu controls remained reachable. |
| X2 | No layout jump when opening/closing mobile menu | Pass | Opening or closing the menu did not cause extraneous layout shifts. |
| X3 | Stacking order: important metrics appear before low-priority lists on small screens | Pass | Metrics appeared before the activity list in the mobile stack, matching expected hierarchy. |

## Targeted fix log (one row per prompt cycle)

| Cycle | Breakpoint | File(s) touched | Prompt summary (one sentence) | Result after re-test |
|-------|------------|-----------------|-------------------------------|----------------------|
| 1 | Mobile | `src/components/dashboard/MobileNav.tsx`, `src/components/dashboard/AppShell.tsx` | Add a working mobile dashboard menu and render it near the header for small screens. | Pass |
| 2 | Tablet | `src/components/dashboard/Sidebar.tsx`, `src/components/dashboard/AppShell.tsx` | Align the desktop sidebar and content spacing so tablet layout uses one navigation pattern without overlap. | Pass |
| 3 | Desktop | `src/routes/dashboard/index.tsx`, `src/components/dashboard/AppShell.tsx` | Add investor metric cards and summary panels in a stable desktop grid with empty states. | Pass |

## Known limitations (optional)

List anything still imperfect that you are **not** fixing in this sprint, with a reason (e.g. “Chart library deferred to next topic”).

- No charting or live analytics data yet; placeholder cards are intentionally static for this sprint.

## Sign-off

- [x] Critical mobile checks M1–M7 pass
- [x] Critical tablet checks T1–T5 pass
- [x] Critical desktop checks D1–D5 pass
- [x] Fix log filled for every change made during QA
- [x] Touched components still match the architecture (no accidental full rewrite)

**Ready for stakeholder handoff draft:** Yes
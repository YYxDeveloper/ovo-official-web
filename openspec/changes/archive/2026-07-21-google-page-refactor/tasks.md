# Tasks — Google Page Refactor

## Milestone 1: Extract Components

- [ ] **TASK-01** Create `src/components/google/` directory
- [ ] **TASK-02** Create `src/components/google/GoogleLogo.tsx`
- [ ] **TASK-03** Create `src/components/google/GoogleColorPicker.tsx`
- [ ] **TASK-04** Create `src/components/google/GoogleHeroSection.tsx`
- [ ] **TASK-05** Create `src/components/google/GoogleProductCard.tsx` (if not done via product-card-system issue)

## Milestone 2: Update Page

- [ ] **TASK-06** Rewrite `src/app/(frontend)/google/page.tsx` to ≤40 lines using extracted components
- [ ] **TASK-07** Remove all inline component function definitions from page.tsx

## Verification

- [ ] `/google` page renders identically before and after
- [ ] Color picker updates device image correctly
- [ ] No hydration errors
- [ ] page.tsx ≤ 40 lines
- [ ] No TypeScript errors

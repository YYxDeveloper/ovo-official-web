# Tasks — UI Primitives

## Milestone 1: Create Components

- [ ] **TASK-01** Create `src/components/layout/PageHeader.tsx`
- [ ] **TASK-02** Create `src/components/layout/PageContainer.tsx`
- [ ] **TASK-03** Create `src/components/navigation/Breadcrumb.tsx`
- [ ] **TASK-04** Create `src/components/ui/EmptyState.tsx`

## Milestone 2: Replace Inline Duplicates

- [ ] **TASK-05** Update `src/app/(frontend)/products/page.tsx` — PageHeader + PageContainer
- [ ] **TASK-06** Update `src/app/(frontend)/products/[category]/page.tsx` — PageHeader + PageContainer
- [ ] **TASK-07** Update `src/app/(frontend)/compare/page.tsx` — PageHeader + PageContainer + EmptyState
- [ ] **TASK-08** Update `src/app/(frontend)/products/[category]/[slug]/page.tsx` — PageContainer + Breadcrumb
- [ ] **TASK-09** Update `src/app/(frontend)/google/page.tsx` — PageContainer
- [ ] **TASK-10** Update `src/components/product/ProductGrid.tsx` — EmptyState

## Verification

- [ ] All pages visually identical after refactor
- [ ] Breadcrumb links navigate correctly
- [ ] EmptyState CTA on compare page works
- [ ] No TypeScript errors

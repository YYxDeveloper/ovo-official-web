# Spec 07 — Compare Feature

## CompareBar (src/components/compare/CompareBar.tsx)
- Fixed bottom, full width
- Hidden when items.length === 0
- Framer Motion: y:80→0 slide-in when items appear
- Shows up to 3 product thumbnails + names
- "比較" button → /compare
- "清除全部" button → clearAll()

## CompareTable (src/components/compare/CompareTable.tsx)
- Columns: each selected product
- Rows: name, price, category, all shared spec fields
- Empty slots shown as dashed placeholder columns
- Sticky first column (spec label)

## /compare page
- Full-width layout
- CompareTable component
- "返回" link
- If items.length === 0: redirect to /products or show empty state

## Acceptance Criteria
- [ ] CompareBar slides in when first product added
- [ ] CompareBar disappears when all products removed
- [ ] Max 3 products enforced
- [ ] /compare shows side-by-side table
- [ ] Empty compare page shows graceful empty state

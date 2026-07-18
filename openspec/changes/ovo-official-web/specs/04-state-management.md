# Spec 04 — State Management

## Zustand — compareStore (src/lib/store/compareStore.ts)

```typescript
interface CompareStore {
  items: Product[]
  addItem: (product: Product) => void   // max 3, no-op if full
  removeItem: (id: string) => void
  clearAll: () => void
  isInCompare: (id: string) => boolean
  isFull: () => boolean                 // items.length >= 3
}
// skipHydration: true to prevent SSR mismatch
```

## nuqs — URL Variant State

Hook: `src/hooks/useProductFilter.ts`

```
/products/phone/ovo-phone-17-pro?color=black&storage=256gb
```

Wrap root layout with `NuqsAdapter` from `nuqs/adapters/next/app`.

## Acceptance Criteria
- [ ] CompareBar renders when items.length > 0
- [ ] Max 3 items enforced (addItem no-ops when full)
- [ ] URL updates on color/storage change
- [ ] URL state persists on page reload
- [ ] No SSR hydration mismatch errors

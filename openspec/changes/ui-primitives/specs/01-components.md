# UI Primitive Components Spec

### Requirement: PageHeader component

**File:** `src/components/layout/PageHeader.tsx`

**Props:**
```ts
interface PageHeaderProps {
  label: string        // small uppercase tracking label above h1
  title: string        // h1 text
  description?: string // optional subtitle below h1
  className?: string
}
```

**Output markup:**
```tsx
<header className={cn("mb-10", className)}>
  <p className="text-xs font-medium uppercase tracking-[0.18em] text-ovo-muted">{label}</p>
  <h1 className="text-section font-semibold text-ovo-text">{title}</h1>
  {description && <p className="mt-2 max-w-xl text-sm text-ovo-muted">{description}</p>}
</header>
```

**Replace in:**
- `src/app/(frontend)/products/page.tsx` lines 14-22
- `src/app/(frontend)/products/[category]/page.tsx` lines 39-49
- `src/app/(frontend)/compare/page.tsx` lines 24-39

---

### Requirement: PageContainer component

**File:** `src/components/layout/PageContainer.tsx`

**Props:**
```ts
interface PageContainerProps {
  children: React.ReactNode
  py?: "default" | "compact"  // default: py-12 md:py-20 | compact: py-10 md:py-16
  className?: string
}
```

**Output markup:**
```tsx
<div className={cn(
  "mx-auto max-w-[1280px] px-4 md:px-6",
  py === "compact" ? "py-10 md:py-16" : "py-12 md:py-20",
  className
)}>
  {children}
</div>
```

**Replace in:**
- `src/app/(frontend)/products/page.tsx`
- `src/app/(frontend)/products/[category]/page.tsx`
- `src/app/(frontend)/products/[category]/[slug]/page.tsx`
- `src/app/(frontend)/compare/page.tsx`
- `src/app/(frontend)/google/page.tsx` (multiple wrappers)

---

### Requirement: Breadcrumb component

**File:** `src/components/navigation/Breadcrumb.tsx`

**Props:**
```ts
interface BreadcrumbItem {
  label: string
  href?: string  // omit for current page (last item)
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}
```

**Behavior:**
- Renders items separated by `/` spans
- Items with `href` render as `<Link>` with hover effect
- Last item (no href) renders as non-interactive `<span className="text-ovo-text">`

**Replace in:**
- `src/app/(frontend)/products/[category]/[slug]/page.tsx` lines 57-65

---

### Requirement: EmptyState component

**File:** `src/components/ui/EmptyState.tsx`

**Props:**
```ts
interface EmptyStateProps {
  title: string
  description?: string
  action?: {
    label: string
    href?: string    // renders Link
    onClick?: () => void  // renders button
  }
  className?: string
}
```

**Output markup:** Bordered dashed box, centered text, optional CTA below description.

**Replace in:**
- `src/components/product/ProductGrid.tsx` (no-products empty state)
- `src/app/(frontend)/compare/page.tsx` (empty compare state with "瀏覽商品" button)

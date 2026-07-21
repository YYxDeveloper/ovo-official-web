# Product Card System Spec

### Requirement: FeaturedProductCard component

**File:** `src/components/product/FeaturedProductCard.tsx`

**Extract from:** `src/components/home/FeaturedProducts.tsx` lines 62-98

**Props:**
```ts
interface FeaturedProductCardProps {
  product: Product
  index: number   // for stagger delay
  href: string
}
```

**Behavior:**
- Renders `motion.article` with snap-scroll-item class
- Image: `aspect-[4/5]` with `objectFit cover`
- Overlay gradient at bottom with product name and price
- `whileHover` scale animation preserved
- Receives `variants` from parent container (stagger)

---

### Requirement: CategoryCard component

**File:** `src/components/home/CategoryCard.tsx`

**Extract from:** `src/components/home/CategoryCards.tsx` lines 75-103

**Props:**
```ts
interface CategoryCardProps {
  category: {
    slug: string
    label: string
    description: string
    image: string
  }
  index: number  // for stagger delay
}
```

**Behavior:**
- `motion.div` with `useInView` stagger (driven by parent container variants)
- Image: `aspect-[4/3]` with hover scale via group-hover
- Text overlay: category label + description

---

### Requirement: GoogleProductCard component

**File:** `src/components/google/GoogleProductCard.tsx`

**Extract from:** `src/app/(frontend)/google/page.tsx` lines 114-157

**Props:**
```ts
interface GoogleProductCardProps {
  product: {
    name: string
    tagline: string
    price: number
    colors: { name: string; hex: string }[]
    image: string
  }
  selectedColor: string
  onColorChange: (color: string) => void
}
```

**Behavior:** Preserves existing card layout with responsive image, color swatches, and hover shadow.

---

### Requirement: ProductCard usage documentation

**File:** `docs/components/product-card-system.md`

**Contents:**
1. Overview — card variants table (variant name, file, use case, image ratio)
2. FeaturedProductCard — import path, prop table, usage example
3. CategoryCard — import path, prop table, usage example
4. ProductCard (grid) — import path, prop table, usage example
5. Design conventions — image ratio standards, typography classes, animation pattern
6. When to create a new variant vs reuse existing

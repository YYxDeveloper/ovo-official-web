# Product Card System

## Overview

All product display cards in the project. Each variant is optimized for its specific context.

| Variant | File | Use Case | Image Ratio | Animation |
|---------|------|----------|-------------|-----------|
| ProductCard | `components/product/ProductCard.tsx` | Grid listing pages | 1:1 (square) | hover: y-4, scale 1.02 |
| FeaturedProductCard | `components/product/FeaturedProductCard.tsx` | Homepage featured carousel | 4:5 | stagger fade-up |
| CategoryCard | `components/home/CategoryCard.tsx` | Homepage category section | 4:3 | stagger fade-up |
| GoogleProductCard | `components/google/GoogleProductCard.tsx` | Google Pixel demo page | free (h-56) | hover shadow |

---

## ProductCard

Grid card for `/products` and `/products/[category]` listing pages.

```tsx
import { ProductCard } from "@/components/product/ProductCard";

<ProductCard product={product} />
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `product` | `Product` | Full product object from data layer |

**Features:** Framer Motion hover animation, Next.js Image with responsive sizes, truncated name/tagline, formatted price.

---

## FeaturedProductCard

Snap-scroll carousel card used in `FeaturedProducts` on the homepage.

```tsx
import { FeaturedProductCard } from "@/components/product/FeaturedProductCard";

<FeaturedProductCard
  product={product}
  variants={activeCard}
/>
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `product` | `Product` | Full product object |
| `variants` | `Variants` | Framer Motion variants from parent container |

**Features:** 78% width on mobile (snap-scroll), full-width grid on desktop, 4:5 aspect ratio image, stagger animation driven by parent.

---

## CategoryCard

Category navigation card used in `CategoryCards` on the homepage.

```tsx
import { CategoryCard } from "@/components/home/CategoryCard";

<CategoryCard
  category={{ key: "phone", title: "Phone", tagline: "...", image: "..." }}
  variants={activeItem}
/>
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `category` | `{ key, title, tagline, image }` | Category display data |
| `variants` | `Variants` | Framer Motion variants from parent container |

**Features:** 4:3 aspect ratio, hover scale + translate, "explore" arrow CTA, stagger animation.

---

## GoogleProductCard

Product card for the Google Pixel demo page with embedded color picker.

```tsx
import { GoogleProductCard } from "@/components/google/GoogleProductCard";

<GoogleProductCard product={pixelProduct} />
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `product` | `PixelProduct` | Google Pixel product with colors and specs |

**Features:** Internal color state (useState), GoogleColorPicker, spec list (top 3), Google brand styling (light theme, rounded-3xl).

---

## Design Conventions

### Image Ratios

| Context | Ratio | Reason |
|---------|-------|--------|
| Grid listing | 1:1 | Uniform grid alignment |
| Featured carousel | 4:5 | Taller card for visual impact |
| Category | 4:3 | Landscape for category imagery |
| Google demo | Free height | Matches Google Store style |

### Typography

- **Product name:** `text-sm font-medium` (grid), `text-base font-medium` (featured), `text-xl font-semibold` (Google)
- **Tagline:** `text-xs text-ovo-muted` with `line-clamp-1`
- **Price:** `text-sm text-ovo-text` using `formatPrice()` from `@/lib/format`

### Hover Behavior

- **ProductCard:** `whileHover={{ y: -4, scale: 1.02 }}` via Framer Motion
- **FeaturedProductCard:** Image `group-hover:scale-105` via CSS transition
- **CategoryCard:** Card `hover:scale-[1.02] hover:-translate-y-1` via CSS transition
- **GoogleProductCard:** `hover:shadow-lg` via CSS transition

---

## When to Create a New Variant vs Reuse

**Create a new variant when:**
- The image ratio differs from all existing variants
- The card has unique interactive elements (e.g., color picker, spec list)
- The visual style belongs to a different design system (e.g., Google's light theme vs ovo's dark theme)

**Reuse an existing variant when:**
- Only spacing or container size differs (use className override)
- The card structure (image + name + price) matches an existing variant
- Animation differences can be handled via props (variants, whileHover)

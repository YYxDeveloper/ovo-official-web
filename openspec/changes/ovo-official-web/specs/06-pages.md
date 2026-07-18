# Spec 06 — Pages & Routes

## Routes

| Route | Component | Description |
|---|---|---|
| `/` | app/page.tsx | Home: HeroBanner + FeaturedProducts + CategoryCards |
| `/products` | app/products/page.tsx | All products grid |
| `/products/[category]` | app/products/[category]/page.tsx | Filtered by phone/watch/buds |
| `/products/[category]/[slug]` | app/products/[category]/[slug]/page.tsx | Product detail |
| `/compare` | app/compare/page.tsx | Side-by-side comparison table |

## Home Page Components

### HeroBanner (src/components/home/HeroBanner.tsx)
- Full-screen (100vh), dark background
- Featured product hero image (Unsplash)
- Framer Motion: stagger children y:30→0, opacity 0→1, delay 0.1s per child
- CTA button → /products/phone

### CategoryCards (src/components/home/CategoryCards.tsx)
- 3 cards: Phone / Watch / Buds
- useInView stagger on scroll
- Each card: image + category name + "探索" link

### FeaturedProducts (src/components/home/FeaturedProducts.tsx)
- Horizontal scroll on mobile, grid on desktop
- Shows `featured: true` products (1 per category)

## Product Detail Components

### ProductImageGallery (src/components/product/ProductImageGallery.tsx)
- Thumbnail strip + main image
- AnimatePresence crossfade on image change

### VariantSelector (src/components/product/VariantSelector.tsx)
- Color swatches (circular, border on selected)
- Storage buttons (pill style)
- Updates nuqs URL params

### ProductSpecTable (src/components/product/ProductSpecTable.tsx)
- Two-column table: spec label | value
- Alternating row bg

### AddToCompareButton (src/components/product/AddToCompareButton.tsx)
- Toggle: "加入比較" / "移除比較"
- Disabled + tooltip when isFull and not in compare

## Acceptance Criteria
- [ ] All routes render without 404
- [ ] HeroBanner animation plays on load
- [ ] CategoryCards animate on scroll into view
- [ ] Image gallery crossfade works
- [ ] Variant selection updates URL
- [ ] Compare button toggles correctly

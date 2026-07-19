# Task List — ovo Official Website

## Milestone 1: Foundation (Steps 1–8)

- [x] **TASK-01** Scaffold project — `create-next-app` + install deps + `shadcn init`
- [x] **TASK-02** Design system — `tailwind.config.ts` + `globals.css` CSS variables
- [x] **TASK-03** `next.config.ts` — Unsplash + Picsum remote image patterns
- [x] **TASK-04** `src/data/types.ts` — Product, ColorVariant, StorageVariant, ProductSpec
- [x] **TASK-05** `src/data/phone.ts` — ovo Phone 17, 17 Pro, 17 Air (4 colors, 3 storage each)
- [x] **TASK-06** `src/data/watch.ts` — ovo Watch Ultra, Watch S
- [x] **TASK-07** `src/data/buds.ts` — ovo Buds Pro, Buds Air
- [x] **TASK-08** `src/data/products.ts` — aggregated export
- [x] **TASK-09** `src/lib/store/compareStore.ts` — Zustand store (max 3, skipHydration)
- [x] **TASK-10** `src/lib/utils.ts` + `constants.ts`

## Milestone 2: Layout (Steps 9–11)

- [x] **TASK-11** `SiteHeader.tsx` — sticky, transparent→blur scroll behavior
- [x] **TASK-12** `MegaMenu.tsx` + `MegaMenuPanel.tsx` — Radix NavigationMenu
- [x] **TASK-13** `SiteFooter.tsx`
- [x] **TASK-14** `app/layout.tsx` — root layout with Header + Footer + CompareBar + NuqsAdapter

## Milestone 3: Home Page (Steps 12–13)

- [x] **TASK-15** `HeroBanner.tsx` — full-screen, Framer stagger animation
- [x] **TASK-16** `FeaturedProducts.tsx`
- [x] **TASK-17** `CategoryCards.tsx` — useInView stagger
- [x] **TASK-18** `app/page.tsx` — compose home page

## Milestone 4: Product Pages (Steps 14–18)

- [x] **TASK-19** `ProductCard.tsx` — hover animation
- [x] **TASK-20** `ProductGrid.tsx`
- [x] **TASK-21** `app/products/page.tsx` — all products
- [x] **TASK-22** `app/products/[category]/page.tsx` — filtered listing
- [x] **TASK-23** `ProductImageGallery.tsx` — AnimatePresence crossfade
- [x] **TASK-24** `VariantSelector.tsx` — nuqs URL state
- [x] **TASK-25** `ProductHero.tsx`
- [x] **TASK-26** `ProductSpecTable.tsx`
- [x] **TASK-27** `AddToCompareButton.tsx`
- [x] **TASK-28** `app/products/[category]/[slug]/page.tsx` — product detail

## Milestone 5: Compare Feature (Steps 19–21)

- [x] **TASK-29** `CompareBar.tsx` — sticky bottom, slide-in animation
- [x] **TASK-30** `CompareTable.tsx` — side-by-side spec comparison
- [x] **TASK-31** `app/compare/page.tsx`

## Milestone 6: DevOps (Step 22)

- [x] **TASK-32** `scripts/start-dev.sh` — auto port detection + Tailscale IP
- [x] **TASK-33** Add `dev:smart` to `package.json` + run to verify

## Verification Checklist

- [x] `npm run dev:smart` → prints port + Tailscale URL `http://100.100.177.73:<PORT>`
- [x] Route `/` renders hero + featured + category cards
- [x] Route `/products/phone` shows 3 phone products
- [x] Route `/products/phone/ovo-phone-17-pro` renders detail with gallery + variants
- [x] Adding 3 products → CompareBar slides in
- [x] `/compare` shows side-by-side table
- [x] Change color/storage → URL updates → reload → state restored
- [x] MegaMenu hover works on all 3 categories
- [x] Mobile: hamburger menu functional

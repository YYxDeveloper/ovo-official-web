# Task List — ovo Official Website

## Milestone 1: Foundation (Steps 1–8)

- [ ] **TASK-01** Scaffold project — `create-next-app` + install deps + `shadcn init`
- [ ] **TASK-02** Design system — `tailwind.config.ts` + `globals.css` CSS variables
- [ ] **TASK-03** `next.config.ts` — Unsplash + Picsum remote image patterns
- [ ] **TASK-04** `src/data/types.ts` — Product, ColorVariant, StorageVariant, ProductSpec
- [ ] **TASK-05** `src/data/phone.ts` — ovo Phone 17, 17 Pro, 17 Air (4 colors, 3 storage each)
- [ ] **TASK-06** `src/data/watch.ts` — ovo Watch Ultra, Watch S
- [ ] **TASK-07** `src/data/buds.ts` — ovo Buds Pro, Buds Air
- [ ] **TASK-08** `src/data/products.ts` — aggregated export
- [ ] **TASK-09** `src/lib/store/compareStore.ts` — Zustand store (max 3, skipHydration)
- [ ] **TASK-10** `src/lib/utils.ts` + `constants.ts`

## Milestone 2: Layout (Steps 9–11)

- [ ] **TASK-11** `SiteHeader.tsx` — sticky, transparent→blur scroll behavior
- [ ] **TASK-12** `MegaMenu.tsx` + `MegaMenuPanel.tsx` — Radix NavigationMenu
- [ ] **TASK-13** `SiteFooter.tsx`
- [ ] **TASK-14** `app/layout.tsx` — root layout with Header + Footer + CompareBar + NuqsAdapter

## Milestone 3: Home Page (Steps 12–13)

- [ ] **TASK-15** `HeroBanner.tsx` — full-screen, Framer stagger animation
- [ ] **TASK-16** `FeaturedProducts.tsx`
- [ ] **TASK-17** `CategoryCards.tsx` — useInView stagger
- [ ] **TASK-18** `app/page.tsx` — compose home page

## Milestone 4: Product Pages (Steps 14–18)

- [ ] **TASK-19** `ProductCard.tsx` — hover animation
- [ ] **TASK-20** `ProductGrid.tsx`
- [ ] **TASK-21** `app/products/page.tsx` — all products
- [ ] **TASK-22** `app/products/[category]/page.tsx` — filtered listing
- [ ] **TASK-23** `ProductImageGallery.tsx` — AnimatePresence crossfade
- [ ] **TASK-24** `VariantSelector.tsx` — nuqs URL state
- [ ] **TASK-25** `ProductHero.tsx`
- [ ] **TASK-26** `ProductSpecTable.tsx`
- [ ] **TASK-27** `AddToCompareButton.tsx`
- [ ] **TASK-28** `app/products/[category]/[slug]/page.tsx` — product detail

## Milestone 5: Compare Feature (Steps 19–21)

- [ ] **TASK-29** `CompareBar.tsx` — sticky bottom, slide-in animation
- [ ] **TASK-30** `CompareTable.tsx` — side-by-side spec comparison
- [ ] **TASK-31** `app/compare/page.tsx`

## Milestone 6: DevOps (Step 22)

- [ ] **TASK-32** `scripts/start-dev.sh` — auto port detection + Tailscale IP
- [ ] **TASK-33** Add `dev:smart` to `package.json` + run to verify

## Verification Checklist

- [ ] `npm run dev:smart` → prints port + Tailscale URL `http://100.100.177.73:<PORT>`
- [ ] Route `/` renders hero + featured + category cards
- [ ] Route `/products/phone` shows 3 phone products
- [ ] Route `/products/phone/ovo-phone-17-pro` renders detail with gallery + variants
- [ ] Adding 3 products → CompareBar slides in
- [ ] `/compare` shows side-by-side table
- [ ] Change color/storage → URL updates → reload → state restored
- [ ] MegaMenu hover works on all 3 categories
- [ ] Mobile: hamburger menu functional

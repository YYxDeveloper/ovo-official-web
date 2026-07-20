# Tasks: Google Pixel Demo Page

## Status: DONE (implemented in conversation 2026-07-19)

---

## Completed Tasks

- [x] **T1** Add `{ label: "Google", href: "/google" }` to `NAV_ITEMS` in `src/lib/constants.ts`
- [x] **T2** Create `src/data/google.ts` with `PixelProduct[]` type and 3 Pixel 9 models
- [x] **T3** Create `src/app/google/page.tsx` — Client Component with:
  - [x] T3a Google G SVG logo + brand bar
  - [x] T3b Hero section with `HeroSection` component (color picker + image)
  - [x] T3c `ColorPicker` component with swatch interaction
  - [x] T3d `ProductCard` component with independent color picker
  - [x] T3e 3-column product grid
  - [x] T3f Colored letter footer tagline
- [x] **T4** TypeScript check — no errors (`tsc --noEmit` clean)

---

## Pending Tasks (test coverage)

- [ ] **T5** Write Playwright E2E test: navigate to `/google` via SiteHeader "Google" link
  - [ ] T5a Verify page title area contains "Pixel 9"
  - [ ] T5b Click 2nd color swatch in Hero → verify image src changes
  - [ ] T5c Full page scroll (mandatory scroll rule)
- [ ] **T6** Write Playwright E2E test: product card color picker
  - [ ] T6a Click "Hazel" swatch on first product card
  - [ ] T6b Verify image updates (src contains "hazel" seed)
- [ ] **T7** RWD check — test at 375px mobile viewport:
  - [ ] T7a Product grid renders single column
  - [ ] T7b Hero stack layout (image below text)

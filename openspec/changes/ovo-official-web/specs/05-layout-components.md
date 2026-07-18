# Spec 05 — Layout Components

## SiteHeader (src/components/layout/SiteHeader.tsx)
- Sticky positioned, full width
- Transparent background on page load
- Transitions to `backdrop-blur` + semi-transparent bg on scroll (threshold: 50px)
- Contains: ovo logo (left), MegaMenu (center), utility icons (right)
- Mobile: hamburger menu

## MegaMenu (src/components/layout/MegaMenu.tsx)
- Uses `@radix-ui/react-navigation-menu`
- Three top-level items: Phone | Watch | Buds
- "use client" directive required
- Hover triggers MegaMenuPanel

## MegaMenuPanel (src/components/layout/MegaMenuPanel.tsx)
- Per-category expandable panel
- Shows product thumbnails + names + prices
- Animation: opacity + y translate (enter/exit)

## SiteFooter (src/components/layout/SiteFooter.tsx)
- Dark bg (#1d1d1f)
- Links: Products, Support, About ovo
- Copyright line

## app/layout.tsx
- Import order: fonts → SiteHeader → {children} → SiteFooter → CompareBar
- Wrap with `NuqsAdapter`
- HTML lang="zh-TW"

## Acceptance Criteria
- [ ] Header scrolls to blur state at 50px
- [ ] MegaMenu opens on hover, shows product links
- [ ] Footer renders at bottom of all pages
- [ ] CompareBar overlays above footer
- [ ] Mobile hamburger toggles nav

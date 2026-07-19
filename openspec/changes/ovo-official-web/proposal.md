# ovo Official Website Demo

## Summary

Build an Apple Store TW-inspired official website for the fictitious 3C brand "ovo", covering three product categories: Phone, Watch, and Buds. The site is a marketing/showcase site — no shopping cart or checkout.

## Background & Motivation

- Demonstrate a production-grade Next.js 15 App Router frontend with modern DX
- Reference design: Google Store TW + Apple Store TW (dark theme, clean typography, smooth animations)
- Used as a portfolio demo and internal React tech-stack reference

## Tech Stack

| Layer | Library / Version |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York, Zinc) |
| Animation | Framer Motion 12 |
| State | Zustand 5 (compare) + nuqs (URL variant) |
| Navigation | @radix-ui/react-navigation-menu |

## Scope

### In Scope
- Home page: HeroBanner, CategoryCards, FeaturedProducts
- Product listing pages: /products/[category]
- Product detail pages: /products/[category]/[slug] with image gallery, variant selector, spec table
- Compare feature: sticky CompareBar + /compare page (max 3 products)
- Responsive layout with sticky header (transparent → blur on scroll)
- Mega menu (Radix NavigationMenu, 3 categories)
- Dark theme design system (CSS variables + Tailwind tokens)
- Auto port detection dev script + Tailscale IP preview

### Out of Scope
- Shopping cart / checkout
- User authentication
- CMS / backend API
- Payment integration

## Regression Risk

**Level: None** — Brand new project, no existing code.

Required test coverage after implementation:
- E2E: home → product listing → product detail flow
- E2E: compare flow (add 3 products → CompareBar appears → /compare page)
- E2E: URL state persistence (color/storage variant survives page reload)
- Visual regression: MegaMenu hover, mobile hamburger

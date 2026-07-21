# Product Card Component System

## Summary

Unify five separate card implementations into a shared `ProductCardBase` foundation, extract `FeaturedProductCard` and `CategoryCard` as independent components, and ship comprehensive usage documentation.

## Background & Motivation

The codebase currently has five card variants written independently: `ProductCard` (grid), `FeaturedProducts` inline card (snap scroll), `MegaMenuPanel` item, `CompareBar` item, and `GooglePage` ProductCard. Each reimplements image, name, and price display without sharing logic. Any design change (e.g., typography, hover behavior) must be applied to all five files manually.

Additionally, the homepage `FeaturedProducts.tsx` and `CategoryCards.tsx` each contain anonymous card markup inline, making the card structure inaccessible for reuse.

## Why

- 5 card variants with duplicated image + name + price logic
- FeaturedProductCard (62-98 lines in FeaturedProducts.tsx) is an unnamed inline component
- CategoryCard (75-103 lines in CategoryCards.tsx) is an unnamed inline component
- GooglePage reinvents a ProductCard (lines 114-157) instead of reusing the existing one
- No documentation exists for card usage conventions

## What Changes

- `src/components/product/FeaturedProductCard.tsx` — extracted from FeaturedProducts.tsx (motion card with snap scroll, stagger)
- `src/components/home/CategoryCard.tsx` — extracted from CategoryCards.tsx (4/3 aspect ratio, useInView stagger)
- `src/components/product/ProductCard.tsx` — existing component, enhanced with clear props API
- `src/components/google/GoogleProductCard.tsx` — extracted from google/page.tsx, now imports `formatPrice` from shared utils
- `docs/components/product-card-system.md` — usage documentation for all card variants

## Regression Risk

**Level: Low** — Extraction only. No logic changes to card behavior, animation, or data flow.

Required verification:
- Home page: FeaturedProducts snap scroll and stagger animation unchanged
- Home page: CategoryCards useInView stagger unchanged
- Products grid: hover animation unchanged
- MegaMenu: product items render correctly
- CompareBar: product thumbnails render correctly
- Google page: card renders identically

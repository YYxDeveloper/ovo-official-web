# Animation Utility — lib/animations.ts

## Summary

Centralize repeated Framer Motion animation variant definitions into `src/lib/animations.ts` to eliminate duplication across HeroBanner, FeaturedProducts, and CategoryCards.

## Background & Motivation

Three components independently define nearly identical `container` + `item` stagger patterns for Framer Motion. Each file defines its own `container` variant (staggerChildren, delayChildren) and `item` variant (opacity, y, transition). The logic is 95% identical across all three files.

## Why

- `HeroBanner.tsx` defines `container` + `item` variants (lines 12-31)
- `FeaturedProducts.tsx` defines `container` + `card` + `cardWithMotion` variants (lines 11-33)
- `CategoryCards.tsx` defines `container` + `item` + `itemWithMotion` variants (lines 13-35)
- Any animation timing change (e.g., stagger speed) requires editing 3 files

## What Changes

- `src/lib/animations.ts` — new file with shared animation factories:
  - `staggerContainer(options?)` — returns container variants with configurable staggerChildren, delayChildren
  - `fadeUpItem(options?)` — returns item variants with configurable y offset, duration, ease
  - `scaleOnHover` — standard whileHover object for card scale effects
- Update `HeroBanner.tsx`, `FeaturedProducts.tsx`, `CategoryCards.tsx` to import from `lib/animations.ts`

## Regression Risk

**Level: Low** — Animation behavior unchanged; only source of truth moves to shared file.

Required verification:
- HeroBanner stagger animation plays correctly on home page load
- FeaturedProducts card stagger plays on scroll
- CategoryCards useInView stagger plays on scroll-into-view

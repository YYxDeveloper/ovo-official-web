# Google Page Refactor — Split Inline Components

## Summary

Refactor `src/app/(frontend)/google/page.tsx` (230 lines, 4 inline components) into a proper component directory, eliminating single-file overload and enabling reuse of Google-specific UI elements.

## Background & Motivation

The Google Pixel demo page was built rapidly as a single page file. It now contains 4 unnamed inline component functions (GoogleGLogo, ColorPicker, HeroSection, GoogleProductCard), Google-specific constants, and SVG markup — all in one 230-line page.tsx. This violates single-responsibility principle and makes the components inaccessible to other pages or future Google-related features.

## Why

- `google/page.tsx` is 230 lines — the largest single file in the frontend
- 4 inline component functions defined directly in page.tsx:
  - `GoogleGLogo()` (lines 16-25) — SVG component
  - `ColorPicker()` (lines 29-56) — color selection UI
  - `HeroSection()` (lines 58-112) — full hero section
  - `ProductCard()` (lines 114-157) — product display card
- `ColorPicker` duplicates variant selection logic already in `VariantSelector.tsx`
- After extraction, `page.tsx` should be under 40 lines

## What Changes

- `src/components/google/GoogleLogo.tsx` — SVG G logo component
- `src/components/google/GoogleColorPicker.tsx` — color picker (simplified, using Tailwind instead of inline style where possible)
- `src/components/google/GoogleHeroSection.tsx` — hero section with device image and copy
- `src/components/google/GoogleProductCard.tsx` — product card (already tracked in product-card-system issue)
- `src/app/(frontend)/google/page.tsx` — reduced to ~40 lines, imports from components/google/

## Regression Risk

**Level: Low** — Pure extraction. Google page visual output unchanged.

Required verification:
- `/google` page renders identically
- Color picker state (selectedColor) still updates device image
- All responsive breakpoints preserved
- No hydration errors (client component boundaries maintained)

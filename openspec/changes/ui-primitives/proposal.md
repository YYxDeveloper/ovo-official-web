# UI Primitives — PageHeader, PageContainer, Breadcrumb, EmptyState

## Summary

Extract four recurring inline UI patterns into reusable React components to eliminate duplication and ensure design consistency across all frontend pages.

## Background & Motivation

Code analysis reveals that 3 pages duplicate a `<header>` block (label + h1 + description), 5 pages duplicate the same `max-w + px + py` container wrapper, the product detail page has a hardcoded `<nav>` breadcrumb, and two separate empty-state patterns exist with inconsistent styling. These patterns are copy-pasted across files, making global style changes error-prone.

## Why

- **PageHeader** duplicated in 3 pages (products, category, compare) — ~40 lines of identical markup
- **PageContainer** duplicated in 5 pages — diverging `py` values causing inconsistent vertical rhythm
- **Breadcrumb** hardcoded in product detail page — cannot be extended or reused
- **EmptyState** appears in 2 places with different borders, padding, and CTA logic

## What Changes

- `src/components/layout/PageHeader.tsx` — new component accepting `label`, `title`, `description` props
- `src/components/layout/PageContainer.tsx` — new component wrapping `mx-auto max-w-[1280px] px-4 md:px-6` with optional `py` variant prop
- `src/components/navigation/Breadcrumb.tsx` — new component accepting `items: { label, href? }[]`
- `src/components/ui/EmptyState.tsx` — new component accepting `title`, `description`, optional `action: { label, onClick }`
- Update all pages to use the new components, removing inline duplicates

## Regression Risk

**Level: Low** — Purely presentational refactor. No logic, state, or data flow changes.

Required verification:
- Visual regression: products index, category, compare, product detail pages look identical after swap
- EmptyState CTA (compare page) still triggers navigation

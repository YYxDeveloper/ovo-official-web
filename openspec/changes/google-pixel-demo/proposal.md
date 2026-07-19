# Proposal: Google Pixel Demo Page `/google`

## Summary

Add a `/google` route to the OVO official website showcasing Google Pixel 9 series products in a Google Store style — white background, Google brand colors, interactive color picker — mounted under the existing OVO `RootLayout` (SiteHeader + SiteFooter).

## Motivation

Demonstrate OVO's ability to host third-party brand showcase pages within the same Next.js App Router shell, while providing a clear visual contrast to OVO's own dark-themed design system.

## Scope

- **Route**: `/google`
- **Style**: Google Store — Pixel phone product listing
- **Integration**: Existing OVO `RootLayout` (SiteHeader + SiteFooter shared)
- **Framework**: Next.js 16 App Router + React 19 + Tailwind CSS 4

## Changes

| Type | Path | Description |
|------|------|-------------|
| Modified | `src/lib/constants.ts` | Add `{ label: "Google", href: "/google" }` to `NAV_ITEMS` |
| Added | `src/data/google.ts` | Pixel 9 series product data (3 models) |
| Added | `src/app/google/page.tsx` | Google Store–style showcase page (Client Component) |

## Status

**Already implemented** — tracking issue for visibility, retrospective documentation, and test coverage planning.

## Regression Risk

🟢 **Low** — New page added, no existing routes modified. The only shared-file change is appending one item to `NAV_ITEMS` in `constants.ts`.

Additional tests required:
- Visual regression: color picker interactivity (Obsidian / Porcelain / Hazel / Rose Quartz)
- RWD: 1-col (mobile) → 3-col (desktop) product grid
- Navigation: "Google" link appears in SiteHeader and routes correctly to `/google`

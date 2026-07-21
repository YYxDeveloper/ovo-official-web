# Loongchi 磁磚資料 DB 化 + Admin CRUD

## Summary

Migrate Loongchi tile data from a static TypeScript array to Prisma + SQLite, add a `Tile` model to the existing schema, seed 15 tiles, update frontend pages to read from the database, and add a full Admin CRUD panel at `/admin/tiles/*`.

## Background & Motivation

The Loongchi demo site (`/loongchi/*`) was initially built with static tile data defined in `src/data/loongchi.ts`. This made it impossible to manage tile inventory without code changes. By migrating to the existing Prisma + SQLite infrastructure (already used for `Product` data), we enable:

- Dynamic tile management via Admin panel
- Consistent data architecture across the whole project
- Hot-reloadable content without redeploy

## What Changes

### Database
- `prisma/schema.prisma` — Added `Tile` model (12 fields: id, slug, name, category, size, finish, origin, price, image, featured, sortOrder, timestamps)
- `prisma/migrations/20260721184708_add_tile/` — SQLite migration
- `prisma/seed.ts` — Added 15 tile upserts (7 categories: wood, luxury, minimal, concrete, vintage, subway, hexagon)

### Data Access Layer
- `src/lib/dal/tiles.ts` — server-only DAL: `getAllTiles`, `getFeaturedTiles`, `getTileById`, `createTile`, `updateTile`, `deleteTile`
- `src/lib/validations/tile-schema.ts` — Zod schema for tile form validation
- `src/lib/actions/tile-actions.ts` — Server Actions: `createTileAction`, `updateTileAction`, `deleteTileAction` (all behind `verifySession`)

### Admin Panel
- `src/components/admin/TileTable.tsx` — Table listing all tiles with category badge, featured indicator, edit/delete links
- `src/components/admin/TileForm.tsx` — Form with slug, name, category select, finish select, size, origin, price, image URL, featured checkbox
- `src/app/(admin)/admin/tiles/page.tsx` — List page
- `src/app/(admin)/admin/tiles/new/page.tsx` — Create page
- `src/app/(admin)/admin/tiles/[id]/page.tsx` — Edit page
- `src/app/(admin)/admin/tiles/[id]/delete/page.tsx` — Delete confirmation page
- `src/app/(admin)/layout.tsx` — Added "磁磚管理" sidebar nav link (Grid2x2 icon)

### Frontend Updates
- `src/data/loongchi.ts` — Removed static `tiles` array and `featuredTiles`; now only exports type definitions and `categoryLabels`
- `src/app/(loongchi)/loongchi/page.tsx` — Changed to `async`, fetches featured tiles from DB via `getFeaturedTiles()`
- `src/app/(loongchi)/loongchi/products/page.tsx` — Changed to `async`, fetches all tiles via `getAllTiles()` and passes as props
- `src/app/(loongchi)/loongchi/products/ProductsContent.tsx` — Now receives `tiles: Tile[]` as props instead of importing static data

## Technical Notes

- **globalThis.prisma cache bug**: After adding the `Tile` model, the dev server must clear `.next` cache (`rm -rf .next`) to pick up the new Prisma client — hot reload alone is insufficient
- **Client/Server boundary**: `ProductsContent` stays a `"use client"` component (needs `useSearchParams`), receives tiles as props from the server page; this avoids wrapping the entire products route in Suspense unnecessarily
- **Auth guard**: All tile mutations in Server Actions call `verifySession()` first, consistent with existing `product-actions.ts` pattern

## Regression Risk

**Level: High** — DB schema change affects the shared SQLite database used by both `Product` and `Tile` models.

Required verification:
- Migration applies cleanly on a fresh DB (`prisma migrate reset`)
- Seed produces correct 15 tiles with all fields populated
- Existing `/admin` (products) is unaffected
- Existing `/products/*` frontend pages are unaffected
- `/loongchi` and `/loongchi/products` load tiles from DB correctly
- Admin CRUD: create, update, delete a tile and verify changes reflect on frontend
- `verifySession` blocks unauthenticated requests to tile mutations

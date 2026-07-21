# Design — Loongchi DB Migration

## Architecture Decision

Reuse the existing Prisma + SQLite infrastructure already serving `Product` data. The `Tile` model is intentionally simpler (flat record, no nested relations) since tile management doesn't require color variants, storage options, or image galleries.

## Data Flow

```
Frontend (server component)
  └─ getAllTiles() / getFeaturedTiles()
      └─ prisma.tile.findMany()
          └─ SQLite dev.db

Admin (server action)
  └─ verifySession() → tileSchema.safeParse() → dal.createTile/updateTile/deleteTile()
      └─ revalidatePath("/loongchi") + redirect("/admin/tiles")
```

## Client/Server Boundary

```
/loongchi/products/page.tsx  ← server: fetches tiles from DB
  └─ <ProductsContent tiles={tiles} />  ← client: useSearchParams + tab state
```

ProductsContent must stay client because it uses `useSearchParams` for initial category from URL. Tiles are passed as props (server → client prop drilling), avoiding a separate client-side fetch.

## Category as String (not FK)

Categories are stored as plain strings rather than a foreign-key relation. Rationale:
- Categories are a fixed enum (7 values, unlikely to change)
- Adds no querying complexity (filter by `where: { category }`)
- Avoids JOIN overhead for simple list queries
- The `categoryLabels` mapping in `src/data/loongchi.ts` handles display names on the client

## Admin UI Pattern

Follows identical pattern to existing Product admin:
- Server component page → fetch data → render client table component
- TileForm uses `useActionState` (React 19) for optimistic pending state
- Delete requires explicit confirmation page (no JS confirm() dialogs)

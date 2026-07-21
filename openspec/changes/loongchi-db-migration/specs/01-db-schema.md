# Spec 01 — Tile DB Schema & Data Layer

## Prisma Model

```prisma
model Tile {
  id        Int      @id @default(autoincrement())
  slug      String   @unique
  name      String
  category  String   // wood | luxury | minimal | concrete | vintage | subway | hexagon
  size      String   // e.g. "60x60 cm"
  finish    String   // 霧面 | 亮面 | 紋路
  origin    String   // e.g. "義大利"
  price     Int      // NT$ per 坪
  image     String   // URL
  featured  Boolean  @default(false)
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## DAL Functions (`src/lib/dal/tiles.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `getAllTiles` | `() => Promise<TileRow[]>` | All tiles ordered by sortOrder |
| `getFeaturedTiles` | `() => Promise<TileRow[]>` | featured=true, ordered by sortOrder |
| `getTileById` | `(id: number) => Promise<TileRow \| null>` | Single tile by PK |
| `createTile` | `(data) => Promise<TileRow>` | Insert new tile |
| `updateTile` | `(id, data) => Promise<TileRow>` | Partial update |
| `deleteTile` | `(id) => Promise<void>` | Hard delete |

## Validation Schema (`src/lib/validations/tile-schema.ts`)

```typescript
z.object({
  slug:      z.string().min(1).regex(/^[a-z0-9-]+$/),
  name:      z.string().min(1),
  category:  z.enum(["wood","luxury","minimal","concrete","vintage","subway","hexagon"]),
  size:      z.string().min(1),
  finish:    z.enum(["霧面","亮面","紋路"]),
  origin:    z.string().min(1),
  price:     z.coerce.number().int().positive(),
  image:     z.string().min(1),
  featured:  z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
})
```

## Seed Data

15 tiles across 7 categories. All use `prisma.tile.upsert({ where: { slug } })` pattern for idempotent seeding.

| Category | Count | Featured Count |
|----------|-------|---------------|
| wood     | 3     | 2 |
| luxury   | 2     | 1 |
| minimal  | 2     | 1 |
| concrete | 2     | 1 |
| vintage  | 2     | 1 |
| subway   | 2     | 0 |
| hexagon  | 2     | 0 |

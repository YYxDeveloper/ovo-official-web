# Spec 02 — Admin CRUD Panel for Tiles

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `GET /admin/tiles` | `TilesPage` (server) | List all tiles via `getAllTiles()` |
| `GET /admin/tiles/new` | `NewTilePage` | Empty TileForm |
| `POST /admin/tiles/new` | `createTileAction` | Create tile, redirect to `/admin/tiles` |
| `GET /admin/tiles/[id]` | `EditTilePage` (server) | Pre-filled TileForm via `getTileById(id)` |
| `POST /admin/tiles/[id]` | `updateTileAction` | Update tile, redirect to `/admin/tiles` |
| `GET /admin/tiles/[id]/delete` | `DeleteTilePage` | Confirmation screen |
| `POST /admin/tiles/[id]/delete` | `deleteTileAction` | Delete tile, redirect to `/admin/tiles` |

## Auth

All Server Actions (`createTileAction`, `updateTileAction`, `deleteTileAction`) call `verifySession()` and return `{ error: "未授權" }` if no session. Consistent with existing `product-actions.ts`.

## TileTable Component

Columns: 排序 | 名稱 (+ slug) | 類別 (Badge) | 尺寸 | 價格/坪 | 精選 (dot indicator) | 操作 (edit/delete links)

## TileForm Component

Fields:
- Slug (text, regex /^[a-z0-9-]+$/)
- 名稱 (text)
- 類別 (select: 7 options)
- 表面處理 (select: 霧面 | 亮面 | 紋路)
- 尺寸 (text, placeholder "60x60 cm")
- 產地 (text, placeholder "義大利")
- 價格/坪 (number)
- 排序 (number, default 0)
- 圖片 URL (text)
- 設為精選 (checkbox)

Uses `useActionState` for pending/error state handling.

## Revalidation

After each mutation, revalidates:
- `/loongchi`
- `/loongchi/products`
- `/admin/tiles`

# Sub-issue 1: DB Schema + Migration + Seed

## Scope

新增 3 個 Prisma Model（`VigorSlide`, `VigorService`, `VigorPartner`）至 `prisma/schema.prisma`，執行 migration，並在 `prisma/seed.ts` 中加入初始資料。

## Files Changed

| 檔案 | 動作 | 說明 |
|------|------|------|
| `prisma/schema.prisma` | 修改 | 新增 3 個 Model |
| `prisma/seed.ts` | 修改 | 新增 Vigor seed data |

## Models

### VigorSlide
- `id`, `title`, `subtitle?`, `imageUrl`, `linkUrl?`, `sortOrder`, `active`, `createdAt`, `updatedAt`

### VigorService
- `id`, `name`, `description?`, `imageUrl`, `linkUrl?`, `category`, `sortOrder`, `active`, `createdAt`, `updatedAt`

### VigorPartner
- `id`, `name`, `logoUrl`, `websiteUrl?`, `sortOrder`, `active`, `createdAt`, `updatedAt`

## Seed Data

- 3 slides（輪播圖）
- 16 services（4 categories × 4 items：health, learning, social, living）
- ~10 partners（合作夥伴）

## Seed 策略

- **冪等性**：Vigor models 無 unique 欄位，seed 對 3 個 Vigor table 採用 `deleteMany` + `createMany`（不影響既有 Product 資料），確保 `bunx prisma db seed` 可重複執行不產生重複資料
- **圖片來源**：`imageUrl` / `logoUrl` 限用 `images.unsplash.com` 或 `picsum.photos`（`next.config.ts` 的 `remotePatterns` 僅允許這兩個 domain），或使用 `public/` 本地素材

## Acceptance Criteria

- [ ] `bunx prisma migrate dev --name add_vigor_models` 成功
- [ ] `bunx prisma db seed` 成功寫入所有 seed data
- [ ] 驗證：`bunx prisma studio` 可查看 3 個新 table 的資料

# Vigor Demo — 使用本 Repo 架構重建首頁

## Summary

在本 Next.js repo 中建立 `(vigor)` route group demo，完全遵循現有架構模式（`(frontend)` 的 Prisma→DAL→Gateway→Actions 模式），重建 Vigor（躍齡）公益樂齡平台首頁，並修正原站分析報告中的無障礙問題。

## Motivation

- 驗證本 repo 架構的通用性：不同品牌/產品線可共用同一套 DB→DAL→Actions→Admin 模式
- 為 Vigor Django 站提供 Next.js 版 demo，展示現代化前端方案
- 修正原站的 alt text 重複、缺少文字標題、無障礙不足等問題

## Technical Approach

遵循已驗證的架構模式：
- **DB Layer**: Prisma Schema → `VigorSlide`, `VigorService`, `VigorPartner` 三個 Model
- **DAL**: `src/lib/dal/vigor-*.ts` — server-only CRUD 函式
- **Gateway**: `src/data/vigor.ts` — re-export DAL（與 `src/data/products.ts` 同模式）
- **Validation**: `src/lib/validations/vigor-schemas.ts` — Zod v4
- **Actions**: `src/lib/actions/vigor-*-actions.ts` — `verifySession()` + Zod + `revalidatePath`
- **Frontend**: `(vigor)` route group，獨立 layout，7 個元件
- **Admin**: 6 個 Admin 元件 + 12 個 Admin route pages

## Scope

~36 新檔案 + 4 修改檔案，分 6 個 sub-issues 遞增交付。

## Regression Risk

| 變更類型 | 風險等級 | 強制額外測試 |
|---|---|---|
| DB Schema 異動（3 new models） | 高 | 資料層整合測試 + 遷移驗證 |
| Server Actions + verifySession | 中 | 授權測試（確認未授權被拒） |
| CSS 變數新增 | 低 | 視覺回歸（不影響既有頁面） |
| 新 route group + 元件 | 低 | E2E 首頁載入 + 響應式測試 |
| Admin CRUD pages | 低 | Admin CRUD 功能測試 |

## Key Reference Files

- `prisma/schema.prisma` — 新增 3 models
- `src/lib/dal/products.ts` — DAL 參考模式
- `src/lib/actions/product-actions.ts` — Actions 參考模式
- `src/lib/validations/product-schema.ts` — Zod 參考模式
- `src/app/(frontend)/layout.tsx` — Route group layout 參考
- `src/components/admin/ProductTable.tsx` — Admin table 參考
- `src/components/admin/ProductForm.tsx` — Admin form 參考
- `src/lib/animations.ts` — 動畫 variants（直接 reuse）
- `src/app/globals.css` — 新增 `--vigor-*` 變數

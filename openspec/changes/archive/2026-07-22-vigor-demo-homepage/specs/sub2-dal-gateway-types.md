# Sub-issue 2: DAL + Gateway + Types

## Scope

建立資料存取層（DAL）、Gateway 和 TypeScript 型別定義，遵循 `src/lib/dal/products.ts` → `src/data/products.ts` 模式。

## Dependencies

- Sub-issue #1（DB Schema 必須先完成）

## Files Created

| 檔案 | 參考模式 | 說明 |
|------|---------|------|
| `src/data/vigor-types.ts` | `src/data/types.ts` | `VigorSlide`, `VigorService`, `VigorPartner` 介面 + `VIGOR_NAV_ITEMS` + `VIGOR_SERVICE_CATEGORIES` 常數 |
| `src/lib/dal/vigor-slides.ts` | `src/lib/dal/products.ts` | CRUD: `getActiveSlides()`, `getSlideById()`, `createSlide()`, `updateSlide()`, `deleteSlide()` |
| `src/lib/dal/vigor-services.ts` | 同上 | CRUD: `getActiveServices()`, `getServiceById()`, `createService()`, `updateService()`, `deleteService()` |
| `src/lib/dal/vigor-partners.ts` | 同上 | CRUD: `getActivePartners()`, `getPartnerById()`, `createPartner()`, `updatePartner()`, `deletePartner()` |
| `src/data/vigor.ts` | `src/data/products.ts` | `import "server-only"` — re-export 讀取函式（`getActive*` / `get*ById`）與型別；mutation（create/update/delete）由 Server Actions 直接從 DAL 匯入（遵循 `product-actions.ts` 模式） |

## Key Patterns

- 所有 DAL 檔案加 `import "server-only"`
- `prisma` 從 `@/lib/db` 匯入
- 查詢結果按 `sortOrder` ASC 排序
- `getActive*()` 加 `where: { active: true }` 過濾

## Acceptance Criteria

- [ ] 5 個檔案建立完成，無 TypeScript 錯誤
- [ ] DAL 函式可在 Server Component 中正確呼叫
- [ ] `vigor.ts` gateway 正確 re-export 讀取函式與型別

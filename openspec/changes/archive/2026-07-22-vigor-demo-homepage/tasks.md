# Tasks — Vigor Demo Homepage

## Sub-issue 1: DB Schema + Migration + Seed
- [ ] 新增 `VigorSlide`, `VigorService`, `VigorPartner` 至 `prisma/schema.prisma`
- [ ] 執行 `bunx prisma migrate dev --name add_vigor_models`
- [ ] 在 `prisma/seed.ts` 加入 3 slides + 16 services + ~10 partners seed data
- [ ] 執行 `bunx prisma db seed` 驗證
- [ ] 新增 vitest 資料層測試（3 model CRUD + seed 冪等性）

## Sub-issue 2: DAL + Gateway + Types
- [ ] 建立 `src/data/vigor-types.ts`（介面 + 常數）
- [ ] 建立 `src/lib/dal/vigor-slides.ts`（5 個 CRUD 函式）
- [ ] 建立 `src/lib/dal/vigor-services.ts`（5 個 CRUD 函式）
- [ ] 建立 `src/lib/dal/vigor-partners.ts`（5 個 CRUD 函式）
- [ ] 建立 `src/data/vigor.ts`（gateway re-export）

## Sub-issue 3: Validation + Server Actions
- [ ] 建立 `src/lib/validations/vigor-schemas.ts`（3 個 Zod schemas）
- [ ] 建立 `src/lib/actions/vigor-slide-actions.ts`（4 個 actions）
- [ ] 建立 `src/lib/actions/vigor-service-actions.ts`（4 個 actions）
- [ ] 建立 `src/lib/actions/vigor-partner-actions.ts`（4 個 actions）
- [ ] 新增授權測試（未授權呼叫所有 mutating actions 被拒）

## Sub-issue 4: CSS Theme Variables
- [ ] 在 `src/app/globals.css` `@theme inline` 新增 `--color-vigor-*` 變數

## Sub-issue 5: Frontend Route Group + Components
- [ ] 建立 `src/app/(vigor)/layout.tsx`
- [ ] 建立 `src/app/(vigor)/vigor/page.tsx`
- [ ] 建立 `src/components/vigor/VigorHeader.tsx`
- [ ] 建立 `src/components/vigor/VigorHeroCarousel.tsx`
- [ ] 建立 `src/components/vigor/VigorServiceGrid.tsx`
- [ ] 建立 `src/components/vigor/VigorServiceCard.tsx`
- [ ] 建立 `src/components/vigor/VigorDownloadSection.tsx`
- [ ] 建立 `src/components/vigor/VigorFooter.tsx`
- [ ] 建立 `src/components/vigor/VigorPartnerMarquee.tsx`
- [ ] Carousel 暫停/停止控制（WCAG 2.2.2）
- [ ] 新增 Playwright E2E（`/vigor` 首頁 + 響應式斷點）

## Sub-issue 6: Admin CRUD
- [ ] 建立 6 個 Admin 元件（SlideTable/Form, ServiceTable/Form, PartnerTable/Form）
- [ ] 建立 12 個 Admin route pages（slides/services/partners × list/new/edit/delete）
- [ ] 修改 `src/app/(admin)/layout.tsx` sidebar 新增 Vigor 管理連結
- [ ] 新增 Playwright E2E（Admin Vigor CRUD 流程）

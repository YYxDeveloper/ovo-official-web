# Tasks — Loongchi DB Migration + Admin CRUD

> Status: All tasks COMPLETED in conversation 2026-07-22

## Milestone 1: Database

- [x] **TASK-01** Add `Tile` model to `prisma/schema.prisma`
- [x] **TASK-02** Run `prisma migrate dev --name add-tile`
- [x] **TASK-03** Update `prisma/seed.ts` — add 15 tile upserts

## Milestone 2: Data Access Layer

- [x] **TASK-04** Create `src/lib/dal/tiles.ts` (server-only, 6 functions)
- [x] **TASK-05** Create `src/lib/validations/tile-schema.ts` (Zod)
- [x] **TASK-06** Create `src/lib/actions/tile-actions.ts` (3 Server Actions)

## Milestone 3: Admin Panel

- [x] **TASK-07** Create `src/components/admin/TileTable.tsx`
- [x] **TASK-08** Create `src/components/admin/TileForm.tsx`
- [x] **TASK-09** Create `src/app/(admin)/admin/tiles/page.tsx`
- [x] **TASK-10** Create `src/app/(admin)/admin/tiles/new/page.tsx`
- [x] **TASK-11** Create `src/app/(admin)/admin/tiles/[id]/page.tsx`
- [x] **TASK-12** Create `src/app/(admin)/admin/tiles/[id]/delete/page.tsx`
- [x] **TASK-13** Update `src/app/(admin)/layout.tsx` — add "磁磚管理" sidebar link

## Milestone 4: Frontend Updates

- [x] **TASK-14** Update `src/data/loongchi.ts` — remove static tiles, keep types only
- [x] **TASK-15** Update `src/app/(loongchi)/loongchi/page.tsx` — async + getFeaturedTiles()
- [x] **TASK-16** Update `src/app/(loongchi)/loongchi/products/page.tsx` — async + getAllTiles()
- [x] **TASK-17** Update `src/app/(loongchi)/loongchi/products/ProductsContent.tsx` — accept tiles props

## Verification

- [x] `bun prisma db seed` completes without error (15 tiles upserted)
- [x] `/loongchi` returns HTTP 200, featured tiles rendered from DB
- [x] `/loongchi/products` returns HTTP 200, all 15 tiles displayed
- [x] `/admin/tiles` accessible after login, shows 15 rows
- [x] `/admin/tiles/new` form renders all fields correctly
- [x] Existing `/admin` (products) unaffected
- [x] Existing `/products/phone` (dark theme) unaffected

## Regression Tests

- [x] **TEST-01** Unit: `getAllTiles()` / `getFeaturedTiles()` / `getTileById()` — `tests/unit/tile-dal.test.ts`
- [x] **TEST-02** Unit: `createTile` / `updateTile` / `deleteTile` round-trip — `tests/unit/tile-dal.test.ts`
- [ ] **TEST-03** Migration: `prisma migrate reset` + seed on clean DB (CI script, not yet automated)
- [x] **TEST-04** Unit: unauthenticated actions return `{ error: "未授權" }` + Zod validation — `tests/unit/tile-actions-auth.test.ts`
- [x] **TEST-05** E2E: Admin login → create tile → verify on `/loongchi/products` → delete — `tests/e2e/loongchi-admin-crud.spec.ts`

Also fixed: delete page was `"use server"` + direct `<form action>`, changed to `"use client"` + `useActionState` (matching product pattern).

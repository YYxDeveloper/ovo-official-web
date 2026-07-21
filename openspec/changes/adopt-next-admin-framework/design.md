# Design: next-admin Adoption

## Why next-admin (decision recap)

| Criterion | next-admin | Payload 3 | Refine / React-Admin | AdminJS |
|---|---|---|---|---|
| App Router native | ✅ | ✅ | ❌ (client SPA) | ❌ (Express mount) |
| Keeps Prisma | ✅ (schema-first) | ❌ (own data layer) | needs custom API | ✅ (adapter) |
| Reuses session auth | ✅ | own user model | custom | own auth |
| Migration cost | 1–2 days | 1–2 weeks | medium-high | medium |

Decision: next-admin — minimal disruption to the existing Prisma + RSC + Server Actions architecture.

## Mount Layout

Follow the library's App Router convention (exact paths per installed version):

```
src/app/admin/[[...nextadmin]]/page.tsx   # admin UI (server component entry)
src/app/api/admin/[[...nextadmin]]/route.ts # data route handler
options.ts                                 # NextAdminOptions: model config, auth
```

Conflict resolution: current hand-rolled admin lives at `src/app/(admin)/admin/`. Migrate by (1) mounting next-admin on a temp path (e.g. `/admin-next`), (2) verifying parity, (3) removing `(admin)/admin/products/*` and moving next-admin to `/admin`, updating `proxy.ts` matcher if the path shape changes.

## Auth Wiring

- Wrap the next-admin page/handler with `verifySession()`; unauthenticated → `redirect("/admin/login")` (page) / `401` (route handler).
- Login/logout pages unchanged. No role model — single admin.

## Deletion List (after parity E2E passes)

| Path | LOC (approx) |
|---|---|
| `src/app/(admin)/admin/products/new/page.tsx` | 20 |
| `src/app/(admin)/admin/products/[id]/page.tsx` | 36 |
| `src/app/(admin)/admin/products/[id]/delete/page.tsx` | 60 |
| `src/app/(admin)/admin/page.tsx` (replaced by framework list) | 62 |
| `src/components/admin/ProductForm.tsx` | 224 |
| `src/components/admin/ProductTable.tsx` | 102 |
| `src/components/admin/VariantEditor.tsx` | 89 |
| `src/components/admin/ImageUploader.tsx` | 106 |
| unused actions in `src/lib/actions/product-actions.ts` | ~140 |

Total ~840 LOC retired. `(admin)/layout.tsx` shell may be kept (sidebar) or replaced by the framework shell — decide during implementation.

## Rollback Plan

Git-revert the change; hand-rolled pages are only deleted after framework parity is proven by E2E, so rollback is a single revert with zero data migration (Prisma schema untouched throughout).

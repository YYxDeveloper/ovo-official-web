# Spec: next-admin Adoption

Replace the hand-rolled admin CRUD UI with `@premieroctet/next-admin`, generated from the existing Prisma schema, while preserving the current auth and data layers.

## Scope

In: next-admin installation, mounting, auth wiring, Product + relations CRUD configuration, deletion of hand-rolled admin pages/components.
Out: store frontend (`(frontend)`), DAL read functions, zod schemas, upload API, auth module.

## Changes

### Install & mount

- Add dependency `@premieroctet/next-admin` (version compatible with Next.js 16 + Prisma 6).
- Mount the next-admin page + route handler under `/admin` per its App Router convention.
- Supply `prisma` from `src/lib/db.ts` as the data source.

### Auth wiring

- Gate the next-admin routes with the existing `admin-session` JWT (`verifySession()`), same guarantee as the H2 layout guard. `proxy.ts` presence check stays as the UX-level redirect.
- No user/role model introduced — single admin, same as today.

### CRUD configuration

- Product: list (sortable by `sortOrder`, filter by `category`, search by `name`/`slug`), edit/create/delete.
- Relations editable inline: ColorVariant, StorageVariant, ProductSpec, ProductImage.
- Keep `slug` uniqueness error surfaced in the UI.
- Images: keep `/api/upload` endpoint; wire its URL field into the admin form (or adopt next-admin upload if it satisfies the H3 guarantees).

### Deletion (after parity verified)

Delete hand-rolled admin code (~900 LOC): `(admin)/admin/products/*` pages, `components/admin/{ProductForm,ProductTable,VariantEditor,ImageUploader}.tsx`, and now-unused server actions in `lib/actions/product-actions.ts`.

## Acceptance Criteria

- [ ] `/admin` served by next-admin, gated by existing session auth
- [ ] Product list supports sorting/filtering/search (previously absent)
- [ ] Create/edit/delete product with all 4 relation types works end-to-end
- [ ] Store frontend renders framework-managed data identically (DAL read path unchanged)
- [ ] Hand-rolled admin pages/components deleted; `bun run build` passes

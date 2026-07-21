# feat: adopt next-admin framework, retire hand-rolled admin CRUD

## Summary

Adopt `@premieroctet/next-admin` (App Router native, Prisma-first) to replace the hand-rolled admin CRUD pages and components (~900 of 1,317 LOC), generating Product + relation management directly from `prisma/schema.prisma`. Keeps Prisma, the existing `admin-session` JWT auth, zod schemas, and the frontend DAL read path.

## Background & Motivation

- 2026-07-20 review: ~70% of the 1,317 hand-rolled admin LOC is boilerplate an admin framework generates (list / form / relation editors / upload UI)
- Alternatives rejected: Payload CMS (replaces Prisma with its own data layer — high migration cost), Refine / React-Admin (client SPA + custom API layer, conflicts with RSC + Server Actions), AdminJS (separate mounted Express app, isolated UI/auth)
- Depends on `fix-admin-crud-high-issues` shipping first — the hardened auth/upload code is reused by the framework integration

## Scope

- Install `@premieroctet/next-admin` and mount it under `/admin`
- Wire existing `admin-session` verification into next-admin access control
- Configure Product CRUD including ColorVariant / StorageVariant / ProductSpec / ProductImage relations
- Retire hand-rolled admin code (see Deletion List in design.md)
- Keep: `src/lib/dal/products.ts` read functions (frontend), `src/lib/validations/product-schema.ts`, `/api/upload`, `src/lib/auth/*`, `src/proxy.ts`

## Regression Risk

**Medium** — the admin UI is fully replaced; the store frontend is unaffected. Mitigate with E2E admin flow tests (create / edit / delete product with variants) passing on next-admin before deleting the hand-rolled code.

### Recommended additional tests

- E2E: login → product list renders from Prisma
- E2E: create product with colors/storage/specs/images → visible on store frontend
- E2E: edit + delete flows, including relation changes
- E2E: unauthenticated `/admin` access still redirects to login

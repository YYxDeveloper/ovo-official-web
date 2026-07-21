# Tasks

## TODO

- [ ] Install `@premieroctet/next-admin` compatible with Next.js 16 + Prisma 6
- [ ] Mount next-admin page + route handler on a temp path (`/admin-next`)
- [ ] Wire `verifySession()` gate into next-admin page (redirect) and route handler (401)
- [ ] Configure Product CRUD: list sorting/filter/search + inline ColorVariant/StorageVariant/ProductSpec/ProductImage editing
- [ ] E2E: login → list → create with relations → visible on store frontend
- [ ] E2E: edit + delete flows incl. relation changes
- [ ] E2E: unauthenticated `/admin` access redirects to login
- [ ] Delete hand-rolled admin pages/components per design.md Deletion List (~840 LOC)
- [ ] Move next-admin to `/admin`, update `proxy.ts` matcher if needed
- [ ] Verify `bun run build` passes

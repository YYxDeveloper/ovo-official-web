# Admin CRUD Review Report — 手刻 CRUD 審查與 Admin Framework 評估

> Date: 2026-07-20 · Scope: `src/app/(admin*)`, `src/app/api/upload`, `src/lib/{actions,auth,dal,validations}`, `src/components/admin`, `src/proxy.ts`
> Outcome: 2 OpenSpec changes + 6 GitHub issues (#14–#19)

---

## 1. Executive Summary

The admin panel is **fully hand-rolled CRUD**（手刻，無 admin framework）— 16 files, **1,317 LOC**, zero framework dependencies. The review found **3 HIGH / 6 MEDIUM / 5 LOW** issues. ~70% of the code is boilerplate an admin framework generates out of the box.

**Decision flow**: fix the 3 HIGH issues first (framework-agnostic), then adopt **next-admin** (App Router native + Prisma-first) to retire ~840 LOC of hand-rolled admin UI.

---

## 2. Hand-Rolled CRUD Inventory（明確標註）

| # | File | Hand-rolled | What a framework generates |
|---|---|---|---|
| 1 | `src/app/(admin)/admin/page.tsx` | List page + category tabs | List view, filters/tabs |
| 2 | `src/app/(admin)/admin/products/new/page.tsx` | Create route | Create view |
| 3 | `src/app/(admin)/admin/products/[id]/page.tsx` | Edit route | Edit view |
| 4 | `src/app/(admin)/admin/products/[id]/delete/page.tsx` | Delete confirmation | Delete action + confirm |
| 5 | `src/app/(admin)/layout.tsx` | Admin shell | Layout / navigation |
| 6 | `src/components/admin/ProductTable.tsx` | Table + featured toggle | DataGrid / List component |
| 7 | `src/components/admin/ProductForm.tsx` (224 LOC) | Full form + hidden JSON fields | Auto form incl. relation sub-forms |
| 8 | `src/components/admin/VariantEditor.tsx` | One-to-many child editor | Inline relation editing |
| 9 | `src/components/admin/ImageUploader.tsx` | Upload / preview / reorder | File/Image field |
| 10 | `src/lib/actions/product-actions.ts` | 4 server actions | Mutation layer |
| 11 | `src/lib/dal/products.ts` (191 LOC) | DAL + relation rebuild + DTO | Data provider |
| 12 | `src/lib/validations/product-schema.ts` | zod schemas | Derived from ORM schema |
| 13 | `src/lib/auth/{session,actions}.ts` | JWT session + login/logout | Auth provider |
| 14 | `src/app/(admin-auth)/admin/login/page.tsx` | Login page | Login page |
| 15 | `src/app/api/upload/route.ts` | File upload API | Upload endpoint |
| 16 | `src/proxy.ts` | Route guard | Route guard |

Real business value lives only in the zod rules and the `toProduct` DTO mapping; the rest is generated scaffolding in any admin framework.

---

## 3. Findings by Severity

### 🔴 HIGH

| ID | Location | Problem | Root Cause | Fix |
|---|---|---|---|---|
| **H1** | `dal/products.ts:149-178` | Relation rebuild without `$transaction` — mid-write failure permanently loses child rows | "Delete-all-then-recreate" chosen to simplify diffing; atomicity never enforced | Wrap rebuild + update in `prisma.$transaction` |
| **H2** | `proxy.ts:7` + `(admin)/layout.tsx` | Route guard checks cookie *presence* only; pages never `verifySession()` — forged cookie renders all admin pages (read) | Auth delegated entirely to edge proxy; page layer assumed identity verified | `verifySession()` in admin layout → redirect |
| **H3** | `api/upload/route.ts:37` | Stored extension from client `file.name`; `file.type` forgeable → `evil.html` in `public/uploads/` = stored XSS | Two client-controlled values trusted; no server-side MIME→ext mapping or byte inspection | MIME whitelist→ext + magic-byte sniffing |

### 🟡 MEDIUM

| ID | Location | Problem |
|---|---|---|
| M1 | `lib/auth/actions.ts:18` | No login rate limiting — single `ADMIN_PASSWORD` brute-forceable |
| M2 | `product-actions.ts:57,93` | Raw Prisma `e.message` returned to client — leaks DB internals |
| M3 | `product-actions.ts:30-33` | `JSON.parse` without try/catch — malformed JSON → 500 |
| M4 | `(admin)/admin/page.tsx:16` | List page queries Prisma directly, bypassing DAL — two data paths drift |
| M5 | All list queries | No pagination/search/sort — always full-table + 4 relation includes |
| M6 | `dal/products.ts:5-12` | Hand-written `ProductWithRelations` + `as` casts — schema drift won't type-error (use `Prisma.ProductGetPayload`) |

### 🟢 LOW

- **L1** `toProduct` returns `id: p.slug` — semantic landmine (id field holds slug)
- **L2** `public/uploads` ephemeral under standalone/container deploys; not git-ignored
- **L3** Missing `SESSION_SECRET` fails at runtime, not at boot (fail-fast preferred)
- **L4** Form surfaces fieldErrors for `name`/`slug` only — other field errors invisible
- **L5** No audit log / multi-user / roles (single shared password — acceptable now, frameworks ship this)

### ✅ Done Well

zod dual-layer validation · `httpOnly + sameSite=lax` cookie · Server Actions built-in origin check (CSRF) · session-gated upload with size limit · `server-only` DAL · DTO mapping.

---

## 4. Admin Framework Evaluation

| Option | Integration | Keeps Prisma? | Migration Cost | Fit vs this codebase |
|---|---|---|---|---|
| **next-admin** `@premieroctet/next-admin` | App Router handler + RSC, **schema-first from Prisma** | ✅ | **Low (1–2 days)** | **8/10** |
| Payload CMS 3 | Embeds in Next.js, **replaces data layer** (Drizzle, supports SQLite) | ❌ | High (1–2 weeks) | 6/10 (features 10/10) |
| Refine | Client SPA + data provider | needs custom REST/GraphQL | Medium–High | 4/10 (conflicts with RSC/Server Actions) |
| React-Admin | Client SPA + data provider | needs custom API | Medium–High | 4/10 |
| AdminJS + `@adminjs/prisma` | Mounted Express app | ✅ (adapter) | Medium | 3/10 (isolated UI/auth) |
| Prisma Studio | Dev tool | ✅ | Zero | 2/10 (no auth/custom UX) |

**Primary recommendation: next-admin** — the only App-Router-native + Prisma-first option; generates CRUD for Product + 4 relation models from `schema.prisma`; reuses existing session auth, zod, DAL read path.

**Strategic option: Payload 3** — if the catalog grows into a CMS (multi-user roles, drafts, versioning, more content models), Payload is the closest JS equivalent of Django Admin at the cost of dropping Prisma.

**Honest note**: at current scale (5 tables, single admin, ~1.3k LOC), "no framework" is not the pain — H1/H2/H3 are. Fix HIGH first, then adopt a framework if the roadmap justifies it.

---

## 5. Outcome — OpenSpec Changes & GitHub Issues

### Group A — ship first: `openspec/changes/fix-admin-crud-high-issues/`

| Issue | Title | Maps to |
|---|---|---|
| [#14](https://github.com/YYxDeveloper/ovo-official-web/issues/14) | fix(admin): wrap updateProduct relation rebuild in $transaction | H1 |
| [#15](https://github.com/YYxDeveloper/ovo-official-web/issues/15) | fix(admin): enforce verifySession in (admin)/layout for page-level authz | H2 |
| [#16](https://github.com/YYxDeveloper/ovo-official-web/issues/16) | fix(upload): enforce extension whitelist derived from MIME + magic bytes | H3 |
| [**#18**](https://github.com/YYxDeveloper/ovo-official-web/issues/18) | Admin 後台 HIGH 級問題修復（H1 交易 / H2 authz / H3 upload） | main |

### Group B — follow-up: `openspec/changes/adopt-next-admin-framework/`

| Issue | Title | Maps to |
|---|---|---|
| [#17](https://github.com/YYxDeveloper/ovo-official-web/issues/17) | feat(admin): adopt next-admin framework, retire hand-rolled CRUD pages | framework |
| [**#19**](https://github.com/YYxDeveloper/ovo-official-web/issues/19) | next-admin 框架導入與手刻 CRUD 退場 | main |

### Sequencing

```
#18 (H1/H2/H3)  ──►  ship  ──►  #19 (next-admin; reuses hardened auth/upload)
```

MEDIUM/LOW findings are documented here for backlog; M1 (rate limiting) and M4 (DAL bypass) are the strongest candidates to fold into Group A follow-ups.

---

## 6. References

- OpenSpec artifacts: `openspec/changes/fix-admin-crud-high-issues/`, `openspec/changes/adopt-next-admin-framework/` (proposal / specs / design / tasks)
- Data model: `prisma/schema.prisma` (Product + ColorVariant/StorageVariant/ProductSpec/ProductImage)
- Architecture: `docs/ARCHITECTURE.md`

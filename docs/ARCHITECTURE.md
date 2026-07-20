# ovo Official Website — Architecture Guide

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.10 (App Router, Turbopack) |
| UI | React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui |
| Animation | Framer Motion 12 |
| Database | Prisma 6 + SQLite |
| Auth | JWT via `jose`, HttpOnly cookie |
| State | Zustand 5 (compare), nuqs (URL params) |
| Validation | Zod 4 |
| Package Manager | bun |

## Directory Structure

```
src/
├── app/
│   ├── (frontend)/          # 前台路由群組
│   │   ├── layout.tsx       # SiteHeader + SiteFooter + CompareBar
│   │   ├── page.tsx         # 首頁
│   │   ├── products/        # 產品列表 & 詳情
│   │   ├── compare/         # 產品比較
│   │   └── google/          # Google Pixel demo
│   ├── (admin)/             # 後台路由群組（需認證）
│   │   ├── layout.tsx       # Admin sidebar + header
│   │   └── admin/           # Dashboard, CRUD pages
│   ├── (admin-auth)/        # 後台登入（獨立 layout）
│   │   ├── layout.tsx       # 極簡 layout
│   │   └── admin/login/     # 登入頁
│   ├── api/upload/          # 圖片上傳 API
│   └── globals.css          # Tailwind + 品牌色彩變數
├── components/
│   ├── layout/              # SiteHeader, MegaMenu, SiteFooter
│   ├── home/                # HeroBanner, FeaturedProducts, CategoryCards
│   ├── product/             # ProductCard, Gallery, SpecTable, VariantSelector
│   ├── compare/             # CompareTable, CompareBar
│   ├── admin/               # ProductForm, ProductTable, VariantEditor, ImageUploader
│   └── ui/                  # shadcn/ui 元件
├── lib/
│   ├── db.ts                # Prisma 單例
│   ├── auth/                # session.ts, actions.ts
│   ├── dal/                 # products.ts (Repository pattern)
│   ├── actions/             # product-actions.ts (Server Actions)
│   ├── validations/         # product-schema.ts (Zod)
│   ├── store/               # compareStore.ts (Zustand)
│   ├── constants.ts         # SITE config, NAV_ITEMS
│   ├── format.ts            # formatPrice()
│   └── utils.ts             # cn()
├── data/
│   ├── types.ts             # Product 介面定義
│   ├── constants.ts         # categoryLabelsZh（client-safe）
│   ├── products.ts          # async DAL wrapper（server-only）
│   └── google.ts            # Google Pixel 資料
├── hooks/
│   └── useStoreHydration.ts # Zustand hydration hook
└── proxy.ts                 # Route guard (Next.js 16 proxy)
```

## Route Groups

使用 Next.js Route Groups 隔離三套獨立 root layout：

| Group | Layout | 用途 |
|---|---|---|
| `(frontend)` | SiteHeader + SiteFooter + CompareBar | 前台所有頁面 |
| `(admin)` | Admin sidebar + header + 登出按鈕 | 後台管理（需登入） |
| `(admin-auth)` | 極簡（僅 html/body） | 登入頁 |

## Data Flow

```
Page (Server Component, async)
  ↓ await
DAL (src/lib/dal/products.ts, server-only)
  ↓
Prisma Client → SQLite
  ↓ toProduct() transform
Product interface (src/data/types.ts)
  ↓ props
UI Components (Server or Client)
```

### Server → Client 邊界

- `src/data/products.ts` 標記為 `server-only`，Client Component 不可直接 import
- `src/data/constants.ts` 為 client-safe export（`categoryLabelsZh`）
- Server Component 透過 props 傳遞資料給 Client Component

## Database Schema

```
Product (主表)
├── ColorVariant[]    FK → Product, cascade delete, sortOrder
├── StorageVariant[]  FK → Product, cascade delete, sortOrder
├── ProductSpec[]     FK → Product, cascade delete, sortOrder
└── ProductImage[]    FK → Product, cascade delete, sortOrder
```

- `Product.slug` 為 `@unique`，用於 URL routing
- 所有子表有 `sortOrder` 欄位控制排序
- 分類為字串欄位：`phone` | `watch` | `buds`

## Authentication

```
Login → loginAction() → 比對 ADMIN_PASSWORD → createSession() → JWT cookie
                                                                    ↓
proxy.ts 攔截 /admin/* → 檢查 cookie → redirect /admin/login (無 cookie)
                                                                    ↓
Server Actions → verifySession() → 執行操作 / 回傳 401
```

- JWT payload: `{ role: "admin", expiresAt }`
- Cookie: `admin-session`, HttpOnly, 24h TTL
- API routes（如 `/api/upload`）也驗證 session

## State Management

| 狀態 | 方案 | 持久化 |
|---|---|---|
| 產品比較清單 | Zustand (`compareStore`) | localStorage (`ovo-compare`) |
| 產品變體選擇 | nuqs URL params (`color`, `storage`) | URL query string |
| 產品資料 | Server-side Prisma query | SQLite |
| Admin session | JWT | HttpOnly cookie |

## Styling System

- Tailwind CSS 4 + `@theme inline` 自訂品牌色彩變數
- ovo 品牌色：`ovo-black`, `ovo-text`, `ovo-muted`, `ovo-card`, `ovo-darkgray`, `ovo-blue`, `ovo-border`
- shadcn/ui 元件使用 CSS 變數驅動主題
- 圓角系統：`--radius` base 變數，衍生 sm/md/lg/xl/2xl/3xl/4xl

## Static Generation

- `/products/[category]`：`generateStaticParams()` → 3 categories
- `/products/[category]/[slug]`：`generateStaticParams()` → all products
- Admin 操作後 `revalidatePath()` 觸發 ISR

## Security

- ✅ HttpOnly + SameSite cookie（防 XSS/CSRF）
- ✅ `server-only` 標記防止 server code 洩漏到 client bundle
- ✅ Zod schema 雙重驗證（client + server）
- ✅ 上傳限制：5MB, jpg/png/webp only, UUID 檔名
- ✅ 環境變數管理敏感資訊（密碼、session secret）

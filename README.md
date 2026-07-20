# ovo Official Website Demo

Apple Store TW-inspired marketing website for the ovo brand (Phone, Watch, Buds).

**Repo**: [YYxDeveloper/ovo-official-web](https://github.com/YYxDeveloper/ovo-official-web)

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Animation**: Framer Motion 12
- **State**: Zustand 5 (compare) + nuqs (URL variant state)
- **Database**: Prisma 6 + SQLite
- **Auth**: JWT (jose) — admin panel
- **Navigation**: @radix-ui/react-navigation-menu

## Getting Started

```bash
bun install
cp .env.example .env        # configure DATABASE_URL, ADMIN_PASSWORD, SESSION_SECRET
npx prisma generate
npx prisma db seed           # seed product data
bun run dev                  # start dev server
```

## Products (7 total)

| Category | Models |
|---|---|
| Phone | ovo Phone 17 · 17 Pro · 17 Air |
| Watch | ovo Watch Ultra · Watch S |
| Buds | ovo Buds Pro · Buds Air |

## Routes

### Frontend

- `/` — Home (HeroBanner + FeaturedProducts + CategoryCards)
- `/products/[category]` — Product listing (phone / watch / buds)
- `/products/[category]/[slug]` — Product detail (gallery + variants + specs)
- `/compare` — Side-by-side comparison (max 3 products)
- `/google` — Google Pixel demo page

### Admin

- `/admin/login` — Admin login
- `/admin` — Product dashboard (CRUD management)
- `/admin/products/new` — Create product
- `/admin/products/[id]` — Edit product
- `/admin/products/[id]/delete` — Delete confirmation

## Documentation

- [Architecture Guide](docs/ARCHITECTURE.md) — Tech stack, directory structure, data flow, security
- [Setup Guide](docs/SETUP.md) — Installation, environment variables, troubleshooting
- [API Reference](docs/API.md) — Routes, Server Actions, DAL functions, data types

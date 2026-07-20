# ovo Official Website — Setup Guide

## Prerequisites

- Node.js 18+
- bun (package manager)

## Quick Start

```bash
# 1. Clone & install
git clone https://github.com/YYxDeveloper/ovo-official-web.git
cd ovo-official-web
bun install

# 2. Environment
cp .env.example .env
# Edit .env — set ADMIN_PASSWORD and SESSION_SECRET

# 3. Database
npx prisma generate          # Generate Prisma client
npx prisma migrate dev       # Create SQLite DB & run migrations
npx prisma db seed           # Seed 7 demo products

# 4. Run
bun run dev                  # http://localhost:3000
```

## Environment Variables

| Variable | Required | Description | Example |
|---|---|---|---|
| `DATABASE_URL` | Yes | SQLite file path | `file:./prisma/dev.db` |
| `ADMIN_PASSWORD` | Yes | Admin login password | `changeme` |
| `SESSION_SECRET` | Yes | JWT signing key (32+ chars) | `openssl rand -base64 32` |

## Available Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server (Turbopack, port 3000) |
| `bun run dev:smart` | Auto port detection + Tailscale IP preview |
| `bun run build` | Production build |
| `bun start` | Start production server |
| `bun run lint` | ESLint check |
| `npx prisma studio` | Database GUI |
| `npx prisma db seed` | Re-seed product data |

## Admin Panel

1. Navigate to `/admin/login`
2. Enter the password from `ADMIN_PASSWORD` env var
3. Manage products: create, edit, delete, toggle featured
4. Upload images via drag-and-drop or URL input

## Database Reset

```bash
rm prisma/dev.db
npx prisma migrate dev
npx prisma db seed
```

## Remote Access (Tailscale)

Dev server binds to `0.0.0.0` for Tailscale access:

```bash
bun run dev -- --hostname 0.0.0.0
# Access via http://<tailscale-ip>:3000
```

`next.config.ts` includes `allowedDevOrigins` for Tailscale IP.

## Troubleshooting

| Issue | Solution |
|---|---|
| `Cannot find module '.prisma/client/default'` | Run `npx prisma generate` |
| `SQLITE_CANTOPEN` | Check `DATABASE_URL` path, run `npx prisma migrate dev` |
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` |
| `server-only` import error in client component | Import from `@/data/constants` instead of `@/data/products` |

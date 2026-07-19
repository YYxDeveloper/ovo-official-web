# ovo Official Website Demo

Apple Store TW-inspired marketing website for the ovo brand (Phone, Watch, Buds).

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Animation**: Framer Motion 12
- **State**: Zustand 5 (compare) + nuqs (URL variant state)
- **Navigation**: @radix-ui/react-navigation-menu

## Getting Started

```bash
npm install
npm run dev:smart   # auto port detection + Tailscale IP preview
```

## Products (7 total)

| Category | Models |
|---|---|
| Phone | ovo Phone 17 · 17 Pro · 17 Air |
| Watch | ovo Watch Ultra · Watch S |
| Buds | ovo Buds Pro · Buds Air |

## Routes

- `/` — Home (HeroBanner + FeaturedProducts + CategoryCards)
- `/products/[category]` — Product listing (phone / watch / buds)
- `/products/[category]/[slug]` — Product detail (gallery + variants + specs)
- `/compare` — Side-by-side comparison (max 3 products)

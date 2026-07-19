export const SITE = {
  name: "ovo",
  description: "ovo 官方網站 — 探索手機、手錶與耳機。",
  url: "https://ovo.example.com",
  ogImage: "https://picsum.photos/seed/ovo-og/1200/630",
} as const;

export const CATEGORIES = ["phone", "watch", "buds"] as const;

export const NAV_ITEMS = [
  { label: "Phone", href: "/products/phone" },
  { label: "Watch", href: "/products/watch" },
  { label: "Buds", href: "/products/buds" },
  { label: "比較", href: "/compare" },
] as const;

export const SCROLL_BLUR_THRESHOLD = 50;

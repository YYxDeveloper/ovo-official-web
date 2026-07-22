export interface VigorSlide {
  id: number;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  sortOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VigorService {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
  category: VigorServiceCategory;
  sortOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VigorPartner {
  id: number;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  sortOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type VigorServiceCategory = "health" | "learning" | "social" | "living";

export interface VigorNavItem {
  label: string;
  href: string;
}

export const VIGOR_SERVICE_CATEGORIES: VigorServiceCategory[] = [
  "health",
  "learning",
  "social",
  "living",
];

export const VIGOR_NAV_ITEMS: VigorNavItem[] = [
  { label: "首頁", href: "/vigor" },
  { label: "關於我們", href: "/vigor/about" },
  { label: "健康樂活", href: "/vigor?category=health" },
  { label: "終身學習", href: "/vigor?category=learning" },
  { label: "社群連結", href: "/vigor?category=social" },
  { label: "生活支援", href: "/vigor?category=living" },
  { label: "聯絡我們", href: "/vigor/contact" },
];

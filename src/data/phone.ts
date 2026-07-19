import type { Product } from "./types";

const storage = [
  { label: "128GB", priceAdd: 0 },
  { label: "256GB", priceAdd: 3000 },
  { label: "512GB", priceAdd: 7000 },
];

const phoneColors = {
  black: { name: "鈦黑色", hex: "#1d1d1f", imageUrl: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=1200" },
  white: { name: "鈦白色", hex: "#f5f5f7", imageUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=1200" },
  blue: { name: "鈦藍色", hex: "#3a4a5c", imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=1200" },
  natural: { name: "原色鈦金", hex: "#c4b8a0", imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200" },
};

export const phoneProducts: Product[] = [
  {
    id: "phone-17",
    slug: "ovo-phone-17",
    name: "ovo Phone 17",
    tagline: "速度的新定義",
    category: "phone",
    basePrice: 29900,
    colors: Object.values(phoneColors),
    storage,
    specs: [
      { label: "顯示器", value: '6.1 吋 Super Retina XDR' },
      { label: "晶片", value: "ovo A19 仿生晶片" },
      { label: "相機", value: "4800 萬像素雙鏡頭系統" },
      { label: "電池", value: "最長可達 22 小時影片播放" },
      { label: "防水", value: "IP68 等級" },
      { label: "材質", value: "鋁金屬設計" },
    ],
    images: [
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=1600",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=1600",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=1600",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1600",
    ],
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=2000",
  },
  {
    id: "phone-17-pro",
    slug: "ovo-phone-17-pro",
    name: "ovo Phone 17 Pro",
    tagline: "專業，從鏡頭開始",
    category: "phone",
    basePrice: 35900,
    colors: Object.values(phoneColors),
    storage,
    specs: [
      { label: "顯示器", value: '6.3 吋 Super Retina XDR ProMotion' },
      { label: "晶片", value: "ovo A19 Pro 仿生晶片" },
      { label: "相機", value: "4800 萬像素 Pro 三鏡頭系統" },
      { label: "電池", value: "最長可達 27 小時影片播放" },
      { label: "防水", value: "IP68 等級" },
      { label: "材質", value: "鈦金屬設計" },
    ],
    images: [
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=1600",
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=1600",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=1600",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1600",
    ],
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=2000",
  },
  {
    id: "phone-17-air",
    slug: "ovo-phone-17-air",
    name: "ovo Phone 17 Air",
    tagline: "輕薄至極，效能依舊",
    category: "phone",
    basePrice: 32900,
    colors: Object.values(phoneColors),
    storage,
    specs: [
      { label: "顯示器", value: '6.6 吋 Super Retina XDR' },
      { label: "晶片", value: "ovo A19 仿生晶片" },
      { label: "相機", value: "4800 萬像素雙鏡頭系統" },
      { label: "電池", value: "最長可達 24 小時影片播放" },
      { label: "厚度", value: "5.8 公釐 — 史上最薄" },
      { label: "材質", value: "鈦金屬設計" },
    ],
    images: [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=1600",
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=1600",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=1600",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1600",
    ],
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=2000",
  },
];

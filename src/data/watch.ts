import type { Product } from "./types";

const watchColors = {
  midnight: { name: "午夜黑", hex: "#1d1d1f", imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200" },
  silver: { name: "星光銀", hex: "#e3e4e5", imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200" },
  gold: { name: "玫瑰金", hex: "#e6c7b8", imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1200" },
};

export const watchProducts: Product[] = [
  {
    id: "watch-ultra",
    slug: "ovo-watch-ultra",
    name: "ovo Watch Ultra",
    tagline: "極限挑戰者的選擇",
    category: "watch",
    basePrice: 28900,
    colors: Object.values(watchColors),
    specs: [
      { label: "顯示器", value: "49 公釐 Always-On Retina" },
      { label: "晶片", value: "ovo S9 處理器" },
      { label: "電池", value: "最長可達 36 小時" },
      { label: "防水", value: "100 公尺防水" },
      { label: "材質", value: "航太級鈦金屬錶殼" },
      { label: "GPS", value: "精準雙頻 GPS" },
    ],
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1600",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1600",
    ],
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=2000",
  },
  {
    id: "watch-s",
    slug: "ovo-watch-s",
    name: "ovo Watch S",
    tagline: "優雅，精準，全天候",
    category: "watch",
    basePrice: 13900,
    colors: Object.values(watchColors),
    specs: [
      { label: "顯示器", value: "41 公釐 Always-On Retina" },
      { label: "晶片", value: "ovo S9 處理器" },
      { label: "電池", value: "最長可達 18 小時" },
      { label: "防水", value: "50 公尺防水" },
      { label: "材質", value: "鋁金屬錶殼" },
      { label: "GPS", value: "GPS" },
    ],
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1600",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1600",
    ],
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=2000",
  },
];

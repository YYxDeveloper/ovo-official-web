import type { Product } from "./types";

const budsColors = {
  white: { name: "經典白", hex: "#f5f5f7", imageUrl: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=1200" },
  black: { name: "深邃黑", hex: "#1d1d1f", imageUrl: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1200" },
};

export const budsProducts: Product[] = [
  {
    id: "buds-pro",
    slug: "ovo-buds-pro",
    name: "ovo Buds Pro",
    tagline: "沉浸在聲音的世界",
    category: "buds",
    basePrice: 7490,
    colors: Object.values(budsColors),
    specs: [
      { label: "驅動單體", value: "客製化動圈驅動單體" },
      { label: "降噪", value: "主動式降噪 + 通透模式" },
      { label: "電池", value: "最長可達 6 小時聆聽時間" },
      { label: "充電盒", value: "MagSafe 充電盒" },
      { label: "防水", value: "IP54 防汗防潑水" },
      { label: "音訊", value: "空間音訊 + 動態頭部追蹤" },
    ],
    images: [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=1600",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1600",
    ],
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=2000",
  },
  {
    id: "buds-air",
    slug: "ovo-buds-air",
    name: "ovo Buds Air",
    tagline: "輕盈自在，隨時連線",
    category: "buds",
    basePrice: 4490,
    colors: Object.values(budsColors),
    specs: [
      { label: "驅動單體", value: "客製化動圈驅動單體" },
      { label: "電池", value: "最長可達 5 小時聆聽時間" },
      { label: "充電盒", value: "Lightning 充電盒" },
      { label: "防水", value: "IPX4 防汗防潑水" },
      { label: "音訊", value: "空間音訊" },
    ],
    images: [
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1600",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=1600",
    ],
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=2000",
  },
];

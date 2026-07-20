import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const phoneColors = [
  { name: "鈦黑色", hex: "#1d1d1f", imageUrl: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=1200" },
  { name: "鈦白色", hex: "#f5f5f7", imageUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=1200" },
  { name: "鈦藍色", hex: "#3a4a5c", imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=1200" },
  { name: "原色鈦金", hex: "#c4b8a0", imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200" },
];

const phoneStorage = [
  { label: "128GB", priceAdd: 0 },
  { label: "256GB", priceAdd: 3000 },
  { label: "512GB", priceAdd: 7000 },
];

const watchColors = [
  { name: "午夜黑", hex: "#1d1d1f", imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200" },
  { name: "星光銀", hex: "#e3e4e5", imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200" },
  { name: "玫瑰金", hex: "#e6c7b8", imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1200" },
];

const budsColors = [
  { name: "經典白", hex: "#f5f5f7", imageUrl: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=1200" },
  { name: "深邃黑", hex: "#1d1d1f", imageUrl: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1200" },
];

type SeedProduct = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  basePrice: number;
  featured: boolean;
  heroImage?: string;
  sortOrder: number;
  colors: { name: string; hex: string; imageUrl: string }[];
  storage: { label: string; priceAdd: number }[];
  specs: { label: string; value: string }[];
  images: string[];
};

const products: SeedProduct[] = [
  {
    slug: "ovo-phone-17",
    name: "ovo Phone 17",
    tagline: "速度的新定義",
    category: "phone",
    basePrice: 29900,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=2000",
    sortOrder: 0,
    colors: phoneColors,
    storage: phoneStorage,
    specs: [
      { label: "顯示器", value: "6.1 吋 Super Retina XDR" },
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
  },
  {
    slug: "ovo-phone-17-pro",
    name: "ovo Phone 17 Pro",
    tagline: "專業，從鏡頭開始",
    category: "phone",
    basePrice: 35900,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=2000",
    sortOrder: 1,
    colors: phoneColors,
    storage: phoneStorage,
    specs: [
      { label: "顯示器", value: "6.3 吋 Super Retina XDR ProMotion" },
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
  },
  {
    slug: "ovo-phone-17-air",
    name: "ovo Phone 17 Air",
    tagline: "輕薄至極，效能依舊",
    category: "phone",
    basePrice: 32900,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=2000",
    sortOrder: 2,
    colors: phoneColors,
    storage: phoneStorage,
    specs: [
      { label: "顯示器", value: "6.6 吋 Super Retina XDR" },
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
  },
  {
    slug: "ovo-watch-ultra",
    name: "ovo Watch Ultra",
    tagline: "極限挑戰者的選擇",
    category: "watch",
    basePrice: 28900,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=2000",
    sortOrder: 3,
    colors: watchColors,
    storage: [],
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
  },
  {
    slug: "ovo-watch-s",
    name: "ovo Watch S",
    tagline: "優雅，精準，全天候",
    category: "watch",
    basePrice: 13900,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=2000",
    sortOrder: 4,
    colors: watchColors,
    storage: [],
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
  },
  {
    slug: "ovo-buds-pro",
    name: "ovo Buds Pro",
    tagline: "沉浸在聲音的世界",
    category: "buds",
    basePrice: 7490,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=2000",
    sortOrder: 5,
    colors: budsColors,
    storage: [],
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
  },
  {
    slug: "ovo-buds-air",
    name: "ovo Buds Air",
    tagline: "輕盈自在，隨時連線",
    category: "buds",
    basePrice: 4490,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=2000",
    sortOrder: 6,
    colors: budsColors,
    storage: [],
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
  },
];

async function main() {
  for (const product of products) {
    const existing = await prisma.product.findUnique({
      where: { slug: product.slug },
    });

    if (existing) {
      await prisma.colorVariant.deleteMany({ where: { productId: existing.id } });
      await prisma.storageVariant.deleteMany({ where: { productId: existing.id } });
      await prisma.productSpec.deleteMany({ where: { productId: existing.id } });
      await prisma.productImage.deleteMany({ where: { productId: existing.id } });

      await prisma.product.update({
        where: { id: existing.id },
        data: {
          name: product.name,
          tagline: product.tagline,
          category: product.category,
          basePrice: product.basePrice,
          featured: product.featured,
          heroImage: product.heroImage,
          sortOrder: product.sortOrder,
          colors: {
            create: product.colors.map((c, i) => ({ ...c, sortOrder: i })),
          },
          storage: {
            create: product.storage.map((s, i) => ({ ...s, sortOrder: i })),
          },
          specs: {
            create: product.specs.map((s, i) => ({ ...s, sortOrder: i })),
          },
          images: {
            create: product.images.map((url, i) => ({ url, sortOrder: i })),
          },
        },
      });
      console.log(`Updated: ${product.name}`);
    } else {
      await prisma.product.create({
        data: {
          slug: product.slug,
          name: product.name,
          tagline: product.tagline,
          category: product.category,
          basePrice: product.basePrice,
          featured: product.featured,
          heroImage: product.heroImage,
          sortOrder: product.sortOrder,
          colors: {
            create: product.colors.map((c, i) => ({ ...c, sortOrder: i })),
          },
          storage: {
            create: product.storage.map((s, i) => ({ ...s, sortOrder: i })),
          },
          specs: {
            create: product.specs.map((s, i) => ({ ...s, sortOrder: i })),
          },
          images: {
            create: product.images.map((url, i) => ({ url, sortOrder: i })),
          },
        },
      });
      console.log(`Created: ${product.name}`);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

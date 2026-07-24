import { prisma } from "../src/lib/db";

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

const phoneColors = [
  { name: "鈦黑色", hex: "#1d1d1f", imageUrl: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=1200" },
  { name: "鈦白色", hex: "#f5f5f7", imageUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=1200" },
  { name: "鈦藍色", hex: "#3a4a5c", imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=1200" },
  { name: "原色鈦金", hex: "#c4b8a0", imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07dbdb?w=1200" },
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
      "https://images.unsplash.com/photo-1601784551446-20c9e07dbdb?w=1600",
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
      "https://images.unsplash.com/photo-1601784551446-20c9e07dbdb?w=1600",
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
      "https://images.unsplash.com/photo-1601784551446-20c9e07dbdb?w=1600",
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

type SeedTile = {
  slug: string;
  name: string;
  category: string;
  size: string;
  finish: string;
  origin: string;
  price: number;
  image: string;
  featured: boolean;
  sortOrder: number;
};

const tileSeed: SeedTile[] = [
  { slug: "wood-01", name: "橡木暖棕", category: "wood", size: "20x120 cm", finish: "霧面", origin: "義大利", price: 3200, image: "https://picsum.photos/seed/wood-01/600/400", featured: true, sortOrder: 0 },
  { slug: "wood-02", name: "胡桃深灰", category: "wood", size: "15x90 cm", finish: "紋路", origin: "西班牙", price: 2800, image: "https://picsum.photos/seed/wood-02/600/400", featured: false, sortOrder: 1 },
  { slug: "wood-03", name: "白橡北歐", category: "wood", size: "20x120 cm", finish: "霧面", origin: "義大利", price: 3500, image: "https://picsum.photos/seed/wood-03/600/400", featured: true, sortOrder: 2 },
  { slug: "lux-01", name: "卡拉拉白大理", category: "luxury", size: "60x120 cm", finish: "亮面", origin: "義大利", price: 6800, image: "https://picsum.photos/seed/lux-01/600/400", featured: true, sortOrder: 3 },
  { slug: "lux-02", name: "帝王金紋", category: "luxury", size: "80x80 cm", finish: "亮面", origin: "西班牙", price: 7200, image: "https://picsum.photos/seed/lux-02/600/400", featured: false, sortOrder: 4 },
  { slug: "min-01", name: "純白霧感", category: "minimal", size: "60x60 cm", finish: "霧面", origin: "台灣", price: 1800, image: "https://picsum.photos/seed/min-01/600/400", featured: true, sortOrder: 5 },
  { slug: "min-02", name: "淺灰素面", category: "minimal", size: "75x75 cm", finish: "霧面", origin: "西班牙", price: 2200, image: "https://picsum.photos/seed/min-02/600/400", featured: false, sortOrder: 6 },
  { slug: "con-01", name: "清水模灰", category: "concrete", size: "60x60 cm", finish: "霧面", origin: "義大利", price: 2600, image: "https://picsum.photos/seed/con-01/600/400", featured: true, sortOrder: 7 },
  { slug: "con-02", name: "深炭水泥", category: "concrete", size: "90x90 cm", finish: "紋路", origin: "西班牙", price: 3100, image: "https://picsum.photos/seed/con-02/600/400", featured: false, sortOrder: 8 },
  { slug: "vin-01", name: "花磚普羅旺斯", category: "vintage", size: "20x20 cm", finish: "亮面", origin: "西班牙", price: 2400, image: "https://picsum.photos/seed/vin-01/600/400", featured: true, sortOrder: 9 },
  { slug: "vin-02", name: "復古赭紅", category: "vintage", size: "15x15 cm", finish: "霧面", origin: "葡萄牙", price: 2000, image: "https://picsum.photos/seed/vin-02/600/400", featured: false, sortOrder: 10 },
  { slug: "sub-01", name: "地鐵白長磚", category: "subway", size: "7.5x15 cm", finish: "亮面", origin: "台灣", price: 1200, image: "https://picsum.photos/seed/sub-01/600/400", featured: false, sortOrder: 11 },
  { slug: "sub-02", name: "地鐵墨綠", category: "subway", size: "7.5x15 cm", finish: "亮面", origin: "英國", price: 1600, image: "https://picsum.photos/seed/sub-02/600/400", featured: false, sortOrder: 12 },
  { slug: "hex-01", name: "六角米白", category: "hexagon", size: "20x23 cm", finish: "霧面", origin: "台灣", price: 1900, image: "https://picsum.photos/seed/hex-01/600/400", featured: false, sortOrder: 13 },
  { slug: "hex-02", name: "六角礦石藍", category: "hexagon", size: "10x11 cm", finish: "亮面", origin: "義大利", price: 2300, image: "https://picsum.photos/seed/hex-02/600/400", featured: false, sortOrder: 14 },
];

const vigorSlides = [
  {
    title: "樂齡生活，從這裡開始",
    subtitle: "躍齡平台陪伴每一位長者",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=2000",
    linkUrl: "/vigor",
    sortOrder: 0,
  },
  {
    title: "健康樂活每一天",
    subtitle: "專業諮詢、健康追蹤一把罩",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=2000",
    linkUrl: "/vigor",
    sortOrder: 1,
  },
  {
    title: "終身學習不孤單",
    subtitle: "課程、社群，樂齡生活更精采",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=2000",
    linkUrl: "/vigor",
    sortOrder: 2,
  },
];

type VigorCategory = "health" | "learning" | "social" | "living";
const vigorServiceNames: Record<VigorCategory, string[]> = {
  health: ["健康諮詢", "用藥提醒", "體適能課程", "營養評估"],
  learning: ["數位學堂", "語言教室", "樂齡大學", "手作工作坊"],
  social: ["同學會社群", "志工媒合", "共餐活動", "鄰里關懷"],
  living: ["生活管家", "居家修繕", "代購服務", "交通接送"],
};

const vigorServiceImageBase = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600";

const vigorServiceData = (Object.keys(vigorServiceNames) as VigorCategory[]).flatMap(
  (cat, catIdx) =>
    vigorServiceNames[cat].map((name, i) => ({
      name,
      description: `${name} — 專業團隊為樂齡生活提供完整支援。`,
      imageUrl: vigorServiceImageBase,
      linkUrl: "/vigor",
      category: cat,
      sortOrder: catIdx * 4 + i,
    })),
);

const vigorPartnerData = [
  { name: "台灣樂齡發展協會", logoUrl: "https://picsum.photos/seed/p1/200/80" },
  { name: "衛生福利部", logoUrl: "https://picsum.photos/seed/p2/200/80" },
  { name: "教育部樂齡學習網", logoUrl: "https://picsum.photos/seed/p3/200/80" },
  { name: "弘道老人福利基金會", logoUrl: "https://picsum.photos/seed/p4/200/80" },
  { name: "伊甸社會福利基金會", logoUrl: "https://picsum.photos/seed/p5/200/80" },
  { name: "門諾基金會", logoUrl: "https://picsum.photos/seed/p6/200/80" },
  { name: "中華民國老人福利聯盟", logoUrl: "https://picsum.photos/seed/p7/200/80" },
  { name: "台北市社會局", logoUrl: "https://picsum.photos/seed/p8/200/80" },
  { name: "新北市高齡友善城市", logoUrl: "https://picsum.photos/seed/p9/200/80" },
  { name: "健康樂齡媒體", logoUrl: "https://picsum.photos/seed/p10/200/80" },
].map((p, i) => ({ ...p, sortOrder: i }));

export async function seedProducts() {
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

  for (const tile of tileSeed) {
    await prisma.tile.upsert({
      where: { slug: tile.slug },
      update: tile,
      create: tile,
    });
    console.log(`Upserted tile: ${tile.name}`);
  }
}

export async function seedVigor() {
  await prisma.vigorSlide.deleteMany();
  await prisma.vigorSlide.createMany({ data: vigorSlides });

  await prisma.vigorService.deleteMany();
  await prisma.vigorService.createMany({ data: vigorServiceData });

  await prisma.vigorPartner.deleteMany();
  await prisma.vigorPartner.createMany({ data: vigorPartnerData });

  console.log(
    `Vigor seed: ${vigorSlides.length} slides, ${vigorServiceData.length} services, ${vigorPartnerData.length} partners`,
  );
}

export async function main() {
  await seedProducts();
  await seedVigor();
}

if (require.main === module) {
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

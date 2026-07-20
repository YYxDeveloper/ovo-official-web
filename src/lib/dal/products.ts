import "server-only";
import { prisma } from "@/lib/db";
import type { Product, ProductCategory } from "@/data/types";

type ProductWithRelations = Awaited<
  ReturnType<typeof prisma.product.findFirst>
> & {
  colors: { name: string; hex: string; imageUrl: string; sortOrder: number }[];
  storage: { label: string; priceAdd: number; sortOrder: number }[];
  specs: { label: string; value: string; sortOrder: number }[];
  images: { url: string; sortOrder: number }[];
};

function toProduct(p: NonNullable<ProductWithRelations>): Product {
  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    category: p.category as ProductCategory,
    basePrice: p.basePrice,
    colors: p.colors
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(({ name, hex, imageUrl }) => ({ name, hex, imageUrl })),
    storage:
      p.storage.length > 0
        ? p.storage
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map(({ label, priceAdd }) => ({ label, priceAdd }))
        : undefined,
    specs: p.specs
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(({ label, value }) => ({ label, value })),
    images: p.images
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((img) => img.url),
    featured: p.featured,
    heroImage: p.heroImage ?? undefined,
  };
}

const includeAll = {
  colors: true,
  storage: true,
  specs: true,
  images: true,
} as const;

export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: includeAll,
    orderBy: { sortOrder: "asc" },
  });
  return products.map((p) => toProduct(p as ProductWithRelations));
}

export async function getProductsByCategory(
  category: ProductCategory,
): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { category },
    include: includeAll,
    orderBy: { sortOrder: "asc" },
  });
  return products.map((p) => toProduct(p as ProductWithRelations));
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  const p = await prisma.product.findUnique({
    where: { slug },
    include: includeAll,
  });
  if (!p) return null;
  return toProduct(p as ProductWithRelations);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { featured: true },
    include: includeAll,
    orderBy: { sortOrder: "asc" },
  });
  return products.map((p) => toProduct(p as ProductWithRelations));
}

export async function createProduct(data: {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  basePrice: number;
  featured: boolean;
  heroImage?: string;
  sortOrder?: number;
  colors: { name: string; hex: string; imageUrl: string }[];
  storage: { label: string; priceAdd: number }[];
  specs: { label: string; value: string }[];
  images: string[];
}): Promise<Product> {
  const p = await prisma.product.create({
    data: {
      slug: data.slug,
      name: data.name,
      tagline: data.tagline,
      category: data.category,
      basePrice: data.basePrice,
      featured: data.featured,
      heroImage: data.heroImage,
      sortOrder: data.sortOrder ?? 0,
      colors: {
        create: data.colors.map((c, i) => ({ ...c, sortOrder: i })),
      },
      storage: {
        create: data.storage.map((s, i) => ({ ...s, sortOrder: i })),
      },
      specs: {
        create: data.specs.map((s, i) => ({ ...s, sortOrder: i })),
      },
      images: {
        create: data.images.map((url, i) => ({ url, sortOrder: i })),
      },
    },
    include: includeAll,
  });
  return toProduct(p as ProductWithRelations);
}

export async function updateProduct(
  id: number,
  data: {
    slug?: string;
    name?: string;
    tagline?: string;
    category?: string;
    basePrice?: number;
    featured?: boolean;
    heroImage?: string | null;
    sortOrder?: number;
    colors?: { name: string; hex: string; imageUrl: string }[];
    storage?: { label: string; priceAdd: number }[];
    specs?: { label: string; value: string }[];
    images?: string[];
  },
): Promise<Product> {
  const { colors, storage, specs, images, ...productData } = data;

  return prisma.$transaction(async (tx) => {
    if (colors) {
      await tx.colorVariant.deleteMany({ where: { productId: id } });
      await tx.colorVariant.createMany({
        data: colors.map((c, i) => ({ ...c, sortOrder: i, productId: id })),
      });
    }
    if (storage) {
      await tx.storageVariant.deleteMany({ where: { productId: id } });
      await tx.storageVariant.createMany({
        data: storage.map((s, i) => ({ ...s, sortOrder: i, productId: id })),
      });
    }
    if (specs) {
      await tx.productSpec.deleteMany({ where: { productId: id } });
      await tx.productSpec.createMany({
        data: specs.map((s, i) => ({ ...s, sortOrder: i, productId: id })),
      });
    }
    if (images) {
      await tx.productImage.deleteMany({ where: { productId: id } });
      await tx.productImage.createMany({
        data: images.map((url, i) => ({ url, sortOrder: i, productId: id })),
      });
    }

    const p = await tx.product.update({
      where: { id },
      data: productData,
      include: includeAll,
    });
    return toProduct(p as ProductWithRelations);
  });
}

export async function deleteProduct(id: number): Promise<void> {
  await prisma.product.delete({ where: { id } });
}

export async function getProductById(id: number) {
  return prisma.product.findUnique({
    where: { id },
    include: includeAll,
  });
}

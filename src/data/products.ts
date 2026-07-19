import type { Product, ProductCategory } from "./types";
import { phoneProducts } from "./phone";
import { watchProducts } from "./watch";
import { budsProducts } from "./buds";

export type { Product, ProductCategory, ColorVariant, StorageVariant, ProductSpec } from "./types";

export const allProducts: Product[] = [...phoneProducts, ...watchProducts, ...budsProducts];

export const productsByCategory: Record<ProductCategory, Product[]> = {
  phone: phoneProducts,
  watch: watchProducts,
  buds: budsProducts,
};

export function getProductBySlug(category: ProductCategory, slug: string): Product | undefined {
  return productsByCategory[category].find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter((p) => p.featured);
}

export const categoryLabelsZh: Record<ProductCategory, string> = {
  phone: "手機",
  watch: "手錶",
  buds: "耳機",
};

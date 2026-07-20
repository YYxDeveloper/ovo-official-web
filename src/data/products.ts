import "server-only";
import type { ProductCategory } from "./types";
import * as dal from "@/lib/dal/products";

export type { Product, ProductCategory, ColorVariant, StorageVariant, ProductSpec } from "./types";
export { categoryLabelsZh } from "./constants";

export async function getAllProducts() {
  return dal.getAllProducts();
}

export async function getProductsByCategory(category: ProductCategory) {
  return dal.getProductsByCategory(category);
}

export async function getProductBySlug(_category: ProductCategory, slug: string) {
  return dal.getProductBySlug(slug);
}

export async function getFeaturedProducts() {
  return dal.getFeaturedProducts();
}

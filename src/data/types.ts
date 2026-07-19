export interface ColorVariant {
  name: string;
  hex: string;
  imageUrl: string;
}

export interface StorageVariant {
  label: string;
  priceAdd: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export type ProductCategory = "phone" | "watch" | "buds";

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  basePrice: number;
  colors: ColorVariant[];
  storage?: StorageVariant[];
  specs: ProductSpec[];
  images: string[];
  featured?: boolean;
  heroImage?: string;
}

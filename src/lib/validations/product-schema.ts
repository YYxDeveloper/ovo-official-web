import { z } from "zod/v4";

export const colorVariantSchema = z.object({
  name: z.string().min(1, "顏色名稱必填"),
  hex: z.string().regex(/^#[0-9a-fA-F]{6}$/, "無效的色碼"),
  imageUrl: z.string().min(1, "圖片 URL 必填"),
});

export const storageVariantSchema = z.object({
  label: z.string().min(1, "容量標籤必填"),
  priceAdd: z.coerce.number().int().min(0, "加價不可為負"),
});

export const specSchema = z.object({
  label: z.string().min(1, "規格名稱必填"),
  value: z.string().min(1, "規格值必填"),
});

export const productSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug 必填")
    .regex(/^[a-z0-9-]+$/, "Slug 只允許小寫英數和連字號"),
  name: z.string().min(1, "產品名稱必填"),
  tagline: z.string().min(1, "標語必填"),
  category: z.enum(["phone", "watch", "buds"]),
  basePrice: z.coerce.number().int().positive("價格必須大於 0"),
  featured: z.coerce.boolean().default(false),
  heroImage: z.string().optional(),
  sortOrder: z.coerce.number().int().default(0),
  colors: z.array(colorVariantSchema).min(1, "至少需要一個顏色"),
  storage: z.array(storageVariantSchema).default([]),
  specs: z.array(specSchema).min(1, "至少需要一個規格"),
  images: z.array(z.string().min(1)).min(1, "至少需要一張圖片"),
});

export type ProductFormData = z.infer<typeof productSchema>;

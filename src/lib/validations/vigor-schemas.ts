import { z } from "zod/v4";
import { VIGOR_SERVICE_CATEGORIES } from "@/data/vigor-types";

export const vigorSlideSchema = z.object({
  title: z.string().min(1, "標題必填"),
  subtitle: z.string().optional(),
  imageUrl: z
    .string()
    .min(1, "圖片 URL 必填")
    .url("圖片 URL 格式錯誤"),
  linkUrl: z.string().url("連結 URL 格式錯誤").optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().default(0),
  active: z
    .union([z.literal("on"), z.literal("true"), z.literal("false"), z.boolean()])
    .transform((v) => v === "on" || v === "true" || v === true)
    .default(false),
});

export const vigorServiceSchema = z.object({
  name: z.string().min(1, "服務名稱必填"),
  description: z.string().optional(),
  imageUrl: z
    .string()
    .min(1, "圖片 URL 必填")
    .url("圖片 URL 格式錯誤"),
  linkUrl: z.string().url("連結 URL 格式錯誤").optional().or(z.literal("")),
  category: z.enum(VIGOR_SERVICE_CATEGORIES),
  sortOrder: z.coerce.number().int().default(0),
  active: z
    .union([z.literal("on"), z.literal("true"), z.literal("false"), z.boolean()])
    .transform((v) => v === "on" || v === "true" || v === true)
    .default(false),
});

export const vigorPartnerSchema = z.object({
  name: z.string().min(1, "夥伴名稱必填"),
  logoUrl: z
    .string()
    .min(1, "Logo URL 必填")
    .url("Logo URL 格式錯誤"),
  websiteUrl: z.string().url("網站 URL 格式錯誤").optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().default(0),
  active: z
    .union([z.literal("on"), z.literal("true"), z.literal("false"), z.boolean()])
    .transform((v) => v === "on" || v === "true" || v === true)
    .default(false),
});

export type VigorSlideFormData = z.infer<typeof vigorSlideSchema>;
export type VigorServiceFormData = z.infer<typeof vigorServiceSchema>;
export type VigorPartnerFormData = z.infer<typeof vigorPartnerSchema>;

import { z } from "zod/v4";

export const tileSchema = z.object({
  slug: z.string().min(1, "Slug 必填").regex(/^[a-z0-9-]+$/, "只允許小寫英數和連字號"),
  name: z.string().min(1, "名稱必填"),
  category: z.enum(["wood", "luxury", "minimal", "concrete", "vintage", "subway", "hexagon"]),
  size: z.string().min(1, "尺寸必填"),
  finish: z.enum(["霧面", "亮面", "紋路"]),
  origin: z.string().min(1, "產地必填"),
  price: z.coerce.number().int().positive("價格必須大於 0"),
  image: z.url("必須是有效的 URL"),
  featured: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
});

export type TileFormData = z.infer<typeof tileSchema>;

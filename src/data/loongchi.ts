// 磁磚資料已遷移至 Prisma SQLite DB。
// 請使用 src/lib/dal/tiles.ts 的函式讀取資料（server-only）。
// 此檔僅保留前台客戶端元件需要的類型與標籤。

export type TileCategory =
  | "wood"
  | "luxury"
  | "minimal"
  | "concrete"
  | "vintage"
  | "subway"
  | "hexagon";

export const categoryLabels: Record<TileCategory, string> = {
  wood: "木紋",
  luxury: "奢華",
  minimal: "極簡",
  concrete: "仿清水",
  vintage: "復古",
  subway: "地鐵",
  hexagon: "六角",
};

// DB 回傳的磁磚資料型別（對應 Prisma Tile model）
export interface Tile {
  id: number;
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
  createdAt: Date;
  updatedAt: Date;
}

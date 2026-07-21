"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { TileCard } from "@/components/loongchi/TileCard";
import { categoryLabels } from "@/data/loongchi";
import type { TileCategory, Tile } from "@/data/loongchi";
import { cn } from "@/lib/utils";

const allCategories: (TileCategory | "all")[] = [
  "all", "wood", "luxury", "minimal", "concrete", "vintage", "subway", "hexagon",
];

const tabLabel = (cat: TileCategory | "all") =>
  cat === "all" ? "全部" : categoryLabels[cat];

export function ProductsContent({ tiles }: { tiles: Tile[] }) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") as TileCategory | null;
  const [active, setActive] = useState<TileCategory | "all">(
    initialCat && categoryLabels[initialCat] ? initialCat : "all"
  );

  const filtered = active === "all" ? tiles : tiles.filter((t) => t.category === active);

  return (
    <div className="min-h-screen py-16 px-6" style={{ backgroundColor: "var(--lc-bg)" }}>
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-4xl font-light" style={{ color: "var(--lc-text)" }}>
          產品目錄
        </h1>
        <p className="mb-10 text-sm" style={{ color: "var(--lc-muted)" }}>
          共 {filtered.length} 款
        </p>

        <div
          className="mb-10 flex flex-wrap gap-2 border-b pb-4"
          style={{ borderColor: "var(--lc-border)" }}
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn("px-4 py-1.5 text-sm tracking-wide transition-colors", active === cat ? "font-medium" : "hover:opacity-70")}
              style={
                active === cat
                  ? { backgroundColor: "var(--lc-accent)", color: "#fff" }
                  : { backgroundColor: "var(--lc-surface)", color: "var(--lc-muted)" }
              }
            >
              {tabLabel(cat)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((tile) => (
            <TileCard key={tile.id} tile={tile} />
          ))}
        </div>
      </div>
    </div>
  );
}

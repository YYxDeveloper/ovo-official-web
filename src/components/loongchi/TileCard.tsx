import Image from "next/image";
import type { Tile } from "@/data/loongchi";
import { categoryLabels } from "@/data/loongchi";
import type { TileCategory } from "@/data/loongchi";

interface TileCardProps {
  tile: Tile;
}

export function TileCard({ tile }: TileCardProps) {
  return (
    <article
      className="group overflow-hidden"
      style={{ backgroundColor: "var(--lc-surface)", border: "1px solid var(--lc-border)" }}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={tile.image}
          alt={tile.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <span
          className="absolute left-3 top-3 px-2 py-0.5 text-xs tracking-wide"
          style={{
            backgroundColor: "var(--lc-accent)",
            color: "#fff",
          }}
        >
          {categoryLabels[tile.category as TileCategory] ?? tile.category}
        </span>
      </div>

      <div className="p-4">
        <h3
          className="mb-1 text-base font-medium"
          style={{ color: "var(--lc-text)" }}
        >
          {tile.name}
        </h3>
        <div
          className="mb-3 flex flex-wrap gap-x-3 text-xs"
          style={{ color: "var(--lc-muted)" }}
        >
          <span>{tile.size}</span>
          <span>{tile.finish}</span>
          <span>{tile.origin}</span>
        </div>
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--lc-accent)" }}
        >
          NT$ {tile.price.toLocaleString()} / 坪
        </p>
      </div>
    </article>
  );
}

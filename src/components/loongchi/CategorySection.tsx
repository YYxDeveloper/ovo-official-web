import Link from "next/link";
import type { TileCategory } from "@/data/loongchi";
import { categoryLabels } from "@/data/loongchi";

const categoryImages: Record<TileCategory, string> = {
  wood: "https://picsum.photos/seed/cat-wood/400/300",
  luxury: "https://picsum.photos/seed/cat-luxury/400/300",
  minimal: "https://picsum.photos/seed/cat-minimal/400/300",
  concrete: "https://picsum.photos/seed/cat-concrete/400/300",
  vintage: "https://picsum.photos/seed/cat-vintage/400/300",
  subway: "https://picsum.photos/seed/cat-subway/400/300",
  hexagon: "https://picsum.photos/seed/cat-hexagon/400/300",
};

const categories = Object.keys(categoryLabels) as TileCategory[];

export function CategorySection() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: "var(--lc-bg)" }}>
      <div className="mx-auto max-w-7xl">
        <h2
          className="mb-2 text-center text-3xl font-light tracking-wide"
          style={{ color: "var(--lc-text)" }}
        >
          產品系列
        </h2>
        <p
          className="mb-12 text-center text-sm"
          style={{ color: "var(--lc-muted)" }}
        >
          七大風格，為每個空間找到最適合的語彙
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/loongchi/products?category=${cat}`}
              className="group relative aspect-square overflow-hidden"
              style={{ border: "1px solid var(--lc-border)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={categoryImages[cat]}
                alt={categoryLabels[cat]}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 flex items-end p-3 transition-opacity"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
              >
                <span className="text-sm font-medium text-white tracking-wider">
                  {categoryLabels[cat]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

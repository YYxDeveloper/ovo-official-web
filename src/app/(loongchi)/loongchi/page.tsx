import type { Metadata } from "next";
import { HeroSection } from "@/components/loongchi/HeroSection";
import { AboutPreview } from "@/components/loongchi/AboutPreview";
import { CategorySection } from "@/components/loongchi/CategorySection";
import { TileCard } from "@/components/loongchi/TileCard";
import { getFeaturedTiles } from "@/lib/dal/tiles";

export const metadata: Metadata = { title: "首頁" };

const news = [
  {
    id: 1,
    date: "2024-11-15",
    title: "義大利 Cersaie 磁磚展最新趨勢報導",
    excerpt: "2024 波隆納磁磚展亮相的頂尖設計，極簡美學與永續材質成為主角。",
  },
  {
    id: 2,
    date: "2024-10-01",
    title: "秋冬新品上市：清水模系列再添新色",
    excerpt: "深炭灰與溫潤米白兩款全新色號，滿足現代居家的多元需求。",
  },
  {
    id: 3,
    date: "2024-08-20",
    title: "隆記企業榮獲 2024 優良進口商認證",
    excerpt: "連續五年獲得台灣貿易推廣協會認證，品質有保障。",
  },
];

export default async function LoongchiHomePage() {
  const featuredTiles = await getFeaturedTiles();
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <CategorySection />

      {/* Featured Tiles */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--lc-surface)" }}>
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-2 text-center text-3xl font-light tracking-wide"
            style={{ color: "var(--lc-text)" }}
          >
            精選商品
          </h2>
          <p
            className="mb-12 text-center text-sm"
            style={{ color: "var(--lc-muted)" }}
          >
            本季最受矚目的磁磚款式
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTiles.map((tile) => (
              <TileCard key={tile.id} tile={tile} />
            ))}
          </div>
        </div>
      </section>

      {/* News Teaser */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--lc-bg)" }}>
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-12 text-center text-3xl font-light tracking-wide"
            style={{ color: "var(--lc-text)" }}
          >
            最新消息
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {news.map(({ id, date, title, excerpt }) => (
              <article
                key={id}
                className="border-t pt-6"
                style={{ borderColor: "var(--lc-border)" }}
              >
                <time
                  className="mb-2 block text-xs tracking-wider"
                  style={{ color: "var(--lc-muted)" }}
                >
                  {date}
                </time>
                <h3
                  className="mb-2 text-base font-medium"
                  style={{ color: "var(--lc-text)" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--lc-muted)" }}>
                  {excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

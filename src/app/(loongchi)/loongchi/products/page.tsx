import { Suspense } from "react";
import { ProductsContent } from "./ProductsContent";
import { getAllTiles } from "@/lib/dal/tiles";
import type { Tile } from "@/data/loongchi";

export const metadata = { title: "產品目錄" };

export default async function LoongchiProductsPage() {
  const tiles = await getAllTiles() as Tile[];

  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center"
          style={{ backgroundColor: "var(--lc-bg)", color: "var(--lc-muted)" }}
        >
          載入中…
        </div>
      }
    >
      <ProductsContent tiles={tiles} />
    </Suspense>
  );
}

import type { Metadata } from "next";
import { getAllProducts } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";

export const metadata: Metadata = {
  title: "所有產品",
  description: "瀏覽全部 ovo 產品。",
};

export default async function ProductsIndexPage() {
  const allProducts = await getAllProducts();
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 md:py-20">
      <header className="mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-ovo-muted">
          All Products
        </p>
        <h1 className="text-section font-semibold text-ovo-text">所有產品</h1>
        <p className="mt-2 max-w-xl text-sm text-ovo-muted">
          Phone、Watch、Buds — 為你的日常生活打造的產品系列。
        </p>
      </header>
      <ProductGrid products={allProducts} />
    </div>
  );
}

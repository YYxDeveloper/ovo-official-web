import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import { getProductsByCategory, categoryLabelsZh } from "@/data/products";
import type { ProductCategory } from "@/data/types";
import { ProductGrid } from "@/components/product/ProductGrid";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isProductCategory(category)) return {};
  return {
    title: `${categoryLabelsZh[category]}`,
    description: `ovo ${categoryLabelsZh[category]} 系列。`,
  };
}

function isProductCategory(value: string): value is ProductCategory {
  return (CATEGORIES as readonly string[]).includes(value);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isProductCategory(category)) notFound();
  const products = await getProductsByCategory(category);
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 md:py-20">
      <header className="mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-ovo-muted">
          {category}
        </p>
        <h1 className="text-section font-semibold text-ovo-text">
          {categoryLabelsZh[category]}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-ovo-muted">
          共 {products.length} 款產品。
        </p>
      </header>
      <ProductGrid products={products} />
    </div>
  );
}

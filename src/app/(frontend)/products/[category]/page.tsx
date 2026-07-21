import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import { getProductsByCategory, categoryLabelsZh } from "@/data/products";
import type { ProductCategory } from "@/data/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";

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
    <PageContainer>
      <PageHeader
        label={category}
        title={categoryLabelsZh[category]}
        description={`共 ${products.length} 款產品。`}
      />
      <ProductGrid products={products} />
    </PageContainer>
  );
}

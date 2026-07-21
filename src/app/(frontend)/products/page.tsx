import type { Metadata } from "next";
import { getAllProducts } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "所有產品",
  description: "瀏覽全部 ovo 產品。",
};

export default async function ProductsIndexPage() {
  const allProducts = await getAllProducts();
  return (
    <PageContainer>
      <PageHeader
        label="All Products"
        title="所有產品"
        description="Phone、Watch、Buds — 為你的日常生活打造的產品系列。"
      />
      <ProductGrid products={allProducts} />
    </PageContainer>
  );
}

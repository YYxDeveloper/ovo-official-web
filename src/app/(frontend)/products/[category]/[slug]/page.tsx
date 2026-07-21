import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import {
  categoryLabelsZh,
  getProductBySlug,
  getProductsByCategory,
} from "@/data/products";
import type { ProductCategory } from "@/data/types";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductSpecTable } from "@/components/product/ProductSpecTable";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

export async function generateStaticParams() {
  const results = [];
  for (const category of CATEGORIES) {
    const products = await getProductsByCategory(category);
    for (const p of products) {
      results.push({ category, slug: p.slug });
    }
  }
  return results;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const product = await getProductBySlug(category as ProductCategory, slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
  };
}

function isCategory(value: string): value is ProductCategory {
  return (CATEGORIES as readonly string[]).includes(value);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  if (!isCategory(category)) notFound();
  const product = await getProductBySlug(category, slug);
  if (!product) notFound();

  return (
    <PageContainer py="compact">
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: categoryLabelsZh[category], href: `/products/${category}` },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductImageGallery images={product.images} alt={product.name} />
        <Suspense fallback={<div className="h-96" />}>
          <ProductHero product={product} />
        </Suspense>
      </div>

      <section className="mt-16 md:mt-24">
        <h2 className="text-section font-semibold text-ovo-text">規格</h2>
        <p className="mt-2 text-sm text-ovo-muted">
          {product.name} 的完整技術規格。
        </p>
        <div className="mt-6">
          <ProductSpecTable specs={product.specs} />
        </div>
      </section>
    </PageContainer>
  );
}

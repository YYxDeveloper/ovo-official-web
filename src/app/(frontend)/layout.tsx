import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CompareBar } from "@/components/compare/CompareBar";
import { SITE } from "@/lib/constants";
import { getProductsByCategory } from "@/data/products";
import type { ProductCategory } from "@/data/types";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — 官方網站`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [phone, watch, buds] = await Promise.all([
    getProductsByCategory("phone"),
    getProductsByCategory("watch"),
    getProductsByCategory("buds"),
  ]);
  const productsByCategory: Record<ProductCategory, typeof phone> = {
    phone,
    watch,
    buds,
  };

  return (
    <html lang="zh-TW" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-ovo-black text-ovo-text">
        <NuqsAdapter>
          <SiteHeader productsByCategory={productsByCategory} />
          <main className="flex-1 pt-12 md:pt-14">{children}</main>
          <SiteFooter />
          <CompareBar />
        </NuqsAdapter>
      </body>
    </html>
  );
}

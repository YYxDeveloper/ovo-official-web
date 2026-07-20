"use client";

import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categoryLabelsZh } from "@/data/constants";
import type { Product, ProductCategory } from "@/data/types";
import { formatPrice } from "@/lib/format";

const CATEGORIES: { key: ProductCategory; label: string }[] = [
  { key: "phone", label: categoryLabelsZh.phone },
  { key: "watch", label: categoryLabelsZh.watch },
  { key: "buds", label: categoryLabelsZh.buds },
];

export function MegaMenu({
  productsByCategory,
}: {
  productsByCategory: Record<ProductCategory, Product[]>;
}) {
  return (
    <NavigationMenu viewport={false} className="text-ovo-text">
      <NavigationMenuList>
        {CATEGORIES.map(({ key, label }) => (
          <NavigationMenuItem key={key}>
            <NavigationMenuTrigger className="bg-transparent text-sm text-ovo-text/80 hover:text-ovo-text data-[state=open]:bg-transparent data-[state=open]:text-ovo-text">
              {label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="left-0 top-full w-[min(92vw,640px)] p-4">
              <MegaMenuPanel category={key} products={productsByCategory[key]} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <Link
            href="/compare"
            className="inline-flex h-9 items-center justify-center rounded-lg px-2.5 text-sm font-medium text-ovo-text/80 transition hover:text-ovo-text"
          >
            比較
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MegaMenuPanel({ category, products }: { category: ProductCategory; products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${category}/${product.slug}`}
          className="group flex items-center gap-3 rounded-xl bg-ovo-card p-3 outline-none transition hover:bg-ovo-darkgray focus-visible:ring-2 focus-visible:ring-ovo-blue"
        >
          <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-ovo-darkgray">
            {product.heroImage ? (
              <Image
                src={product.heroImage}
                alt={product.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-ovo-text">
              {product.name}
            </div>
            <div className="text-xs text-ovo-muted">
              {formatPrice(product.basePrice)} 起
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

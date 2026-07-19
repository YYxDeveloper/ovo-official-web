"use client";

import { useQueryState, parseAsString } from "nuqs";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { VariantSelector } from "./VariantSelector";
import { AddToCompareButton } from "./AddToCompareButton";

export function ProductHero({ product }: { product: Product }) {
  const [storageParam] = useQueryState(
    "storage",
    parseAsString.withDefault(product.storage?.[0]?.label ?? ""),
  );
  const [colorParam] = useQueryState(
    "color",
    parseAsString.withDefault(product.colors[0]?.name ?? ""),
  );

  const activeColor =
    product.colors.find((c) => c.name === colorParam) ?? product.colors[0];
  const activeStorage = product.storage?.find((s) => s.label === storageParam);

  const price = product.basePrice + (activeStorage?.priceAdd ?? 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-ovo-muted">
          {product.category}
        </p>
        <h1 className="mt-1 text-hero font-semibold leading-tight text-ovo-text">
          {product.name}
        </h1>
        <p className="mt-2 text-base text-ovo-muted md:text-lg">
          {product.tagline}
        </p>
        <p className="mt-4 text-xl text-ovo-text">
          {formatPrice(price)}
          <span className="ml-1 text-sm text-ovo-muted">起</span>
        </p>
      </div>

      <VariantSelector colors={product.colors} storage={product.storage} />

      <div className="flex flex-col gap-2 pt-2 sm:flex-row">
        <Button size="lg" className="flex-1">
          購買 {activeColor?.name ? `· ${activeColor.name}` : ""}
        </Button>
        <div className="flex-1">
          <AddToCompareButton product={product} />
        </div>
      </div>
    </div>
  );
}

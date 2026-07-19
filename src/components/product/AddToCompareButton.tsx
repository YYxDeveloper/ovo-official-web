"use client";

import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompareStore, MAX_COMPARE_ITEMS } from "@/lib/store/compareStore";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import type { Product } from "@/data/types";
import { cn } from "@/lib/utils";

export function AddToCompareButton({ product }: { product: Product }) {
  const hydrated = useStoreHydration();
  const isIn = useCompareStore((s) => s.isInCompare(product.id));
  const isFull = useCompareStore((s) => s.isFull());
  const toggleItem = useCompareStore((s) => s.toggleItem);

  const disabled = hydrated && !isIn && isFull;
  const inCompare = hydrated && isIn;

  const label = inCompare ? "已加入比較" : "加入比較";
  const Icon = inCompare ? Check : Plus;

  return (
    <Button
      type="button"
      variant={inCompare ? "secondary" : "outline"}
      disabled={disabled}
      onClick={() => toggleItem(product)}
      title={disabled ? `最多只能比較 ${MAX_COMPARE_ITEMS} 項產品` : undefined}
      className={cn(
        "w-full justify-center",
        inCompare && "border-ovo-blue/40 bg-ovo-blue/10 text-ovo-text",
      )}
    >
      <Icon className="size-4" />
      {label}
    </Button>
  );
}

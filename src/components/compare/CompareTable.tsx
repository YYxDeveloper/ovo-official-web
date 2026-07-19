"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import type { Product, ProductSpec } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { useCompareStore, MAX_COMPARE_ITEMS } from "@/lib/store/compareStore";
import { categoryLabelsZh } from "@/data/products";

const SLOT_COUNT = MAX_COMPARE_ITEMS;

export function CompareTable() {
  const items = useCompareStore((s) => s.items);
  const removeItem = useCompareStore((s) => s.removeItem);

  const emptySlots = Math.max(0, SLOT_COUNT - items.length);

  // Build union of spec labels
  const labelSet = new Set<string>();
  items.forEach((p) => p.specs.forEach((s) => labelSet.add(s.label)));
  const rows = Array.from(labelSet);

  const lookup = (product: Product, label: string): string | null => {
    const spec: ProductSpec | undefined = product.specs.find((s) => s.label === label);
    return spec ? spec.value : null;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 min-w-[160px] bg-ovo-darkgray px-4 py-4 text-xs font-medium uppercase tracking-wider text-ovo-muted">
              規格
            </th>
            {items.map((product) => (
              <th
                key={product.id}
                className="min-w-[220px] border-b border-ovo-border bg-ovo-darkgray px-4 py-4 align-top"
              >
                <div className="flex items-start gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-ovo-card">
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
                    <Link
                      href={`/products/${product.category}/${product.slug}`}
                      className="block truncate text-sm font-medium text-ovo-text hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-ovo-muted">
                      {formatPrice(product.basePrice)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    aria-label={`移除 ${product.name}`}
                    className="rounded-full p-1 text-ovo-muted transition hover:bg-ovo-card hover:text-ovo-text"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              </th>
            ))}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <th
                key={`empty-${i}`}
                className="min-w-[220px] border-b border-dashed border-ovo-border bg-ovo-darkgray px-4 py-4 align-top"
              >
                <div className="flex h-[72px] items-center justify-center text-xs text-ovo-muted">
                  加入產品以比較
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="sticky left-0 z-10 bg-ovo-black px-4 py-3 text-xs font-medium uppercase tracking-wider text-ovo-muted">
              類別
            </th>
            {items.map((p) => (
              <td key={p.id} className="border-b border-ovo-border px-4 py-3 text-ovo-text">
                {categoryLabelsZh[p.category]}
              </td>
            ))}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <td key={`cat-empty-${i}`} className="border-b border-dashed border-ovo-border px-4 py-3 text-ovo-muted">
                —
              </td>
            ))}
          </tr>
          {rows.map((label, idx) => (
            <tr key={label}>
              <th
                className={`sticky left-0 z-10 px-4 py-3 text-xs font-medium uppercase tracking-wider text-ovo-muted ${
                  idx % 2 === 0 ? "bg-ovo-black" : "bg-ovo-darkgray/40"
                }`}
              >
                {label}
              </th>
              {items.map((p) => {
                const value = lookup(p, label);
                return (
                  <td
                    key={p.id}
                    className={`border-b border-ovo-border px-4 py-3 text-ovo-text ${
                      idx % 2 === 0 ? "" : "bg-ovo-card/30"
                    }`}
                  >
                    {value ?? <span className="text-ovo-muted">—</span>}
                  </td>
                );
              })}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <td
                  key={`empty-${label}-${i}`}
                  className={`border-b border-dashed border-ovo-border px-4 py-3 text-ovo-muted ${
                    idx % 2 === 0 ? "" : "bg-ovo-card/30"
                  }`}
                >
                  —
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

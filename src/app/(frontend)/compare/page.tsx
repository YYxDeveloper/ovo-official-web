"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CompareTable } from "@/components/compare/CompareTable";
import { Button } from "@/components/ui/button";
import { useCompareStore } from "@/lib/store/compareStore";
import { useStoreHydration } from "@/hooks/useStoreHydration";

export default function ComparePage() {
  const hydrated = useStoreHydration();
  const items = useCompareStore((s) => s.items);
  const clearAll = useCompareStore((s) => s.clearAll);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-16">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-xs text-ovo-muted transition hover:text-ovo-text"
      >
        <ArrowLeft className="size-3.5" /> 返回
      </Link>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ovo-muted">
            Compare
          </p>
          <h1 className="text-section font-semibold text-ovo-text">產品比較</h1>
          <p className="mt-2 text-sm text-ovo-muted">
            並排檢視最多 3 款產品的詳細規格。
          </p>
        </div>
        {hydrated && items.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            清除全部
          </Button>
        )}
      </div>

      {hydrated && items.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-dashed border-ovo-border px-6 py-20 text-center">
          <p className="text-sm text-ovo-muted">尚未加入任何產品。</p>
          <Button asChild className="mt-4" size="sm">
            <Link href="/products">瀏覽所有產品</Link>
          </Button>
        </div>
      ) : (
        <CompareTable />
      )}
    </div>
  );
}

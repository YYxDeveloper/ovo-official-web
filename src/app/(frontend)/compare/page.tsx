"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CompareTable } from "@/components/compare/CompareTable";
import { Button } from "@/components/ui/button";
import { useCompareStore } from "@/lib/store/compareStore";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ComparePage() {
  const hydrated = useStoreHydration();
  const items = useCompareStore((s) => s.items);
  const clearAll = useCompareStore((s) => s.clearAll);

  return (
    <PageContainer py="compact">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-xs text-ovo-muted transition hover:text-ovo-text"
      >
        <ArrowLeft className="size-3.5" /> 返回
      </Link>

      <PageHeader
        label="Compare"
        title="產品比較"
        description="並排檢視最多 3 款產品的詳細規格。"
        className="mb-8"
      >
        {hydrated && items.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            清除全部
          </Button>
        )}
      </PageHeader>

      {hydrated && items.length === 0 ? (
        <EmptyState
          title="尚未加入任何產品。"
          action={{ label: "瀏覽所有產品", href: "/products" }}
        />
      ) : (
        <CompareTable />
      )}
    </PageContainer>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProductAction } from "@/lib/actions/product-actions";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin"
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        返回產品列表
      </Link>
      <h1 className="mb-6 text-xl font-semibold text-zinc-100">新增產品</h1>
      <ProductForm action={createProductAction} submitLabel="建立產品" />
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProductById } from "@/lib/dal/products";
import { ProductForm } from "@/components/admin/ProductForm";
import { updateProductAction } from "@/lib/actions/product-actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin"
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        返回產品列表
      </Link>
      <h1 className="mb-6 text-xl font-semibold text-zinc-100">
        編輯：{product.name}
      </h1>
      <ProductForm
        product={product}
        action={updateProductAction}
        submitLabel="更新產品"
      />
    </div>
  );
}

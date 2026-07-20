"use client";

import { useActionState } from "react";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteProductAction } from "@/lib/actions/product-actions";

export default function DeleteProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [state, action, pending] = useActionState(deleteProductAction, undefined);

  return (
    <div className="mx-auto max-w-md">
      <Link
        href="/admin"
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        返回產品列表
      </Link>

      <Card className="border-red-800/50 bg-zinc-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            確認刪除
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-zinc-300">
            此操作無法復原。刪除後，所有相關的顏色、容量、規格和圖片資料都會一併移除。
          </p>
          {state?.error && (
            <p className="mb-4 text-sm text-red-400">{state.error}</p>
          )}
          <form action={action} className="flex gap-3">
            <input type="hidden" name="id" value={id} />
            <Button asChild variant="outline" className="border-zinc-700 text-zinc-300">
              <Link href="/admin">取消</Link>
            </Button>
            <Button
              type="submit"
              disabled={pending}
              variant="destructive"
            >
              {pending ? "刪除中..." : "確認刪除"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { use, useActionState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { deleteTileAction } from "@/lib/actions/tile-actions";
import { Button } from "@/components/ui/button";

export default function DeleteTilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [state, action, pending] = useActionState(deleteTileAction, undefined);

  return (
    <div className="mx-auto max-w-md">
      <Link
        href="/admin/tiles"
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        返回磁磚列表
      </Link>
      <div className="rounded-lg border border-zinc-800 p-6">
        <h1 className="mb-2 text-xl font-semibold text-zinc-100">確認刪除</h1>
        <p className="mb-6 text-sm text-zinc-400">
          此操作無法復原。
        </p>
        {state?.error && (
          <p className="mb-4 text-sm text-red-400">{state.error}</p>
        )}
        <div className="flex gap-3">
          <form action={action}>
            <input type="hidden" name="id" value={id} />
            <Button type="submit" variant="destructive" disabled={pending}>
              {pending ? "刪除中…" : "確認刪除"}
            </Button>
          </form>
          <Button asChild variant="outline">
            <Link href="/admin/tiles">取消</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

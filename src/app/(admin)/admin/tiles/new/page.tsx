import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TileForm } from "@/components/admin/TileForm";
import { createTileAction } from "@/lib/actions/tile-actions";

export default function NewTilePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/tiles"
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        返回磁磚列表
      </Link>
      <h1 className="mb-6 text-xl font-semibold text-zinc-100">新增磁磚</h1>
      <TileForm action={createTileAction} submitLabel="建立磁磚" />
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTileById } from "@/lib/dal/tiles";
import { TileForm } from "@/components/admin/TileForm";
import { updateTileAction } from "@/lib/actions/tile-actions";

export default async function EditTilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tile = await getTileById(Number(id));
  if (!tile) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/tiles"
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        返回磁磚列表
      </Link>
      <h1 className="mb-6 text-xl font-semibold text-zinc-100">
        編輯：{tile.name}
      </h1>
      <TileForm tile={tile} action={updateTileAction} submitLabel="更新磁磚" />
    </div>
  );
}

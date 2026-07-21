import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllTiles } from "@/lib/dal/tiles";
import { Button } from "@/components/ui/button";
import { TileTable } from "@/components/admin/TileTable";

export default async function AdminTilesPage() {
  const tiles = await getAllTiles();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-zinc-100">磁磚管理</h1>
          <p className="text-sm text-zinc-400">共 {tiles.length} 款磁磚</p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/tiles/new">
            <Plus className="mr-1 h-4 w-4" />
            新增磁磚
          </Link>
        </Button>
      </div>
      <TileTable tiles={tiles} />
    </div>
  );
}

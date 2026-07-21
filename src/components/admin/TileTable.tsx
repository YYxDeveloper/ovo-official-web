"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Tile = {
  id: number;
  slug: string;
  name: string;
  category: string;
  size: string;
  price: number;
  featured: boolean;
  sortOrder: number;
};

const categoryLabelMap: Record<string, string> = {
  wood: "木紋", luxury: "奢華", minimal: "極簡",
  concrete: "仿清水", vintage: "復古", subway: "地鐵", hexagon: "六角",
};

export function TileTable({ tiles }: { tiles: Tile[] }) {
  if (tiles.length === 0) {
    return <p className="py-8 text-center text-sm text-zinc-500">尚無磁磚</p>;
  }

  return (
    <div className="mt-4 rounded-md border border-zinc-800">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-zinc-900">
            <TableHead className="text-zinc-400">排序</TableHead>
            <TableHead className="text-zinc-400">名稱</TableHead>
            <TableHead className="text-zinc-400">類別</TableHead>
            <TableHead className="text-zinc-400">尺寸</TableHead>
            <TableHead className="text-zinc-400">價格 / 坪</TableHead>
            <TableHead className="text-zinc-400">精選</TableHead>
            <TableHead className="text-right text-zinc-400">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tiles.map((tile) => (
            <TableRow key={tile.id} className="border-zinc-800 hover:bg-zinc-900">
              <TableCell className="text-zinc-300">{tile.sortOrder}</TableCell>
              <TableCell>
                <span className="font-medium text-zinc-100">{tile.name}</span>
                <p className="text-xs text-zinc-500">{tile.slug}</p>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                  {categoryLabelMap[tile.category] ?? tile.category}
                </Badge>
              </TableCell>
              <TableCell className="text-zinc-300">{tile.size}</TableCell>
              <TableCell className="text-zinc-300">
                NT$ {tile.price.toLocaleString()}
              </TableCell>
              <TableCell>
                <div
                  className={`h-5 w-5 rounded-full border-2 ${
                    tile.featured
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-zinc-600"
                  }`}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/tiles/${tile.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    <Link href={`/admin/tiles/${tile.id}/delete`}>
                      <Trash2 className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

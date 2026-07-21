import "server-only";
import { prisma } from "@/lib/db";
import type { Tile as PrismaTile } from "@prisma/client";

export type TileRow = PrismaTile;

export async function getAllTiles(): Promise<TileRow[]> {
  return prisma.tile.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getFeaturedTiles(): Promise<TileRow[]> {
  return prisma.tile.findMany({
    where: { featured: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getTileById(id: number): Promise<TileRow | null> {
  return prisma.tile.findUnique({ where: { id } });
}

export async function createTile(data: Omit<TileRow, "id" | "createdAt" | "updatedAt">): Promise<TileRow> {
  return prisma.tile.create({ data });
}

export async function updateTile(id: number, data: Partial<Omit<TileRow, "id" | "createdAt" | "updatedAt">>): Promise<TileRow> {
  return prisma.tile.update({ where: { id }, data });
}

export async function deleteTile(id: number): Promise<void> {
  await prisma.tile.delete({ where: { id } });
}

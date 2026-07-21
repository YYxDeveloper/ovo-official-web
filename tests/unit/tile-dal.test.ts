import { describe, it, expect, vi, beforeEach } from "vitest";

// Factory must not reference outer variables (vi.mock is hoisted)
vi.mock("@/lib/db", () => ({
  prisma: {
    tile: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import { prisma } from "@/lib/db";
import {
  getAllTiles,
  getFeaturedTiles,
  getTileById,
  createTile,
  updateTile,
  deleteTile,
} from "@/lib/dal/tiles";

const tileMock = {
  id: 1,
  slug: "wood-01",
  name: "橡木暖棕",
  category: "wood",
  size: "20x120 cm",
  finish: "霧面",
  origin: "義大利",
  price: 3200,
  image: "https://picsum.photos/seed/wood-01/600/400",
  featured: true,
  sortOrder: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeEach(() => vi.clearAllMocks());

describe("getAllTiles", () => {
  it("returns tiles ordered by sortOrder", async () => {
    vi.mocked(prisma.tile.findMany).mockResolvedValue([tileMock, { ...tileMock, id: 2, sortOrder: 1 }]);

    const result = await getAllTiles();

    expect(prisma.tile.findMany).toHaveBeenCalledWith({ orderBy: { sortOrder: "asc" } });
    expect(result).toHaveLength(2);
  });
});

describe("getFeaturedTiles", () => {
  it("queries only featured=true tiles", async () => {
    vi.mocked(prisma.tile.findMany).mockResolvedValue([tileMock]);

    const result = await getFeaturedTiles();

    expect(prisma.tile.findMany).toHaveBeenCalledWith({
      where: { featured: true },
      orderBy: { sortOrder: "asc" },
    });
    expect(result[0].featured).toBe(true);
  });
});

describe("getTileById", () => {
  it("returns tile when found", async () => {
    vi.mocked(prisma.tile.findUnique).mockResolvedValue(tileMock);

    const result = await getTileById(1);

    expect(prisma.tile.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result?.id).toBe(1);
  });

  it("returns null when not found", async () => {
    vi.mocked(prisma.tile.findUnique).mockResolvedValue(null);

    const result = await getTileById(999);

    expect(result).toBeNull();
  });
});

describe("createTile / updateTile / deleteTile round-trip", () => {
  it("createTile passes data to prisma.tile.create", async () => {
    vi.mocked(prisma.tile.create).mockResolvedValue({ ...tileMock, id: 99 });
    const { id: _id, createdAt: _c, updatedAt: _u, ...data } = tileMock;

    const result = await createTile(data);

    expect(prisma.tile.create).toHaveBeenCalledWith({ data });
    expect(result.id).toBe(99);
  });

  it("updateTile sends partial data to prisma.tile.update", async () => {
    vi.mocked(prisma.tile.update).mockResolvedValue({ ...tileMock, name: "白橡北歐", price: 3500 });

    const result = await updateTile(1, { name: "白橡北歐", price: 3500 });

    expect(prisma.tile.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: "白橡北歐", price: 3500 },
    });
    expect(result.name).toBe("白橡北歐");
  });

  it("deleteTile calls prisma.tile.delete with correct id", async () => {
    vi.mocked(prisma.tile.delete).mockResolvedValue(tileMock);

    await deleteTile(1);

    expect(prisma.tile.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});

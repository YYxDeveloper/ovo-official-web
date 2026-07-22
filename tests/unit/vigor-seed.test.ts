import { describe, it, expect, vi, beforeEach } from "vitest";

const { vigorSlide, vigorService, vigorPartner, product } = vi.hoisted(() => ({
  vigorSlide: {
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
    createMany: vi.fn().mockResolvedValue({ count: 3 }),
  },
  vigorService: {
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
    createMany: vi.fn().mockResolvedValue({ count: 16 }),
  },
  vigorPartner: {
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
    createMany: vi.fn().mockResolvedValue({ count: 10 }),
  },
  product: {
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
  },
}));

vi.mock("../../src/lib/db", () => ({
  prisma: { vigorSlide, vigorService, vigorPartner, product },
}));

import { seedVigor } from "../../prisma/seed";

describe("seedVigor — Vigor demo seed (issue #31)", () => {
  beforeEach(() => {
    vigorSlide.deleteMany.mockClear();
    vigorSlide.createMany.mockClear();
    vigorService.deleteMany.mockClear();
    vigorService.createMany.mockClear();
    vigorPartner.deleteMany.mockClear();
    vigorPartner.createMany.mockClear();
    product.create.mockClear();
    product.update.mockClear();
    product.delete.mockClear();
  });

  it("reseeds VigorSlide: deleteMany then createMany with 3 records", async () => {
    await seedVigor();
    expect(vigorSlide.deleteMany).toHaveBeenCalledTimes(1);
    expect(vigorSlide.createMany).toHaveBeenCalledTimes(1);
    const data = vigorSlide.createMany.mock.calls[0][0].data;
    expect(data).toHaveLength(3);
    expect(data[0]).toMatchObject({
      title: expect.any(String),
      imageUrl: expect.any(String),
    });
  });

  it("reseeds VigorService: 16 records across 4 categories (health/learning/social/living × 4)", async () => {
    await seedVigor();
    expect(vigorService.deleteMany).toHaveBeenCalledTimes(1);
    expect(vigorService.createMany).toHaveBeenCalledTimes(1);
    const data = vigorService.createMany.mock.calls[0][0].data;
    expect(data).toHaveLength(16);
    const categories = data.map((d: { category: string }) => d.category);
    for (const c of ["health", "learning", "social", "living"]) {
      expect(categories.filter((x: string) => x === c)).toHaveLength(4);
    }
  });

  it("reseeds VigorPartner: 10 records with name + logoUrl", async () => {
    await seedVigor();
    expect(vigorPartner.deleteMany).toHaveBeenCalledTimes(1);
    expect(vigorPartner.createMany).toHaveBeenCalledTimes(1);
    const data = vigorPartner.createMany.mock.calls[0][0].data;
    expect(data).toHaveLength(10);
    for (const p of data) {
      expect(p).toMatchObject({
        name: expect.any(String),
        logoUrl: expect.any(String),
      });
    }
  });

  it("is idempotent: calling twice still results in 3 slides (deleteMany clears before each insert)", async () => {
    await seedVigor();
    await seedVigor();
    expect(vigorSlide.deleteMany).toHaveBeenCalledTimes(2);
    expect(vigorSlide.createMany).toHaveBeenCalledTimes(2);
    for (const call of vigorSlide.createMany.mock.calls) {
      expect(call[0].data).toHaveLength(3);
    }
  });

  it("does not touch Product tables (regression safety)", async () => {
    await seedVigor();
    expect(product.create).not.toHaveBeenCalled();
    expect(product.update).not.toHaveBeenCalled();
    expect(product.delete).not.toHaveBeenCalled();
    expect(product.findUnique).not.toHaveBeenCalled();
  });
});

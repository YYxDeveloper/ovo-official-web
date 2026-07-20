import { describe, it, expect, vi, beforeEach } from "vitest";

const tx = {
  colorVariant: {
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
    createMany: vi.fn().mockResolvedValue({ count: 1 }),
  },
  storageVariant: {
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
    createMany: vi.fn().mockResolvedValue({ count: 1 }),
  },
  productSpec: {
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
    createMany: vi.fn().mockResolvedValue({ count: 1 }),
  },
  productImage: {
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
    createMany: vi.fn().mockResolvedValue({ count: 1 }),
  },
  product: {
    update: vi.fn().mockResolvedValue({
      id: 1,
      slug: "x",
      name: "Updated",
      tagline: "t",
      category: "phone",
      basePrice: 0,
      featured: false,
      heroImage: null,
      sortOrder: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      colors: [],
      storage: [],
      specs: [],
      images: [],
    }),
  },
};

vi.mock("@/lib/db", () => ({
  prisma: {
    $transaction: vi.fn(async (fn: (t: typeof tx) => Promise<unknown>) => fn(tx)),
    colorVariant: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }), createMany: vi.fn().mockResolvedValue({ count: 1 }) },
    storageVariant: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }), createMany: vi.fn().mockResolvedValue({ count: 1 }) },
    productSpec: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }), createMany: vi.fn().mockResolvedValue({ count: 1 }) },
    productImage: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }), createMany: vi.fn().mockResolvedValue({ count: 1 }) },
    product: {
      update: vi.fn().mockResolvedValue({
        id: 1, slug: "x", name: "Updated", tagline: "t", category: "phone",
        basePrice: 0, featured: false, heroImage: null, sortOrder: 0,
        createdAt: new Date(), updatedAt: new Date(),
        colors: [], storage: [], specs: [], images: [],
      }),
      findFirst: vi.fn(), findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), delete: vi.fn(),
    },
  },
}));

import { prisma } from "@/lib/db";
import { updateProduct } from "@/lib/dal/products";

describe("updateProduct — H1 transaction integrity", () => {
  beforeEach(() => {
    vi.mocked(prisma.$transaction).mockClear();
    tx.colorVariant.deleteMany.mockClear();
    tx.colorVariant.createMany.mockClear();
    tx.storageVariant.deleteMany.mockClear();
    tx.storageVariant.createMany.mockClear();
    tx.productSpec.deleteMany.mockClear();
    tx.productSpec.createMany.mockClear();
    tx.productImage.deleteMany.mockClear();
    tx.productImage.createMany.mockClear();
    tx.product.update.mockClear();
  });

  it("wraps relation rebuild + product update in a single $transaction", async () => {
    await updateProduct(1, {
      name: "Updated",
      colors: [{ name: "Red", hex: "#ff0000", imageUrl: "/uploads/r.jpg" }],
    });
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it("uses the tx client for relation writes and product.update", async () => {
    await updateProduct(1, {
      name: "Updated",
      colors: [{ name: "Red", hex: "#ff0000", imageUrl: "/uploads/r.jpg" }],
      storage: [{ label: "256GB", priceAdd: 0 }],
      specs: [{ label: "Display", value: '6.1"' }],
      images: ["/uploads/a.jpg"],
    });
    expect(tx.colorVariant.deleteMany).toHaveBeenCalledWith({ where: { productId: 1 } });
    expect(tx.colorVariant.createMany).toHaveBeenCalled();
    expect(tx.storageVariant.deleteMany).toHaveBeenCalled();
    expect(tx.storageVariant.createMany).toHaveBeenCalled();
    expect(tx.productSpec.deleteMany).toHaveBeenCalled();
    expect(tx.productSpec.createMany).toHaveBeenCalled();
    expect(tx.productImage.deleteMany).toHaveBeenCalled();
    expect(tx.productImage.createMany).toHaveBeenCalled();
    expect(tx.product.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 1 }, data: expect.objectContaining({ name: "Updated" }) }),
    );
  });
});

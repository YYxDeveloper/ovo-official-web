import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock all server-action dependencies before importing
vi.mock("@/lib/auth/session", () => ({
  verifySession: vi.fn(),
}));

vi.mock("@/lib/dal/tiles", () => ({
  createTile: vi.fn(),
  updateTile: vi.fn(),
  deleteTile: vi.fn(),
}));

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

import { verifySession } from "@/lib/auth/session";
import {
  createTileAction,
  updateTileAction,
  deleteTileAction,
} from "@/lib/actions/tile-actions";

function makeFormData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

const validTileFields = {
  slug: "test-tile",
  name: "測試磁磚",
  category: "wood",
  size: "60x60 cm",
  finish: "霧面",
  origin: "台灣",
  price: "1000",
  image: "https://example.com/img.jpg",
  sortOrder: "0",
};

describe("tile Server Actions — auth guard", () => {
  beforeEach(() => vi.clearAllMocks());

  it("createTileAction returns { error: '未授權' } when no session", async () => {
    vi.mocked(verifySession).mockResolvedValue(null);

    const result = await createTileAction(undefined, makeFormData(validTileFields));

    expect(result).toEqual({ error: "未授權" });
  });

  it("updateTileAction returns { error: '未授權' } when no session", async () => {
    vi.mocked(verifySession).mockResolvedValue(null);

    const result = await updateTileAction(
      undefined,
      makeFormData({ ...validTileFields, id: "1" })
    );

    expect(result).toEqual({ error: "未授權" });
  });

  it("deleteTileAction returns { error: '未授權' } when no session", async () => {
    vi.mocked(verifySession).mockResolvedValue(null);

    const result = await deleteTileAction(
      undefined,
      makeFormData({ id: "1" })
    );

    expect(result).toEqual({ error: "未授權" });
  });
});

describe("tile Server Actions — validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Provide a valid session for these tests
    vi.mocked(verifySession).mockResolvedValue({ role: "admin", expiresAt: new Date() });
  });

  it("createTileAction returns fieldErrors for invalid slug", async () => {
    const result = await createTileAction(
      undefined,
      makeFormData({ ...validTileFields, slug: "INVALID SLUG!" })
    );

    expect(result?.error).toBe("驗證失敗");
    expect(result?.fieldErrors?.slug).toBeDefined();
  });

  it("createTileAction returns fieldErrors when price is zero", async () => {
    const result = await createTileAction(
      undefined,
      makeFormData({ ...validTileFields, price: "0" })
    );

    expect(result?.error).toBe("驗證失敗");
    expect(result?.fieldErrors?.price).toBeDefined();
  });

  it("updateTileAction returns error when id is missing", async () => {
    const result = await updateTileAction(
      undefined,
      makeFormData(validTileFields) // no 'id' field
    );

    expect(result).toEqual({ error: "缺少 ID" });
  });

  it("deleteTileAction returns error when id is missing", async () => {
    const result = await deleteTileAction(
      undefined,
      makeFormData({}) // no 'id' field
    );

    expect(result).toEqual({ error: "缺少 ID" });
  });

  it("updateTileAction returns fieldErrors for invalid data", async () => {
    const result = await updateTileAction(
      undefined,
      makeFormData({ ...validTileFields, id: "1", slug: "BAD SLUG!" })
    );

    expect(result?.error).toBe("驗證失敗");
    expect(result?.fieldErrors?.slug).toBeDefined();
  });
});

describe("tile Server Actions — DAL error handling", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(verifySession).mockResolvedValue({ role: "admin", expiresAt: new Date() });
  });

  it("createTileAction returns 'Slug 已存在' on unique constraint error", async () => {
    const { createTile } = await import("@/lib/dal/tiles");
    vi.mocked(createTile).mockRejectedValue(new Error("Unique constraint failed on the fields: (`slug`)"));

    const result = await createTileAction(undefined, makeFormData(validTileFields));

    expect(result).toEqual({ error: "Slug 已存在" });
  });

  it("createTileAction returns sanitized error on DAL failure", async () => {
    const { createTile } = await import("@/lib/dal/tiles");
    vi.mocked(createTile).mockRejectedValue(new Error("Database connection lost"));

    const result = await createTileAction(undefined, makeFormData(validTileFields));

    expect(result).toEqual({ error: "建立失敗" });
  });

  it("updateTileAction returns sanitized error on DAL failure", async () => {
    const { updateTile } = await import("@/lib/dal/tiles");
    vi.mocked(updateTile).mockRejectedValue(new Error("Record not found"));

    const result = await updateTileAction(
      undefined,
      makeFormData({ ...validTileFields, id: "1" })
    );

    expect(result).toEqual({ error: "更新失敗" });
  });

  it("deleteTileAction returns sanitized error on DAL failure", async () => {
    const { deleteTile } = await import("@/lib/dal/tiles");
    vi.mocked(deleteTile).mockRejectedValue(new Error("Foreign key constraint"));

    const result = await deleteTileAction(
      undefined,
      makeFormData({ id: "1" })
    );

    expect(result).toEqual({ error: "刪除失敗" });
  });
});

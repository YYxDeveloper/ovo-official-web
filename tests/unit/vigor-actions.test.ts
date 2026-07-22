import { describe, it, expect, vi, beforeEach } from "vitest";

const { verifySession, revalidatePath, redirect } = vi.hoisted(() => ({
  verifySession: vi.fn(),
  revalidatePath: vi.fn(),
  redirect: vi.fn(() => {
    throw new Error("NEXT_REDIRECT");
  }),
}));

vi.mock("@/lib/auth/session", () => ({ verifySession }));
vi.mock("next/cache", () => ({ revalidatePath }));
vi.mock("next/navigation", () => ({ redirect }));

const { slidesMock, servicesMock, partnersMock } = vi.hoisted(() => ({
  slidesMock: {
    createSlide: vi.fn().mockResolvedValue({ id: 1 }),
    updateSlide: vi.fn().mockResolvedValue({ id: 1 }),
    deleteSlide: vi.fn().mockResolvedValue({ id: 1 }),
  },
  servicesMock: {
    createService: vi.fn().mockResolvedValue({ id: 1 }),
    updateService: vi.fn().mockResolvedValue({ id: 1 }),
    deleteService: vi.fn().mockResolvedValue({ id: 1 }),
  },
  partnersMock: {
    createPartner: vi.fn().mockResolvedValue({ id: 1 }),
    updatePartner: vi.fn().mockResolvedValue({ id: 1 }),
    deletePartner: vi.fn().mockResolvedValue({ id: 1 }),
  },
}));

vi.mock("@/lib/dal/vigor-slides", () => slidesMock);
vi.mock("@/lib/dal/vigor-services", () => servicesMock);
vi.mock("@/lib/dal/vigor-partners", () => partnersMock);

import {
  vigorSlideSchema,
  vigorServiceSchema,
  vigorPartnerSchema,
} from "@/lib/validations/vigor-schemas";

import {
  createSlideAction,
  updateSlideAction,
  deleteSlideAction,
} from "@/lib/actions/vigor-slide-actions";

import {
  createServiceAction,
  updateServiceAction,
  deleteServiceAction,
} from "@/lib/actions/vigor-service-actions";

import {
  createPartnerAction,
  updatePartnerAction,
  deletePartnerAction,
} from "@/lib/actions/vigor-partner-actions";

describe("vigor-schemas (issue #33)", () => {
  it("vigorSlideSchema requires title + imageUrl, accepts optional fields", () => {
    const valid = vigorSlideSchema.safeParse({
      title: "Hello",
      imageUrl: "https://images.unsplash.com/x",
      sortOrder: "0",
      active: "on",
    });
    expect(valid.success).toBe(true);
  });

  it("vigorSlideSchema rejects empty title", () => {
    const r = vigorSlideSchema.safeParse({
      title: "",
      imageUrl: "https://images.unsplash.com/x",
    });
    expect(r.success).toBe(false);
  });

  it("vigorServiceSchema requires name + imageUrl + category, category must be valid enum", () => {
    const valid = vigorServiceSchema.safeParse({
      name: "健康諮詢",
      imageUrl: "https://images.unsplash.com/x",
      category: "health",
      sortOrder: "0",
      active: "on",
    });
    expect(valid.success).toBe(true);

    const invalid = vigorServiceSchema.safeParse({
      name: "x",
      imageUrl: "https://images.unsplash.com/x",
      category: "unknown",
    });
    expect(invalid.success).toBe(false);
  });

  it("vigorPartnerSchema requires name + logoUrl", () => {
    const valid = vigorPartnerSchema.safeParse({
      name: "Acme",
      logoUrl: "https://picsum.photos/seed/x/200/80",
      sortOrder: "0",
      active: "on",
    });
    expect(valid.success).toBe(true);
    const invalid = vigorPartnerSchema.safeParse({ name: "x", logoUrl: "" });
    expect(invalid.success).toBe(false);
  });
});

function fd(fields: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.append(k, v);
  return f;
}

describe("vigor slide/service/partner actions — auth (issue #33)", () => {
  beforeEach(() => {
    verifySession.mockReset();
    revalidatePath.mockReset();
    redirect.mockReset();
    slidesMock.createSlide.mockClear();
    slidesMock.updateSlide.mockClear();
    slidesMock.deleteSlide.mockClear();
    servicesMock.createService.mockClear();
    servicesMock.updateService.mockClear();
    servicesMock.deleteService.mockClear();
    partnersMock.createPartner.mockClear();
    partnersMock.updatePartner.mockClear();
    partnersMock.deletePartner.mockClear();
  });

  it("createSlideAction rejects unauthorized with { error: '未授權' }", async () => {
    verifySession.mockResolvedValue(null);
    const result = await createSlideAction(undefined, fd({ title: "x", imageUrl: "u" }));
    expect(result).toEqual({ error: "未授權" });
    expect(slidesMock.createSlide).not.toHaveBeenCalled();
  });

  it("createSlideAction calls DAL, revalidates, redirects on success", async () => {
    verifySession.mockResolvedValue({ role: "admin" });
    try {
      await createSlideAction(
        undefined,
        fd({ title: "x", imageUrl: "https://images.unsplash.com/x" }),
      );
    } catch {
      // redirect throws NEXT_REDIRECT — expected
    }
    expect(slidesMock.createSlide).toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith("/vigor");
    expect(revalidatePath).toHaveBeenCalledWith("/admin/vigor", "layout");
    expect(redirect).toHaveBeenCalled();
  });

  it("createSlideAction returns fieldErrors on Zod failure", async () => {
    verifySession.mockResolvedValue({ role: "admin" });
    const result = await createSlideAction(undefined, fd({ title: "", imageUrl: "" }));
    expect(result?.error).toBe("驗證失敗");
    expect(result?.fieldErrors).toBeDefined();
    expect(slidesMock.createSlide).not.toHaveBeenCalled();
  });

  it("updateSlideAction rejects unauthorized", async () => {
    verifySession.mockResolvedValue(null);
    const result = await updateSlideAction(undefined, fd({ id: "3", title: "y", imageUrl: "u" }));
    expect(result).toEqual({ error: "未授權" });
  });

  it("updateSlideAction requires id", async () => {
    verifySession.mockResolvedValue({ role: "admin" });
    const result = await updateSlideAction(undefined, fd({ title: "y", imageUrl: "u" }));
    expect(result?.error).toBe("缺少 ID");
  });

  it("deleteSlideAction rejects unauthorized", async () => {
    verifySession.mockResolvedValue(null);
    const result = await deleteSlideAction(undefined, fd({ id: "3" }));
    expect(result).toEqual({ error: "未授權" });
  });

  it("createServiceAction rejects unauthorized", async () => {
    verifySession.mockResolvedValue(null);
    const result = await createServiceAction(
      undefined,
      fd({ name: "x", imageUrl: "u", category: "health" }),
    );
    expect(result).toEqual({ error: "未授權" });
  });

  it("updateServiceAction calls DAL on success", async () => {
    verifySession.mockResolvedValue({ role: "admin" });
    try {
      await updateServiceAction(
        undefined,
        fd({
          id: "2",
          name: "y",
          imageUrl: "https://images.unsplash.com/x",
          category: "learning",
        }),
      );
    } catch {
      // redirect throws
    }
    expect(servicesMock.updateService).toHaveBeenCalled();
  });

  it("deleteServiceAction rejects unauthorized", async () => {
    verifySession.mockResolvedValue(null);
    const result = await deleteServiceAction(undefined, fd({ id: "2" }));
    expect(result).toEqual({ error: "未授權" });
  });

  it("createPartnerAction rejects unauthorized", async () => {
    verifySession.mockResolvedValue(null);
    const result = await createPartnerAction(
      undefined,
      fd({ name: "x", logoUrl: "u" }),
    );
    expect(result).toEqual({ error: "未授權" });
  });

  it("updatePartnerAction calls DAL on success", async () => {
    verifySession.mockResolvedValue({ role: "admin" });
    try {
      await updatePartnerAction(
        undefined,
        fd({ id: "1", name: "y", logoUrl: "https://picsum.photos/seed/x/200/80" }),
      );
    } catch {
      // redirect throws
    }
    expect(partnersMock.updatePartner).toHaveBeenCalled();
  });

  it("deletePartnerAction rejects unauthorized", async () => {
    verifySession.mockResolvedValue(null);
    const result = await deletePartnerAction(undefined, fd({ id: "1" }));
    expect(result).toEqual({ error: "未授權" });
  });
});

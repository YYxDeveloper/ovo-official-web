import { describe, it, expect, vi } from "vitest";

const { vigorSlide, vigorService, vigorPartner } = vi.hoisted(() => ({
  vigorSlide: {
    findMany: vi.fn().mockResolvedValue([]),
    findUnique: vi.fn().mockResolvedValue(null),
    create: vi.fn().mockResolvedValue({
      id: 1,
      title: "x",
      subtitle: null,
      imageUrl: "u",
      linkUrl: null,
      sortOrder: 0,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    update: vi.fn().mockResolvedValue({
      id: 1,
      title: "y",
      subtitle: null,
      imageUrl: "u",
      linkUrl: null,
      sortOrder: 0,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    delete: vi.fn().mockResolvedValue({ id: 1 }),
  },
  vigorService: {
    findMany: vi.fn().mockResolvedValue([]),
    findUnique: vi.fn().mockResolvedValue(null),
    create: vi.fn().mockResolvedValue({
      id: 1,
      name: "x",
      description: null,
      imageUrl: "u",
      linkUrl: null,
      category: "health",
      sortOrder: 0,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    update: vi.fn().mockResolvedValue({
      id: 1,
      name: "y",
      description: null,
      imageUrl: "u",
      linkUrl: null,
      category: "health",
      sortOrder: 0,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    delete: vi.fn().mockResolvedValue({ id: 1 }),
  },
  vigorPartner: {
    findMany: vi.fn().mockResolvedValue([]),
    findUnique: vi.fn().mockResolvedValue(null),
    create: vi.fn().mockResolvedValue({
      id: 2,
      name: "x",
      logoUrl: "u",
      websiteUrl: null,
      sortOrder: 0,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    update: vi.fn().mockResolvedValue({
      id: 2,
      name: "y",
      logoUrl: "u",
      websiteUrl: null,
      sortOrder: 0,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    delete: vi.fn().mockResolvedValue({ id: 2 }),
  },
}));

vi.mock("@/lib/db", () => ({
  prisma: { vigorSlide, vigorService, vigorPartner },
}));

import * as slides from "@/lib/dal/vigor-slides";
import * as services from "@/lib/dal/vigor-services";
import * as partners from "@/lib/dal/vigor-partners";
import * as gateway from "@/data/vigor";

describe("DAL vigor-slides (issue #32)", () => {
  it("getActiveSlides filters active=true and orders by sortOrder asc", async () => {
    await slides.getActiveSlides();
    expect(vigorSlide.findMany).toHaveBeenCalledWith({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
  });

  it("getSlideById queries by id", async () => {
    await slides.getSlideById(7);
    expect(vigorSlide.findUnique).toHaveBeenCalledWith({ where: { id: 7 } });
  });

  it("createSlide / updateSlide / deleteSlide forward to prisma", async () => {
    await slides.createSlide({
      title: "x",
      imageUrl: "u",
      sortOrder: 0,
      active: true,
    });
    expect(vigorSlide.create).toHaveBeenCalled();

    await slides.updateSlide(3, { title: "y" });
    expect(vigorSlide.update).toHaveBeenCalledWith({
      where: { id: 3 },
      data: { title: "y" },
    });

    await slides.deleteSlide(3);
    expect(vigorSlide.delete).toHaveBeenCalledWith({ where: { id: 3 } });
  });
});

describe("DAL vigor-services (issue #32)", () => {
  it("getActiveServices filters active=true and orders by sortOrder asc", async () => {
    await services.getActiveServices();
    expect(vigorService.findMany).toHaveBeenCalledWith({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
  });

  it("createService / updateService / deleteService forward to prisma", async () => {
    await services.createService({
      name: "x",
      imageUrl: "u",
      category: "health",
      sortOrder: 0,
      active: true,
    });
    expect(vigorService.create).toHaveBeenCalled();

    await services.updateService(5, { name: "y" });
    expect(vigorService.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: { name: "y" },
    });

    await services.deleteService(5);
    expect(vigorService.delete).toHaveBeenCalledWith({ where: { id: 5 } });
  });
});

describe("DAL vigor-partners (issue #32)", () => {
  it("getActivePartners filters active=true and orders by sortOrder asc", async () => {
    await partners.getActivePartners();
    expect(vigorPartner.findMany).toHaveBeenCalledWith({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
  });

  it("createPartner / updatePartner / deletePartner forward to prisma", async () => {
    await partners.createPartner({
      name: "x",
      logoUrl: "u",
      sortOrder: 0,
      active: true,
    });
    expect(vigorPartner.create).toHaveBeenCalled();

    await partners.updatePartner(2, { name: "y" });
    expect(vigorPartner.update).toHaveBeenCalledWith({
      where: { id: 2 },
      data: { name: "y" },
    });

    await partners.deletePartner(2);
    expect(vigorPartner.delete).toHaveBeenCalledWith({ where: { id: 2 } });
  });
});

describe("vigor gateway (issue #32)", () => {
  it("re-exports getActiveSlides, getSlideById from DAL", () => {
    expect(typeof gateway.getActiveSlides).toBe("function");
    expect(typeof gateway.getSlideById).toBe("function");
  });

  it("re-exports getActiveServices, getActivePartners", () => {
    expect(typeof gateway.getActiveServices).toBe("function");
    expect(typeof gateway.getActivePartners).toBe("function");
    expect(typeof gateway.getServiceById).toBe("function");
    expect(typeof gateway.getPartnerById).toBe("function");
  });

  it("does NOT re-export mutation functions (create/update/delete — actions import DAL directly)", () => {
    expect((gateway as Record<string, unknown>).createSlide).toBeUndefined();
    expect((gateway as Record<string, unknown>).updateSlide).toBeUndefined();
    expect((gateway as Record<string, unknown>).deleteSlide).toBeUndefined();
    expect((gateway as Record<string, unknown>).createService).toBeUndefined();
    expect((gateway as Record<string, unknown>).updateService).toBeUndefined();
    expect((gateway as Record<string, unknown>).deleteService).toBeUndefined();
    expect((gateway as Record<string, unknown>).createPartner).toBeUndefined();
    expect((gateway as Record<string, unknown>).updatePartner).toBeUndefined();
    expect((gateway as Record<string, unknown>).deletePartner).toBeUndefined();
  });
});

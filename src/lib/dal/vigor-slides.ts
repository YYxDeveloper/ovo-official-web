import "server-only";
import { prisma } from "@/lib/db";
import type { VigorSlide } from "@/data/vigor-types";

type SlideRow = Awaited<ReturnType<typeof prisma.vigorSlide.findFirst>>;

function toSlide(row: NonNullable<SlideRow>): VigorSlide {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    imageUrl: row.imageUrl,
    linkUrl: row.linkUrl ?? undefined,
    sortOrder: row.sortOrder,
    active: row.active,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function getActiveSlides(): Promise<VigorSlide[]> {
  const rows = await prisma.vigorSlide.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
  return rows.map(toSlide);
}

export async function getSlideById(id: number): Promise<VigorSlide | null> {
  const row = await prisma.vigorSlide.findUnique({ where: { id } });
  return row ? toSlide(row) : null;
}

export type VigorSlideCreateInput = {
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  sortOrder?: number;
  active?: boolean;
};

export async function createSlide(data: VigorSlideCreateInput): Promise<VigorSlide> {
  const row = await prisma.vigorSlide.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      imageUrl: data.imageUrl,
      linkUrl: data.linkUrl,
      sortOrder: data.sortOrder ?? 0,
      active: data.active ?? true,
    },
  });
  return toSlide(row);
}

export type VigorSlideUpdateInput = Partial<VigorSlideCreateInput>;

export async function updateSlide(
  id: number,
  data: VigorSlideUpdateInput,
): Promise<VigorSlide> {
  const row = await prisma.vigorSlide.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      imageUrl: data.imageUrl,
      linkUrl: data.linkUrl,
      sortOrder: data.sortOrder,
      active: data.active,
    },
  });
  return toSlide(row);
}

export async function deleteSlide(id: number): Promise<void> {
  await prisma.vigorSlide.delete({ where: { id } });
}

import "server-only";
import { prisma } from "@/lib/db";
import type { VigorService, VigorServiceCategory } from "@/data/vigor-types";

type ServiceRow = Awaited<ReturnType<typeof prisma.vigorService.findFirst>>;

function toService(row: NonNullable<ServiceRow>): VigorService {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    imageUrl: row.imageUrl,
    linkUrl: row.linkUrl ?? undefined,
    category: row.category as VigorServiceCategory,
    sortOrder: row.sortOrder,
    active: row.active,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function getActiveServices(): Promise<VigorService[]> {
  const rows = await prisma.vigorService.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
  return rows.map(toService);
}

export async function getServiceById(id: number): Promise<VigorService | null> {
  const row = await prisma.vigorService.findUnique({ where: { id } });
  return row ? toService(row) : null;
}

export type VigorServiceCreateInput = {
  name: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
  category: VigorServiceCategory;
  sortOrder?: number;
  active?: boolean;
};

export async function createService(
  data: VigorServiceCreateInput,
): Promise<VigorService> {
  const row = await prisma.vigorService.create({
    data: {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      linkUrl: data.linkUrl,
      category: data.category,
      sortOrder: data.sortOrder ?? 0,
      active: data.active ?? true,
    },
  });
  return toService(row);
}

export type VigorServiceUpdateInput = Partial<VigorServiceCreateInput>;

export async function updateService(
  id: number,
  data: VigorServiceUpdateInput,
): Promise<VigorService> {
  const row = await prisma.vigorService.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      linkUrl: data.linkUrl,
      category: data.category,
      sortOrder: data.sortOrder,
      active: data.active,
    },
  });
  return toService(row);
}

export async function deleteService(id: number): Promise<void> {
  await prisma.vigorService.delete({ where: { id } });
}

import "server-only";
import { prisma } from "@/lib/db";
import type { VigorPartner } from "@/data/vigor-types";

type PartnerRow = Awaited<ReturnType<typeof prisma.vigorPartner.findFirst>>;

function toPartner(row: NonNullable<PartnerRow>): VigorPartner {
  return {
    id: row.id,
    name: row.name,
    logoUrl: row.logoUrl,
    websiteUrl: row.websiteUrl ?? undefined,
    sortOrder: row.sortOrder,
    active: row.active,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function getActivePartners(): Promise<VigorPartner[]> {
  const rows = await prisma.vigorPartner.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
  return rows.map(toPartner);
}

export async function getPartnerById(id: number): Promise<VigorPartner | null> {
  const row = await prisma.vigorPartner.findUnique({ where: { id } });
  return row ? toPartner(row) : null;
}

export type VigorPartnerCreateInput = {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  sortOrder?: number;
  active?: boolean;
};

export async function createPartner(
  data: VigorPartnerCreateInput,
): Promise<VigorPartner> {
  const row = await prisma.vigorPartner.create({
    data: {
      name: data.name,
      logoUrl: data.logoUrl,
      websiteUrl: data.websiteUrl,
      sortOrder: data.sortOrder ?? 0,
      active: data.active ?? true,
    },
  });
  return toPartner(row);
}

export type VigorPartnerUpdateInput = Partial<VigorPartnerCreateInput>;

export async function updatePartner(
  id: number,
  data: VigorPartnerUpdateInput,
): Promise<VigorPartner> {
  const row = await prisma.vigorPartner.update({
    where: { id },
    data: {
      name: data.name,
      logoUrl: data.logoUrl,
      websiteUrl: data.websiteUrl,
      sortOrder: data.sortOrder,
      active: data.active,
    },
  });
  return toPartner(row);
}

export async function deletePartner(id: number): Promise<void> {
  await prisma.vigorPartner.delete({ where: { id } });
}

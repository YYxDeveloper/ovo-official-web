"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/session";
import { vigorPartnerSchema } from "@/lib/validations/vigor-schemas";
import {
  createPartner,
  updatePartner,
  deletePartner,
} from "@/lib/dal/vigor-partners";
import type { ActionState } from "@/lib/actions/vigor-slide-actions";

function parseFormData(formData: FormData) {
  return {
    name: (formData.get("name") as string) ?? "",
    logoUrl: (formData.get("logoUrl") as string) ?? "",
    websiteUrl: (formData.get("websiteUrl") as string) || undefined,
    sortOrder: (formData.get("sortOrder") as string) ?? "0",
    active: (formData.get("active") as string) ?? "false",
  };
}

export async function createPartnerAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const result = vigorPartnerSchema.safeParse(parseFormData(formData));
  if (!result.success) {
    return {
      error: "驗證失敗",
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await createPartner({
      name: result.data.name,
      logoUrl: result.data.logoUrl,
      websiteUrl: result.data.websiteUrl || undefined,
      sortOrder: result.data.sortOrder,
      active: result.data.active,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "建立失敗";
    return { error: message };
  }

  revalidatePath("/vigor");
  revalidatePath("/admin/vigor", "layout");
  redirect("/admin/vigor/partners");
}

export async function updatePartnerAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const id = Number(formData.get("id"));
  if (!id) return { error: "缺少 ID" };

  const result = vigorPartnerSchema.safeParse(parseFormData(formData));
  if (!result.success) {
    return {
      error: "驗證失敗",
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await updatePartner(id, {
      name: result.data.name,
      logoUrl: result.data.logoUrl,
      websiteUrl: result.data.websiteUrl || undefined,
      sortOrder: result.data.sortOrder,
      active: result.data.active,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "更新失敗";
    return { error: message };
  }

  revalidatePath("/vigor");
  revalidatePath("/admin/vigor", "layout");
  redirect("/admin/vigor/partners");
}

export async function deletePartnerAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const id = Number(formData.get("id"));
  if (!id) return { error: "缺少 ID" };

  try {
    await deletePartner(id);
  } catch (e) {
    const message = e instanceof Error ? e.message : "刪除失敗";
    return { error: message };
  }

  revalidatePath("/vigor");
  revalidatePath("/admin/vigor", "layout");
  redirect("/admin/vigor/partners");
}

export async function togglePartnerActiveAction(
  formData: FormData,
): Promise<void> {
  const session = await verifySession();
  if (!session) return;

  const id = Number(formData.get("id"));
  const active = formData.get("active") === "true";
  await updatePartner(id, { active });

  revalidatePath("/vigor");
  revalidatePath("/admin/vigor", "layout");
}

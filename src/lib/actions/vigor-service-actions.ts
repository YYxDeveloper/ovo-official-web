"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/session";
import { vigorServiceSchema } from "@/lib/validations/vigor-schemas";
import {
  createService,
  updateService,
  deleteService,
} from "@/lib/dal/vigor-services";
import type { ActionState } from "@/lib/actions/vigor-slide-actions";

function parseFormData(formData: FormData) {
  return {
    name: (formData.get("name") as string) ?? "",
    description: (formData.get("description") as string) || undefined,
    imageUrl: (formData.get("imageUrl") as string) ?? "",
    linkUrl: (formData.get("linkUrl") as string) || undefined,
    category: (formData.get("category") as string) ?? "",
    sortOrder: (formData.get("sortOrder") as string) ?? "0",
    active: (formData.get("active") as string) ?? "false",
  };
}

export async function createServiceAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const result = vigorServiceSchema.safeParse(parseFormData(formData));
  if (!result.success) {
    return {
      error: "驗證失敗",
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await createService({
      name: result.data.name,
      description: result.data.description,
      imageUrl: result.data.imageUrl,
      linkUrl: result.data.linkUrl || undefined,
      category: result.data.category,
      sortOrder: result.data.sortOrder,
      active: result.data.active,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "建立失敗";
    return { error: message };
  }

  revalidatePath("/vigor");
  revalidatePath("/admin/vigor", "layout");
  redirect("/admin/vigor/services");
}

export async function updateServiceAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const id = Number(formData.get("id"));
  if (!id) return { error: "缺少 ID" };

  const result = vigorServiceSchema.safeParse(parseFormData(formData));
  if (!result.success) {
    return {
      error: "驗證失敗",
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await updateService(id, {
      name: result.data.name,
      description: result.data.description,
      imageUrl: result.data.imageUrl,
      linkUrl: result.data.linkUrl || undefined,
      category: result.data.category,
      sortOrder: result.data.sortOrder,
      active: result.data.active,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "更新失敗";
    return { error: message };
  }

  revalidatePath("/vigor");
  revalidatePath("/admin/vigor", "layout");
  redirect("/admin/vigor/services");
}

export async function deleteServiceAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const id = Number(formData.get("id"));
  if (!id) return { error: "缺少 ID" };

  try {
    await deleteService(id);
  } catch (e) {
    const message = e instanceof Error ? e.message : "刪除失敗";
    return { error: message };
  }

  revalidatePath("/vigor");
  revalidatePath("/admin/vigor", "layout");
  redirect("/admin/vigor/services");
}

export async function toggleServiceActiveAction(
  formData: FormData,
): Promise<void> {
  const session = await verifySession();
  if (!session) return;

  const id = Number(formData.get("id"));
  const active = formData.get("active") === "true";
  await updateService(id, { active });

  revalidatePath("/vigor");
  revalidatePath("/admin/vigor", "layout");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/session";
import { vigorSlideSchema } from "@/lib/validations/vigor-schemas";
import {
  createSlide,
  updateSlide,
  deleteSlide,
} from "@/lib/dal/vigor-slides";

export type ActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
} | undefined;

function parseFormData(formData: FormData) {
  return {
    title: (formData.get("title") as string) ?? "",
    subtitle: (formData.get("subtitle") as string) || undefined,
    imageUrl: (formData.get("imageUrl") as string) ?? "",
    linkUrl: (formData.get("linkUrl") as string) || undefined,
    sortOrder: (formData.get("sortOrder") as string) ?? "0",
    active: (formData.get("active") as string) ?? "false",
  };
}

export async function createSlideAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const result = vigorSlideSchema.safeParse(parseFormData(formData));
  if (!result.success) {
    return {
      error: "驗證失敗",
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await createSlide({
      title: result.data.title,
      subtitle: result.data.subtitle,
      imageUrl: result.data.imageUrl,
      linkUrl: result.data.linkUrl || undefined,
      sortOrder: result.data.sortOrder,
      active: result.data.active,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "建立失敗";
    return { error: message };
  }

  revalidatePath("/vigor");
  revalidatePath("/admin/vigor", "layout");
  redirect("/admin/vigor/slides");
}

export async function updateSlideAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const id = Number(formData.get("id"));
  if (!id) return { error: "缺少 ID" };

  const result = vigorSlideSchema.safeParse(parseFormData(formData));
  if (!result.success) {
    return {
      error: "驗證失敗",
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await updateSlide(id, {
      title: result.data.title,
      subtitle: result.data.subtitle,
      imageUrl: result.data.imageUrl,
      linkUrl: result.data.linkUrl || undefined,
      sortOrder: result.data.sortOrder,
      active: result.data.active,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "更新失敗";
    return { error: message };
  }

  revalidatePath("/vigor");
  revalidatePath("/admin/vigor", "layout");
  redirect("/admin/vigor/slides");
}

export async function deleteSlideAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const id = Number(formData.get("id"));
  if (!id) return { error: "缺少 ID" };

  try {
    await deleteSlide(id);
  } catch (e) {
    const message = e instanceof Error ? e.message : "刪除失敗";
    return { error: message };
  }

  revalidatePath("/vigor");
  revalidatePath("/admin/vigor", "layout");
  redirect("/admin/vigor/slides");
}

export async function toggleSlideActiveAction(
  formData: FormData,
): Promise<void> {
  const session = await verifySession();
  if (!session) return;

  const id = Number(formData.get("id"));
  const active = formData.get("active") === "true";
  await updateSlide(id, { active });

  revalidatePath("/vigor");
  revalidatePath("/admin/vigor", "layout");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/session";
import { tileSchema } from "@/lib/validations/tile-schema";
import * as dal from "@/lib/dal/tiles";

export type ActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
} | undefined;

function parseFormData(formData: FormData) {
  return {
    slug: formData.get("slug") as string,
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    size: formData.get("size") as string,
    finish: formData.get("finish") as string,
    origin: formData.get("origin") as string,
    price: formData.get("price") as string,
    image: formData.get("image") as string,
    featured: formData.get("featured") === "on",
    sortOrder: formData.get("sortOrder") as string,
  };
}

function revalidateAll() {
  revalidatePath("/loongchi");
  revalidatePath("/loongchi/products");
  revalidatePath("/admin/tiles");
}

export async function createTileAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const raw = parseFormData(formData);
  const result = tileSchema.safeParse(raw);

  if (!result.success) {
    return {
      error: "驗證失敗",
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await dal.createTile(result.data);
  } catch (e) {
    const message = e instanceof Error ? e.message : "";
    if (message.includes("Unique constraint")) return { error: "Slug 已存在" };
    return { error: "建立失敗" };
  }

  revalidateAll();
  redirect("/admin/tiles");
}

export async function updateTileAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const id = Number(formData.get("id"));
  if (!id) return { error: "缺少 ID" };

  const raw = parseFormData(formData);
  const result = tileSchema.safeParse(raw);

  if (!result.success) {
    return {
      error: "驗證失敗",
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await dal.updateTile(id, result.data);
  } catch {
    return { error: "更新失敗" };
  }

  revalidateAll();
  redirect("/admin/tiles");
}

export async function deleteTileAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const id = Number(formData.get("id"));
  if (!id) return { error: "缺少 ID" };

  try {
    await dal.deleteTile(id);
  } catch {
    return { error: "刪除失敗" };
  }

  revalidateAll();
  redirect("/admin/tiles");
}

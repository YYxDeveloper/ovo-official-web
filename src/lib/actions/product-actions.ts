"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/session";
import { productSchema } from "@/lib/validations/product-schema";
import * as dal from "@/lib/dal/products";

export type ActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
} | undefined;

function parseFormData(formData: FormData) {
  const colorsJson = formData.get("colors") as string;
  const storageJson = formData.get("storage") as string;
  const specsJson = formData.get("specs") as string;
  const imagesJson = formData.get("images") as string;

  return {
    slug: formData.get("slug") as string,
    name: formData.get("name") as string,
    tagline: formData.get("tagline") as string,
    category: formData.get("category") as string,
    basePrice: formData.get("basePrice") as string,
    featured: formData.get("featured") === "on",
    heroImage: (formData.get("heroImage") as string) || undefined,
    sortOrder: formData.get("sortOrder") as string,
    colors: colorsJson ? JSON.parse(colorsJson) : [],
    storage: storageJson ? JSON.parse(storageJson) : [],
    specs: specsJson ? JSON.parse(specsJson) : [],
    images: imagesJson ? JSON.parse(imagesJson) : [],
  };
}

export async function createProductAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const raw = parseFormData(formData);
  const result = productSchema.safeParse(raw);

  if (!result.success) {
    return {
      error: "驗證失敗",
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await dal.createProduct(result.data);
  } catch (e) {
    const message = e instanceof Error ? e.message : "建立失敗";
    if (message.includes("Unique constraint")) {
      return { error: "Slug 已存在，請使用不同的 slug" };
    }
    return { error: message };
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProductAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const id = Number(formData.get("id"));
  if (!id) return { error: "缺少產品 ID" };

  const raw = parseFormData(formData);
  const result = productSchema.safeParse(raw);

  if (!result.success) {
    return {
      error: "驗證失敗",
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await dal.updateProduct(id, result.data);
  } catch (e) {
    const message = e instanceof Error ? e.message : "更新失敗";
    return { error: message };
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProductAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await verifySession();
  if (!session) return { error: "未授權" };

  const id = Number(formData.get("id"));
  if (!id) return { error: "缺少產品 ID" };

  try {
    await dal.deleteProduct(id);
  } catch (e) {
    const message = e instanceof Error ? e.message : "刪除失敗";
    return { error: message };
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function toggleFeaturedAction(
  formData: FormData,
): Promise<void> {
  const session = await verifySession();
  if (!session) return;

  const id = Number(formData.get("id"));
  const featured = formData.get("featured") === "true";

  await dal.updateProduct(id, { featured });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
}

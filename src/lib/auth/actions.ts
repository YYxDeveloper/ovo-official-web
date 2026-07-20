"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";

export type LoginState = { error?: string } | undefined;

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = formData.get("password");

  if (typeof password !== "string" || !password) {
    return { error: "請輸入密碼" };
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "密碼錯誤" };
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/admin/login");
}

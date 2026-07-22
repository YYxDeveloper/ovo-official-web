"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  createPartnerAction,
  updatePartnerAction,
} from "@/lib/actions/vigor-partner-actions";
import type { ActionState } from "@/lib/actions/vigor-slide-actions";
import type { VigorPartner } from "@/data/vigor-types";

interface PartnerFormProps {
  partner?: VigorPartner;
}

export function PartnerForm({ partner }: PartnerFormProps) {
  const action = partner ? updatePartnerAction : createPartnerAction;
  const [state, formAction] = useActionState<ActionState, FormData>(action, undefined);
  const fieldErrors = state?.fieldErrors ?? {};

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/vigor/partners"
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        返回夥伴列表
      </Link>

      <h1 className="mb-4 text-2xl font-bold text-white">
        {partner ? "編輯夥伴" : "新增夥伴"}
      </h1>

      {state?.error && (
        <div className="mb-4 flex items-center gap-2 rounded-md border border-red-800 bg-red-950/50 p-3 text-sm text-red-300">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {partner && <input type="hidden" name="id" value={partner.id} />}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
            名稱 <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={partner?.name ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="logoUrl" className="block text-sm font-medium text-zinc-300">
            Logo URL <span className="text-red-400">*</span>
          </label>
          <input
            id="logoUrl"
            name="logoUrl"
            type="url"
            required
            defaultValue={partner?.logoUrl ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
          />
          {fieldErrors.logoUrl && (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.logoUrl[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="websiteUrl" className="block text-sm font-medium text-zinc-300">
            網站 URL
          </label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="url"
            defaultValue={partner?.websiteUrl ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sortOrder" className="block text-sm font-medium text-zinc-300">
              排序
            </label>
            <input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={partner?.sortOrder ?? 0}
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
            />
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                name="active"
                defaultChecked={partner?.active ?? true}
                className="h-4 w-4 rounded border-zinc-700"
              />
              啟用
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit">{partner ? "更新夥伴" : "建立夥伴"}</Button>
          <Button asChild variant="outline">
            <Link href="/admin/vigor/partners">取消</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

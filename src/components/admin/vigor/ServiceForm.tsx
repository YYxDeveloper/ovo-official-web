"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  createServiceAction,
  updateServiceAction,
} from "@/lib/actions/vigor-service-actions";
import type { ActionState } from "@/lib/actions/vigor-slide-actions";
import { VIGOR_SERVICE_CATEGORIES } from "@/data/vigor-types";
import type { VigorService } from "@/data/vigor-types";

interface ServiceFormProps {
  service?: VigorService;
}

const CATEGORY_LABELS: Record<string, string> = {
  health: "健康樂活",
  learning: "終身學習",
  social: "社群連結",
  living: "生活支援",
};

export function ServiceForm({ service }: ServiceFormProps) {
  const action = service ? updateServiceAction : createServiceAction;
  const [state, formAction] = useActionState<ActionState, FormData>(action, undefined);
  const fieldErrors = state?.fieldErrors ?? {};

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/vigor/services"
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        返回服務列表
      </Link>

      <h1 className="mb-4 text-2xl font-bold text-white">
        {service ? "編輯服務" : "新增服務"}
      </h1>

      {state?.error && (
        <div className="mb-4 flex items-center gap-2 rounded-md border border-red-800 bg-red-950/50 p-3 text-sm text-red-300">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {service && <input type="hidden" name="id" value={service.id} />}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
            名稱 <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={service?.name ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-zinc-300">
            描述
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={service?.description ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-zinc-300">
            圖片 URL <span className="text-red-400">*</span>
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            required
            defaultValue={service?.imageUrl ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
          />
          {fieldErrors.imageUrl && (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.imageUrl[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="linkUrl" className="block text-sm font-medium text-zinc-300">
            連結 URL
          </label>
          <input
            id="linkUrl"
            name="linkUrl"
            type="url"
            defaultValue={service?.linkUrl ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-zinc-300">
            分類 <span className="text-red-400">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={service?.category ?? "health"}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
          >
            {VIGOR_SERVICE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
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
              defaultValue={service?.sortOrder ?? 0}
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
            />
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                name="active"
                defaultChecked={service?.active ?? true}
                className="h-4 w-4 rounded border-zinc-700"
              />
              啟用
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit">{service ? "更新服務" : "建立服務"}</Button>
          <Button asChild variant="outline">
            <Link href="/admin/vigor/services">取消</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

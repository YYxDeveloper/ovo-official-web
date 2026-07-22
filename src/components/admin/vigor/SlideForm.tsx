"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  createSlideAction,
  updateSlideAction,
  type ActionState,
} from "@/lib/actions/vigor-slide-actions";
import type { VigorSlide } from "@/data/vigor-types";

interface SlideFormProps {
  slide?: VigorSlide;
}

export function SlideForm({ slide }: SlideFormProps) {
  const action = slide ? updateSlideAction : createSlideAction;
  const [state, formAction] = useActionState<ActionState, FormData>(action, undefined);
  const fieldErrors = state?.fieldErrors ?? {};

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/vigor/slides"
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        返回輪播列表
      </Link>

      <h1 className="mb-4 text-2xl font-bold text-white">
        {slide ? "編輯輪播" : "新增輪播"}
      </h1>

      {state?.error && (
        <div className="mb-4 flex items-center gap-2 rounded-md border border-red-800 bg-red-950/50 p-3 text-sm text-red-300">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {slide && <input type="hidden" name="id" value={slide.id} />}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-300">
            標題 <span className="text-red-400">*</span>
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={slide?.title ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
          />
          {fieldErrors.title && (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.title[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-zinc-300">
            副標題
          </label>
          <input
            id="subtitle"
            name="subtitle"
            defaultValue={slide?.subtitle ?? ""}
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
            defaultValue={slide?.imageUrl ?? ""}
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
            defaultValue={slide?.linkUrl ?? ""}
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
              defaultValue={slide?.sortOrder ?? 0}
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
            />
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                name="active"
                defaultChecked={slide?.active ?? true}
                className="h-4 w-4 rounded border-zinc-700"
              />
              啟用
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit">{slide ? "更新輪播" : "建立輪播"}</Button>
          <Button asChild variant="outline">
            <Link href="/admin/vigor/slides">取消</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

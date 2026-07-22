"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ActionState } from "@/lib/actions/vigor-slide-actions";

interface VigorDeleteFormClientProps {
  title: string;
  itemName: string;
  backHref: string;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
}

export function VigorDeleteFormClient({
  title,
  itemName,
  backHref,
  action,
}: VigorDeleteFormClientProps) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, undefined);

  return (
    <div className="mx-auto max-w-lg">
      <Link
        href={backHref}
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        返回列表
      </Link>

      <h1 className="mb-4 text-2xl font-bold text-white">刪除{title}</h1>

      <div className="rounded-lg border border-red-800 bg-red-950/30 p-6">
        <div className="mb-4 flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          <div>
            <p className="text-sm text-zinc-200">
              確定要刪除「<strong className="text-white">{itemName}</strong>」嗎？此操作無法復原。
            </p>
          </div>
        </div>

        {state?.error && (
          <p className="mb-3 text-sm text-red-300">{state.error}</p>
        )}

        <div className="flex gap-3">
          <form action={formAction}>
            <Button type="submit" variant="destructive">
              確認刪除
            </Button>
          </form>
          <Button asChild variant="outline">
            <Link href={backHref}>取消</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

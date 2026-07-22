"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VigorSlide } from "@/data/vigor-types";

interface SlideTableProps {
  slides: VigorSlide[];
}

export function SlideTable({ slides }: SlideTableProps) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" />
          返回 Admin
        </Link>
        <Button asChild>
          <Link href="/admin/vigor/slides/new">
            <Plus className="mr-1 h-4 w-4" />
            新增輪播
          </Link>
        </Button>
      </div>

      <h1 className="mb-4 text-2xl font-bold text-white">輪播管理</h1>

      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-left text-zinc-400">
            <tr>
              <th className="px-4 py-2">標題</th>
              <th className="px-4 py-2">排序</th>
              <th className="px-4 py-2">狀態</th>
              <th className="px-4 py-2 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {slides.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                  尚無輪播資料
                </td>
              </tr>
            ) : (
              slides.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-900/50">
                  <td className="px-4 py-2 text-white">{s.title}</td>
                  <td className="px-4 py-2 text-zinc-400">{s.sortOrder}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs ${
                        s.active
                          ? "bg-green-900/40 text-green-300"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {s.active ? "啟用" : "停用"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <Link
                      href={`/admin/vigor/slides/${s.id}`}
                      className="mr-2 text-xs text-blue-400 hover:text-blue-300"
                    >
                      編輯
                    </Link>
                    <Link
                      href={`/admin/vigor/slides/${s.id}/delete`}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      刪除
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

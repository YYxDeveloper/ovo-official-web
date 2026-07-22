"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VigorPartner } from "@/data/vigor-types";

interface PartnerTableProps {
  partners: VigorPartner[];
}

export function PartnerTable({ partners }: PartnerTableProps) {
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
          <Link href="/admin/vigor/partners/new">
            <Plus className="mr-1 h-4 w-4" />
            新增夥伴
          </Link>
        </Button>
      </div>

      <h1 className="mb-4 text-2xl font-bold text-white">夥伴管理</h1>

      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-left text-zinc-400">
            <tr>
              <th className="px-4 py-2">名稱</th>
              <th className="px-4 py-2">網站</th>
              <th className="px-4 py-2">排序</th>
              <th className="px-4 py-2">狀態</th>
              <th className="px-4 py-2 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {partners.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  尚無夥伴資料
                </td>
              </tr>
            ) : (
              partners.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-900/50">
                  <td className="px-4 py-2 text-white">{p.name}</td>
                  <td className="px-4 py-2 text-xs text-zinc-400">
                    {p.websiteUrl ? (
                      <a
                        href={p.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {p.websiteUrl}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-2 text-zinc-400">{p.sortOrder}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs ${
                        p.active
                          ? "bg-green-900/40 text-green-300"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {p.active ? "啟用" : "停用"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <Link
                      href={`/admin/vigor/partners/${p.id}`}
                      className="mr-2 text-xs text-blue-400 hover:text-blue-300"
                    >
                      編輯
                    </Link>
                    <Link
                      href={`/admin/vigor/partners/${p.id}/delete`}
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

"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toggleFeaturedAction } from "@/lib/actions/product-actions";

type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  basePrice: number;
  featured: boolean;
  sortOrder: number;
};

export function ProductTable({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-zinc-500">尚無產品</p>
    );
  }

  return (
    <div className="mt-4 rounded-md border border-zinc-800">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-zinc-900">
            <TableHead className="text-zinc-400">排序</TableHead>
            <TableHead className="text-zinc-400">名稱</TableHead>
            <TableHead className="text-zinc-400">分類</TableHead>
            <TableHead className="text-zinc-400">價格</TableHead>
            <TableHead className="text-zinc-400">精選</TableHead>
            <TableHead className="text-right text-zinc-400">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="border-zinc-800 hover:bg-zinc-900">
              <TableCell className="text-zinc-300">{product.sortOrder}</TableCell>
              <TableCell>
                <span className="font-medium text-zinc-100">{product.name}</span>
                <p className="text-xs text-zinc-500">{product.slug}</p>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell className="text-zinc-300">
                NT$ {product.basePrice.toLocaleString()}
              </TableCell>
              <TableCell>
                <form action={toggleFeaturedAction}>
                  <input type="hidden" name="id" value={product.id} />
                  <input
                    type="hidden"
                    name="featured"
                    value={String(!product.featured)}
                  />
                  <button
                    type="submit"
                    className={`h-5 w-5 rounded-full border-2 transition-colors ${
                      product.featured
                        ? "border-emerald-500 bg-emerald-500"
                        : "border-zinc-600 hover:border-zinc-400"
                    }`}
                    title={product.featured ? "取消精選" : "設為精選"}
                  />
                </form>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/products/${product.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    <Link href={`/admin/products/${product.id}/delete`}>
                      <Trash2 className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

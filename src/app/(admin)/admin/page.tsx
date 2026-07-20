import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductTable } from "@/components/admin/ProductTable";

const CATEGORIES = [
  { value: "all", label: "全部" },
  { value: "phone", label: "手機" },
  { value: "watch", label: "手錶" },
  { value: "buds", label: "耳機" },
] as const;

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    include: {
      colors: true,
      storage: true,
      specs: true,
      images: true,
    },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-zinc-100">產品管理</h1>
          <p className="text-sm text-zinc-400">共 {products.length} 項產品</p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/products/new">
            <Plus className="mr-1 h-4 w-4" />
            新增產品
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="border-zinc-700 bg-zinc-800">
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value} className="text-zinc-300 data-[state=active]:text-white">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <ProductTable products={products} />
        </TabsContent>
        {CATEGORIES.filter((c) => c.value !== "all").map((cat) => (
          <TabsContent key={cat.value} value={cat.value}>
            <ProductTable
              products={products.filter((p) => p.category === cat.value)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

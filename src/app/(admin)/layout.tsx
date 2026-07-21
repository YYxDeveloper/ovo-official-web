import Link from "next/link";
import { redirect } from "next/navigation";
import { Package, LogOut, Grid2x2 } from "lucide-react";
import { logoutAction } from "@/lib/auth/actions";
import { verifySession } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import "../globals.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <html lang="zh-TW" className="h-full antialiased">
      <body className="flex min-h-full bg-zinc-950 text-zinc-100">
        <aside className="hidden w-56 shrink-0 border-r border-zinc-800 bg-zinc-900 md:block">
          <div className="flex h-14 items-center gap-2 border-b border-zinc-800 px-4">
            <Package className="h-5 w-5 text-zinc-400" />
            <span className="text-sm font-semibold">ovo Admin</span>
          </div>
          <nav className="space-y-1 p-3">
            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              <Package className="h-4 w-4" />
              產品管理
            </Link>
            <Link
              href="/admin/tiles"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              <Grid2x2 className="h-4 w-4" />
              磁磚管理
            </Link>
          </nav>
        </aside>
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center justify-between border-b border-zinc-800 px-4 md:px-6">
            <div className="flex items-center gap-2 md:hidden">
              <Package className="h-5 w-5 text-zinc-400" />
              <span className="text-sm font-semibold">ovo Admin</span>
            </div>
            <div className="ml-auto">
              <form action={logoutAction}>
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                  <LogOut className="mr-1 h-4 w-4" />
                  登出
                </Button>
              </form>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}

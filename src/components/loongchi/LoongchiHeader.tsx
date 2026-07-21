"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/loongchi", label: "首頁" },
  { href: "/loongchi/products", label: "產品目錄" },
  { href: "/loongchi/about", label: "關於我們" },
  { href: "/loongchi/contact", label: "聯絡我們" },
];

export function LoongchiHeader() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        backgroundColor: "var(--lc-bg)",
        borderColor: "var(--lc-border)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/loongchi"
          className="text-xl font-semibold tracking-widest"
          style={{ color: "var(--lc-accent)" }}
        >
          隆記企業
        </Link>

        <nav className="flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/loongchi"
                ? pathname === "/loongchi"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm tracking-wide transition-colors",
                  isActive
                    ? "font-medium"
                    : "hover:opacity-70"
                )}
                style={{
                  color: isActive ? "var(--lc-accent)" : "var(--lc-muted)",
                  borderBottom: isActive
                    ? "2px solid var(--lc-accent)"
                    : "2px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

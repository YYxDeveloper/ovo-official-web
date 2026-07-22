"use client";

import { useState } from "react";
import Link from "next/link";
import type { VigorNavItem } from "@/data/vigor-types";

interface VigorHeaderProps {
  navItems: VigorNavItem[];
}

export function VigorHeader({ navItems }: VigorHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-vigor-border bg-vigor-nav-bg shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link
          href="/vigor"
          className="flex items-center gap-2 text-lg font-bold text-vigor-heading"
          aria-label="Vigor 躍齡 — 回到首頁"
        >
          <span aria-hidden="true" className="text-vigor-primary">●</span>
          Vigor 躍齡
        </Link>

        <form
          role="search"
          aria-label="網站搜尋"
          className="ml-auto hidden flex-1 max-w-xs md:flex"
          onSubmit={(e) => {
            e.preventDefault();
            alert("搜尋功能為視覺 demo，請透過上方導覽瀏覽內容。");
          }}
        >
          <label htmlFor="vigor-search" className="sr-only">
            搜尋
          </label>
          <input
            id="vigor-search"
            type="search"
            name="q"
            placeholder="搜尋服務或夥伴..."
            className="w-full rounded-md border border-vigor-border bg-white px-3 py-2 text-sm text-vigor-text focus:border-vigor-primary focus:outline-none focus:ring-2 focus:ring-vigor-primary/20"
          />
        </form>

        <a
          href="https://line.me/R/ti/p/@vigor"
          className="hidden md:inline-flex items-center rounded-md bg-vigor-primary px-3 py-2 text-sm font-medium text-white hover:bg-vigor-primary-hover focus:outline-none focus:ring-2 focus:ring-vigor-primary/40"
        >
          加入 LINE
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "關閉主導覽選單" : "開啟主導覽選單"}
          aria-expanded={menuOpen}
          aria-controls="vigor-primary-nav"
          className="md:hidden rounded-md p-2 text-vigor-text hover:bg-vigor-bg focus:outline-none focus:ring-2 focus:ring-vigor-primary/40"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      <nav
        id="vigor-primary-nav"
        aria-label="主導覽"
        className={`${menuOpen ? "block" : "hidden"} border-t border-vigor-border bg-vigor-nav-bg md:block md:border-t-0`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-2 md:flex-row md:items-center md:gap-2 md:px-6 md:py-0">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={item.href === "/vigor" ? "page" : undefined}
                className="block rounded-md px-3 py-2 text-sm font-medium text-vigor-text hover:bg-vigor-bg hover:text-vigor-primary focus:outline-none focus:ring-2 focus:ring-vigor-primary/30"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

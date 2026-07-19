"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GitCompare } from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { NAV_ITEMS, SCROLL_BLUR_THRESHOLD } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > SCROLL_BLUR_THRESHOLD;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b",
        scrolled ? "border-ovo-border" : "border-transparent",
      )}
    >
      <nav className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-4 md:h-14 md:px-6">
        <Link href="/" className="text-base font-semibold tracking-tight text-ovo-text md:text-lg">
          ovo
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <MegaMenu />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/compare"
            aria-label="比較"
            className="rounded-full p-2 text-ovo-text/80 transition hover:text-ovo-text"
          >
            <GitCompare className="size-4" />
          </Link>
        </div>

        <button
          aria-label="開啟選單"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-full p-2 text-ovo-text md:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-t border-ovo-border bg-ovo-black/95 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto flex max-w-[1024px] flex-col gap-1 px-4 py-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm text-ovo-text transition hover:bg-ovo-card"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

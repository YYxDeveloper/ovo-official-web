"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCompareStore } from "@/lib/store/compareStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CompareBar() {
  const items = useCompareStore((s) => s.items);
  const removeItem = useCompareStore((s) => s.removeItem);
  const clearAll = useCompareStore((s) => s.clearAll);

  const hasItems = items.length > 0;

  return (
    <AnimatePresence>
      {hasItems && (
        <motion.div
          key="compare-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ovo-border bg-ovo-black/85 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex flex-1 items-center gap-3 overflow-x-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center gap-2 rounded-full border border-ovo-border bg-ovo-card/80 py-1 pl-1 pr-2",
                  )}
                >
                  <div className="relative size-9 overflow-hidden rounded-full bg-ovo-darkgray">
                    {item.heroImage ? (
                      <Image
                        src={item.heroImage}
                        alt={item.name}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <span className="whitespace-nowrap text-xs text-ovo-text">
                    {item.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`移除 ${item.name}`}
                    className="rounded-full p-1 text-ovo-muted transition hover:bg-ovo-card hover:text-ovo-text"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-ovo-muted hover:text-ovo-text"
              >
                清除全部
              </Button>
              <Button asChild size="sm">
                <Link href="/compare">比較 ({items.length})</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

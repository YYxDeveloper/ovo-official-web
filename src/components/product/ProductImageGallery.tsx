"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProductImageGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const safeIndex = Math.min(index, images.length - 1);
  const active = images[safeIndex];

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-ovo-card">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={active}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              aria-label={`檢視圖片 ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition",
                safeIndex === i
                  ? "border-ovo-blue"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={src}
                alt={`${alt} 縮圖 ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

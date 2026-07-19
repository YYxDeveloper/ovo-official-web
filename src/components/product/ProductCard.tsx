"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-ovo-border bg-ovo-card"
    >
      <Link href={`/products/${product.category}/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          {product.heroImage ? (
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : null}
        </div>
        <div className="flex items-start justify-between gap-3 p-4">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium text-ovo-text">
              {product.name}
            </h3>
            <p className="mt-0.5 line-clamp-1 text-xs text-ovo-muted">
              {product.tagline}
            </p>
          </div>
          <span className="shrink-0 text-sm text-ovo-text">
            {formatPrice(product.basePrice)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

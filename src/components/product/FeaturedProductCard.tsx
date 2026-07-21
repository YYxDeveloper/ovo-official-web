"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";

interface FeaturedProductCardProps {
  product: Product;
  variants: Variants;
}

export function FeaturedProductCard({
  product,
  variants,
}: FeaturedProductCardProps) {
  return (
    <motion.article
      variants={variants}
      className="group relative w-[78%] shrink-0 snap-center overflow-hidden rounded-[var(--radius-lg)] bg-ovo-card transition-transform md:w-auto"
    >
      <Link
        href={`/products/${product.category}/${product.slug}`}
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          {product.heroImage ? (
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 33vw, 78vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : null}
        </div>
        <div className="flex items-start justify-between gap-3 p-5">
          <div className="min-w-0">
            <h3 className="truncate text-base font-medium text-ovo-text">
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
    </motion.article>
  );
}

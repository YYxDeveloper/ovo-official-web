"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface CategoryCardProps {
  category: {
    key: string;
    title: string;
    tagline: string;
    image: string;
  };
  variants: Variants;
}

export function CategoryCard({ category, variants }: CategoryCardProps) {
  return (
    <motion.div variants={variants}>
      <Link
        href={`/products/${category.key}`}
        className="group block overflow-hidden rounded-[var(--radius-lg)] bg-ovo-card transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-1"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex items-center justify-between p-5">
          <div>
            <h3 className="text-lg font-semibold text-ovo-text">
              {category.title}
            </h3>
            <p className="mt-1 text-xs text-ovo-muted">{category.tagline}</p>
          </div>
          <span className="text-sm font-medium text-ovo-blue transition group-hover:translate-x-1">
            探索 →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

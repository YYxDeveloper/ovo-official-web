"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import type { Product } from "@/data/types";
import { Button } from "@/components/ui/button";
import { FeaturedProductCard } from "@/components/product/FeaturedProductCard";

const card: Variants = {
  hidden: { y: 24, opacity: 1 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const cardWithMotion: Variants = {
  hidden: { y: 24 },
  show: {
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export function FeaturedProducts({ products: featured }: { products: Product[] }) {
  const shouldReduceMotion = useReducedMotion();
  const activeCard = shouldReduceMotion ? card : cardWithMotion;
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ovo-muted">
            Featured
          </p>
          <h2 className="text-section font-semibold text-ovo-text">
            本月主打
          </h2>
        </div>
        <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
          <Link href="/products">查看全部</Link>
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0"
      >
        {featured.map((product) => (
          <FeaturedProductCard
            key={product.id}
            product={product}
            variants={activeCard}
          />
        ))}
      </motion.div>
    </section>
  );
}

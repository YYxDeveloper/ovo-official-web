"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Product } from "@/data/types";
import { Button } from "@/components/ui/button";
import { FeaturedProductCard } from "@/components/product/FeaturedProductCard";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

const card = fadeUpItem({ y: 24, duration: 0.5, fade: false });
const container = staggerContainer({ staggerChildren: 0.12 });

export function FeaturedProducts({ products: featured }: { products: Product[] }) {
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
            variants={card}
          />
        ))}
      </motion.div>
    </section>
  );
}

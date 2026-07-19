"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { getFeaturedProducts } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

const featured = getFeaturedProducts().slice(0, 3);

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

export function FeaturedProducts() {
  const ref = useRef<HTMLDivElement>(null);
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
        ref={ref}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0"
      >
        {featured.map((product) => (
          <motion.article
            key={product.id}
            variants={activeCard}
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
        ))}
      </motion.div>
    </section>
  );
}

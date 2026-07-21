"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/types";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

const container = staggerContainer({ staggerChildren: 0.1, delayChildren: 0.05 });
const item = fadeUpItem({ y: 30 });

export function HeroBanner({ product }: { product: Product }) {
  return (
    <section className="relative h-[calc(100vh-3rem)] w-full overflow-hidden bg-ovo-black md:h-[calc(100vh-3.5rem)]">
      <Image
        src={product.heroImage ?? product.images[0]}
        alt={product.name}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ovo-black/40 via-transparent to-ovo-black" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex h-full max-w-[1024px] flex-col items-center justify-end px-4 pb-20 text-center md:pb-28"
      >
        <motion.p
          variants={item}
          className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-ovo-muted md:text-sm"
        >
          New · {product.tagline}
        </motion.p>
        <motion.h1
          variants={item}
          className="text-hero font-semibold text-ovo-text"
        >
          {product.name}
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-4 max-w-md text-base text-ovo-muted md:text-lg"
        >
          為速度而生，為日常而設計。
        </motion.p>
        <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href={`/products/${product.category}`}>立即購買</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={`/products/${product.category}/${product.slug}`}>了解更多</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

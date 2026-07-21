"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ProductCategory } from "@/data/types";
import { categoryLabelsZh } from "@/data/constants";
import { CategoryCard } from "./CategoryCard";

const CARDS: { key: ProductCategory; title: string; tagline: string; image: string }[] = [
  {
    key: "phone",
    title: categoryLabelsZh.phone,
    tagline: "速度的新定義",
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=1200",
  },
  {
    key: "watch",
    title: categoryLabelsZh.watch,
    tagline: "極限挑戰者的選擇",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200",
  },
  {
    key: "buds",
    title: categoryLabelsZh.buds,
    tagline: "沉浸在聲音的世界",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=1200",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { y: 30, opacity: 1 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const itemWithMotion: Variants = {
  hidden: { y: 30 },
  show: {
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function CategoryCards() {
  const shouldReduceMotion = useReducedMotion();
  const activeItem = shouldReduceMotion ? item : itemWithMotion;
  return (
    <section className="bg-ovo-darkgray">
      <div className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ovo-muted">
            Categories
          </p>
          <h2 className="text-section font-semibold text-ovo-text">
            探索全部產品
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {CARDS.map((card) => (
            <CategoryCard
              key={card.key}
              category={card}
              variants={activeItem}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUpItem } from "@/lib/animations";
import type { VigorService } from "@/data/vigor-types";
import { VigorServiceCard } from "./VigorServiceCard";

interface VigorServiceGridProps {
  services: VigorService[];
}

export function VigorServiceGrid({ services }: VigorServiceGridProps) {
  return (
    <section
      aria-labelledby="vigor-services-heading"
      className="bg-vigor-surface py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2
          id="vigor-services-heading"
          className="text-2xl font-bold text-vigor-heading md:text-3xl"
        >
          服務總覽
        </h2>
        <p className="mt-2 text-base text-vigor-muted md:text-lg">
          為樂齡生活提供四大類別支援
        </p>

        {services.length === 0 ? (
          <p className="mt-8 text-center text-vigor-muted">尚無服務資料</p>
        ) : (
          <motion.ul
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service) => (
              <motion.li key={service.id} variants={fadeUpItem()}>
                <VigorServiceCard service={service} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}

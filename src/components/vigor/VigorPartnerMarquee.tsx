"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { VigorPartner } from "@/data/vigor-types";

interface VigorPartnerMarqueeProps {
  partners: VigorPartner[];
}

export function VigorPartnerMarquee({ partners }: VigorPartnerMarqueeProps) {
  const [paused, setPaused] = useState(false);

  if (partners.length === 0) return null;

  const doubled = [...partners, ...partners];

  return (
    <section
      aria-labelledby="vigor-partners-heading"
      className="bg-vigor-surface py-10"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2
          id="vigor-partners-heading"
          className="text-center text-2xl font-bold text-vigor-heading md:text-3xl"
        >
          合作夥伴
        </h2>

        <div
          className="relative mt-8 overflow-hidden"
          aria-label="合作夥伴 logo 跑馬燈"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <motion.div
            className="flex w-max gap-8"
            animate={{
              x: paused ? undefined : ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {doubled.map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                className="flex h-16 w-40 shrink-0 items-center justify-center"
              >
                <Image
                  src={p.logoUrl}
                  alt={p.websiteUrl ? `${p.name} 標誌（連結至合作夥伴網站）` : `${p.name} 標誌`}
                  width={160}
                  height={64}
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0"
                  unoptimized
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scaleOnHover } from "@/lib/animations";
import type { VigorService } from "@/data/vigor-types";

interface VigorServiceCardProps {
  service: VigorService;
}

const CATEGORY_LABELS: Record<string, string> = {
  health: "健康樂活",
  learning: "終身學習",
  social: "社群連結",
  living: "生活支援",
};

export function VigorServiceCard({ service }: VigorServiceCardProps) {
  const categoryLabel = CATEGORY_LABELS[service.category] ?? service.category;
  const altText = `${service.name} — ${categoryLabel}類別服務`;

  return (
    <motion.article
      whileHover={scaleOnHover}
      className="h-full overflow-hidden rounded-lg border border-vigor-border bg-vigor-surface shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-vigor-bg">
        <Image
          src={service.imageUrl}
          alt={altText}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <span className="inline-block rounded-full bg-vigor-bg px-2 py-1 text-xs font-medium text-vigor-muted">
          {categoryLabel}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-vigor-heading">
          {service.name}
        </h3>
        {service.description && (
          <p className="mt-1 text-sm text-vigor-muted line-clamp-2">
            {service.description}
          </p>
        )}
      </div>
    </motion.article>
  );
}

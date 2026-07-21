import type { Variants, Easing } from "framer-motion";

const DEFAULT_EASE: Easing = [0.22, 1, 0.36, 1];

export function staggerContainer(options?: {
  staggerChildren?: number;
  delayChildren?: number;
}): Variants {
  const { staggerChildren = 0.1, delayChildren = 0 } = options ?? {};
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        ...(delayChildren > 0 ? { delayChildren } : {}),
      },
    },
  };
}

export function fadeUpItem(options?: {
  y?: number;
  duration?: number;
  ease?: Easing;
  fade?: boolean;
}): Variants {
  const { y = 24, duration = 0.6, ease = DEFAULT_EASE, fade = true } =
    options ?? {};
  return {
    hidden: { y, ...(fade ? { opacity: 0 } : {}) },
    show: {
      y: 0,
      ...(fade ? { opacity: 1 } : {}),
      transition: { duration, ease },
    },
  };
}

export const scaleOnHover = { scale: 1.03 } as const;

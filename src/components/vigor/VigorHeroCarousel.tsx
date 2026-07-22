"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { VigorSlide } from "@/data/vigor-types";

interface VigorHeroCarouselProps {
  slides: VigorSlide[];
}

const AUTOPLAY_MS = 6000;

export function VigorHeroCarousel({ slides }: VigorHeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    timerRef.current = setTimeout(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, isPaused, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[index];
  const isLink = Boolean(slide.linkUrl);
  const linkHref = slide.linkUrl ?? "";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Vigor 最新消息"
      className="relative w-full overflow-hidden bg-vigor-surface"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {isLink ? (
              <a
                href={linkHref}
                aria-live="polite"
                aria-atomic="true"
                className="block h-full w-full"
              >
              <Image
                src={slide.imageUrl}
                alt={slide.subtitle ? `${slide.title} — ${slide.subtitle}` : slide.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 md:p-10">
                <h2 className="text-2xl font-bold text-white md:text-4xl">
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p className="mt-2 text-sm text-white/90 md:text-lg">
                    {slide.subtitle}
                  </p>
                )}
              </div>
              </a>
            ) : (
              <div
                aria-live="polite"
                aria-atomic="true"
                className="block h-full w-full"
              >
                <Image
                  src={slide.imageUrl}
                  alt={slide.subtitle ? `${slide.title} — ${slide.subtitle}` : slide.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 md:p-10">
                  <h2 className="text-2xl font-bold text-white md:text-4xl">
                    {slide.title}
                  </h2>
                  {slide.subtitle && (
                    <p className="mt-2 text-sm text-white/90 md:text-lg">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
        <button
          type="button"
          aria-label="上一張輪播"
          onClick={prev}
          className="rounded-full bg-black/40 p-2 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-vigor-primary"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          aria-label="下一張輪播"
          onClick={next}
          className="rounded-full bg-black/40 p-2 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-vigor-primary"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label="輪播指示器">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-current={i === index ? "true" : undefined}
            aria-selected={i === index}
            aria-label={`跳至第 ${i + 1} 張`}
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              i === index ? "w-6 bg-vigor-primary" : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

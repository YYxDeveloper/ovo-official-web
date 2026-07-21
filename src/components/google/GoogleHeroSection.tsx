"use client";

import { useState } from "react";
import type { PixelProduct } from "@/data/google";
import { GoogleColorPicker } from "./GoogleColorPicker";
import { G_COLORS, GOOGLE_BLUE } from "./constants";

export function GoogleHeroSection({ product }: { product: PixelProduct }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p
              className="mb-2 text-sm font-medium"
              style={{ color: GOOGLE_BLUE }}
            >
              Pixel 9 Series
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 text-xl text-gray-500">{product.tagline}</p>

            <div className="mt-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
                Colour
              </p>
              <GoogleColorPicker
                colors={product.colors}
                selected={selectedColor}
                onChange={setSelectedColor}
              />
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <p className="text-2xl font-semibold text-gray-900">
                From ${product.basePrice.toLocaleString()}
              </p>
              <button
                className="rounded-full px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: G_COLORS.blue }}
              >
                Buy
              </button>
              <button
                className="rounded-full border border-gray-300 px-8 py-3 text-sm font-medium transition-colors hover:bg-gray-100"
                style={{ color: GOOGLE_BLUE }}
              >
                Learn more
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={selectedColor.imageUrl}
              alt={`${product.name} in ${selectedColor.name}`}
              className="h-80 w-80 rounded-3xl object-cover shadow-2xl md:h-96 md:w-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

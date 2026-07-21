"use client";

import { pixelProducts } from "@/data/google";
import { GoogleLogo } from "@/components/google/GoogleLogo";
import { GoogleHeroSection } from "@/components/google/GoogleHeroSection";
import { GoogleProductCard } from "@/components/google/GoogleProductCard";

const G_COLORS = {
  blue: "#4285F4",
  red: "#EA4335",
  yellow: "#FBBC04",
  green: "#34A853",
};

export default function GooglePage() {
  const heroProduct = pixelProducts.find((p) => p.featured) ?? pixelProducts[1];

  return (
    <div className="bg-white text-gray-900">
      {/* Google Store brand bar */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 py-4 md:px-8">
          <GoogleLogo />
          <span className="text-base font-medium text-gray-700">Google Store</span>
          <span className="mx-2 text-gray-200">|</span>
          <div className="flex gap-1">
            {Object.values(G_COLORS).map((color, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      <GoogleHeroSection product={heroProduct} />

      <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-8">
        <h2 className="mb-2 text-xs font-medium uppercase tracking-widest text-gray-400">
          Pixel 9 Series
        </h2>
        <p className="mb-10 text-3xl font-semibold text-gray-900">
          Find the Pixel for you
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {pixelProducts.map((product) => (
            <GoogleProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 py-16 text-center">
        <div className="flex justify-center gap-1.5">
          {["G", "o", "o", "g", "l", "e"].map((letter, i) => (
            <span
              key={i}
              className="text-4xl font-bold md:text-5xl"
              style={{
                color: [
                  G_COLORS.blue,
                  G_COLORS.red,
                  G_COLORS.yellow,
                  G_COLORS.blue,
                  G_COLORS.green,
                  G_COLORS.red,
                ][i],
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        <p className="mt-4 text-gray-500">
          Built with Google AI. Made for your life.
        </p>
      </section>
    </div>
  );
}

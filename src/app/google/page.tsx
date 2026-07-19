"use client";

import { useState } from "react";
import { pixelProducts } from "@/data/google";
import type { PixelProduct } from "@/data/google";
import type { ColorVariant } from "@/data/types";

// Google brand colors
const G_COLORS = {
  blue: "#4285F4",
  red: "#EA4335",
  yellow: "#FBBC04",
  green: "#34A853",
};

function GoogleGLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

const GOOGLE_BLUE = "#1a73e8";

function ColorPicker({
  colors,
  selected,
  onChange,
}: {
  colors: ColorVariant[];
  selected: ColorVariant;
  onChange: (color: ColorVariant) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => onChange(color)}
          title={color.name}
          className="h-7 w-7 rounded-full border-2 transition-all"
          style={{
            backgroundColor: color.hex,
            borderColor: selected.name === color.name ? GOOGLE_BLUE : "#dadce0",
            transform: selected.name === color.name ? "scale(1.15)" : "scale(1)",
          }}
        />
      ))}
      <span className="ml-2 text-sm text-gray-500">{selected.name}</span>
    </div>
  );
}

function HeroSection({ product }: { product: PixelProduct }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Text side */}
          <div>
            <p className="mb-2 text-sm font-medium" style={{ color: GOOGLE_BLUE }}>Pixel 9 Series</p>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 text-xl text-gray-500">{product.tagline}</p>

            <div className="mt-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
                Colour
              </p>
              <ColorPicker
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
              <button className="rounded-full border border-gray-300 px-8 py-3 text-sm font-medium transition-colors hover:bg-gray-100" style={{ color: GOOGLE_BLUE }}>
                Learn more
              </button>
            </div>
          </div>

          {/* Image side */}
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

function ProductCard({ product }: { product: PixelProduct }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
      <img
        src={selectedColor.imageUrl}
        alt={`${product.name} in ${selectedColor.name}`}
        className="mb-6 h-56 w-full rounded-2xl object-cover"
      />
      <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
      <p className="mt-1 text-sm text-gray-500">{product.tagline}</p>

      <div className="mt-4">
        <ColorPicker
          colors={product.colors}
          selected={selectedColor}
          onChange={setSelectedColor}
        />
      </div>

      <ul className="mt-5 space-y-2 border-t border-gray-100 pt-5">
        {product.specs.slice(0, 3).map((spec) => (
          <li key={spec.label} className="flex justify-between text-sm">
            <span className="text-gray-400">{spec.label}</span>
            <span className="text-right text-gray-700">{spec.value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <p className="font-semibold text-gray-900">
          From ${product.basePrice.toLocaleString()}
        </p>
        <button
          className="rounded-full px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: G_COLORS.blue }}
        >
          Buy
        </button>
      </div>
    </div>
  );
}

export default function GooglePage() {
  const heroProduct = pixelProducts.find((p) => p.featured) ?? pixelProducts[1];

  return (
    <div className="bg-white text-gray-900">
      {/* Google Store brand bar */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 py-4 md:px-8">
          <GoogleGLogo />
          <span className="text-base font-medium text-gray-700">Google Store</span>
          <span className="mx-2 text-gray-200">|</span>
          {/* Colored dot accent bar */}
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

      {/* Hero */}
      <HeroSection product={heroProduct} />

      {/* Product grid */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-8">
        <h2 className="mb-2 text-xs font-medium uppercase tracking-widest text-gray-400">
          Pixel 9 Series
        </h2>
        <p className="mb-10 text-3xl font-semibold text-gray-900">
          Find the Pixel for you
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {pixelProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Footer tagline */}
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

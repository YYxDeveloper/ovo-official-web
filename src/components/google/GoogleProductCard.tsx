"use client";

import { useState } from "react";
import type { PixelProduct } from "@/data/google";
import { GoogleColorPicker } from "./GoogleColorPicker";

const G_COLORS = {
  blue: "#4285F4",
};

export function GoogleProductCard({ product }: { product: PixelProduct }) {
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
        <GoogleColorPicker
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

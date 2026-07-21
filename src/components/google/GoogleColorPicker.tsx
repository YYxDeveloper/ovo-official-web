"use client";

import type { ColorVariant } from "@/data/types";
import { GOOGLE_BLUE } from "./constants";

interface GoogleColorPickerProps {
  colors: ColorVariant[];
  selected: ColorVariant;
  onChange: (color: ColorVariant) => void;
}

export function GoogleColorPicker({
  colors,
  selected,
  onChange,
}: GoogleColorPickerProps) {
  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <button
          type="button"
          key={color.name}
          onClick={() => onChange(color)}
          title={color.name}
          aria-pressed={selected.name === color.name}
          className="h-7 w-7 rounded-full border-2 transition-all"
          style={{
            backgroundColor: color.hex,
            borderColor:
              selected.name === color.name ? GOOGLE_BLUE : "#dadce0",
            transform:
              selected.name === color.name ? "scale(1.15)" : "scale(1)",
          }}
        />
      ))}
      <span className="ml-2 text-sm text-gray-500">{selected.name}</span>
    </div>
  );
}

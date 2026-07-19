"use client";

import { useQueryState, parseAsString } from "nuqs";
import { cn } from "@/lib/utils";
import type { ColorVariant, StorageVariant } from "@/data/types";

interface VariantSelectorProps {
  colors: ColorVariant[];
  storage?: StorageVariant[];
}

export function VariantSelector({ colors, storage }: VariantSelectorProps) {
  const firstColor = colors[0]?.name ?? "";
  const firstStorage = storage?.[0]?.label ?? "";

  const [color, setColor] = useQueryState(
    "color",
    parseAsString.withDefault(firstColor),
  );
  const [storageParam, setStorage] = useQueryState(
    "storage",
    parseAsString.withDefault(firstStorage),
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ovo-muted">
          顏色 — <span className="text-ovo-text">{color}</span>
        </p>
        <div className="flex flex-wrap gap-2.5">
          {colors.map((c) => {
            const selected = color === c.name;
            return (
              <button
                key={c.name}
                type="button"
                aria-label={c.name}
                aria-pressed={selected}
                onClick={() => setColor(c.name)}
                className={cn(
                  "size-9 rounded-full border-2 transition",
                  selected
                    ? "border-ovo-blue"
                    : "border-ovo-border hover:border-ovo-muted",
                )}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </div>

      {storage && storage.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ovo-muted">
            容量 — <span className="text-ovo-text">{storageParam}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {storage.map((s) => {
              const selected = storageParam === s.label;
              return (
                <button
                  key={s.label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setStorage(s.label)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition",
                    selected
                      ? "border-ovo-blue bg-ovo-blue/10 text-ovo-text"
                      : "border-ovo-border text-ovo-muted hover:border-ovo-muted hover:text-ovo-text",
                  )}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

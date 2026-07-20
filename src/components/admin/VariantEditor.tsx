"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FieldDef = {
  key: string;
  label: string;
  type?: string;
  placeholder?: string;
};

type VariantEditorProps = {
  label: string;
  fields: FieldDef[];
  initialItems?: Record<string, string>[];
  onChange: (items: Record<string, string>[]) => void;
};

export function VariantEditor({
  label,
  fields,
  initialItems = [],
  onChange,
}: VariantEditorProps) {
  const [items, setItems] = useState<Record<string, string>[]>(initialItems);

  function addItem() {
    const empty: Record<string, string> = {};
    for (const f of fields) empty[f.key] = "";
    const next = [...items, empty];
    setItems(next);
    onChange(next);
  }

  function removeItem(index: number) {
    const next = items.filter((_, i) => i !== index);
    setItems(next);
    onChange(next);
  }

  function updateItem(index: number, key: string, value: string) {
    const next = items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    setItems(next);
    onChange(next);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-300">{label}</span>
        <Button type="button" variant="outline" size="sm" onClick={addItem} className="border-zinc-700 text-zinc-300">
          <Plus className="mr-1 h-3 w-3" />
          新增
        </Button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          {fields.map((f) => (
            <Input
              key={f.key}
              type={f.type || "text"}
              placeholder={f.placeholder || f.label}
              value={item[f.key] || ""}
              onChange={(e) => updateItem(i, f.key, e.target.value)}
              className="border-zinc-700 bg-zinc-800 text-zinc-100"
            />
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeItem(i)}
            className="shrink-0 text-zinc-500 hover:text-red-400"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-xs text-zinc-500">尚無項目</p>
      )}
    </div>
  );
}

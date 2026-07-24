"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { ActionState } from "@/lib/actions/tile-actions";
import type { TileRow } from "@/lib/dal/tiles";

const CATEGORIES = [
  { value: "wood", label: "木紋" },
  { value: "luxury", label: "奢華" },
  { value: "minimal", label: "極簡" },
  { value: "concrete", label: "仿清水" },
  { value: "vintage", label: "復古" },
  { value: "subway", label: "地鐵" },
  { value: "hexagon", label: "六角" },
];

const FINISHES = ["霧面", "亮面", "紋路"];

interface TileFormProps {
  tile?: TileRow;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
}

export function TileForm({ tile, action, submitLabel }: TileFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-5">
      {tile && <input type="hidden" name="id" value={tile.id} />}

      {state?.error && (
        <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Field label="Slug" name="slug" defaultValue={tile?.slug} error={state?.fieldErrors?.slug?.[0]} required />
        <Field label="名稱" name="name" defaultValue={tile?.name} error={state?.fieldErrors?.name?.[0]} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="category" className="text-zinc-300">類別 *</Label>
          <select
            id="category"
            name="category"
            defaultValue={tile?.category ?? "wood"}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="finish" className="text-zinc-300">表面處理 *</Label>
          <select
            id="finish"
            name="finish"
            defaultValue={tile?.finish ?? "霧面"}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100"
          >
            {FINISHES.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="尺寸" name="size" placeholder="60x60 cm" defaultValue={tile?.size} error={state?.fieldErrors?.size?.[0]} required />
        <Field label="產地" name="origin" placeholder="義大利" defaultValue={tile?.origin} error={state?.fieldErrors?.origin?.[0]} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="價格 / 坪 (NT$)" name="price" type="number" defaultValue={String(tile?.price ?? "")} error={state?.fieldErrors?.price?.[0]} required />
        <Field label="排序" name="sortOrder" type="number" defaultValue={String(tile?.sortOrder ?? 0)} />
      </div>

      <Field label="圖片 URL" name="image" defaultValue={tile?.image} error={state?.fieldErrors?.image?.[0]} required />

      <div className="flex items-center gap-2">
        <input
          id="featured"
          type="checkbox"
          name="featured"
          defaultChecked={tile?.featured ?? false}
          className="h-4 w-4 rounded border-zinc-600"
        />
        <Label htmlFor="featured" className="text-zinc-300 cursor-pointer">設為精選</Label>
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "處理中…" : submitLabel}
      </Button>
    </form>
  );
}

function Field({
  label, name, type = "text", placeholder, defaultValue, error, required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-zinc-300">
        {label} {required && "*"}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        className="border-zinc-700 bg-zinc-800 text-zinc-100"
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

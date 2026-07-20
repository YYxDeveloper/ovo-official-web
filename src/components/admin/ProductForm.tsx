"use client";

import { useActionState, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { VariantEditor } from "./VariantEditor";
import { ImageUploader } from "./ImageUploader";
import type { ActionState } from "@/lib/actions/product-actions";

type ProductData = {
  id?: number;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  basePrice: number;
  featured: boolean;
  heroImage: string | null;
  sortOrder: number;
  colors: { name: string; hex: string; imageUrl: string }[];
  storage: { label: string; priceAdd: number }[];
  specs: { label: string; value: string }[];
  images: { url: string }[];
};

type ProductFormProps = {
  product?: ProductData;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
};

export function ProductForm({ product, action, submitLabel }: ProductFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  const [colors, setColors] = useState(
    product?.colors.map((c) => ({
      name: c.name,
      hex: c.hex,
      imageUrl: c.imageUrl,
    })) ?? [],
  );
  const [storage, setStorage] = useState(
    product?.storage.map((s) => ({
      label: s.label,
      priceAdd: String(s.priceAdd),
    })) ?? [],
  );
  const [specs, setSpecs] = useState(
    product?.specs.map((s) => ({ label: s.label, value: s.value })) ?? [],
  );
  const [images, setImages] = useState(
    product?.images.map((img) => img.url) ?? [],
  );
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [category, setCategory] = useState(product?.category ?? "phone");

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      {product?.id && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="colors" value={JSON.stringify(colors)} />
      <input
        type="hidden"
        name="storage"
        value={JSON.stringify(
          storage.map((s) => ({ label: s.label, priceAdd: Number(s.priceAdd) })),
        )}
      />
      <input type="hidden" name="specs" value={JSON.stringify(specs)} />
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <input type="hidden" name="featured" value={featured ? "on" : ""} />
      <input type="hidden" name="category" value={category} />

      {state?.error && (
        <div className="rounded-md border border-red-800 bg-red-950/50 p-3 text-sm text-red-300">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-zinc-300">產品名稱</Label>
          <Input
            name="name"
            defaultValue={product?.name}
            className="border-zinc-700 bg-zinc-800 text-zinc-100"
          />
          {state?.fieldErrors?.name && (
            <p className="text-xs text-red-400">{state.fieldErrors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">Slug</Label>
          <Input
            name="slug"
            defaultValue={product?.slug}
            placeholder="ovo-phone-17"
            className="border-zinc-700 bg-zinc-800 text-zinc-100"
          />
          {state?.fieldErrors?.slug && (
            <p className="text-xs text-red-400">{state.fieldErrors.slug[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">標語</Label>
          <Input
            name="tagline"
            defaultValue={product?.tagline}
            className="border-zinc-700 bg-zinc-800 text-zinc-100"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">分類</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="border-zinc-700 bg-zinc-800 text-zinc-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-zinc-700 bg-zinc-800">
              <SelectItem value="phone">手機</SelectItem>
              <SelectItem value="watch">手錶</SelectItem>
              <SelectItem value="buds">耳機</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">基本價格 (NT$)</Label>
          <Input
            name="basePrice"
            type="number"
            defaultValue={product?.basePrice}
            className="border-zinc-700 bg-zinc-800 text-zinc-100"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">排序</Label>
          <Input
            name="sortOrder"
            type="number"
            defaultValue={product?.sortOrder ?? 0}
            className="border-zinc-700 bg-zinc-800 text-zinc-100"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">Hero 圖片 URL</Label>
          <Input
            name="heroImage"
            defaultValue={product?.heroImage ?? ""}
            className="border-zinc-700 bg-zinc-800 text-zinc-100"
          />
        </div>

        <div className="flex items-center gap-3 pt-6">
          <Switch
            checked={featured}
            onCheckedChange={setFeatured}
          />
          <Label className="text-zinc-300">精選產品</Label>
        </div>
      </div>

      <hr className="border-zinc-800" />

      <VariantEditor
        label="顏色"
        fields={[
          { key: "name", label: "名稱", placeholder: "鈦黑色" },
          { key: "hex", label: "色碼", placeholder: "#1d1d1f" },
          { key: "imageUrl", label: "圖片 URL" },
        ]}
        initialItems={colors}
        onChange={(items) => setColors(items as typeof colors)}
      />

      <hr className="border-zinc-800" />

      <VariantEditor
        label="儲存容量"
        fields={[
          { key: "label", label: "容量", placeholder: "256GB" },
          { key: "priceAdd", label: "加價", type: "number", placeholder: "0" },
        ]}
        initialItems={storage}
        onChange={(items) => setStorage(items as typeof storage)}
      />

      <hr className="border-zinc-800" />

      <VariantEditor
        label="規格"
        fields={[
          { key: "label", label: "規格名", placeholder: "顯示器" },
          { key: "value", label: "規格值", placeholder: '6.1 吋 Super Retina XDR' },
        ]}
        initialItems={specs}
        onChange={(items) => setSpecs(items as typeof specs)}
      />

      <hr className="border-zinc-800" />

      <ImageUploader initialImages={images} onChange={setImages} />

      <div className="flex justify-end gap-3 pt-4">
        <Button type="submit" disabled={pending}>
          {pending ? "儲存中..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

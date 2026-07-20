"use client";

import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ImageUploaderProps = {
  initialImages?: string[];
  onChange: (images: string[]) => void;
};

export function ImageUploader({ initialImages = [], onChange }: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function removeImage(index: number) {
    const next = images.filter((_, i) => i !== index);
    setImages(next);
    onChange(next);
  }

  function addUrl(url: string) {
    if (!url) return;
    const next = [...images, url];
    setImages(next);
    onChange(next);
  }

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.url) addUrl(data.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <span className="text-sm font-medium text-zinc-300">圖片</span>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((url, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-md border border-zinc-700 bg-zinc-800">
            <Image
              src={url}
              alt={`圖片 ${i + 1}`}
              fill
              className="object-cover"
              sizes="150px"
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-3 w-3 text-white" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="輸入圖片 URL..."
          className="border-zinc-700 bg-zinc-800 text-zinc-100"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addUrl(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="shrink-0 border-zinc-700 text-zinc-300"
        >
          <Upload className="mr-1 h-3 w-3" />
          {uploading ? "上傳中..." : "上傳"}
        </Button>
      </div>
    </div>
  );
}

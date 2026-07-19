export interface PixelColor {
  name: string;
  hex: string;
  imageUrl: string;
}

export interface PixelSpec {
  label: string;
  value: string;
}

export interface PixelProduct {
  id: string;
  name: string;
  tagline: string;
  basePrice: number;
  colors: PixelColor[];
  specs: PixelSpec[];
  heroImage: string;
  featured?: boolean;
}

const pixelColors: Record<string, PixelColor> = {
  obsidian: {
    name: "Obsidian",
    hex: "#1a1a1a",
    imageUrl: "https://picsum.photos/seed/pixel9-obsidian/800/800",
  },
  porcelain: {
    name: "Porcelain",
    hex: "#ede8e2",
    imageUrl: "https://picsum.photos/seed/pixel9-porcelain/800/800",
  },
  hazel: {
    name: "Hazel",
    hex: "#7c8c6e",
    imageUrl: "https://picsum.photos/seed/pixel9-hazel/800/800",
  },
  roseQuartz: {
    name: "Rose Quartz",
    hex: "#e8c4c4",
    imageUrl: "https://picsum.photos/seed/pixel9-rose/800/800",
  },
};

export const pixelProducts: PixelProduct[] = [
  {
    id: "pixel-9",
    name: "Pixel 9",
    tagline: "The Google phone. Reimagined.",
    basePrice: 799,
    colors: [
      pixelColors.obsidian,
      pixelColors.porcelain,
      pixelColors.hazel,
      pixelColors.roseQuartz,
    ],
    specs: [
      { label: "Display", value: "6.3\" Actua display, 60-120 Hz" },
      { label: "Chip", value: "Google Tensor G4" },
      { label: "Camera", value: "50 MP main + 10.5 MP ultrawide" },
      { label: "Battery", value: "Up to 24 hours, Extreme Battery Saver 100 hrs" },
      { label: "RAM", value: "12 GB LPDDR5X" },
      { label: "Water resistance", value: "IP68" },
    ],
    heroImage: "https://picsum.photos/seed/pixel9-hero/1600/900",
    featured: false,
  },
  {
    id: "pixel-9-pro",
    name: "Pixel 9 Pro",
    tagline: "Pro photography. Pro AI. Pro everything.",
    basePrice: 999,
    colors: [
      pixelColors.obsidian,
      pixelColors.porcelain,
      pixelColors.hazel,
      pixelColors.roseQuartz,
    ],
    specs: [
      { label: "Display", value: "6.3\" Super Actua display, 1-120 Hz LTPO" },
      { label: "Chip", value: "Google Tensor G4" },
      { label: "Camera", value: "50 MP main + 48 MP ultrawide + 48 MP telephoto" },
      { label: "Battery", value: "Up to 24 hours, Extreme Battery Saver 100 hrs" },
      { label: "RAM", value: "16 GB LPDDR5X" },
      { label: "Water resistance", value: "IP68" },
    ],
    heroImage: "https://picsum.photos/seed/pixel9pro-hero/1600/900",
    featured: true,
  },
  {
    id: "pixel-9-pro-xl",
    name: "Pixel 9 Pro XL",
    tagline: "Bigger screen. Bigger battery. Bigger AI.",
    basePrice: 1099,
    colors: [
      pixelColors.obsidian,
      pixelColors.porcelain,
      pixelColors.hazel,
      pixelColors.roseQuartz,
    ],
    specs: [
      { label: "Display", value: "6.8\" Super Actua display, 1-120 Hz LTPO" },
      { label: "Chip", value: "Google Tensor G4" },
      { label: "Camera", value: "50 MP main + 48 MP ultrawide + 48 MP telephoto" },
      { label: "Battery", value: "Up to 31 hours, Extreme Battery Saver 100 hrs" },
      { label: "RAM", value: "16 GB LPDDR5X" },
      { label: "Water resistance", value: "IP68" },
    ],
    heroImage: "https://picsum.photos/seed/pixel9proxl-hero/1600/900",
    featured: false,
  },
];

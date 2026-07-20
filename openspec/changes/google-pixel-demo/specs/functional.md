# Functional Specification: Google Pixel Demo Page

## Page Structure

### 1. Brand Bar
- Google G SVG logo (multicolor: #4285F4 / #EA4335 / #FBBC05 / #34A853)
- "Google Store" text label
- Four colored dots accent bar (same brand palette)
- Full-width, white background, bottom border

### 2. Hero Section (`bg-gray-50`)
- Eyebrow label: "Pixel 9 Series"
- H1: product name (Pixel 9 Pro)
- Subheadline: tagline
- Color picker: 4 swatches (Obsidian / Porcelain / Hazel / Rose Quartz)
  - Selected swatch: 1.15× scale + `#1a73e8` border
  - Selected color name shown as label
  - Product image updates on swatch click (`useState`)
- Price: "From $999"
- CTA buttons: "Buy" (blue fill) + "Learn more" (ghost)

### 3. Product Grid
- Heading: "Find the Pixel for you"
- 3-column responsive grid (1-col mobile → 3-col md+)
- Each card:
  - Product image (updates with color picker)
  - Name + tagline
  - Color picker (independent `useState` per card)
  - Top 3 specs list
  - Price + "Buy" button

### 4. Footer Tagline
- `bg-gray-50`, centered
- "Google" spelled in 6 letters, each in brand color
- Subline: "Built with Google AI. Made for your life."

## Data Model

```ts
interface PixelColor  { name: string; hex: string; imageUrl: string }
interface PixelSpec   { label: string; value: string }
interface PixelProduct {
  id: string; name: string; tagline: string;
  basePrice: number; colors: PixelColor[]; specs: PixelSpec[];
  heroImage: string; featured?: boolean;
}
```

## Products

| Model | Price | Featured |
|-------|-------|---------|
| Pixel 9 | $799 | No |
| Pixel 9 Pro | $999 | Yes (Hero) |
| Pixel 9 Pro XL | $1,099 | No |

## Color Variants (all 3 models)

| Name | Hex |
|------|-----|
| Obsidian | `#1a1a1a` |
| Porcelain | `#ede8e2` |
| Hazel | `#7c8c6e` |
| Rose Quartz | `#e8c4c4` |

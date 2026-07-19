# Design Specification: Google Pixel Demo Page

## Visual Language

| Token | Value | Rationale |
|-------|-------|-----------|
| Background | `#ffffff` (`bg-white`) | Contrast with OVO dark theme |
| Hero bg | `#f9fafb` (`bg-gray-50`) | Soft lift for hero section |
| Primary text | `#111827` (`text-gray-900`) | Google Store body text |
| Secondary text | `#6b7280` (`text-gray-500`) | Labels, captions |
| Muted text | `#9ca3af` (`text-gray-400`) | Spec labels, eyebrows |
| Border | `#e5e7eb` (`border-gray-200`) | Card borders |
| Brand Blue | `#4285F4` | Buy CTA, links, active color picker ring |
| Brand Red | `#EA4335` | Logo, accent |
| Brand Yellow | `#FBBC04` | Logo, accent |
| Brand Green | `#34A853` | Logo, accent |

## Component Visual Rules

### Color Picker Swatch
- Size: 28×28px (`h-7 w-7`)
- Shape: full circle
- Border: 2px solid `#dadce0` (inactive) / `#1a73e8` (active)
- Scale: `1.0` inactive → `1.15` active (CSS transform)
- Transition: all properties 150ms

### Product Card
- Border radius: `rounded-3xl` (24px)
- Border: 1px solid `#e5e7eb`
- Background: white
- Hover: `shadow-lg` transition
- Image: `rounded-2xl`, `object-cover`, `h-56 w-full`

### CTA Buttons
- Fill (Buy): `bg-[#4285F4]`, `text-white`, `rounded-full`, `px-8 py-3`
- Ghost (Learn more): `border border-gray-300`, `text-[#1a73e8]`, `rounded-full`, hover `bg-gray-100`
- Card Buy: `px-5 py-2`, same fill style

## Layout

### Desktop (≥ 768px)
- Max content width: 1280px centered
- Hero: 2-column grid (text left, image right), `py-24`
- Product grid: 3 columns, `gap-6`

### Mobile (< 768px)
- Hero: stacked (text above image), `py-16`
- Product grid: 1 column

## Contrast with OVO Theme

| Dimension | OVO Pages | Google Demo |
|-----------|-----------|-------------|
| Background | `#0a0a0a` (near-black) | `#ffffff` (white) |
| Text | `#f5f5f7` (near-white) | `#111827` (near-black) |
| Card bg | Dark translucent | White with gray border |
| Accent color | OVO orange/gold | Google brand palette |
| Border radius | Sharp/medium | `rounded-3xl` (pill-style) |

# Google Page Refactor Spec

### Requirement: GoogleLogo component

**File:** `src/components/google/GoogleLogo.tsx`

Extract the multi-color SVG G logo from `google/page.tsx` lines 16-25.

**Props:** `{ className?: string }`

**Note:** Keep the exact SVG paths — do not simplify or replace with an img tag.

---

### Requirement: GoogleColorPicker component

**File:** `src/components/google/GoogleColorPicker.tsx`

Extract from `google/page.tsx` lines 29-56.

**Props:**
```ts
interface GoogleColorPickerProps {
  colors: { name: string; hex: string }[]
  selected: string
  onChange: (color: string) => void
}
```

**Behavior:** Circular color swatches with selected ring indicator. State is lifted — component is controlled (no internal state).

---

### Requirement: GoogleHeroSection component

**File:** `src/components/google/GoogleHeroSection.tsx`

Extract from `google/page.tsx` lines 58-112.

**Props:**
```ts
interface GoogleHeroSectionProps {
  selectedColor: string
  colors: { name: string; hex: string }[]
  onColorChange: (color: string) => void
}
```

**Behavior:** Full hero with background gradient, device image (changes with selectedColor), headline, tagline, and GoogleColorPicker embedded.

---

### Requirement: Slim page.tsx

**File:** `src/app/(frontend)/google/page.tsx`

After extraction, page.tsx should only:
1. Define product/color data constants
2. Manage `selectedColor` state (useState)
3. Import and compose `GoogleHeroSection` + `GoogleProductCard`

Target: ≤ 40 lines.

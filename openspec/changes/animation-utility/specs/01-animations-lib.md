# Animation Utility Spec

### Requirement: animations.ts shared utility

**File:** `src/lib/animations.ts`

**Exports:**

```ts
// Stagger container factory
export function staggerContainer(options?: {
  staggerChildren?: number  // default: 0.1
  delayChildren?: number    // default: 0
}): Variants

// Fade-up item factory
export function fadeUpItem(options?: {
  y?: number        // default: 24
  duration?: number // default: 0.6
  ease?: string     // default: "easeOut"
}): Variants

// Scale hover — use as whileHover prop directly
export const scaleOnHover: { scale: number } // { scale: 1.03 }
```

**Usage pattern:**
```ts
import { staggerContainer, fadeUpItem } from "@/lib/animations"

const container = staggerContainer({ staggerChildren: 0.12 })
const item = fadeUpItem({ y: 32 })
```

---

### Requirement: Update HeroBanner, FeaturedProducts, CategoryCards

Each file should:
1. Remove local `container`/`item`/`card` variant definitions
2. Import `staggerContainer` and `fadeUpItem` from `@/lib/animations`
3. Use factory calls with same parameters as previous inline definitions to preserve identical behavior

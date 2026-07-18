# Spec 03 — Data Layer

## Types (src/data/types.ts)

```typescript
interface ColorVariant { name: string; hex: string; imageUrl: string }
interface StorageVariant { label: string; priceAdd: number }
interface ProductSpec { label: string; value: string }
interface Product {
  id: string; slug: string; name: string; tagline: string;
  category: 'phone' | 'watch' | 'buds';
  basePrice: number; colors: ColorVariant[]; storage?: StorageVariant[];
  specs: ProductSpec[]; images: string[]; featured?: boolean;
}
```

## Products

### ovo Phone (3 models)
| Model | Tagline | Base Price |
|---|---|---|
| ovo Phone 17 | 速度的新定義 | NT$29,900 |
| ovo Phone 17 Pro | 專業，從鏡頭開始 | NT$35,900 |
| ovo Phone 17 Air | 輕薄至極，效能依舊 | NT$32,900 |

Each: 4 colors, 3 storage options (128GB / 256GB / 512GB)

### ovo Watch (2 models)
| Model | Tagline | Base Price |
|---|---|---|
| ovo Watch Ultra | 極限挑戰者的選擇 | NT$28,900 |
| ovo Watch S | 優雅，精準，全天候 | NT$13,900 |

### ovo Buds (2 models)
| Model | Tagline | Base Price |
|---|---|---|
| ovo Buds Pro | 沉浸在聲音的世界 | NT$7,490 |
| ovo Buds Air | 輕盈自在，隨時連線 | NT$4,490 |

## Image Sources
- Unsplash: `https://images.unsplash.com/photo-**`
- Picsum: `https://picsum.photos/`

## Acceptance Criteria
- [ ] All 7 products exported from `src/data/products.ts`
- [ ] TypeScript strict mode passes
- [ ] `next.config.ts` allows Unsplash + Picsum remote patterns

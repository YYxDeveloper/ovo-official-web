# ovo Official Website — API Reference

## Routes

### Frontend Routes

| Route | Method | Description |
|---|---|---|
| `/` | GET | Home — HeroBanner + FeaturedProducts + CategoryCards |
| `/products` | GET | All products listing |
| `/products/[category]` | GET | Category page (phone/watch/buds) |
| `/products/[category]/[slug]` | GET | Product detail (gallery + variants + specs) |
| `/compare` | GET | Side-by-side comparison (max 3 products) |
| `/google` | GET | Google Pixel demo page |

### Admin Routes

| Route | Method | Auth | Description |
|---|---|---|---|
| `/admin/login` | GET | No | Login form |
| `/admin` | GET | Yes | Product dashboard (tabbed by category) |
| `/admin/products/new` | GET | Yes | Create product form |
| `/admin/products/[id]` | GET | Yes | Edit product form |
| `/admin/products/[id]/delete` | GET | Yes | Delete confirmation |

### API Endpoints

#### `POST /api/upload`

Upload an image file to the server.

**Auth**: Required (JWT cookie)

**Request**: `multipart/form-data`
- `file`: Image file (jpg/png/webp, max 5MB)

**Response**:
```json
{ "url": "/uploads/550e8400-e29b-41d4-a716-446655440000.jpg" }
```

**Errors**:
- `401` — Not authenticated
- `400` — No file / invalid type / exceeds 5MB

## Server Actions

All Server Actions verify session before executing.

### Auth Actions (`src/lib/auth/actions.ts`)

| Action | Input | Result |
|---|---|---|
| `loginAction(prevState, formData)` | `password: string` | Redirect to `/admin` or `{ error }` |
| `logoutAction()` | — | Redirect to `/admin/login` |

### Product Actions (`src/lib/actions/product-actions.ts`)

| Action | Input | Result |
|---|---|---|
| `createProductAction(prevState, formData)` | Product form fields | Redirect to `/admin` or `{ error, fieldErrors }` |
| `updateProductAction(prevState, formData)` | Product form fields + `id` | Redirect to `/admin` or `{ error, fieldErrors }` |
| `deleteProductAction(formData)` | `id: string` | Redirect to `/admin` |
| `toggleFeaturedAction(formData)` | `id: string` | Revalidates `/admin` |

### Form Data Fields

Product form sends these fields:

| Field | Type | Required |
|---|---|---|
| `slug` | string (lowercase, alphanumeric + hyphens) | Yes |
| `name` | string | Yes |
| `tagline` | string | Yes |
| `category` | `phone` \| `watch` \| `buds` | Yes |
| `basePrice` | number (positive integer) | Yes |
| `featured` | `"on"` \| absent | No |
| `heroImage` | string (URL) | No |
| `sortOrder` | number | No (default 0) |
| `colors` | JSON string (array) | Yes (min 1) |
| `storage` | JSON string (array) | No |
| `specs` | JSON string (array) | Yes (min 1) |
| `images` | JSON string (array) | Yes (min 1) |

## DAL Functions (`src/lib/dal/products.ts`)

Server-only data access layer.

| Function | Returns | Description |
|---|---|---|
| `getAllProducts()` | `Product[]` | All products, ordered by sortOrder |
| `getProductsByCategory(category)` | `Product[]` | Products filtered by category |
| `getProductBySlug(slug)` | `Product \| null` | Single product by slug |
| `getFeaturedProducts()` | `Product[]` | Products where `featured=true` |
| `getProductById(id)` | `PrismaProduct \| null` | Raw Prisma model (admin use) |
| `createProduct(data)` | `Product` | Create with nested relations |
| `updateProduct(id, data)` | `Product` | Full replace of nested relations |
| `deleteProduct(id)` | `void` | Cascade deletes all relations |

## Data Types (`src/data/types.ts`)

```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  basePrice: number;
  featured: boolean;
  heroImage?: string;
  colors: ColorVariant[];
  storage: StorageVariant[];
  specs: ProductSpec[];
  images: string[];
}

type ProductCategory = "phone" | "watch" | "buds";

interface ColorVariant {
  name: string;
  hex: string;
  image: string;
}

interface StorageVariant {
  label: string;
  priceAdd: number;
}

interface ProductSpec {
  label: string;
  value: string;
}
```

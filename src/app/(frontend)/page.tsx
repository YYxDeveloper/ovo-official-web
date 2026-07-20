import { getAllProducts, getFeaturedProducts } from "@/data/products";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryCards } from "@/components/home/CategoryCards";

export default async function HomePage() {
  const [allProducts, featured] = await Promise.all([
    getAllProducts(),
    getFeaturedProducts(),
  ]);
  const hero = allProducts.find((p) => p.featured) ?? allProducts[0];
  return (
    <>
      <HeroBanner product={hero} />
      <FeaturedProducts products={featured.slice(0, 3)} />
      <CategoryCards />
    </>
  );
}

import { allProducts } from "@/data/products";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryCards } from "@/components/home/CategoryCards";

export default function HomePage() {
  const hero = allProducts.find((p) => p.featured) ?? allProducts[0];
  return (
    <>
      <HeroBanner product={hero} />
      <FeaturedProducts />
      <CategoryCards />
    </>
  );
}

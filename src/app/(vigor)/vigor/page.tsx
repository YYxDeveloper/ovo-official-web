import { getActiveSlides } from "@/data/vigor";
import { getActiveServices } from "@/data/vigor";
import { getActivePartners } from "@/data/vigor";
import { VigorHeroCarousel } from "@/components/vigor/VigorHeroCarousel";
import { VigorServiceGrid } from "@/components/vigor/VigorServiceGrid";
import { VigorDownloadSection } from "@/components/vigor/VigorDownloadSection";
import { VigorPartnerMarquee } from "@/components/vigor/VigorPartnerMarquee";

export default async function VigorHomePage() {
  const [slides, services, partners] = await Promise.all([
    getActiveSlides(),
    getActiveServices(),
    getActivePartners(),
  ]);

  return (
    <>
      <h1 className="sr-only">Vigor 躍齡 — 樂齡生活平台</h1>

      {slides.length > 0 && <VigorHeroCarousel slides={slides} />}

      <VigorServiceGrid services={services} />

      <VigorDownloadSection />

      <VigorPartnerMarquee partners={partners} />
    </>
  );
}

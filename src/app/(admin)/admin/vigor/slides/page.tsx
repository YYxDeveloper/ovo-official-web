import { SlideTable } from "@/components/admin/vigor/SlideTable";
import { getActiveSlides } from "@/data/vigor";

export default async function AdminVigorSlidesPage() {
  const slides = await getActiveSlides();
  return <SlideTable slides={slides} />;
}

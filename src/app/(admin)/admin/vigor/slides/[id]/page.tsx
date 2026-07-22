import { notFound } from "next/navigation";
import { getSlideById } from "@/data/vigor";
import { SlideForm } from "@/components/admin/vigor/SlideForm";

export default async function EditSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = await getSlideById(Number(id));
  if (!slide) notFound();
  return <SlideForm slide={slide} />;
}

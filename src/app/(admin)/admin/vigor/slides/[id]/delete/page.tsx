import { notFound } from "next/navigation";
import { getSlideById } from "@/data/vigor";
import { VigorDeleteFormClient } from "@/components/admin/vigor/VigorDeleteFormClient";
import { deleteSlideAction } from "@/lib/actions/vigor-slide-actions";

export default async function DeleteSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = await getSlideById(Number(id));
  if (!slide) notFound();
  return (
    <VigorDeleteFormClient
      title="輪播"
      itemName={slide.title}
      backHref="/admin/vigor/slides"
      action={deleteSlideAction}
    />
  );
}

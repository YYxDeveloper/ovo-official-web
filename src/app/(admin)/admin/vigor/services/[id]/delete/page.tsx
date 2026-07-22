import { notFound } from "next/navigation";
import { getServiceById } from "@/data/vigor";
import { VigorDeleteFormClient } from "@/components/admin/vigor/VigorDeleteFormClient";
import { deleteServiceAction } from "@/lib/actions/vigor-service-actions";

export default async function DeleteServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(Number(id));
  if (!service) notFound();
  return (
    <VigorDeleteFormClient
      title="服務"
      itemName={service.name}
      backHref="/admin/vigor/services"
      action={deleteServiceAction}
    />
  );
}

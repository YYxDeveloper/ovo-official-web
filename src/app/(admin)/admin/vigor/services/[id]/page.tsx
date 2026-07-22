import { notFound } from "next/navigation";
import { getServiceById } from "@/data/vigor";
import { ServiceForm } from "@/components/admin/vigor/ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(Number(id));
  if (!service) notFound();
  return <ServiceForm service={service} />;
}

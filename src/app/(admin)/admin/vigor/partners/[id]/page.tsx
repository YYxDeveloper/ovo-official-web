import { notFound } from "next/navigation";
import { getPartnerById } from "@/data/vigor";
import { PartnerForm } from "@/components/admin/vigor/PartnerForm";

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = await getPartnerById(Number(id));
  if (!partner) notFound();
  return <PartnerForm partner={partner} />;
}

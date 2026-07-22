import { notFound } from "next/navigation";
import { getPartnerById } from "@/data/vigor";
import { VigorDeleteFormClient } from "@/components/admin/vigor/VigorDeleteFormClient";
import { deletePartnerAction } from "@/lib/actions/vigor-partner-actions";

export default async function DeletePartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = await getPartnerById(Number(id));
  if (!partner) notFound();
  return (
    <VigorDeleteFormClient
      title="夥伴"
      itemName={partner.name}
      backHref="/admin/vigor/partners"
      action={deletePartnerAction}
    />
  );
}

import { PartnerTable } from "@/components/admin/vigor/PartnerTable";
import { getActivePartners } from "@/data/vigor";

export default async function AdminVigorPartnersPage() {
  const partners = await getActivePartners();
  return <PartnerTable partners={partners} />;
}

import { ServiceTable } from "@/components/admin/vigor/ServiceTable";
import { getActiveServices } from "@/data/vigor";

export default async function AdminVigorServicesPage() {
  const services = await getActiveServices();
  return <ServiceTable services={services} />;
}

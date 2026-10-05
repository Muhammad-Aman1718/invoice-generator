import { Users } from "lucide-react";
import PageHeader from "@/src/components/ui/PageHeader";
import ClientsManager from "@/src/components/clients/ClientsManager";
import { getViewer, listClients, listInvoiceSummaries } from "@/src/lib/server/data";
import { attachClientStats } from "@/src/lib/clientStats";

export const metadata = { title: "Clients" };

export default async function ClientsPage() {
  const viewer = await getViewer();
  const [clients, invoices] = await Promise.all([listClients(viewer), listInvoiceSummaries(viewer)]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        icon={Users}
        title="Clients"
        description="Your saved customers, ready to drop into any invoice."
      />
      <ClientsManager
        clients={attachClientStats(clients, invoices, viewer.profile.defaultCurrency)}
        limit={viewer.plan.limits.clients}
      />
    </div>
  );
}

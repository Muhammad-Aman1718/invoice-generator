import { Users } from "lucide-react";
import { PageHeader } from "@/src/components/ui/page-header";
import { ClientsManager } from "@/src/components/dashboard/clients-manager";
import { getViewer, listClients, listInvoiceSummaries } from "@/src/lib/server/data";

export const metadata = { title: "Clients" };

export default async function ClientsPage() {
  const viewer = await getViewer();
  const [clients, invoices] = await Promise.all([listClients(viewer), listInvoiceSummaries(viewer)]);

  const withStats = clients.map((c) => {
    const mine = invoices.filter(
      (i) =>
        i.status !== "cancelled" &&
        (i.clientId === c.id ||
          (!i.clientId && i.clientName.trim().toLowerCase() === c.name.trim().toLowerCase())),
    );
    return {
      ...c,
      invoiceCount: mine.length,
      total: mine.reduce((sum, i) => sum + i.totalAmount, 0),
      currency: mine[0]?.currency ?? viewer.profile.defaultCurrency,
    };
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader icon={Users} title="Clients" description="Your saved customers, ready to drop into any invoice." />
      <ClientsManager clients={withStats} limit={viewer.plan.limits.clients} />
    </div>
  );
}

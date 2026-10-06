import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FilePlus2, Users } from "lucide-react";
import PageHeader from "@/src/components/ui/PageHeader";
import StatsCards from "@/src/components/dashboard/StatsCards";
import InvoiceList from "@/src/components/invoices/InvoiceList";
import ClientDetails from "@/src/components/clients/ClientDetails";
import { getClient, getViewer, listInvoiceSummaries } from "@/src/lib/server/data";
import { filterClientInvoices } from "@/src/lib/clientStats";
import { computeStats } from "@/src/lib/stats";
import { buildOverviewStatItems } from "@/src/lib/dashboardView";
import { ROUTES } from "@/src/constant/routes";
import type { ClientDetailPageProps } from "@/src/types/types";

export const metadata = { title: "Client" };

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = await params;
  const viewer = await getViewer();
  const [client, invoices] = await Promise.all([getClient(viewer, id), listInvoiceSummaries(viewer)]);
  if (!client) notFound();

  const clientInvoices = filterClientInvoices(invoices, client);
  const stats = computeStats(clientInvoices, { fallbackCurrency: viewer.profile.defaultCurrency });

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <Link
        href={ROUTES.clients}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-500 hover:text-navy"
      >
        <ArrowLeft size={14} aria-hidden="true" /> All clients
      </Link>
      <PageHeader
        refreshable
        icon={Users}
        title={client.name}
        description={client.email ?? "Saved client"}
        actions={
          <Link href={`${ROUTES.newInvoice}?client=${client.id}`} className="btn-primary">
            <FilePlus2 size={16} /> New invoice
          </Link>
        }
      />
      <StatsCards items={buildOverviewStatItems(stats, clientInvoices.length)} />
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <ClientDetails client={client} />
        <section aria-labelledby="clientInvoicesTitle" className="min-w-0">
          <h2 id="clientInvoicesTitle" className="mb-4 text-lg font-bold text-navy">
            Invoices
          </h2>
          <InvoiceList
            invoices={clientInvoices}
            canExportCsv={false}
            hideCsvExport
            pdfBranding={!viewer.plan.perks.removeBranding}
            earlyAccess={viewer.plan.perks.earlyAccess}
            senderName={viewer.profile.companyName || viewer.profile.fullName || ""}
          />
        </section>
      </div>
    </div>
  );
}

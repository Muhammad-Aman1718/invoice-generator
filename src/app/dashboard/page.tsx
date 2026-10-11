import Link from "next/link";
import { LayoutDashboard, Plus } from "lucide-react";
import PageHeader from "@/src/components/ui/PageHeader";
import StatsCards from "@/src/components/dashboard/StatsCards";
import RevenueChart from "@/src/components/dashboard/RevenueChart";
import SetupChecklist from "@/src/components/dashboard/SetupChecklist";
import TopClientsCard from "@/src/components/dashboard/TopClientsCard";
import RecentInvoices from "@/src/components/dashboard/RecentInvoices";
import { getViewer, listClients, listInvoiceSummaries } from "@/src/lib/server/data";
import { computeStats } from "@/src/lib/stats";
import { buildOverviewStatItems, buildSetupChecklist } from "@/src/lib/dashboardView";
import { OVERVIEW_TOP_CLIENTS, RECENT_INVOICES_LIMIT } from "@/src/constant/app";
import { ROUTES } from "@/src/constant/routes";

export const metadata = { title: "Overview" };

export default async function DashboardPage() {
  const viewer = await getViewer();
  const [invoices, clients] = await Promise.all([listInvoiceSummaries(viewer), listClients(viewer)]);
  const stats = computeStats(invoices, { fallbackCurrency: viewer.profile.defaultCurrency });
  const checklist = buildSetupChecklist({
    profile: viewer.profile,
    clientCount: clients.length,
    stats,
    invoiceCount: invoices.length,
  });
  const firstName = viewer.profile.fullName?.split(" ")[0];

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        refreshable
        icon={LayoutDashboard}
        title={firstName ? `Welcome back, ${firstName}` : "Overview"}
        description="Here's how your invoicing is going."
        actions={
          <Link href={ROUTES.newInvoice} className="btn-primary">
            <Plus size={16} /> New invoice
          </Link>
        }
      />
      <StatsCards items={buildOverviewStatItems(stats, invoices.length)} />
      {stats.mixedCurrencies && (
        <p className="-mt-2 text-xs font-medium text-navy-500">
          Totals are shown in {stats.currency}, your most-used currency. Invoices in other currencies are not
          converted.
        </p>
      )}
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="panel p-5 sm:p-6 lg:col-span-2" aria-labelledby="revenueTitle">
          <div className="mb-1 flex items-center justify-between">
            <h2 id="revenueTitle" className="text-base font-bold text-navy">
              Revenue, last 6 months
            </h2>
            <span className="text-xs font-bold text-navy-500">{stats.currency}</span>
          </div>
          <p className="mb-5 text-xs text-navy-500">
            By issue date, excluding drafts and cancelled invoices.
          </p>
          <RevenueChart data={stats.monthly} currency={stats.currency} />
        </section>
        {checklist.some((item) => !item.done) ? (
          <SetupChecklist items={checklist} />
        ) : (
          <TopClientsCard
            clients={stats.topClients.slice(0, OVERVIEW_TOP_CLIENTS)}
            currency={stats.currency}
          />
        )}
      </div>
      <RecentInvoices invoices={invoices.slice(0, RECENT_INVOICES_LIMIT)} />
    </div>
  );
}

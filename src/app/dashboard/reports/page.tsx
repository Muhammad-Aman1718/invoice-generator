import { BarChart3 } from "lucide-react";
import PageHeader from "@/src/components/ui/PageHeader";
import UpgradePrompt from "@/src/components/ui/UpgradePrompt";
import RevenueChart from "@/src/components/dashboard/RevenueChart";
import StatusBreakdown from "@/src/components/dashboard/StatusBreakdown";
import ReportRangeTabs from "@/src/components/reports/ReportRangeTabs";
import ReportKpis from "@/src/components/reports/ReportKpis";
import TopClientsTable from "@/src/components/reports/TopClientsTable";
import { getViewer, listInvoiceSummaries } from "@/src/lib/server/data";
import { computeStats } from "@/src/lib/stats";
import { buildReportKpis } from "@/src/lib/dashboardView";
import { countBillable, filterInvoicesByRange, parseReportRange } from "@/src/lib/reports";
import { REPORT_CHART_MONTHS } from "@/src/constant/app";
import { REPORT_RANGES } from "@/src/constant/reports";
import type { ReportsPageProps } from "@/src/types/types";

export const metadata = { title: "Reports" };

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const viewer = await getViewer();
  const header = (
    <PageHeader
      icon={BarChart3}
      title="Reports"
      description="Revenue trends, collection rate and top clients."
    />
  );

  if (viewer.plan.id === "free") {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        {header}
        <UpgradePrompt
          title="Reports are part of Pro"
          description="See 12-month revenue trends, your collection rate, average invoice value and best clients. Your Overview still shows the last 6 months for free."
        />
      </div>
    );
  }

  const range = parseReportRange((await searchParams).range);
  const allInvoices = await listInvoiceSummaries(viewer);
  const invoices = filterInvoicesByRange(allInvoices, range);
  const options = { fallbackCurrency: viewer.profile.defaultCurrency, monthCount: REPORT_CHART_MONTHS };
  const stats = computeStats(invoices, options);
  const trend = computeStats(allInvoices, options);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        refreshable
        icon={BarChart3}
        title="Reports"
        description={`${REPORT_RANGES[range].label} · amounts in ${stats.currency}`}
      />
      <ReportRangeTabs current={range} />
      <ReportKpis items={buildReportKpis(stats, countBillable(invoices, stats.currency))} />
      <section className="panel p-5 sm:p-6" aria-labelledby="trendTitle">
        <h2 id="trendTitle" className="mb-1 text-base font-bold text-navy">
          12-month trend
        </h2>
        <p className="mb-5 text-xs text-navy-500">Invoiced vs. paid by month of issue.</p>
        <RevenueChart data={trend.monthly} currency={trend.currency} />
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        <StatusBreakdown counts={stats.counts} total={invoices.length} />
        <TopClientsTable clients={stats.topClients} currency={stats.currency} />
      </div>
    </div>
  );
}

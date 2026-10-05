import Link from "next/link";
import { BarChart3, Lock, Sparkles } from "lucide-react";
import { PageHeader } from "@/src/components/ui/page-header";
import { RevenueChart } from "@/src/components/dashboard/revenue-chart";
import { STATUS_LABELS } from "@/src/components/ui/status-badge";
import { computeStats, getViewer, listInvoiceSummaries } from "@/src/lib/server/data";
import { formatCurrency } from "@/src/lib/invoice-utils";
import { cn } from "@/src/lib/utils";
import type { InvoiceStatus } from "@/src/types/invoice-types";

export const metadata = { title: "Reports" };

const RANGES = {
  "30d": { label: "Last 30 days", days: 30 },
  "90d": { label: "Last 90 days", days: 90 },
  "12m": { label: "Last 12 months", days: 365 },
  all: { label: "All time", days: null },
} as const;
type RangeKey = keyof typeof RANGES;

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const viewer = await getViewer();
  const { range: rawRange } = await searchParams;
  const range: RangeKey = rawRange && rawRange in RANGES ? (rawRange as RangeKey) : "12m";

  if (viewer.plan.id === "free") {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <PageHeader icon={BarChart3} title="Reports" description="Revenue trends, collection rate and top clients." />
        <div className="panel flex flex-col items-center p-10 text-center sm:p-16">
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15">
            <Lock className="text-gold-dark" size={24} />
          </span>
          <h2 className="mb-2 text-lg font-black text-navy">Reports are part of Pro</h2>
          <p className="mb-6 max-w-md text-sm text-navy-500">
            See 12-month revenue trends, your collection rate, average invoice value and best clients. Your
            Overview still shows the last 6 months for free.
          </p>
          <Link href="/dashboard/billing" className="btn-primary">
            <Sparkles size={15} /> Upgrade to Pro
          </Link>
        </div>
      </div>
    );
  }

  const all = await listInvoiceSummaries(viewer);
  const days = RANGES[range].days;
  const cutoff = days ? new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10) : null;
  const invoices = cutoff ? all.filter((i) => (i.issueDate || i.createdAt || "") >= cutoff) : all;

  const stats = computeStats(invoices, viewer.profile.defaultCurrency, 12);
  const trend = computeStats(all, viewer.profile.defaultCurrency, 12);
  const fmt = (n: number) => formatCurrency(n, stats.currency);
  const billable = invoices.filter((i) => i.status !== "cancelled" && i.status !== "draft" && i.currency === stats.currency);
  const avg = billable.length ? stats.totalInvoiced / billable.length : 0;
  const collection = stats.totalInvoiced ? Math.round((stats.totalPaid / stats.totalInvoiced) * 100) : 0;

  const kpis = [
    { label: "Invoiced", value: fmt(stats.totalInvoiced) },
    { label: "Collected", value: fmt(stats.totalPaid) },
    { label: "Collection rate", value: `${collection}%` },
    { label: "Average invoice", value: fmt(avg) },
  ];

  const statusRows = (["paid", "pending", "overdue", "draft", "cancelled"] as InvoiceStatus[]).map((s) => ({
    status: s,
    count: stats.counts[s] ?? 0,
  }));
  const totalCount = invoices.length || 1;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        icon={BarChart3}
        title="Reports"
        description={`${RANGES[range].label} · amounts in ${stats.currency}`}
      />

      <nav className="custom-scrollbar flex gap-1.5 overflow-x-auto pb-1" aria-label="Date range">
        {(Object.keys(RANGES) as RangeKey[]).map((key) => (
          <Link
            key={key}
            href={`/dashboard/reports?range=${key}`}
            aria-current={key === range ? "page" : undefined}
            className={cn(
              "flex-shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition",
              key === range ? "bg-navy text-white" : "bg-white text-navy-500 hover:text-navy",
            )}
          >
            {RANGES[key].label}
          </Link>
        ))}
      </nav>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="panel p-5">
            <p className="eyebrow mb-2">{k.label}</p>
            <p className="truncate text-xl font-black tabular-nums text-navy sm:text-2xl">{k.value}</p>
          </div>
        ))}
      </div>

      <section className="panel p-5 sm:p-6" aria-labelledby="trend-title">
        <h2 id="trend-title" className="mb-1 text-base font-black text-navy">
          12-month trend
        </h2>
        <p className="mb-5 text-xs text-navy-500">Invoiced vs. paid by month of issue.</p>
        <RevenueChart data={trend.monthly} currency={trend.currency} />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="panel p-5 sm:p-6" aria-labelledby="status-title">
          <h2 id="status-title" className="mb-4 text-base font-black text-navy">
            Invoices by status
          </h2>
          <ul className="space-y-3">
            {statusRows.map((row) => (
              <li key={row.status}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-semibold text-navy">{STATUS_LABELS[row.status]}</span>
                  <span className="tabular-nums text-navy-500">
                    {row.count} · {Math.round((row.count / totalCount) * 100)}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-mist">
                  <div className="h-full rounded-full bg-navy-400" style={{ width: `${(row.count / totalCount) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel overflow-hidden" aria-labelledby="clients-title">
          <h2 id="clients-title" className="px-5 pb-3 pt-5 text-base font-black text-navy sm:px-6">
            Top clients
          </h2>
          {stats.topClients.length === 0 ? (
            <p className="px-6 pb-6 text-sm text-navy-500">No billable invoices in this range.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-navy/5 bg-navy/[0.02] text-[10px] font-black uppercase tracking-widest text-navy-500">
                  <th className="px-5 py-2 text-left sm:px-6">Client</th>
                  <th className="px-3 py-2 text-right">Invoices</th>
                  <th className="px-5 py-2 text-right sm:px-6">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5">
                {stats.topClients.map((c) => (
                  <tr key={c.name}>
                    <td className="max-w-[160px] truncate px-5 py-2.5 font-semibold text-navy sm:px-6">{c.name}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-navy-500">{c.count}</td>
                    <td className="px-5 py-2.5 text-right font-black tabular-nums text-navy sm:px-6">{fmt(c.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}

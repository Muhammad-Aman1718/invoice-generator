import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  LayoutDashboard,
  Plus,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/src/components/ui/page-header";
import { StatsCards } from "@/src/components/dashboard/stats-cards";
import { RevenueChart } from "@/src/components/dashboard/revenue-chart";
import { StatusBadge } from "@/src/components/ui/status-badge";
import { computeStats, getViewer, listClients, listInvoiceSummaries } from "@/src/lib/server/data";
import { displayStatus } from "@/src/lib/mappers";
import { formatCurrency } from "@/src/lib/invoice-utils";

export const metadata = { title: "Overview" };

function shortDate(value?: string) {
  if (!value) return "—";
  const d = new Date(`${value.slice(0, 10)}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? value
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function DashboardPage() {
  const viewer = await getViewer();
  const [invoices, clients] = await Promise.all([listInvoiceSummaries(viewer), listClients(viewer)]);
  const stats = computeStats(invoices, viewer.profile.defaultCurrency);
  const fmt = (n: number) => formatCurrency(n, stats.currency);
  const firstName = viewer.profile.fullName?.split(" ")[0];

  const checklist = [
    { done: Boolean(viewer.profile.companyName), label: "Add your business details", href: "/dashboard/settings" },
    { done: clients.length > 0, label: "Save your first client", href: "/dashboard/clients" },
    { done: invoices.length > 0, label: "Create your first invoice", href: "/dashboard/invoices/new" },
    { done: stats.counts.paid > 0, label: "Mark an invoice as paid", href: "/dashboard/invoices" },
  ];
  const showChecklist = checklist.some((c) => !c.done);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        icon={LayoutDashboard}
        title={firstName ? `Welcome back, ${firstName}` : "Overview"}
        description="Here's how your invoicing is going."
        actions={
          <Link href="/dashboard/invoices/new" className="btn-primary">
            <Plus size={16} /> New invoice
          </Link>
        }
      />

      <StatsCards
        items={[
          {
            label: "Total invoiced",
            value: fmt(stats.totalInvoiced),
            hint: `${invoices.length} invoice${invoices.length === 1 ? "" : "s"}`,
            icon: TrendingUp,
          },
          { label: "Paid", value: fmt(stats.totalPaid), hint: `${stats.counts.paid} paid`, icon: CheckCircle2, tone: "green" },
          {
            label: "Outstanding",
            value: fmt(stats.outstanding),
            hint: `${stats.counts.pending + stats.counts.overdue} awaiting payment`,
            icon: Clock,
            tone: "amber",
          },
          {
            label: "Overdue",
            value: fmt(stats.overdue),
            hint: `${stats.counts.overdue} past due date`,
            icon: AlertTriangle,
            tone: "red",
          },
        ]}
      />
      {stats.mixedCurrencies && (
        <p className="-mt-2 text-xs font-medium text-navy-500">
          Totals are shown in {stats.currency}, your most-used currency. Invoices in other currencies are not converted.
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="panel p-5 sm:p-6 lg:col-span-2" aria-labelledby="revenue-title">
          <div className="mb-1 flex items-center justify-between">
            <h2 id="revenue-title" className="text-base font-black text-navy">
              Revenue — last 6 months
            </h2>
            <span className="text-xs font-bold text-navy-500">{stats.currency}</span>
          </div>
          <p className="mb-5 text-xs text-navy-500">By issue date, excluding drafts and cancelled invoices.</p>
          <RevenueChart data={stats.monthly} currency={stats.currency} />
        </section>

        {showChecklist ? (
          <section className="panel p-5 sm:p-6" aria-labelledby="setup-title">
            <h2 id="setup-title" className="mb-1 text-base font-black text-navy">
              Get set up
            </h2>
            <p className="mb-4 text-xs text-navy-500">
              {checklist.filter((c) => c.done).length} of {checklist.length} done
            </p>
            <ul className="space-y-2">
              {checklist.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy transition hover:bg-mist"
                  >
                    {item.done ? (
                      <CheckCircle2 size={18} className="flex-shrink-0 text-emerald-600" />
                    ) : (
                      <Circle size={18} className="flex-shrink-0 text-navy-300" />
                    )}
                    <span className={item.done ? "text-navy-400 line-through" : ""}>{item.label}</span>
                    {!item.done && <ArrowRight size={14} className="ml-auto text-navy-400" />}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="panel p-5 sm:p-6" aria-labelledby="top-clients-title">
            <h2 id="top-clients-title" className="mb-4 text-base font-black text-navy">
              Top clients
            </h2>
            <ul className="space-y-3">
              {stats.topClients.slice(0, 5).map((c, i) => (
                <li key={c.name} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-mist text-xs font-black text-navy">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-navy">{c.name}</p>
                    <p className="text-xs text-navy-500">{c.count} invoices</p>
                  </div>
                  <span className="text-sm font-black tabular-nums text-navy">{fmt(c.total)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <section className="panel overflow-hidden" aria-labelledby="recent-title">
        <div className="flex items-center justify-between border-b border-navy/5 px-5 py-4 sm:px-6">
          <h2 id="recent-title" className="text-base font-black text-navy">
            Recent invoices
          </h2>
          <Link href="/dashboard/invoices" className="flex items-center gap-1 text-xs font-black text-navy hover:underline">
            View all <ArrowRight size={13} />
          </Link>
        </div>
        {invoices.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <FileText className="text-navy-300" size={28} />
            <p className="text-sm text-navy-500">No invoices yet — your first one takes under a minute.</p>
            <Link href="/dashboard/invoices/new" className="btn-primary btn-sm">
              <Plus size={14} /> Create invoice
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-navy/5">
            {invoices.slice(0, 6).map((inv) => (
              <li key={inv.id}>
                <Link
                  href={`/dashboard/invoices/${inv.id}`}
                  className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-gold/[0.04] sm:px-6"
                >
                  <span className="w-14 flex-shrink-0 text-sm font-black text-navy">#{inv.invoiceNumber}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-navy">
                      {inv.clientName || "Unnamed client"}
                    </span>
                    <span className="block text-xs text-navy-500">Due {shortDate(inv.dueDate)}</span>
                  </span>
                  <StatusBadge status={displayStatus(inv.status, inv.dueDate)} className="hidden xs:inline-flex" />
                  <span className="w-28 text-right text-sm font-black tabular-nums text-navy">
                    {formatCurrency(inv.totalAmount, inv.currency)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

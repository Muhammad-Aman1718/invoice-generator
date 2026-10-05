import type { DashboardStats, InvoiceSummary, MonthBucket, TopClient } from "@/src/types/types";
import { EMPTY_STATUS_COUNTS, NON_BILLABLE_STATUSES } from "@/src/constant/invoice";
import { OVERVIEW_CHART_MONTHS, TOP_CLIENTS_LIMIT } from "@/src/constant/app";
import { getDisplayStatus } from "@/src/lib/invoiceCalculations";

/** The currency used on the most invoices (amounts are never converted). */
export function getMainCurrency(invoices: InvoiceSummary[], fallback: string): string {
  const counts = new Map<string, number>();
  invoices.forEach((inv) => counts.set(inv.currency, (counts.get(inv.currency) ?? 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? fallback;
}

export function createMonthBuckets(monthCount: number, now = new Date()): MonthBucket[] {
  return Array.from({ length: monthCount }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (monthCount - 1 - index), 1);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return {
      key: `${date.getFullYear()}-${month}`,
      label: date.toLocaleString("en-US", { month: "short" }),
      invoiced: 0,
      paid: 0,
    };
  });
}

function addToClient(clients: Map<string, TopClient>, name: string, amount: number) {
  const current = clients.get(name) ?? { name, total: 0, count: 0 };
  clients.set(name, { name, total: current.total + amount, count: current.count + 1 });
}

/**
 * Aggregate KPIs in the main currency. Drafts and cancelled invoices are
 * counted by status but excluded from money totals.
 */
export function computeStats(
  invoices: InvoiceSummary[],
  options: { fallbackCurrency: string; monthCount?: number },
): DashboardStats {
  const currency = getMainCurrency(invoices, options.fallbackCurrency);
  const months = createMonthBuckets(options.monthCount ?? OVERVIEW_CHART_MONTHS);
  const counts = { ...EMPTY_STATUS_COUNTS };
  const clients = new Map<string, TopClient>();
  const totals = { totalInvoiced: 0, totalPaid: 0, outstanding: 0, overdue: 0 };

  for (const invoice of invoices) {
    const status = getDisplayStatus(invoice.status, invoice.dueDate);
    counts[status] += 1;
    if (invoice.currency !== currency || NON_BILLABLE_STATUSES.includes(status)) continue;

    const amount = invoice.totalAmount;
    const isPaid = status === "paid";
    totals.totalInvoiced += amount;
    totals[isPaid ? "totalPaid" : "outstanding"] += amount;
    if (status === "overdue") totals.overdue += amount;

    const bucket = months.find((m) => m.key === (invoice.issueDate || invoice.createdAt || "").slice(0, 7));
    if (bucket) {
      bucket.invoiced += amount;
      if (isPaid) bucket.paid += amount;
    }
    addToClient(clients, invoice.clientName?.trim() || "Unnamed client", amount);
  }

  return {
    currency,
    ...totals,
    counts,
    monthly: months.map(({ label, invoiced, paid }) => ({ label, invoiced, paid })),
    topClients: [...clients.values()].sort((a, b) => b.total - a.total).slice(0, TOP_CLIENTS_LIMIT),
    mixedCurrencies: new Set(invoices.map((i) => i.currency)).size > 1,
  };
}

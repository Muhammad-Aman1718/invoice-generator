import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import {
  INVOICE_SUMMARY_COLUMNS,
  displayStatus,
  rowToClient,
  rowToInvoiceSummary,
} from "@/src/lib/mappers";
import { getPlan } from "@/src/config/plans";
import {
  getProfile,
  getSession,
  getSubscription,
  type Session,
} from "@/src/lib/server/auth";
import type { InvoiceSummary } from "@/src/types/invoice-types";

/** Current user + profile + plan for server components (deduped per request). */
export const getViewer = cache(async () => {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  const [profile, subscription] = await Promise.all([
    getProfile(session),
    getSubscription(session),
  ]);
  return { ...session, profile, subscription, plan: getPlan(subscription.plan) };
});

export async function listInvoiceSummaries(session: Session): Promise<InvoiceSummary[]> {
  const { data, error } = await session.supabase
    .from("invoices")
    .select(INVOICE_SUMMARY_COLUMNS)
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(rowToInvoiceSummary);
}

export async function listClients(session: Session) {
  const { data, error } = await session.supabase
    .from("clients")
    .select("*")
    .eq("user_id", session.user.id)
    .order("name");
  if (error) throw new Error(error.message);
  return (data ?? []).map(rowToClient);
}

export async function countInvoicesThisMonth(session: Session) {
  const start = new Date();
  start.setUTCDate(1);
  start.setUTCHours(0, 0, 0, 0);
  const { count } = await session.supabase
    .from("invoices")
    .select("id", { count: "exact", head: true })
    .eq("user_id", session.user.id)
    .gte("created_at", start.toISOString());
  return count ?? 0;
}

export interface DashboardStats {
  currency: string;
  totalInvoiced: number;
  totalPaid: number;
  outstanding: number;
  overdue: number;
  counts: Record<string, number>;
  monthly: { label: string; invoiced: number; paid: number }[];
  topClients: { name: string; total: number; count: number }[];
  mixedCurrencies: boolean;
}

/**
 * Aggregate stats in the user's most-used currency (amounts in other
 * currencies are not converted, so they are excluded from money totals).
 */
export function computeStats(
  invoices: InvoiceSummary[],
  fallbackCurrency: string,
  monthCount = 6,
): DashboardStats {
  const currencyCounts = new Map<string, number>();
  invoices.forEach((i) => currencyCounts.set(i.currency, (currencyCounts.get(i.currency) ?? 0) + 1));
  const currency =
    [...currencyCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? fallbackCurrency;

  const counts: Record<string, number> = { draft: 0, pending: 0, paid: 0, overdue: 0, cancelled: 0 };
  let totalInvoiced = 0;
  let totalPaid = 0;
  let outstanding = 0;
  let overdue = 0;

  const now = new Date();
  const months = Array.from({ length: monthCount }, (_, idx) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (monthCount - 1 - idx), 1);
    return {
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleString("en-US", { month: "short" }),
      invoiced: 0,
      paid: 0,
    };
  });
  const clients = new Map<string, { total: number; count: number }>();

  for (const inv of invoices) {
    const status = displayStatus(inv.status, inv.dueDate);
    counts[status] = (counts[status] ?? 0) + 1;
    if (inv.currency !== currency || status === "cancelled" || status === "draft") continue;

    const amount = inv.totalAmount;
    totalInvoiced += amount;
    if (status === "paid") totalPaid += amount;
    else outstanding += amount;
    if (status === "overdue") overdue += amount;

    const key = (inv.issueDate || inv.createdAt || "").slice(0, 7);
    const bucket = months.find((m) => m.key === key);
    if (bucket) {
      bucket.invoiced += amount;
      if (status === "paid") bucket.paid += amount;
    }

    const name = inv.clientName?.trim() || "Unnamed client";
    const c = clients.get(name) ?? { total: 0, count: 0 };
    clients.set(name, { total: c.total + amount, count: c.count + 1 });
  }

  return {
    currency,
    totalInvoiced,
    totalPaid,
    outstanding,
    overdue,
    counts,
    monthly: months.map(({ label, invoiced, paid }) => ({ label, invoiced, paid })),
    topClients: [...clients.entries()]
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10),
    mixedCurrencies: currencyCounts.size > 1,
  };
}

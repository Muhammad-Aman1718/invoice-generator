import "server-only";

import { redirect } from "next/navigation";
import { getViewer } from "@/src/lib/server/data";
import { rowToProfile, rowToSubscription } from "@/src/lib/mappers";
import { getMonthlyRevenue, getPlan } from "@/src/lib/plans";
import { getUtcMonthStart } from "@/src/lib/dateUtils";
import { ADMIN_QUERY_LIMITS, MS_PER_DAY, NEW_USER_WINDOW_DAYS } from "@/src/constant/app";
import { ROUTES } from "@/src/constant/routes";
import type { AdminStats, AdminUser, DbRow, PlanId, Session, Viewer } from "@/src/types/types";

export async function requireAdminViewer(): Promise<Viewer> {
  const viewer = await getViewer();
  if (viewer.profile.role !== "admin") redirect(ROUTES.dashboard);
  return viewer;
}

function countByUser(rows: DbRow[]): Map<string, number> {
  const counts = new Map<string, number>();
  rows.forEach((row) => counts.set(row.user_id, (counts.get(row.user_id) ?? 0) + 1));
  return counts;
}

/** All users with their plan and invoice count (relies on admin RLS policies). */
export async function listUsersForAdmin({ supabase }: Session): Promise<AdminUser[]> {
  const [profiles, subscriptions, invoices] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(ADMIN_QUERY_LIMITS.users),
    supabase.from("subscriptions").select("*").limit(ADMIN_QUERY_LIMITS.users),
    supabase.from("invoices").select("user_id").limit(ADMIN_QUERY_LIMITS.invoices),
  ]);
  if (profiles.error) throw new Error(`Could not load users: ${profiles.error.message}`);

  const subscriptionByUser = new Map((subscriptions.data ?? []).map((s) => [s.user_id, s]));
  const invoiceCounts = countByUser(invoices.data ?? []);

  return (profiles.data ?? []).map((row) => ({
    ...rowToProfile(row),
    subscription: rowToSubscription(subscriptionByUser.get(row.id)),
    invoiceCount: invoiceCounts.get(row.id) ?? 0,
  }));
}

async function countInvoices({ supabase }: Session, since?: Date): Promise<number> {
  let query = supabase.from("invoices").select("id", { count: "exact", head: true });
  if (since) query = query.gte("created_at", since.toISOString());
  const { count, error } = await query;
  if (error) throw new Error(`Could not count invoices: ${error.message}`);
  return count ?? 0;
}

export function summarizeUsers(users: AdminUser[]) {
  const byPlan: Record<PlanId, number> = { free: 0, pro: 0, business: 0 };
  let mrr = 0;
  for (const { subscription } of users) {
    byPlan[subscription.plan] += 1;
    if (subscription.plan !== "free") {
      mrr += getMonthlyRevenue(getPlan(subscription.plan), subscription.billingInterval);
    }
  }
  const newSince = Date.now() - NEW_USER_WINDOW_DAYS * MS_PER_DAY;
  return {
    byPlan,
    mrr,
    totalUsers: users.length,
    newUsers30d: users.filter((u) => new Date(u.createdAt).getTime() > newSince).length,
    admins: users.filter((u) => u.role === "admin").length,
    suspended: users.filter((u) => u.isSuspended).length,
  };
}

export async function getAdminStats(session: Session): Promise<AdminStats> {
  const [users, invoiceTotal, invoiceMonth] = await Promise.all([
    listUsersForAdmin(session),
    countInvoices(session),
    countInvoices(session, getUtcMonthStart()),
  ]);
  return { users, ...summarizeUsers(users), invoiceTotal, invoiceMonth };
}

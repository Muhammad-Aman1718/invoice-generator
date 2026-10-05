import "server-only";

import { redirect } from "next/navigation";
import { getViewer } from "@/src/lib/server/data";
import { rowToProfile, rowToSubscription } from "@/src/lib/mappers";
import { PLANS } from "@/src/config/plans";

export async function requireAdminViewer() {
  const viewer = await getViewer();
  if (viewer.profile.role !== "admin") redirect("/dashboard");
  return viewer;
}

/** All users with plan + invoice counts. Relies on the admin RLS policies. */
export async function listUsersForAdmin() {
  const viewer = await requireAdminViewer();
  const { supabase } = viewer;

  const [profiles, subs, invoices] = await Promise.all([
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(1000),
    supabase.from("subscriptions").select("*").limit(1000),
    supabase.from("invoices").select("user_id, total_amount").limit(20000),
  ]);
  if (profiles.error) throw new Error(profiles.error.message);

  const subByUser = new Map((subs.data ?? []).map((s) => [s.user_id, s]));
  const invoiceCounts = new Map<string, number>();
  (invoices.data ?? []).forEach((i) => invoiceCounts.set(i.user_id, (invoiceCounts.get(i.user_id) ?? 0) + 1));

  return (profiles.data ?? []).map((row) => {
    const sub = subByUser.get(row.id);
    return {
      ...rowToProfile(row),
      subscription: rowToSubscription(sub),
      rawPlan: (sub?.plan as string) ?? "free",
      invoiceCount: invoiceCounts.get(row.id) ?? 0,
    };
  });
}

export type AdminUser = Awaited<ReturnType<typeof listUsersForAdmin>>[number];

export async function getAdminStats() {
  const users = await listUsersForAdmin();
  const viewer = await getViewer();
  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);

  const [{ count: invoiceTotal }, { count: invoiceMonth }] = await Promise.all([
    viewer.supabase.from("invoices").select("id", { count: "exact", head: true }),
    viewer.supabase
      .from("invoices")
      .select("id", { count: "exact", head: true })
      .gte("created_at", monthStart.toISOString()),
  ]);

  const byPlan = { free: 0, pro: 0, business: 0 };
  let mrr = 0;
  for (const u of users) {
    const plan = u.subscription.plan;
    byPlan[plan] += 1;
    if (plan !== "free") {
      const p = PLANS[plan];
      mrr += u.subscription.billingInterval === "year" ? p.price.year / 12 : p.price.month;
    }
  }

  const thirtyDaysAgo = Date.now() - 30 * 86_400_000;
  return {
    users,
    totalUsers: users.length,
    newUsers30d: users.filter((u) => new Date(u.createdAt).getTime() > thirtyDaysAgo).length,
    admins: users.filter((u) => u.role === "admin").length,
    suspended: users.filter((u) => u.isSuspended).length,
    byPlan,
    mrr,
    invoiceTotal: invoiceTotal ?? 0,
    invoiceMonth: invoiceMonth ?? 0,
  };
}

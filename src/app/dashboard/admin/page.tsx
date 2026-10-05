import Link from "next/link";
import { ArrowRight, CreditCard, FileText, Shield, UserPlus, Users } from "lucide-react";
import { PageHeader } from "@/src/components/ui/page-header";
import { StatsCards } from "@/src/components/dashboard/stats-cards";
import { getAdminStats } from "@/src/lib/server/admin-data";
import { PLAN_ORDER, PLANS } from "@/src/config/plans";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const stats = await getAdminStats();
  const paid = stats.byPlan.pro + stats.byPlan.business;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        icon={Shield}
        title="Admin overview"
        description="Platform health, subscriptions and growth."
        actions={
          <Link href="/dashboard/admin/users" className="btn-navy">
            <Users size={15} /> Manage users
          </Link>
        }
      />

      <StatsCards
        items={[
          { label: "Users", value: String(stats.totalUsers), hint: `${stats.newUsers30d} new in 30 days`, icon: Users },
          {
            label: "Paying customers",
            value: String(paid),
            hint: stats.totalUsers ? `${Math.round((paid / stats.totalUsers) * 100)}% conversion` : "—",
            icon: CreditCard,
            tone: "green",
          },
          {
            label: "Est. MRR",
            value: `$${stats.mrr.toFixed(2)}`,
            hint: "Yearly plans counted ÷ 12",
            icon: UserPlus,
            tone: "amber",
          },
          {
            label: "Invoices",
            value: String(stats.invoiceTotal),
            hint: `${stats.invoiceMonth} this month`,
            icon: FileText,
          },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="panel p-5 sm:p-6" aria-labelledby="plans-title">
          <h2 id="plans-title" className="mb-4 text-base font-black text-navy">
            Users by plan
          </h2>
          <ul className="space-y-3">
            {PLAN_ORDER.map((id) => {
              const count = stats.byPlan[id];
              const pct = stats.totalUsers ? (count / stats.totalUsers) * 100 : 0;
              return (
                <li key={id}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-semibold text-navy">{PLANS[id].name}</span>
                    <span className="tabular-nums text-navy-500">
                      {count} · {Math.round(pct)}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-mist">
                    <div className="h-full rounded-full bg-navy-400" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-xs text-navy-500">
            {stats.admins} admin{stats.admins === 1 ? "" : "s"} · {stats.suspended} suspended
          </p>
        </section>

        <section className="panel overflow-hidden lg:col-span-2" aria-labelledby="signups-title">
          <div className="flex items-center justify-between px-5 py-4 sm:px-6">
            <h2 id="signups-title" className="text-base font-black text-navy">
              Latest sign-ups
            </h2>
            <Link href="/dashboard/admin/users" className="flex items-center gap-1 text-xs font-black text-navy hover:underline">
              All users <ArrowRight size={13} />
            </Link>
          </div>
          <ul className="divide-y divide-navy/5 border-t border-navy/5">
            {stats.users.slice(0, 8).map((u) => (
              <li key={u.id} className="flex items-center gap-3 px-5 py-3 sm:px-6">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-mist text-xs font-black uppercase text-navy">
                  {(u.fullName || u.email || "?").slice(0, 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy">{u.fullName || u.email}</p>
                  <p className="truncate text-xs text-navy-500">
                    {u.email} · {new Date(u.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}
                  </p>
                </div>
                <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-bold text-navy">
                  {PLANS[u.subscription.plan].name}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

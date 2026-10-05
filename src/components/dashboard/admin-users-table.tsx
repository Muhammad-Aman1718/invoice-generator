"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, Loader2, Search, ShieldCheck, UserCheck } from "lucide-react";
import { api } from "@/src/lib/api-client";
import { PLAN_ORDER, PLANS } from "@/src/config/plans";
import { cn } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import type { Profile, Subscription } from "@/src/types/invoice-types";

type Row = Profile & { subscription: Subscription; invoiceCount: number };

export function AdminUsersTable({ users, currentUserId }: { users: Row[]; currentUserId: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [busy, setBusy] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter(
      (u) =>
        (planFilter === "all" ||
          (planFilter === "admin" ? u.role === "admin" : u.subscription.plan === planFilter)) &&
        (!q || u.email?.toLowerCase().includes(q) || u.fullName?.toLowerCase().includes(q)),
    );
  }, [users, query, planFilter]);

  const update = async (u: Row, data: Parameters<typeof api.admin.updateUser>[1], success: string) => {
    setBusy(u.id);
    try {
      await api.admin.updateUser(u.id, data);
      showToast.success(success, u.email ?? undefined);
      router.refresh();
    } catch (err) {
      showToast.error("Update failed", err instanceof Error ? err.message : undefined);
    } finally {
      setBusy(null);
    }
  };

  const changePlan = (u: Row, plan: string) => {
    if (plan === u.subscription.plan) return;
    // Manual upgrades run for one billing period; extend or downgrade as needed.
    const end = plan === "free" ? null : new Date(Date.now() + 31 * 86_400_000).toISOString();
    update(u, { plan, billingInterval: "month", currentPeriodEnd: end }, `Plan set to ${PLANS[plan as keyof typeof PLANS].name}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1 sm:max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <label htmlFor="user-search" className="sr-only">
            Search users
          </label>
          <input
            id="user-search"
            className="input pl-9"
            placeholder="Search by name or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <label htmlFor="plan-filter" className="sr-only">
          Filter by plan
        </label>
        <select id="plan-filter" className="input cursor-pointer sm:w-48" value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}>
          <option value="all">All users ({users.length})</option>
          {PLAN_ORDER.map((p) => (
            <option key={p} value={p}>
              {PLANS[p].name}
            </option>
          ))}
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="panel overflow-hidden">
        <div className="custom-scrollbar relative overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-navy/[0.06] bg-navy/[0.02] text-[10px] font-black uppercase tracking-widest text-navy-500">
                <th className="px-5 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Joined</th>
                <th className="px-4 py-3 text-right">Invoices</th>
                <th className="px-4 py-3 text-left">Plan</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/[0.04]">
              {filtered.map((u) => {
                const self = u.id === currentUserId;
                return (
                  <tr key={u.id} className={cn(u.isSuspended && "bg-red-50/50")}>
                    <td className="px-5 py-3">
                      <p className="font-semibold text-navy">
                        {u.fullName || "—"} {self && <span className="text-xs text-navy-400">(you)</span>}
                      </p>
                      <p className="text-xs text-navy-500">{u.email}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-navy-500">
                      {new Date(u.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-navy">{u.invoiceCount}</td>
                    <td className="px-4 py-3">
                      <select
                        aria-label={`Plan for ${u.email}`}
                        className="rounded-lg border border-navy/10 bg-white px-2 py-1.5 text-xs font-bold text-navy"
                        value={u.subscription.plan}
                        disabled={busy === u.id}
                        onChange={(e) => changePlan(u, e.target.value)}
                      >
                        {PLAN_ORDER.map((p) => (
                          <option key={p} value={p}>
                            {PLANS[p].name}
                          </option>
                        ))}
                      </select>
                      {u.subscription.plan !== "free" && (
                        <p className="mt-1 text-[10px] text-navy-500">
                          {u.subscription.provider}
                          {u.subscription.currentPeriodEnd &&
                            ` · until ${new Date(u.subscription.currentPeriodEnd).toLocaleDateString()}`}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        aria-label={`Role for ${u.email}`}
                        className="rounded-lg border border-navy/10 bg-white px-2 py-1.5 text-xs font-bold text-navy"
                        value={u.role}
                        disabled={busy === u.id || self}
                        onChange={(e) => update(u, { role: e.target.value }, `Role set to ${e.target.value}`)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {busy === u.id ? (
                        <Loader2 size={15} className="ml-auto animate-spin text-navy" />
                      ) : u.isSuspended ? (
                        <button
                          className="btn-outline btn-sm"
                          onClick={() => update(u, { isSuspended: false }, "User reactivated")}
                        >
                          <UserCheck size={13} /> Reactivate
                        </button>
                      ) : (
                        <button
                          className="btn-sm btn border border-red-200 text-red-600 hover:bg-red-50"
                          disabled={self}
                          onClick={() => update(u, { isSuspended: true }, "User suspended")}
                        >
                          <Ban size={13} /> Suspend
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="p-8 text-center text-sm text-navy-500">No users found.</p>}
      </div>
      <p className="flex items-center gap-1.5 text-xs text-navy-500">
        <ShieldCheck size={13} /> Manual plan changes last 31 days. Stripe-managed plans update automatically via webhook.
      </p>
    </div>
  );
}

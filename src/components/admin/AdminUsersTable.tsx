"use client";

import { ShieldCheck } from "lucide-react";
import AdminUserRow from "./AdminUserRow";
import SearchInput from "@/src/components/ui/SearchInput";
import useAdminUsers from "@/src/hooks/useAdminUsers";
import { MANUAL_PLAN_DAYS, PLAN_ORDER, PLANS } from "@/src/constant/plans";
import type { AdminUsersTableProps } from "@/src/types/types";

export default function AdminUsersTable({ users, currentUserId }: AdminUsersTableProps) {
  const { query, setQuery, planFilter, setPlanFilter, filtered, busyUserId, updateUser } =
    useAdminUsers(users);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1 sm:max-w-sm">
          <SearchInput
            id="userSearch"
            label="Search users"
            placeholder="Search by name or email"
            value={query}
            onChange={setQuery}
          />
        </div>
        <label htmlFor="planFilter" className="sr-only">
          Filter by plan
        </label>
        <select
          id="planFilter"
          className="input cursor-pointer sm:w-48"
          value={planFilter}
          onChange={(event) => setPlanFilter(event.target.value)}
        >
          <option value="all">All users ({users.length})</option>
          {PLAN_ORDER.map((plan) => (
            <option key={plan} value={plan}>
              {PLANS[plan].name}
            </option>
          ))}
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="panel overflow-hidden">
        <div className="custom-scrollbar relative overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-navy/[0.06] bg-navy/[0.02] text-[10px] font-bold uppercase tracking-widest text-navy-500">
                <th className="px-5 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Joined</th>
                <th className="px-4 py-3 text-right">Invoices</th>
                <th className="px-4 py-3 text-left">Plan</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/[0.04]">
              {filtered.map((user) => (
                <AdminUserRow
                  key={user.id}
                  user={user}
                  isSelf={user.id === currentUserId}
                  busy={busyUserId === user.id}
                  onUpdate={updateUser}
                />
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="p-8 text-center text-sm text-navy-500">No users found.</p>}
      </div>
      <p className="flex items-center gap-1.5 text-xs text-navy-500">
        <ShieldCheck size={13} /> Manual plan changes last {MANUAL_PLAN_DAYS} days. Stripe-managed plans
        update automatically via webhook.
      </p>
    </div>
  );
}

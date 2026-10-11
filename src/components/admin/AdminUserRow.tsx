import { Ban, Loader2, UserCheck } from "lucide-react";
import { buildManualPlanUpdate } from "@/src/lib/adminUsers";
import { formatShortDate } from "@/src/lib/format";
import { PLAN_ORDER, PLANS } from "@/src/constant/plans";
import { cn } from "@/src/lib/utils";
import { COMPACT_SELECT_CLASS } from "@/src/constant/theme";
import type { AdminUserRowProps, PlanId, UserRole } from "@/src/types/types";

export default function AdminUserRow({ user, isSelf, busy, onUpdate }: AdminUserRowProps) {
  const { subscription } = user;
  const changePlan = (plan: PlanId) => {
    if (plan !== subscription.plan)
      onUpdate(user, buildManualPlanUpdate(plan), `Plan set to ${PLANS[plan].name}`);
  };

  return (
    <tr className={cn(user.isSuspended && "bg-red-50/50")}>
      <td className="px-5 py-3">
        <p className="font-semibold text-navy">
          {user.fullName || "-"} {isSelf && <span className="text-xs text-navy-400">(you)</span>}
        </p>
        <p className="text-xs text-navy-500">{user.email}</p>
      </td>
      <td className="px-4 py-3 text-xs text-navy-500">{formatShortDate(user.createdAt)}</td>
      <td className="px-4 py-3 text-right tabular-nums text-navy">{user.invoiceCount}</td>
      <td className="px-4 py-3">
        <select
          aria-label={`Plan for ${user.email}`}
          className={COMPACT_SELECT_CLASS}
          value={subscription.plan}
          disabled={busy}
          onChange={(event) => changePlan(event.target.value as PlanId)}
        >
          {PLAN_ORDER.map((plan) => (
            <option key={plan} value={plan}>
              {PLANS[plan].name}
            </option>
          ))}
        </select>
        {subscription.plan !== "free" && (
          <p className="mt-1 text-[10px] text-navy-500">
            {subscription.provider}
            {subscription.currentPeriodEnd && ` · until ${formatShortDate(subscription.currentPeriodEnd)}`}
          </p>
        )}
      </td>
      <td className="px-4 py-3">
        <select
          aria-label={`Role for ${user.email}`}
          className={COMPACT_SELECT_CLASS}
          value={user.role}
          disabled={busy || isSelf}
          onChange={(event) =>
            onUpdate(user, { role: event.target.value as UserRole }, `Role set to ${event.target.value}`)
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td className="px-4 py-3 text-right">
        {busy ? (
          <Loader2 size={15} className="ml-auto animate-spin text-navy" />
        ) : user.isSuspended ? (
          <button
            className="btn-outline btn-sm"
            onClick={() => onUpdate(user, { isSuspended: false }, "User reactivated")}
          >
            <UserCheck size={13} /> Reactivate
          </button>
        ) : (
          <button
            className="btn btn-sm border border-red-200 text-red-600 hover:bg-red-50"
            disabled={isSelf}
            onClick={() => onUpdate(user, { isSuspended: true }, "User suspended")}
          >
            <Ban size={13} /> Suspend
          </button>
        )}
      </td>
    </tr>
  );
}

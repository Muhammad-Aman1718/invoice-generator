import { getDaysFromNowIso } from "@/src/lib/dateUtils";
import { MANUAL_PLAN_DAYS } from "@/src/constant/plans";
import type { AdminUser, AdminUserUpdate, PlanId } from "@/src/types/types";

/** Users matching the plan/admin filter and a name/email search. */
export function filterAdminUsers(users: AdminUser[], filter: string, query: string): AdminUser[] {
  const needle = query.trim().toLowerCase();
  return users.filter((user) => {
    const matchesFilter =
      filter === "all" || (filter === "admin" ? user.role === "admin" : user.subscription.plan === filter);
    const matchesQuery =
      !needle || user.email?.toLowerCase().includes(needle) || user.fullName?.toLowerCase().includes(needle);
    return matchesFilter && matchesQuery;
  });
}

/** Payload for a manual plan change; paid plans last one billing period. */
export function buildManualPlanUpdate(plan: PlanId): AdminUserUpdate {
  return {
    plan,
    billingInterval: "month",
    currentPeriodEnd: plan === "free" ? null : getDaysFromNowIso(MANUAL_PLAN_DAYS),
  };
}

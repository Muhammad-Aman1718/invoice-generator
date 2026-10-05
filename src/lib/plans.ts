import { PLANS } from "@/src/constant/plans";
import { MONTHS_PER_YEAR } from "@/src/constant/app";
import type { BillingInterval, Plan, PlanId } from "@/src/types/types";

export function getPlan(id: string | null | undefined): Plan {
  return PLANS[id as PlanId] ?? PLANS.free;
}

/** Env var holding the Stripe Price ID, e.g. STRIPE_PRICE_PRO_MONTH. */
export function getStripePriceEnvKey(plan: PlanId, interval: BillingInterval): string {
  return `STRIPE_PRICE_${plan.toUpperCase()}_${interval.toUpperCase()}`;
}

/** Monthly revenue for a plan, spreading yearly prices over 12 months. */
export function getMonthlyRevenue(plan: Plan, interval: BillingInterval): number {
  return interval === "year" ? plan.price.year / MONTHS_PER_YEAR : plan.price.month;
}

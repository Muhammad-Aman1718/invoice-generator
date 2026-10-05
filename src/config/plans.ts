// Subscription plans. The Free-plan limits are also enforced in the database
// (see enforce_plan_limits() in src/supabase/migrations/002_complete_schema.sql);
// keep both in sync when changing them.

export type PlanId = "free" | "pro" | "business";
export type BillingInterval = "month" | "year";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  price: { month: number; year: number };
  limits: {
    invoicesPerMonth: number | null; // null = unlimited
    clients: number | null;
  };
  perks: {
    csvExport: boolean;
    removeBranding: boolean;
    prioritySupport: boolean;
  };
  features: string[];
  highlighted?: boolean;
}

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: "free",
    name: "Free",
    tagline: "For freelancers getting started",
    price: { month: 0, year: 0 },
    limits: { invoicesPerMonth: 10, clients: 5 },
    perks: { csvExport: false, removeBranding: false, prioritySupport: false },
    features: [
      "10 saved invoices per month",
      "5 saved clients",
      "Unlimited PDF downloads",
      "40+ currencies, VAT/GST presets",
      "Logo & signature on invoices",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    tagline: "For growing freelancers & studios",
    price: { month: 9, year: 90 },
    limits: { invoicesPerMonth: null, clients: null },
    perks: { csvExport: true, removeBranding: true, prioritySupport: false },
    features: [
      "Unlimited invoices",
      "Unlimited clients",
      "CSV export of all invoices",
      "No “Made with InvoiceGen” footer",
      "Revenue reports",
    ],
    highlighted: true,
  },
  business: {
    id: "business",
    name: "Business",
    tagline: "For teams that bill every day",
    price: { month: 29, year: 290 },
    limits: { invoicesPerMonth: null, clients: null },
    perks: { csvExport: true, removeBranding: true, prioritySupport: true },
    features: [
      "Everything in Pro",
      "Priority email support (24h)",
      "Early access to new features",
      "Dedicated onboarding call",
    ],
  },
};

export const PLAN_ORDER: PlanId[] = ["free", "pro", "business"];

export function getPlan(id: string | null | undefined): Plan {
  return PLANS[(id as PlanId) ?? "free"] ?? PLANS.free;
}

export function isPaidPlan(id: PlanId) {
  return id !== "free";
}

/** Env var holding the Stripe Price ID for a plan/interval, e.g. STRIPE_PRICE_PRO_MONTH. */
export function stripePriceEnvKey(plan: PlanId, interval: BillingInterval) {
  return `STRIPE_PRICE_${plan.toUpperCase()}_${interval.toUpperCase()}`;
}

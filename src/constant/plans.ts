import type { BillingInterval, Plan, PlanId } from "@/src/types/types";

// The Free-plan limits are also enforced in the database (enforce_plan_limits()
// in src/supabase/migrations/002CompleteSchema.sql); keep both in sync.
export const FREE_INVOICES_PER_MONTH = 10;
export const FREE_CLIENT_LIMIT = 5;
/** How long a plan granted manually by an admin lasts. */
export const MANUAL_PLAN_DAYS = 31;

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: "free",
    name: "Free",
    tagline: "For freelancers getting started",
    price: { month: 0, year: 0 },
    limits: { invoicesPerMonth: FREE_INVOICES_PER_MONTH, clients: FREE_CLIENT_LIMIT },
    perks: {
      csvExport: false,
      removeBranding: false,
      prioritySupport: false,
      earlyAccess: false,
      onboardingCall: false,
    },
    features: [
      `${FREE_INVOICES_PER_MONTH} saved invoices per month`,
      `${FREE_CLIENT_LIMIT} saved clients`,
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
    perks: {
      csvExport: true,
      removeBranding: true,
      prioritySupport: false,
      earlyAccess: false,
      onboardingCall: false,
    },
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
    perks: {
      csvExport: true,
      removeBranding: true,
      prioritySupport: true,
      earlyAccess: true,
      onboardingCall: true,
    },
    features: [
      "Everything in Pro",
      "Priority email support (24h)",
      "Early access to new features (payment reminders)",
      "Dedicated onboarding call",
    ],
  },
};

export const PLAN_ORDER: PlanId[] = ["free", "pro", "business"];

export const BILLING_INTERVAL_OPTIONS: { value: BillingInterval; label: string }[] = [
  { value: "month", label: "Monthly" },
  { value: "year", label: "Yearly" },
];

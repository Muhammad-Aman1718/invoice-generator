import type { SubscriptionStatus } from "@/src/types/types";

export const STRIPE_API_URL = "https://api.stripe.com/v1";

/** Webhook events that update an existing subscription. */
export const STRIPE_SUBSCRIPTION_EVENTS = ["customer.subscription.updated", "customer.subscription.deleted"];

/** Stripe subscription statuses → our simplified statuses. */
export const STRIPE_STATUS_MAP: Record<string, SubscriptionStatus> = {
  active: "active",
  trialing: "trialing",
  past_due: "past_due",
  unpaid: "past_due",
  incomplete: "past_due",
  canceled: "canceled",
  incomplete_expired: "canceled",
  paused: "canceled",
};

/** Subscription statuses that still grant the paid plan. */
export const USABLE_SUBSCRIPTION_STATUSES = ["active", "trialing"];

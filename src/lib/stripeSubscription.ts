import { STRIPE_STATUS_MAP } from "@/src/constant/billing";
import { MS_PER_SECOND } from "@/src/constant/app";
import type { PlanId, StripeSubscriptionObject, SubscriptionRow } from "@/src/types/types";

function toPlanId(value: string | undefined): PlanId {
  return value === "pro" || value === "business" ? value : "free";
}

/** Map a Stripe Subscription object onto our `subscriptions` table columns. */
export function mapStripeSubscription(subscription: StripeSubscriptionObject): SubscriptionRow {
  const item = subscription.items?.data?.[0];
  const periodEnd = subscription.current_period_end ?? item?.current_period_end;
  const customer = subscription.customer;
  return {
    plan: toPlanId(subscription.metadata?.plan),
    status: STRIPE_STATUS_MAP[subscription.status] ?? "canceled",
    billing_interval: item?.price?.recurring?.interval === "year" ? "year" : "month",
    current_period_end: periodEnd ? new Date(periodEnd * MS_PER_SECOND).toISOString() : null,
    cancel_at_period_end: Boolean(subscription.cancel_at_period_end),
    provider: "stripe",
    provider_customer_id: typeof customer === "string" ? customer : customer.id,
    provider_subscription_id: subscription.id,
  };
}

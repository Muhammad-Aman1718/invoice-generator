import { NextResponse } from "next/server";
import { createAdminClient } from "@/src/lib/supabase/admin";
import { stripeRequest, verifyStripeSignature } from "@/src/lib/server/stripe";

/* eslint-disable @typescript-eslint/no-explicit-any */

const STATUS_MAP: Record<string, string> = {
  active: "active",
  trialing: "trialing",
  past_due: "past_due",
  unpaid: "past_due",
  incomplete: "past_due",
  canceled: "canceled",
  incomplete_expired: "canceled",
  paused: "canceled",
};

function toRow(sub: any) {
  const item = sub.items?.data?.[0];
  const periodEnd = sub.current_period_end ?? item?.current_period_end;
  const plan = sub.metadata?.plan;
  return {
    plan: plan === "pro" || plan === "business" ? plan : "free",
    status: STATUS_MAP[sub.status] ?? "canceled",
    billing_interval: item?.price?.recurring?.interval === "year" ? "year" : "month",
    current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    cancel_at_period_end: Boolean(sub.cancel_at_period_end),
    provider: "stripe",
    provider_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer?.id,
    provider_subscription_id: sub.id,
  };
}

// POST /api/billing/webhook — configure in Stripe → Developers → Webhooks with events:
// checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const admin = createAdminClient();
  if (!secret || !admin) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 501 });
  }

  const payload = await request.text();
  if (!verifyStripeSignature(payload, request.headers.get("stripe-signature"), secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(payload);
  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.client_reference_id ?? session.metadata?.user_id;
      if (userId && session.subscription) {
        const sub = await stripeRequest("GET", `/subscriptions/${session.subscription}`);
        await admin
          .from("subscriptions")
          .upsert({ user_id: userId, ...toRow(sub) }, { onConflict: "user_id" });
      }
    } else if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const sub = event.data.object;
      const row = toRow(sub);
      if (event.type === "customer.subscription.deleted") row.status = "canceled";
      const userId = sub.metadata?.user_id;
      if (userId) {
        await admin.from("subscriptions").upsert({ user_id: userId, ...row }, { onConflict: "user_id" });
      } else {
        await admin.from("subscriptions").update(row).eq("provider_subscription_id", sub.id);
      }
    }
  } catch (err) {
    console.error("[stripe webhook]", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

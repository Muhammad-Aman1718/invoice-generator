import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/src/lib/supabase/admin";
import { callStripe } from "@/src/lib/server/stripe";
import { verifyStripeSignature } from "@/src/lib/stripeSignature";
import { mapStripeSubscription } from "@/src/lib/stripeSubscription";
import { HTTP_STATUS } from "@/src/constant/http";
import { STRIPE_SUBSCRIPTION_EVENTS } from "@/src/constant/billing";
import type { StripeSubscriptionObject } from "@/src/types/types";

async function saveSubscription(
  admin: SupabaseClient,
  subscription: StripeSubscriptionObject,
  userId?: string,
) {
  const row = mapStripeSubscription(subscription);
  const { error } = userId
    ? await admin.from("subscriptions").upsert({ user_id: userId, ...row }, { onConflict: "user_id" })
    : await admin.from("subscriptions").update(row).eq("provider_subscription_id", subscription.id);
  if (error) throw new Error(`Could not save subscription: ${error.message}`);
}

async function handleCheckoutCompleted(admin: SupabaseClient, session: Record<string, string>) {
  const userId = session.client_reference_id;
  if (!userId || !session.subscription) return;
  const subscription = await callStripe<StripeSubscriptionObject>({
    method: "GET",
    path: `/subscriptions/${session.subscription}`,
  });
  await saveSubscription(admin, subscription, userId);
}

async function handleSubscriptionChange(admin: SupabaseClient, subscription: StripeSubscriptionObject) {
  await saveSubscription(admin, subscription, subscription.metadata?.user_id);
}

// POST /api/billing/webhook — Stripe events: checkout.session.completed,
// customer.subscription.updated, customer.subscription.deleted
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const admin = createAdminClient();
  if (!secret || !admin) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: HTTP_STATUS.notImplemented });
  }

  const payload = await request.text();
  const header = request.headers.get("stripe-signature");
  if (!verifyStripeSignature({ payload, header, secret })) {
    return NextResponse.json({ error: "Invalid signature" }, { status: HTTP_STATUS.badRequest });
  }

  const event = JSON.parse(payload);
  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(admin, event.data.object);
    } else if (STRIPE_SUBSCRIPTION_EVENTS.includes(event.type)) {
      await handleSubscriptionChange(admin, event.data.object);
    }
  } catch (error) {
    console.error("[stripe webhook] handler failed:", error);
    return NextResponse.json({ error: "Handler failed" }, { status: HTTP_STATUS.serverError });
  }
  return NextResponse.json({ received: true });
}

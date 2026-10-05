import { NextResponse } from "next/server";
import { stripePriceEnvKey } from "@/src/config/plans";
import { siteConfig } from "@/src/config/site";
import { ApiError, handle, readJson, requireUser } from "@/src/lib/server/auth";
import { stripeConfigured, stripeRequest } from "@/src/lib/server/stripe";
import { checkoutSchema, firstIssue } from "@/src/lib/validation";

// POST /api/billing/checkout { plan: "pro" | "business", interval: "month" | "year" }
export const POST = handle(async (request: Request) => {
  const { supabase, user } = await requireUser();
  const parsed = checkoutSchema.safeParse(await readJson(request));
  if (!parsed.success) throw new ApiError(400, firstIssue(parsed.error));
  const { plan, interval } = parsed.data;

  const price = process.env[stripePriceEnvKey(plan, interval)];
  if (!stripeConfigured() || !price) {
    throw new ApiError(
      501,
      `Online payments aren't enabled yet. Email ${siteConfig.supportEmail} and we'll upgrade your account manually.`,
      "PAYMENTS_DISABLED",
    );
  }

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("provider_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const origin = new URL(request.url).origin;
  const session = await stripeRequest<{ url: string }>("POST", "/checkout/sessions", {
    mode: "subscription",
    "line_items[0][price]": price,
    "line_items[0][quantity]": 1,
    success_url: `${origin}/dashboard/billing?checkout=success`,
    cancel_url: `${origin}/dashboard/billing?checkout=cancelled`,
    client_reference_id: user.id,
    customer: sub?.provider_customer_id ?? undefined,
    customer_email: sub?.provider_customer_id ? undefined : user.email,
    allow_promotion_codes: true,
    "metadata[user_id]": user.id,
    "metadata[plan]": plan,
    "metadata[interval]": interval,
    "subscription_data[metadata][user_id]": user.id,
    "subscription_data[metadata][plan]": plan,
    "subscription_data[metadata][interval]": interval,
  });

  return NextResponse.json({ url: session.url });
});

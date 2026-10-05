import { NextResponse } from "next/server";
import { ApiError, withErrorHandling } from "@/src/lib/server/apiError";
import { requireUser } from "@/src/lib/server/auth";
import { parseRequestBody } from "@/src/lib/server/parseRequest";
import { callStripe, isStripeConfigured } from "@/src/lib/server/stripe";
import { getStripePriceEnvKey } from "@/src/lib/plans";
import { checkoutSchema } from "@/src/lib/validation";
import { SITE_CONFIG } from "@/src/constant/site";
import { API_ERROR_CODES, HTTP_STATUS } from "@/src/constant/http";
import { ROUTES } from "@/src/constant/routes";
import type { CheckoutInput, StripeParams } from "@/src/types/types";

function buildCheckoutParams(input: CheckoutInput): StripeParams {
  const billingUrl = `${input.origin}${ROUTES.billing}`;
  const metadata = { user_id: input.userId, plan: input.plan, interval: input.interval };
  const params: StripeParams = {
    mode: "subscription",
    "line_items[0][price]": input.price,
    "line_items[0][quantity]": 1,
    success_url: `${billingUrl}?checkout=success`,
    cancel_url: `${billingUrl}?checkout=cancelled`,
    client_reference_id: input.userId,
    customer: input.customerId ?? undefined,
    customer_email: input.customerId ? undefined : input.email,
    allow_promotion_codes: true,
  };
  for (const [key, value] of Object.entries(metadata)) {
    params[`metadata[${key}]`] = value;
    params[`subscription_data[metadata][${key}]`] = value;
  }
  return params;
}

// POST /api/billing/checkout { plan: "pro" | "business", interval: "month" | "year" }
export const POST = withErrorHandling(async (request: Request) => {
  const { supabase, user } = await requireUser();
  const { plan, interval } = await parseRequestBody(request, checkoutSchema);

  const price = process.env[getStripePriceEnvKey(plan, interval)];
  if (!isStripeConfigured() || !price) {
    throw new ApiError(
      HTTP_STATUS.notImplemented,
      `Online payments aren't enabled yet. Email ${SITE_CONFIG.supportEmail} and we'll upgrade your account manually.`,
      API_ERROR_CODES.paymentsDisabled,
    );
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("provider_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const session = await callStripe<{ url: string }>({
    method: "POST",
    path: "/checkout/sessions",
    params: buildCheckoutParams({
      userId: user.id,
      email: user.email,
      customerId: subscription?.provider_customer_id,
      plan,
      interval,
      price,
      origin: new URL(request.url).origin,
    }),
  });
  return NextResponse.json({ url: session.url });
});

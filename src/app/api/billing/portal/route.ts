import { NextResponse } from "next/server";
import { ApiError, withErrorHandling } from "@/src/lib/server/apiError";
import { requireUser } from "@/src/lib/server/auth";
import { callStripe, isStripeConfigured } from "@/src/lib/server/stripe";
import { HTTP_STATUS } from "@/src/constant/http";
import { ROUTES } from "@/src/constant/routes";

// POST /api/billing/portal → Stripe customer portal (card, cancellation, receipts)
export const POST = withErrorHandling(async (request: Request) => {
  const { supabase, user } = await requireUser();
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("provider, provider_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const customerId = subscription?.provider === "stripe" ? subscription.provider_customer_id : null;
  if (!isStripeConfigured() || !customerId) {
    throw new ApiError(HTTP_STATUS.badRequest, "There is no online billing account to manage yet.");
  }

  const session = await callStripe<{ url: string }>({
    method: "POST",
    path: "/billing_portal/sessions",
    params: { customer: customerId, return_url: `${new URL(request.url).origin}${ROUTES.billing}` },
  });
  return NextResponse.json({ url: session.url });
});

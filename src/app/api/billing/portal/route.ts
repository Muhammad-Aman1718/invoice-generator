import { NextResponse } from "next/server";
import { ApiError, handle, requireUser } from "@/src/lib/server/auth";
import { stripeConfigured, stripeRequest } from "@/src/lib/server/stripe";

// POST /api/billing/portal → Stripe customer portal (manage card, cancel, invoices)
export const POST = handle(async (request: Request) => {
  const { supabase, user } = await requireUser();
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("provider, provider_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!stripeConfigured() || sub?.provider !== "stripe" || !sub.provider_customer_id) {
    throw new ApiError(400, "There is no online billing account to manage yet.");
  }

  const session = await stripeRequest<{ url: string }>("POST", "/billing_portal/sessions", {
    customer: sub.provider_customer_id,
    return_url: `${new URL(request.url).origin}/dashboard/billing`,
  });
  return NextResponse.json({ url: session.url });
});

import "server-only";

import { STRIPE_API_URL } from "@/src/constant/billing";
import type { StripeParams, StripeRequest } from "@/src/types/types";

// Minimal Stripe REST client (no SDK dependency). Payments stay disabled until
// STRIPE_SECRET_KEY and the STRIPE_PRICE_* variables are set.

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

function toFormBody(params: StripeParams): URLSearchParams {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) body.append(key, String(value));
  }
  return body;
}

export async function callStripe<T>(request: StripeRequest): Promise<T> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured.");

  const response = await fetch(`${STRIPE_API_URL}${request.path}`, {
    method: request.method,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: request.method === "POST" ? toFormBody(request.params ?? {}) : undefined,
    cache: "no-store",
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json?.error?.message ?? `Stripe error ${response.status}`);
  return json as T;
}

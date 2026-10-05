import { describe, expect, it } from "vitest";
import { mapStripeSubscription } from "@/src/lib/stripeSubscription";

const PERIOD_END = 1_767_225_600; // 2026-01-01T00:00:00Z

describe("mapStripeSubscription", () => {
  it("maps an active yearly Pro subscription", () => {
    const row = mapStripeSubscription({
      id: "sub_1",
      status: "active",
      customer: "cus_1",
      metadata: { plan: "pro" },
      current_period_end: PERIOD_END,
      items: { data: [{ price: { recurring: { interval: "year" } } }] },
    });
    expect(row).toEqual({
      plan: "pro",
      status: "active",
      billing_interval: "year",
      current_period_end: "2026-01-01T00:00:00.000Z",
      cancel_at_period_end: false,
      provider: "stripe",
      provider_customer_id: "cus_1",
      provider_subscription_id: "sub_1",
    });
  });

  it("reads the period end from the first item and an expanded customer", () => {
    const row = mapStripeSubscription({
      id: "sub_2",
      status: "trialing",
      customer: { id: "cus_2" },
      metadata: { plan: "business" },
      items: { data: [{ current_period_end: PERIOD_END }] },
    });
    expect(row.current_period_end).toBe("2026-01-01T00:00:00.000Z");
    expect(row.provider_customer_id).toBe("cus_2");
    expect(row.billing_interval).toBe("month");
  });

  it("falls back to safe values for unknown plans and statuses", () => {
    const row = mapStripeSubscription({ id: "sub_3", status: "mystery", customer: "cus_3" });
    expect(row.plan).toBe("free");
    expect(row.status).toBe("canceled");
    expect(row.current_period_end).toBeNull();
  });

  it("treats unpaid subscriptions as past due", () => {
    expect(mapStripeSubscription({ id: "s", status: "unpaid", customer: "c" }).status).toBe("past_due");
  });
});

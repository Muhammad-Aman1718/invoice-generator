import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clientToRow,
  invoiceToRow,
  rowToClient,
  rowToInvoice,
  rowToProfile,
  rowToSubscription,
} from "@/src/lib/mappers";
import { TEST_NOW } from "@/src/tests/fixtures";
import type { DBInvoiceRow } from "@/src/types/types";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(TEST_NOW);
});
afterEach(() => vi.useRealTimers());

describe("rowToInvoice", () => {
  it("converts snake_case columns and numeric strings", () => {
    // Postgres numeric columns arrive from Supabase as strings.
    const rawRow = {
      id: "inv-1",
      user_id: "user-1",
      invoice_number: "42",
      currency: "EUR",
      total_amount: "99.5",
      status: "sent",
      line_items: null,
    } as unknown as DBInvoiceRow;
    const invoice = rowToInvoice(rawRow);
    expect(invoice).toMatchObject({
      id: "inv-1",
      userId: "user-1",
      invoiceNumber: 42,
      currency: "EUR",
      totalAmount: 99.5,
      status: "pending",
      lineItems: [],
    });
  });
});

describe("invoiceToRow", () => {
  it("omits undefined fields and stores blank dates as NULL", () => {
    expect(invoiceToRow({ clientName: "Acme", dueDate: "" })).toEqual({
      client_name: "Acme",
      due_date: null,
    });
  });

  it("stamps paid_at when an invoice is marked paid", () => {
    expect(invoiceToRow({ status: "paid" })).toEqual({ status: "paid", paid_at: TEST_NOW.toISOString() });
    expect(invoiceToRow({ status: "pending" })).toEqual({ status: "pending", paid_at: null });
  });
});

describe("clients", () => {
  it("round-trips a client and turns a blank email into NULL", () => {
    const row = clientToRow({ name: "Acme", email: "", taxId: "GB1" });
    expect(row).toEqual({ name: "Acme", email: null, tax_id: "GB1" });
    expect(rowToClient({ id: "c1", ...row })).toMatchObject({
      id: "c1",
      name: "Acme",
      email: null,
      taxId: "GB1",
    });
  });
});

describe("rowToProfile", () => {
  it("only grants admin for the exact admin role", () => {
    expect(rowToProfile({ id: "u", role: "admin" }).role).toBe("admin");
    expect(rowToProfile({ id: "u", role: "superuser" }).role).toBe("user");
  });
});

describe("rowToSubscription", () => {
  it("defaults to the free plan without a row", () => {
    expect(rowToSubscription(null)).toMatchObject({ plan: "free", status: "active", provider: "manual" });
  });

  it("keeps an active paid plan", () => {
    const row = { plan: "pro", status: "active", current_period_end: "2026-07-01T00:00:00Z" };
    expect(rowToSubscription(row).plan).toBe("pro");
  });

  it("downgrades expired or unusable subscriptions to free", () => {
    expect(rowToSubscription({ plan: "pro", status: "active", current_period_end: "2026-06-01" }).plan).toBe(
      "free",
    );
    expect(rowToSubscription({ plan: "business", status: "canceled" }).plan).toBe("free");
  });

  it("only exposes the billing portal for Stripe customers", () => {
    const stripeRow = { plan: "pro", status: "active", provider: "stripe", provider_customer_id: "cus_1" };
    expect(rowToSubscription(stripeRow).hasBillingPortal).toBe(true);
    expect(rowToSubscription({ ...stripeRow, provider: "manual" }).hasBillingPortal).toBe(false);
  });
});

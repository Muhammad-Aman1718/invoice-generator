import { describe, expect, it } from "vitest";
import { checkoutSchema, clientSchema, getFirstIssueMessage, invoiceSchema } from "@/src/lib/validation";

const validInvoice = {
  invoiceNumber: "7",
  currency: "usd",
  lineItems: [{ description: "Work", quantity: 2, rate: 50, amount: 100 }],
  subtotal: 100,
  totalAmount: 100,
  issueDate: "2026-06-01",
};

describe("invoiceSchema", () => {
  it("coerces numbers, upper-cases the currency and fills defaults", () => {
    const result = invoiceSchema.parse(validInvoice);
    expect(result.invoiceNumber).toBe(7);
    expect(result.currency).toBe("USD");
    expect(result.status).toBe("pending");
    expect(result.lineItems[0].discount).toBe(0);
  });

  it("rejects bad dates, negative amounts and javascript image URLs", () => {
    expect(invoiceSchema.safeParse({ ...validInvoice, issueDate: "01/06/2026" }).success).toBe(false);
    expect(invoiceSchema.safeParse({ ...validInvoice, totalAmount: -1 }).success).toBe(false);
    expect(invoiceSchema.safeParse({ ...validInvoice, logoDataUrl: "javascript:alert(1)" }).success).toBe(
      false,
    );
  });
});

describe("clientSchema", () => {
  it("trims names and accepts a blank email", () => {
    expect(clientSchema.parse({ name: "  Acme  ", email: "" })).toEqual({ name: "Acme", email: "" });
  });

  it("requires a name", () => {
    const result = clientSchema.safeParse({ name: "   " });
    expect(result.success).toBe(false);
    if (!result.success) expect(getFirstIssueMessage(result.error)).toBe("name: Name is required");
  });
});

describe("checkoutSchema", () => {
  it("defaults to monthly billing and rejects the free plan", () => {
    expect(checkoutSchema.parse({ plan: "pro" })).toEqual({ plan: "pro", interval: "month" });
    expect(checkoutSchema.safeParse({ plan: "free" }).success).toBe(false);
  });
});

describe("getFirstIssueMessage", () => {
  it("reports missing fields as required", () => {
    const result = invoiceSchema.safeParse({ ...validInvoice, currency: undefined });
    expect(result.success).toBe(false);
    if (!result.success) expect(getFirstIssueMessage(result.error)).toBe("currency: is required");
  });
});

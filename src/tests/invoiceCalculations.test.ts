import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildClientAddress,
  calculateTotals,
  createEmptyInvoice,
  getDisplayStatus,
  getLineAmount,
  getTotalsBreakdown,
  isPristineInvoice,
  roundMoney,
} from "@/src/lib/invoiceCalculations";
import { TEST_NOW } from "@/src/tests/fixtures";

describe("roundMoney", () => {
  it("rounds to two decimals", () => {
    expect(roundMoney(10.005)).toBe(10.01);
    expect(roundMoney(1.234)).toBe(1.23);
  });
});

describe("getLineAmount", () => {
  it("multiplies quantity by rate and applies the line discount", () => {
    expect(getLineAmount({ quantity: 3, rate: 50, discount: 10 })).toBe(135);
  });

  it("treats missing or invalid numbers as zero", () => {
    expect(getLineAmount({ quantity: NaN, rate: 20, discount: 0 })).toBe(0);
  });
});

describe("getTotalsBreakdown", () => {
  it("applies the overall discount before tax", () => {
    const result = getTotalsBreakdown({ subtotal: 200, overallDiscount: 10, taxRate: 5 });
    expect(result).toEqual({ discountAmount: 20, taxAmount: 9 });
  });
});

describe("calculateTotals", () => {
  it("recomputes line amounts, subtotal and grand total", () => {
    const totals = calculateTotals({
      lineItems: [
        { id: "a", description: "Design", quantity: 2, rate: 100, discount: 0, amount: 0 },
        { id: "b", description: "Hosting", quantity: 1, rate: 50, discount: 50, amount: 0 },
      ],
      overallDiscount: 10,
      taxRate: 20,
    });
    expect(totals.lineItems.map((item) => item.amount)).toEqual([200, 25]);
    expect(totals.subtotal).toBe(225);
    expect(totals.totalAmount).toBe(243);
  });

  it("returns zeros for an invoice without lines", () => {
    expect(calculateTotals({})).toEqual({ lineItems: [], subtotal: 0, totalAmount: 0 });
  });
});

describe("isPristineInvoice", () => {
  it("is true for a fresh invoice and false once a client is entered", () => {
    const invoice = createEmptyInvoice();
    expect(isPristineInvoice(invoice)).toBe(true);
    expect(isPristineInvoice({ ...invoice, clientName: "Acme" })).toBe(false);
  });
});

describe("buildClientAddress", () => {
  it("joins the filled client fields on separate lines", () => {
    const address = buildClientAddress({
      id: "c1",
      name: "Acme",
      address: "1 Main St",
      email: "billing@acme.test",
      phone: null,
      taxId: "GB123",
      notes: null,
      createdAt: "2026-01-01T00:00:00Z",
    });
    expect(address).toBe("1 Main St\nbilling@acme.test\nTax ID: GB123");
  });
});

describe("getDisplayStatus", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(TEST_NOW);
  });
  afterEach(() => vi.useRealTimers());

  it("marks pending invoices past their due date as overdue", () => {
    expect(getDisplayStatus("pending", "2026-06-14")).toBe("overdue");
  });

  it("keeps pending invoices that are due today or later", () => {
    expect(getDisplayStatus("pending", "2026-06-15")).toBe("pending");
  });

  it("never changes paid, draft or cancelled invoices", () => {
    expect(getDisplayStatus("paid", "2020-01-01")).toBe("paid");
    expect(getDisplayStatus("draft", "2020-01-01")).toBe("draft");
  });
});

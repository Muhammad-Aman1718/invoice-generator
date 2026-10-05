import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computeStats, createMonthBuckets, getMainCurrency } from "@/src/lib/stats";
import { makeInvoiceSummary, TEST_NOW } from "@/src/tests/fixtures";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(TEST_NOW);
});
afterEach(() => vi.useRealTimers());

describe("getMainCurrency", () => {
  it("picks the most used currency", () => {
    const invoices = [
      makeInvoiceSummary({ currency: "EUR" }),
      makeInvoiceSummary({ currency: "USD" }),
      makeInvoiceSummary({ currency: "EUR" }),
    ];
    expect(getMainCurrency(invoices, "PKR")).toBe("EUR");
  });

  it("falls back when there are no invoices", () => {
    expect(getMainCurrency([], "PKR")).toBe("PKR");
  });
});

describe("createMonthBuckets", () => {
  it("returns consecutive months ending with the current one", () => {
    const keys = createMonthBuckets(3, TEST_NOW).map((bucket) => bucket.key);
    expect(keys).toEqual(["2026-04", "2026-05", "2026-06"]);
  });
});

describe("computeStats", () => {
  const invoices = [
    makeInvoiceSummary({ id: "1", status: "paid", totalAmount: 300, clientName: "Acme" }),
    makeInvoiceSummary({ id: "2", status: "pending", totalAmount: 200, clientName: "Beta" }),
    makeInvoiceSummary({ id: "3", status: "pending", totalAmount: 50, dueDate: "2026-06-01" }),
    makeInvoiceSummary({ id: "4", status: "draft", totalAmount: 999 }),
    makeInvoiceSummary({ id: "5", status: "paid", totalAmount: 75, currency: "EUR" }),
  ];
  const getStats = () => computeStats(invoices, { fallbackCurrency: "USD", monthCount: 2 });

  it("totals money in the main currency only, excluding drafts", () => {
    const stats = getStats();
    expect(stats.currency).toBe("USD");
    expect(stats.totalInvoiced).toBe(550);
    expect(stats.totalPaid).toBe(300);
    expect(stats.outstanding).toBe(250);
    expect(stats.overdue).toBe(50);
    expect(stats.mixedCurrencies).toBe(true);
  });

  it("counts every invoice by its displayed status", () => {
    const stats = getStats();
    expect(stats.counts).toMatchObject({ paid: 2, pending: 1, overdue: 1, draft: 1 });
  });

  it("buckets amounts by issue month and ranks top clients", () => {
    const stats = getStats();
    expect(stats.monthly).toHaveLength(2);
    expect(stats.monthly[1]).toMatchObject({ invoiced: 550, paid: 300 });
    expect(stats.topClients.map((client) => client.name)).toEqual(["Acme", "Beta", "Acme Ltd"]);
  });
});

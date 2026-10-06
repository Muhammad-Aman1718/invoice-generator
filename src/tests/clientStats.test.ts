import { describe, expect, it } from "vitest";
import { attachClientStats, filterClientInvoices } from "@/src/lib/clientStats";
import { makeInvoiceSummary } from "@/src/tests/fixtures";
import type { Client } from "@/src/types/types";

const client: Client = {
  id: "client-1",
  name: "Acme Ltd",
  email: null,
  phone: null,
  address: null,
  taxId: null,
  notes: null,
  createdAt: "2026-01-01T00:00:00Z",
};

const invoices = [
  makeInvoiceSummary({ id: "linked", clientId: "client-1", clientName: "Renamed", totalAmount: 100 }),
  makeInvoiceSummary({ id: "legacy", clientId: null, clientName: " acme ltd ", totalAmount: 50 }),
  makeInvoiceSummary({ id: "other", clientId: "client-2", clientName: "Acme Ltd", totalAmount: 999 }),
  makeInvoiceSummary({ id: "cancelled", clientId: "client-1", status: "cancelled", totalAmount: 70 }),
];

describe("filterClientInvoices", () => {
  it("matches by client id, or by name for older invoices, and skips cancelled ones", () => {
    expect(filterClientInvoices(invoices, client).map((invoice) => invoice.id)).toEqual(["linked", "legacy"]);
  });
});

describe("attachClientStats", () => {
  it("adds invoice count and total billed", () => {
    const [withStats] = attachClientStats([client], invoices, "EUR");
    expect(withStats).toMatchObject({ invoiceCount: 2, total: 150, currency: "USD" });
  });

  it("uses the fallback currency for clients without invoices", () => {
    const [withStats] = attachClientStats([client], [], "EUR");
    expect(withStats).toMatchObject({ invoiceCount: 0, total: 0, currency: "EUR" });
  });
});

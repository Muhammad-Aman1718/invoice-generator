import type { InvoiceSummary } from "@/src/types/types";

/** Fixed "today" used by date-dependent tests. */
export const TEST_NOW = new Date("2026-06-15T12:00:00Z");

export function makeInvoiceSummary(overrides: Partial<InvoiceSummary> = {}): InvoiceSummary {
  return {
    id: overrides.id ?? "inv-1",
    clientId: null,
    invoiceNumber: 1,
    clientName: "Acme Ltd",
    issueDate: "2026-06-01",
    dueDate: "2026-07-01",
    currency: "USD",
    totalAmount: 100,
    status: "pending",
    createdAt: "2026-06-01T09:00:00Z",
    ...overrides,
  };
}

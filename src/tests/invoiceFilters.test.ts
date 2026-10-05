import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { countByStatus, filterAndSortInvoices, paginate, withDisplayStatus } from "@/src/lib/invoiceFilters";
import { makeInvoiceSummary, TEST_NOW } from "@/src/tests/fixtures";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(TEST_NOW);
});
afterEach(() => vi.useRealTimers());

function buildRows() {
  return withDisplayStatus([
    makeInvoiceSummary({
      id: "a",
      invoiceNumber: 1,
      clientName: "Acme",
      totalAmount: 100,
      createdAt: "2026-01-01",
    }),
    makeInvoiceSummary({
      id: "b",
      invoiceNumber: 2,
      clientName: "Beta",
      totalAmount: 500,
      createdAt: "2026-03-01",
    }),
    makeInvoiceSummary({
      id: "c",
      invoiceNumber: 12,
      clientName: "Gamma",
      totalAmount: 50,
      createdAt: "2026-02-01",
      dueDate: "2026-06-01",
    }),
  ]);
}

describe("withDisplayStatus / countByStatus", () => {
  it("adds the shown status and counts each one", () => {
    const rows = buildRows();
    expect(rows.find((row) => row.id === "c")?.shownStatus).toBe("overdue");
    expect(countByStatus(rows)).toEqual({ all: 3, pending: 2, overdue: 1 });
  });
});

describe("filterAndSortInvoices", () => {
  it("filters by shown status", () => {
    const result = filterAndSortInvoices(buildRows(), { filter: "overdue", query: "", sort: "newest" });
    expect(result.map((row) => row.id)).toEqual(["c"]);
  });

  it("searches by client name or invoice number", () => {
    const byName = filterAndSortInvoices(buildRows(), { filter: "all", query: " beta ", sort: "newest" });
    const byNumber = filterAndSortInvoices(buildRows(), { filter: "all", query: "12", sort: "newest" });
    expect(byName.map((row) => row.id)).toEqual(["b"]);
    expect(byNumber.map((row) => row.id)).toEqual(["c"]);
  });

  it("sorts by date and amount", () => {
    const rows = buildRows();
    const ids = (sort: "newest" | "amount-desc" | "amount-asc") =>
      filterAndSortInvoices(rows, { filter: "all", query: "", sort }).map((row) => row.id);
    expect(ids("newest")).toEqual(["b", "c", "a"]);
    expect(ids("amount-desc")).toEqual(["b", "a", "c"]);
    expect(ids("amount-asc")).toEqual(["c", "a", "b"]);
  });
});

describe("paginate", () => {
  const items = Array.from({ length: 25 }, (_, i) => i);

  it("returns the requested page", () => {
    const { pageItems, pageCount, currentPage } = paginate(items, 2, 10);
    expect(pageItems).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    expect(pageCount).toBe(3);
    expect(currentPage).toBe(2);
  });

  it("clamps out-of-range pages", () => {
    expect(paginate(items, 99, 10).currentPage).toBe(3);
    expect(paginate(items, 0, 10).currentPage).toBe(1);
    expect(paginate([], 1, 10)).toEqual({ pageItems: [], currentPage: 1, pageCount: 1 });
  });
});

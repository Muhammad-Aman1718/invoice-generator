import { getDisplayStatus } from "@/src/lib/invoiceCalculations";
import { FAR_FUTURE_DATE } from "@/src/constant/app";
import type {
  InvoiceComparator,
  InvoiceFilter,
  InvoiceListQuery,
  InvoiceSortKey,
  InvoiceSummary,
  InvoiceSummaryRow,
} from "@/src/types/types";

const comparators: Record<InvoiceSortKey, InvoiceComparator> = {
  newest: (a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""),
  oldest: (a, b) => (a.createdAt ?? "").localeCompare(b.createdAt ?? ""),
  "amount-desc": (a, b) => b.totalAmount - a.totalAmount,
  "amount-asc": (a, b) => a.totalAmount - b.totalAmount,
  due: (a, b) => (a.dueDate || FAR_FUTURE_DATE).localeCompare(b.dueDate || FAR_FUTURE_DATE),
};

export function withDisplayStatus(invoices: InvoiceSummary[]): InvoiceSummaryRow[] {
  return invoices.map((invoice) => ({
    ...invoice,
    shownStatus: getDisplayStatus(invoice.status, invoice.dueDate),
  }));
}

export function countByStatus(rows: InvoiceSummaryRow[]): Partial<Record<InvoiceFilter, number>> {
  const counts: Partial<Record<InvoiceFilter, number>> = { all: rows.length };
  rows.forEach((row) => (counts[row.shownStatus] = (counts[row.shownStatus] ?? 0) + 1));
  return counts;
}

function matchesQuery(row: InvoiceSummaryRow, query: string): boolean {
  return row.clientName.toLowerCase().includes(query) || String(row.invoiceNumber).includes(query);
}

/** Filter by status and search text (client name or number), then sort. */
export function filterAndSortInvoices(
  rows: InvoiceSummaryRow[],
  options: InvoiceListQuery,
): InvoiceSummaryRow[] {
  const query = options.query.trim().toLowerCase();
  return rows
    .filter((row) => options.filter === "all" || row.shownStatus === options.filter)
    .filter((row) => !query || matchesQuery(row, query))
    .sort(comparators[options.sort]);
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), pageCount);
  const start = (currentPage - 1) * pageSize;
  return { pageItems: items.slice(start, start + pageSize), currentPage, pageCount };
}

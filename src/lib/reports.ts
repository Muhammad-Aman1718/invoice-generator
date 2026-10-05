import { DEFAULT_REPORT_RANGE, REPORT_RANGES } from "@/src/constant/reports";
import { NON_BILLABLE_STATUSES } from "@/src/constant/invoice";
import { getUtcIsoDate } from "@/src/lib/dateUtils";
import type { InvoiceSummary, ReportRangeKey } from "@/src/types/types";

export function parseReportRange(value: string | undefined): ReportRangeKey {
  return value && value in REPORT_RANGES ? (value as ReportRangeKey) : DEFAULT_REPORT_RANGE;
}

/** Invoices issued inside the selected range (all of them for "all time"). */
export function filterInvoicesByRange(invoices: InvoiceSummary[], range: ReportRangeKey): InvoiceSummary[] {
  const { days } = REPORT_RANGES[range];
  if (!days) return invoices;
  const cutoff = getUtcIsoDate(-days);
  return invoices.filter((invoice) => (invoice.issueDate || invoice.createdAt || "") >= cutoff);
}

export function countBillable(invoices: InvoiceSummary[], currency: string): number {
  return invoices.filter((i) => !NON_BILLABLE_STATUSES.includes(i.status) && i.currency === currency).length;
}

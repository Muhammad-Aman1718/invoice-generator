import { AlertTriangle, CheckCircle2, Clock, FileEdit, XCircle, type LucideIcon } from "lucide-react";
import type {
  DocumentTitle,
  InvoiceData,
  InvoiceFilter,
  InvoiceListQuery,
  InvoiceSortKey,
  InvoiceStatus,
} from "@/src/types/types";

export const INVOICE_STATUSES: [InvoiceStatus, ...InvoiceStatus[]] = [
  "draft",
  "pending",
  "paid",
  "overdue",
  "cancelled",
];

/** "Overdue" is derived from the due date, so users never pick it by hand. */
export const EDITABLE_STATUSES = INVOICE_STATUSES.filter((s) => s !== "overdue");

export const STATUS_META: Record<InvoiceStatus, { label: string; className: string; icon: LucideIcon }> = {
  draft: { label: "Draft", className: "bg-slate-100 text-slate-700", icon: FileEdit },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-900", icon: Clock },
  paid: { label: "Paid", className: "bg-emerald-100 text-emerald-800", icon: CheckCircle2 },
  overdue: { label: "Overdue", className: "bg-red-100 text-red-700", icon: AlertTriangle },
  cancelled: { label: "Cancelled", className: "bg-slate-200 text-slate-600", icon: XCircle },
};

export const INVOICE_FILTERS: InvoiceFilter[] = ["all", "pending", "overdue", "paid", "draft", "cancelled"];

export const INVOICE_SORT_OPTIONS: { value: InvoiceSortKey; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "due", label: "Due date" },
  { value: "amount-desc", label: "Amount: high → low" },
  { value: "amount-asc", label: "Amount: low → high" },
];

/** Quick status changes offered in the invoice action menu. */
export const QUICK_STATUS_ACTIONS: { status: InvoiceStatus; icon: LucideIcon; tone: string }[] = [
  { status: "paid", icon: CheckCircle2, tone: "text-emerald-600" },
  { status: "pending", icon: Clock, tone: "text-amber-600" },
  { status: "cancelled", icon: XCircle, tone: "text-slate-500" },
];

export const REPORT_STATUS_ORDER: InvoiceStatus[] = ["paid", "pending", "overdue", "draft", "cancelled"];

export const EMPTY_STATUS_COUNTS: Record<InvoiceStatus, number> = {
  draft: 0,
  pending: 0,
  paid: 0,
  overdue: 0,
  cancelled: 0,
};

export const DEFAULT_INVOICE_LIST_QUERY: InvoiceListQuery = { filter: "all", query: "", sort: "newest" };

/** Column headers of the editable line-items table. */
export const LINE_ITEM_COLUMNS = [
  { label: "Description", className: "text-left" },
  { label: "Qty", className: "text-right" },
  { label: "Rate", className: "text-right" },
  { label: "Disc %", className: "text-right" },
  { label: "Amount", className: "text-right" },
];

/** Column headers of the read-only invoice preview. */
/** Statuses for which a payment reminder makes sense. */
export const REMINDER_STATUSES: InvoiceStatus[] = ["pending", "overdue"];

/** A4 width at 96 dpi; the HTML preview is laid out at this width and scaled to fit. */
export const INVOICE_SHEET_WIDTH = 794;

export const PREVIEW_COLUMNS = [
  { label: "Description", className: "w-[44%] text-left" },
  { label: "Qty", className: "w-[9%] text-center" },
  { label: "Unit Rate", className: "w-[17%] text-right" },
  { label: "Disc %", className: "w-[10%] text-center" },
  { label: "Amount", className: "w-[20%] text-right" },
];

export const INVOICE_SUMMARY_COLUMNS =
  "id, client_id, invoice_number, client_name, issue_date, due_date, currency, total_amount, status, created_at";

export const INVOICE_CSV_HEADER = [
  "Invoice #",
  "Client",
  "Issue date",
  "Due date",
  "Status",
  "Currency",
  "Total",
];

/** Counted by status but excluded from money totals. */
export const NON_BILLABLE_STATUSES: InvoiceStatus[] = ["cancelled", "draft"];

/** Store fields whose change requires recomputing totals. */
export const FIELDS_AFFECTING_TOTALS: (keyof InvoiceData)[] = ["overallDiscount", "taxRate", "lineItems"];

/** Document headings; several countries require the words "Tax invoice" on VAT/GST invoices. */
export const DOCUMENT_TITLES: { value: DocumentTitle; label: string; hint: string }[] = [
  { value: "invoice", label: "Invoice", hint: "Standard invoice" },
  { value: "tax_invoice", label: "Tax invoice", hint: "VAT / GST registered sellers" },
  { value: "proforma", label: "Proforma invoice", hint: "Quote before the work or shipment" },
];

export const DOCUMENT_TITLE_VALUES = DOCUMENT_TITLES.map((title) => title.value) as [
  DocumentTitle,
  ...DocumentTitle[],
];
export const DEFAULT_DOCUMENT_TITLE: DocumentTitle = "invoice";
export const DEFAULT_TAX_LABEL = "Tax";

export function getDocumentTitleLabel(value: DocumentTitle | undefined): string {
  return DOCUMENT_TITLES.find((title) => title.value === value)?.label ?? DOCUMENT_TITLES[0].label;
}

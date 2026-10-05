import { AlertTriangle, CheckCircle2, Clock, FileEdit, XCircle, type LucideIcon } from "lucide-react";
import type {
  InvoiceData,
  InvoiceFilter,
  InvoiceListQuery,
  InvoiceSortKey,
  InvoiceStatus,
  Tab,
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
  { label: "Description", className: "w-[38%] text-left px-3 sm:px-4" },
  { label: "Qty", className: "w-[10%] text-center px-2 sm:px-3" },
  { label: "Rate", className: "w-[16%] text-center px-2 sm:px-3" },
  { label: "Disc %", className: "w-[12%] text-center px-2 sm:px-3" },
  { label: "Amount", className: "w-[16%] text-right px-3 sm:px-4" },
];

/** Column headers of the read-only invoice preview. */
export const PREVIEW_COLUMNS = [
  { label: "Description", className: "w-[40%] text-left" },
  { label: "Qty", className: "w-[8%] text-center" },
  { label: "Unit Rate", className: "w-[15%] text-right" },
  { label: "Disc %", className: "w-[9%] text-center" },
  { label: "Amount", className: "w-[16%] text-right" },
];

export const EDITOR_TABS: Tab[] = ["edit", "preview"];

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

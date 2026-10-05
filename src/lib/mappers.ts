// Conversions between database rows (snake_case) and app objects (camelCase).
// Shared by API routes and server components so the mapping lives in one place.

import { getPlan } from "@/src/config/plans";
import type {
  Client,
  DBInvoiceRow,
  InvoiceData,
  InvoiceStatus,
  InvoiceSummary,
  Profile,
  Subscription,
} from "@/src/types/invoice-types";
import { INVOICE_STATUSES } from "@/src/types/invoice-types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;

function normalizeStatus(value: unknown): InvoiceStatus {
  if (value === "sent") return "pending";
  return INVOICE_STATUSES.includes(value as InvoiceStatus)
    ? (value as InvoiceStatus)
    : "pending";
}

export function rowToInvoice(row: DBInvoiceRow): InvoiceData & { id: string } {
  return {
    id: row.id!,
    userId: row.user_id,
    clientId: row.client_id ?? null,
    logoDataUrl: row.logo_data_url ?? null,
    stampUrl: row.stamp_url ?? null,
    invoiceNumber: Number(row.invoice_number) || 0,
    currency: row.currency || "USD",
    businessName: row.business_name ?? "",
    bussinessInfo: row.bussiness_info ?? "",
    issueDate: row.issue_date ?? "",
    dueDate: row.due_date ?? "",
    poNumber: row.po_number ?? "",
    clientName: row.client_name ?? "",
    clientAddress: row.client_address ?? "",
    shipTo: row.ship_to ?? "",
    lineItems: Array.isArray(row.line_items) ? row.line_items : [],
    notes: row.notes ?? "",
    terms: row.terms ?? "",
    subtotal: Number(row.subtotal) || 0,
    overallDiscount: Number(row.overall_discount) || 0,
    taxRate: Number(row.tax_rate) || 0,
    totalAmount: Number(row.total_amount) || 0,
    status: normalizeStatus(row.status),
    paidAt: row.paid_at ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const INVOICE_SUMMARY_COLUMNS =
  "id, client_id, invoice_number, client_name, issue_date, due_date, currency, total_amount, status, created_at";

export function rowToInvoiceSummary(row: Row): InvoiceSummary {
  return {
    id: row.id,
    clientId: row.client_id ?? null,
    invoiceNumber: Number(row.invoice_number) || 0,
    clientName: row.client_name ?? "",
    issueDate: row.issue_date ?? "",
    dueDate: row.due_date ?? "",
    currency: row.currency || "USD",
    totalAmount: Number(row.total_amount) || 0,
    status: normalizeStatus(row.status),
    createdAt: row.created_at,
  };
}

/** Build the DB payload for insert/update from (validated) invoice input. */
export function invoiceToRow(data: Partial<InvoiceData>): Row {
  const map: Record<string, unknown> = {
    client_id: data.clientId,
    invoice_number: data.invoiceNumber,
    logo_data_url: data.logoDataUrl,
    stamp_url: data.stampUrl,
    currency: data.currency,
    business_name: data.businessName,
    bussiness_info: data.bussinessInfo,
    issue_date: data.issueDate || (data.issueDate === "" ? null : undefined),
    due_date: data.dueDate || (data.dueDate === "" ? null : undefined),
    po_number: data.poNumber,
    client_name: data.clientName,
    client_address: data.clientAddress,
    ship_to: data.shipTo,
    line_items: data.lineItems,
    notes: data.notes,
    terms: data.terms,
    subtotal: data.subtotal,
    overall_discount: data.overallDiscount,
    tax_rate: data.taxRate,
    total_amount: data.totalAmount,
    status: data.status,
  };
  if (data.status === "paid") map.paid_at = new Date().toISOString();
  else if (data.status) map.paid_at = null;
  return Object.fromEntries(
    Object.entries(map).filter(([, v]) => v !== undefined),
  );
}

export function rowToClient(row: Row): Client {
  return {
    id: row.id,
    name: row.name ?? "",
    email: row.email ?? null,
    phone: row.phone ?? null,
    address: row.address ?? null,
    taxId: row.tax_id ?? null,
    notes: row.notes ?? null,
    createdAt: row.created_at,
  };
}

export function rowToProfile(row: Row): Profile {
  return {
    id: row.id,
    email: row.email ?? null,
    fullName: row.full_name ?? null,
    role: row.role === "admin" ? "admin" : "user",
    companyName: row.company_name ?? null,
    businessInfo: row.business_info ?? null,
    logoDataUrl: row.logo_data_url ?? null,
    defaultCurrency: row.default_currency || "USD",
    defaultTaxRate: Number(row.default_tax_rate) || 0,
    defaultNotes: row.default_notes ?? null,
    defaultTerms: row.default_terms ?? null,
    paymentTermsDays: Number(row.payment_terms_days ?? 14),
    isSuspended: Boolean(row.is_suspended),
    createdAt: row.created_at,
  };
}

export function rowToSubscription(row: Row | null | undefined): Subscription {
  const now = Date.now();
  const expired =
    row?.current_period_end && new Date(row.current_period_end).getTime() < now;
  const usable =
    row && ["active", "trialing"].includes(row.status) && !expired;
  return {
    plan: usable ? getPlan(row.plan).id : "free",
    status: row?.status ?? "active",
    billingInterval: row?.billing_interval === "year" ? "year" : "month",
    currentPeriodEnd: row?.current_period_end ?? null,
    cancelAtPeriodEnd: Boolean(row?.cancel_at_period_end),
    provider: row?.provider ?? "manual",
    hasBillingPortal: Boolean(row?.provider === "stripe" && row?.provider_customer_id),
  };
}

/** Pending invoices whose due date has passed are shown as overdue. */
export function displayStatus(
  status: InvoiceStatus,
  dueDate?: string | null,
): InvoiceStatus {
  if (status === "pending" && dueDate) {
    const today = new Date().toISOString().slice(0, 10);
    if (dueDate < today) return "overdue";
  }
  return status;
}

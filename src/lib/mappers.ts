// Conversions between database rows (snake_case) and app objects (camelCase),
// shared by API routes and server components.

import type {
  Client,
  DBInvoiceRow,
  DbRow,
  InvoiceData,
  InvoiceStatus,
  InvoiceSummary,
  Profile,
  Subscription,
} from "@/src/types/types";
import { INVOICE_STATUSES } from "@/src/constant/invoice";
import { DEFAULT_CURRENCY } from "@/src/constant/currencies";
import { DEFAULT_PAYMENT_TERMS_DAYS } from "@/src/constant/app";
import { USABLE_SUBSCRIPTION_STATUSES } from "@/src/constant/billing";
import { getPlan } from "@/src/lib/plans";

function toStatus(value: unknown): InvoiceStatus {
  // Rows created by the v1 schema used "sent".
  if (value === "sent") return "pending";
  return INVOICE_STATUSES.includes(value as InvoiceStatus) ? (value as InvoiceStatus) : "pending";
}

export function rowToInvoice(row: DBInvoiceRow): InvoiceData & { id: string } {
  return {
    id: row.id!,
    userId: row.user_id,
    clientId: row.client_id ?? null,
    logoDataUrl: row.logo_data_url ?? null,
    stampUrl: row.stamp_url ?? null,
    invoiceNumber: Number(row.invoice_number) || 0,
    currency: row.currency || DEFAULT_CURRENCY,
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
    status: toStatus(row.status),
    paidAt: row.paid_at ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function rowToInvoiceSummary(row: DbRow): InvoiceSummary {
  return {
    id: row.id,
    clientId: row.client_id ?? null,
    invoiceNumber: Number(row.invoice_number) || 0,
    clientName: row.client_name ?? "",
    issueDate: row.issue_date ?? "",
    dueDate: row.due_date ?? "",
    currency: row.currency || DEFAULT_CURRENCY,
    totalAmount: Number(row.total_amount) || 0,
    status: toStatus(row.status),
    createdAt: row.created_at,
  };
}

function dropUndefined(record: DbRow): DbRow {
  return Object.fromEntries(Object.entries(record).filter(([, v]) => v !== undefined));
}

/** Empty date strings are stored as NULL; missing ones are left untouched. */
function toDateColumn(value: string | undefined): string | null | undefined {
  if (value === undefined) return undefined;
  return value || null;
}

function getPaidAt(status: InvoiceStatus | undefined): string | null | undefined {
  if (!status) return undefined;
  return status === "paid" ? new Date().toISOString() : null;
}

/** Build the DB payload for insert/update from validated invoice input. */
export function invoiceToRow(data: Partial<InvoiceData>): DbRow {
  return dropUndefined({
    client_id: data.clientId,
    invoice_number: data.invoiceNumber,
    logo_data_url: data.logoDataUrl,
    stamp_url: data.stampUrl,
    currency: data.currency,
    business_name: data.businessName,
    bussiness_info: data.bussinessInfo,
    issue_date: toDateColumn(data.issueDate),
    due_date: toDateColumn(data.dueDate),
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
    paid_at: getPaidAt(data.status),
  });
}

export function rowToClient(row: DbRow): Client {
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

/** Client form/API input → DB columns (blank email becomes NULL). */
export function clientToRow(data: Partial<Client>): DbRow {
  return dropUndefined({
    name: data.name,
    email: data.email === undefined ? undefined : data.email || null,
    phone: data.phone,
    address: data.address,
    tax_id: data.taxId,
    notes: data.notes,
  });
}

export function rowToProfile(row: DbRow): Profile {
  return {
    id: row.id,
    email: row.email ?? null,
    fullName: row.full_name ?? null,
    role: row.role === "admin" ? "admin" : "user",
    companyName: row.company_name ?? null,
    businessInfo: row.business_info ?? null,
    logoDataUrl: row.logo_data_url ?? null,
    defaultCurrency: row.default_currency || DEFAULT_CURRENCY,
    defaultTaxRate: Number(row.default_tax_rate) || 0,
    defaultNotes: row.default_notes ?? null,
    defaultTerms: row.default_terms ?? null,
    paymentTermsDays: Number(row.payment_terms_days ?? DEFAULT_PAYMENT_TERMS_DAYS),
    isSuspended: Boolean(row.is_suspended),
    createdAt: row.created_at,
  };
}

export function profileToRow(data: Partial<Profile>): DbRow {
  return dropUndefined({
    full_name: data.fullName,
    company_name: data.companyName,
    business_info: data.businessInfo,
    logo_data_url: data.logoDataUrl,
    default_currency: data.defaultCurrency,
    default_tax_rate: data.defaultTaxRate,
    default_notes: data.defaultNotes,
    default_terms: data.defaultTerms,
    payment_terms_days: data.paymentTermsDays,
  });
}

function isSubscriptionUsable(row: DbRow): boolean {
  const expired = row.current_period_end && new Date(row.current_period_end).getTime() < Date.now();
  return USABLE_SUBSCRIPTION_STATUSES.includes(row.status) && !expired;
}

export function rowToSubscription(row: DbRow | null | undefined): Subscription {
  return {
    plan: row && isSubscriptionUsable(row) ? getPlan(row.plan).id : "free",
    status: row?.status ?? "active",
    billingInterval: row?.billing_interval === "year" ? "year" : "month",
    currentPeriodEnd: row?.current_period_end ?? null,
    cancelAtPeriodEnd: Boolean(row?.cancel_at_period_end),
    provider: row?.provider ?? "manual",
    hasBillingPortal: Boolean(row?.provider === "stripe" && row?.provider_customer_id),
  };
}

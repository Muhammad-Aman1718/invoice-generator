import type {
  Client,
  InvoiceData,
  InvoiceStatus,
  InvoiceTotals,
  LineItem,
  TotalsBreakdown,
} from "@/src/types/types";
import { getLocalIsoDate } from "@/src/lib/dateUtils";
import { DEFAULT_CURRENCY } from "@/src/constant/currencies";
import { DEFAULT_PAYMENT_TERMS_DAYS, FULL_PERCENT } from "@/src/constant/app";

export function roundMoney(value: number): number {
  return Math.round(value * FULL_PERCENT) / FULL_PERCENT;
}

export function getLineAmount(item: Pick<LineItem, "quantity" | "rate" | "discount">): number {
  const gross = (Number(item.quantity) || 0) * (Number(item.rate) || 0);
  return roundMoney(gross * (1 - (Number(item.discount) || 0) / FULL_PERCENT));
}

/** Discount and tax amounts: the overall discount applies first, tax on the remainder. */
export function getTotalsBreakdown(
  invoice: Pick<InvoiceData, "subtotal" | "overallDiscount" | "taxRate">,
): TotalsBreakdown {
  const discountAmount = roundMoney(invoice.subtotal * ((invoice.overallDiscount || 0) / FULL_PERCENT));
  const taxable = invoice.subtotal - discountAmount;
  const taxAmount = roundMoney(taxable * ((invoice.taxRate || 0) / FULL_PERCENT));
  return { discountAmount, taxAmount };
}

/** Recompute every line amount, the subtotal and the grand total. */
export function calculateTotals(invoice: Partial<InvoiceData>): InvoiceTotals {
  const lineItems = (invoice.lineItems ?? []).map((item) => ({
    ...item,
    amount: getLineAmount(item),
  }));
  const subtotal = roundMoney(lineItems.reduce((sum, item) => sum + item.amount, 0));
  const { discountAmount, taxAmount } = getTotalsBreakdown({
    subtotal,
    overallDiscount: Number(invoice.overallDiscount) || 0,
    taxRate: Number(invoice.taxRate) || 0,
  });
  return { lineItems, subtotal, totalAmount: roundMoney(subtotal - discountAmount + taxAmount) };
}

function generateId(): string {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 11);
}

export function createLineItem(): LineItem {
  return { id: generateId(), description: "", quantity: 1, rate: 0, discount: 0, amount: 0 };
}

export function createEmptyInvoice(paymentTermsDays = DEFAULT_PAYMENT_TERMS_DAYS): InvoiceData {
  return {
    id: undefined,
    clientId: null,
    logoDataUrl: null,
    stampUrl: null,
    invoiceNumber: 1,
    currency: DEFAULT_CURRENCY,
    businessName: "",
    bussinessInfo: "",
    issueDate: getLocalIsoDate(),
    dueDate: getLocalIsoDate(paymentTermsDays),
    poNumber: "",
    clientName: "",
    clientAddress: "",
    shipTo: "",
    lineItems: [createLineItem()],
    notes: "",
    terms: "",
    subtotal: 0,
    overallDiscount: 0,
    taxRate: 0,
    totalAmount: 0,
    status: "pending",
  };
}

/** True when the user hasn't typed anything worth keeping yet. */
export function isPristineInvoice(invoice: InvoiceData): boolean {
  const emptyLines = invoice.lineItems.every((item) => !item.description && !Number(item.rate));
  return !invoice.clientName && !invoice.clientAddress && !invoice.notes && emptyLines;
}

/** Multi-line "Bill To" text built from a saved client. */
export function buildClientAddress(client: Client): string {
  const taxLine = client.taxId ? `Tax ID: ${client.taxId}` : null;
  return [client.address, client.email, client.phone, taxLine].filter(Boolean).join("\n");
}

/** Pending invoices whose due date has passed are shown as overdue. */
export function getDisplayStatus(status: InvoiceStatus, dueDate?: string | null): InvoiceStatus {
  if (status !== "pending" || !dueDate) return status;
  const today = new Date().toISOString().slice(0, 10);
  return dueDate < today ? "overdue" : status;
}

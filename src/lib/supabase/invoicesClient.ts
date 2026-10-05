import type { InvoiceData } from "@/src/types/types";
import { api } from "@/src/lib/apiClient";
import { roundMoney } from "@/src/lib/invoiceCalculations";

/** Strip zustand actions and UI-only fields so only invoice data is sent. */
export function toInvoicePayload(data: InvoiceData): InvoiceData {
  return {
    clientId: data.clientId ?? null,
    logoDataUrl: data.logoDataUrl ?? null,
    stampUrl: data.stampUrl ?? null,
    invoiceNumber: Number(data.invoiceNumber) || 0,
    currency: data.currency,
    businessName: data.businessName ?? "",
    bussinessInfo: data.bussinessInfo ?? "",
    issueDate: data.issueDate ?? "",
    dueDate: data.dueDate ?? "",
    poNumber: data.poNumber ?? "",
    clientName: data.clientName ?? "",
    clientAddress: data.clientAddress ?? "",
    shipTo: data.shipTo ?? "",
    lineItems: (data.lineItems ?? []).map((item) => ({
      id: item.id,
      description: item.description ?? "",
      quantity: Number(item.quantity) || 0,
      rate: Number(item.rate) || 0,
      discount: Number(item.discount) || 0,
      amount: roundMoney(Number(item.amount) || 0),
    })),
    notes: data.notes ?? "",
    terms: data.terms ?? "",
    subtotal: roundMoney(Number(data.subtotal) || 0),
    overallDiscount: Number(data.overallDiscount) || 0,
    taxRate: Number(data.taxRate) || 0,
    totalAmount: roundMoney(Number(data.totalAmount) || 0),
    status: data.status ?? "pending",
  };
}

/** Create the invoice, or update it when it already has an id. */
export async function saveInvoice(data: InvoiceData): Promise<{ id: string }> {
  const payload = toInvoicePayload(data);
  const { invoice } = data.id
    ? await api.invoices.update(data.id, payload)
    : await api.invoices.create(payload);
  return invoice;
}

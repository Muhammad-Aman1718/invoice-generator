import type { InvoiceData } from "@/src/types/invoice-types";
import { api } from "@/src/lib/api-client";

/** Strip zustand actions / UI-only fields so only invoice data is sent. */
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
      amount: Math.round((Number(item.amount) || 0) * 100) / 100,
    })),
    notes: data.notes ?? "",
    terms: data.terms ?? "",
    subtotal: Math.round((Number(data.subtotal) || 0) * 100) / 100,
    overallDiscount: Number(data.overallDiscount) || 0,
    taxRate: Number(data.taxRate) || 0,
    totalAmount: Math.round((Number(data.totalAmount) || 0) * 100) / 100,
    status: data.status ?? "pending",
  };
}

export async function saveInvoiceToDb(data: InvoiceData): Promise<{ id: string }> {
  const payload = toInvoicePayload(data);
  const { invoice } = data.id
    ? await api.invoices.update(data.id, payload)
    : await api.invoices.create(payload);
  return invoice;
}

export async function fetchInvoiceById(id: string) {
  try {
    const { invoice } = await api.invoices.get(id);
    return invoice;
  } catch {
    return null;
  }
}

export async function deleteInvoiceFromDb(id: string) {
  await api.invoices.remove(id);
  return { success: true };
}

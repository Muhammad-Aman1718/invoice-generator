import { createElement, type ReactElement } from "react";
import { pdf, type DocumentProps } from "@react-pdf/renderer";
import InvoicePdfDocument from "@/src/components/invoice/pdf/InvoicePdfDocument";
import { calculateTotals } from "@/src/lib/invoiceCalculations";
import { getCurrency } from "@/src/lib/format";
import { OBJECT_URL_REVOKE_DELAY_MS } from "@/src/constant/app";
import { DEFAULT_DOCUMENT_TITLE, DEFAULT_TAX_LABEL } from "@/src/constant/invoice";
import type { InvoiceData, InvoicePdfDocumentProps } from "@/src/types/types";

/** Normalise any invoice-like object (store state or API data) for the PDF. */
export function buildInvoiceData(source: Partial<InvoiceData>): InvoiceData {
  const totals = calculateTotals(source);
  const currency = getCurrency(source.currency ?? "");
  return {
    logoDataUrl: source.logoDataUrl ?? null,
    stampUrl: source.stampUrl ?? null,
    invoiceNumber: Number(source.invoiceNumber) || 0,
    currency: currency.code,
    currencySymbol: currency.symbol,
    businessName: source.businessName ?? "",
    bussinessInfo: source.bussinessInfo ?? "",
    issueDate: source.issueDate ?? "",
    dueDate: source.dueDate ?? "",
    poNumber: source.poNumber ?? "",
    clientName: source.clientName ?? "",
    clientAddress: source.clientAddress ?? "",
    shipTo: source.shipTo ?? "",
    lineItems: totals.lineItems,
    notes: source.notes ?? "",
    terms: source.terms ?? "",
    paymentDetails: source.paymentDetails ?? "",
    documentTitle: source.documentTitle ?? DEFAULT_DOCUMENT_TITLE,
    taxLabel: source.taxLabel || DEFAULT_TAX_LABEL,
    subtotal: totals.subtotal,
    overallDiscount: Number(source.overallDiscount) || 0,
    taxRate: Number(source.taxRate) || 0,
    totalAmount: totals.totalAmount,
    status: source.status ?? "pending",
  };
}

const MAX_FILE_NAME_CLIENT_LENGTH = 40;

/** e.g. "invoice1042GlobexLtd.pdf" */
export function getPdfFileName(invoice: Pick<InvoiceData, "invoiceNumber" | "clientName">): string {
  const client = (invoice.clientName ?? "").replace(/[^a-z0-9]+/gi, "").slice(0, MAX_FILE_NAME_CLIENT_LENGTH);
  return `invoice${invoice.invoiceNumber || Date.now()}${client}.pdf`;
}

function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), OBJECT_URL_REVOKE_DELAY_MS);
}

/** Render the invoice to PDF in the browser and download it. */
export async function downloadInvoicePdf({ invoice, branding }: InvoicePdfDocumentProps): Promise<void> {
  const data = buildInvoiceData(invoice);
  const pdfDocument = createElement(InvoicePdfDocument, { invoice: data, branding });
  const blob = await pdf(pdfDocument as ReactElement<DocumentProps>).toBlob();
  triggerDownload(blob, getPdfFileName(data));
}

import { createEmptyInvoice } from "@/src/lib/invoiceCalculations";
import { INVOICE_NUMBER_EVENT, STORAGE_KEYS } from "@/src/constant/app";
import { MAX_INVOICE_NUMBER } from "@/src/constant/limits";
import type { InvoiceData } from "@/src/types/types";

/** Highest invoice number downloaded in this browser, or 0. Survives closing the site. */
export function readLastIssuedNumber(): number {
  try {
    const value = Number(window.localStorage.getItem(STORAGE_KEYS.lastInvoiceNumber));
    return Number.isInteger(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

/** Remember a downloaded number; only ever moves forward, so a typed-in lower number is ignored. */
export function recordIssuedNumber(invoiceNumber: number): void {
  if (!invoiceNumber || invoiceNumber <= readLastIssuedNumber()) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.lastInvoiceNumber, String(invoiceNumber));
    window.dispatchEvent(new Event(INVOICE_NUMBER_EVENT));
  } catch {
    // Private mode or storage disabled: numbering just won't carry over.
  }
}

export function getNextInvoiceNumber(lastIssued: number): number {
  return Math.min(lastIssued + 1, MAX_INVOICE_NUMBER);
}

/** The next invoice keeps who you are and how you bill; client, items and dates start fresh. */
export function buildNextInvoice(current: InvoiceData, invoiceNumber: number): InvoiceData {
  return {
    ...createEmptyInvoice(),
    invoiceNumber,
    logoDataUrl: current.logoDataUrl,
    stampUrl: current.stampUrl,
    businessName: current.businessName,
    bussinessInfo: current.bussinessInfo,
    currency: current.currency,
    documentTitle: current.documentTitle,
    taxRate: current.taxRate,
    taxLabel: current.taxLabel,
    notes: current.notes,
    terms: current.terms,
    paymentDetails: current.paymentDetails,
  };
}

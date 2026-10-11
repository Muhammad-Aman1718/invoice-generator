import { calculateTotals, createEmptyInvoice } from "@/src/lib/invoiceCalculations";
import { SAMPLE_INVOICE_DRAFT } from "@/src/constant/marketing";
import type { InvoiceData } from "@/src/types/types";

/** The marketing sample invoice with its totals calculated by the real invoice maths. */
export function getSampleInvoice(): InvoiceData {
  const invoice = { ...createEmptyInvoice(), ...SAMPLE_INVOICE_DRAFT };
  return { ...invoice, ...calculateTotals(invoice) };
}

import { DEFAULT_TAX_LABEL, getDocumentTitleLabel } from "@/src/constant/invoice";
import type { InvoiceData } from "@/src/types/types";

/** Non-empty notes / terms, in print order. Shared by the HTML preview and the PDF. */
export function getNoteSections(invoice: Pick<InvoiceData, "notes" | "terms">) {
  return [
    { label: "Notes", text: invoice.notes?.trim() ?? "" },
    { label: "Terms & conditions", text: invoice.terms?.trim() ?? "" },
  ].filter((section) => section.text);
}

/** "VAT (20%)", "GST (18%)" — falls back to "Tax". */
export function getTaxLineLabel(invoice: Pick<InvoiceData, "taxLabel" | "taxRate">): string {
  return `${invoice.taxLabel?.trim() || DEFAULT_TAX_LABEL} (${invoice.taxRate}%)`;
}

/** Heading printed at the top of the document, upper-cased. */
export function getDocumentHeading(invoice: Pick<InvoiceData, "documentTitle">): string {
  return getDocumentTitleLabel(invoice.documentTitle).toUpperCase();
}

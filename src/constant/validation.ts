import { FIELD_LIMITS } from "@/src/constant/limits";
import type { InvoiceTextRule } from "@/src/types/types";

/** Text fields of the invoice form, in the order errors are listed. `id` is the input's DOM id. */
export const INVOICE_TEXT_RULES: InvoiceTextRule[] = [
  {
    id: "businessName",
    key: "businessName",
    label: "Business name",
    max: FIELD_LIMITS.businessName,
    required: true,
  },
  { id: "businessInfo", key: "bussinessInfo", label: "Business details", max: FIELD_LIMITS.address },
  {
    id: "clientName",
    key: "clientName",
    label: "Client name",
    max: FIELD_LIMITS.businessName,
    required: true,
  },
  { id: "clientAddress", key: "clientAddress", label: "Client details", max: FIELD_LIMITS.address },
  { id: "shipTo", key: "shipTo", label: "Ship to", max: FIELD_LIMITS.shipTo },
  { id: "poNumber", key: "poNumber", label: "PO number", max: FIELD_LIMITS.poNumber },
  { id: "notes", key: "notes", label: "Notes", max: FIELD_LIMITS.notes },
  { id: "terms", key: "terms", label: "Terms", max: FIELD_LIMITS.notes },
];

export const VALIDATION_MESSAGES = {
  invoiceNumber: "Use an invoice number between 1 and 999,999,999.",
  issueDate: "Choose the date this invoice is issued.",
  dueBeforeIssue: "The due date can't be before the issue date.",
  noItems: "Add at least one item with a description.",
  itemDescription: "Describe this item, or remove the row.",
  itemQuantity: "Quantity is too large.",
  itemRate: "Rate is too large.",
  total: "The invoice total is too large. Split it into smaller invoices.",
};

/** DOM ids of line-item inputs (index-based, so they stay unique per row). */
export const LINE_ITEM_FIELD_IDS = {
  description: (index: number) => `itemDescription${index}`,
  quantity: (index: number) => `itemQuantity${index}`,
  rate: (index: number) => `itemRate${index}`,
};

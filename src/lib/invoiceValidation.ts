import { INVOICE_TEXT_RULES, LINE_ITEM_FIELD_IDS, VALIDATION_MESSAGES } from "@/src/constant/validation";
import { FIELD_LIMITS, MAX_INVOICE_NUMBER, MAX_MONEY_AMOUNT, MAX_QUANTITY } from "@/src/constant/limits";
import type { InvoiceData, InvoiceFieldErrors, LineItem } from "@/src/types/types";

export function getTooLongMessage(label: string, max: number, length: number): string {
  return `${label} can be at most ${max} characters (now ${length}).`;
}

function checkTextFields(invoice: InvoiceData, errors: InvoiceFieldErrors) {
  for (const rule of INVOICE_TEXT_RULES) {
    const value = String(invoice[rule.key] ?? "");
    if (rule.required && !value.trim()) errors[rule.id] = `${rule.label} is required.`;
    else if (value.length > rule.max) errors[rule.id] = getTooLongMessage(rule.label, rule.max, value.length);
  }
}

function checkHeader(invoice: InvoiceData, errors: InvoiceFieldErrors) {
  const number = invoice.invoiceNumber;
  if (!Number.isInteger(number) || number < 1 || number > MAX_INVOICE_NUMBER) {
    errors.invoiceNumber = VALIDATION_MESSAGES.invoiceNumber;
  }
  if (!invoice.issueDate) errors.issueDate = VALIDATION_MESSAGES.issueDate;
  else if (invoice.dueDate && invoice.dueDate < invoice.issueDate) {
    errors.dueDate = VALIDATION_MESSAGES.dueBeforeIssue;
  }
}

function checkLineItem(item: LineItem, index: number, errors: InvoiceFieldErrors) {
  const ids = LINE_ITEM_FIELD_IDS;
  const description = item.description ?? "";
  if (!description.trim() && Number(item.rate) > 0)
    errors[ids.description(index)] = VALIDATION_MESSAGES.itemDescription;
  if (description.length > FIELD_LIMITS.lineDescription) {
    errors[ids.description(index)] = getTooLongMessage(
      "Item description",
      FIELD_LIMITS.lineDescription,
      description.length,
    );
  }
  if (Number(item.quantity) > MAX_QUANTITY) errors[ids.quantity(index)] = VALIDATION_MESSAGES.itemQuantity;
  if (Number(item.rate) > MAX_MONEY_AMOUNT) errors[ids.rate(index)] = VALIDATION_MESSAGES.itemRate;
}

function checkLineItems(invoice: InvoiceData, errors: InvoiceFieldErrors) {
  invoice.lineItems.forEach((item, index) => checkLineItem(item, index, errors));
  const hasDescribedItem = invoice.lineItems.some((item) => item.description?.trim());
  const firstId = LINE_ITEM_FIELD_IDS.description(0);
  if (!hasDescribedItem && !errors[firstId]) errors[firstId] = VALIDATION_MESSAGES.noItems;
  if (invoice.totalAmount > MAX_MONEY_AMOUNT) errors[firstId] = VALIDATION_MESSAGES.total;
}

/**
 * Everything wrong with an invoice draft, keyed by input id, in form order.
 * Empty object means the invoice can be saved or downloaded.
 */
export function validateInvoiceDraft(invoice: InvoiceData): InvoiceFieldErrors {
  const errors: InvoiceFieldErrors = {};
  checkTextFields(invoice, errors);
  checkHeader(invoice, errors);
  checkLineItems(invoice, errors);
  return errors;
}

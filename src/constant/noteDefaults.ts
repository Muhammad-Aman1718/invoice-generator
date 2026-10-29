import { FIELD_LIMITS } from "@/src/constant/limits";
import type { NoteDefaultField } from "@/src/types/types";

/** Fields on Settings → Notes & terms, in display order. */
export const NOTE_DEFAULT_FIELDS: NoteDefaultField[] = [
  {
    key: "notes",
    id: "defaultNotes",
    label: "Notes",
    description: "A thank-you line or anything the client should know.",
    max: FIELD_LIMITS.notes,
    rows: 4,
    placeholder: "Thank you for your business!",
    example: "Thank you for your business!\nPlease include the invoice number with your payment.",
  },
  {
    key: "terms",
    id: "defaultTerms",
    label: "Terms & conditions",
    description: "Start lines with “- ” or “1. ” to print them as a list.",
    max: FIELD_LIMITS.notes,
    rows: 6,
    placeholder: "- Payment is due within 14 days.",
    example:
      "- Payment is due within 14 days of the invoice date.\n" +
      "- Late payments may incur a fee of 2% per month.\n" +
      "- Goods remain our property until paid in full.",
  },
  {
    key: "paymentDetails",
    id: "defaultPaymentDetails",
    label: "Payment details",
    description: "Bank or wallet details, printed in their own box beside the total.",
    max: FIELD_LIMITS.paymentDetails,
    rows: 4,
    placeholder: "Bank, account name, IBAN, SWIFT…",
    example:
      "Bank: Your Bank\nAccount name: Your Business Ltd\nIBAN: XX00 0000 0000 0000\nSWIFT / BIC: XXXXXXXX",
  },
];

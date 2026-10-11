"use client";

import { useContext } from "react";
import { InvoiceValidationContext } from "@/src/lib/invoiceValidationContext";
import type { InvoiceValidationContextValue } from "@/src/types/types";

const NO_VALIDATION: InvoiceValidationContextValue = {
  errors: {},
  showSummary: false,
  validateField: () => undefined,
  validateAll: () => true,
};

/** Validation state for the invoice form (a no-op outside InvoiceValidationProvider). */
export default function useInvoiceValidation(): InvoiceValidationContextValue {
  return useContext(InvoiceValidationContext) ?? NO_VALIDATION;
}

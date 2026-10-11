"use client";

import useInvoiceValidationState from "@/src/hooks/useInvoiceValidationState";
import { InvoiceValidationContext } from "@/src/lib/invoiceValidationContext";
import type { InvoiceValidationProviderProps } from "@/src/types/types";

export default function InvoiceValidationProvider({ children }: InvoiceValidationProviderProps) {
  const validation = useInvoiceValidationState();
  return <InvoiceValidationContext.Provider value={validation}>{children}</InvoiceValidationContext.Provider>;
}

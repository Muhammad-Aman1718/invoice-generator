"use client";

import { useCallback, useEffect, useState } from "react";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { validateInvoiceDraft } from "@/src/lib/invoiceValidation";
import type { InvoiceFieldErrors, InvoiceValidationContextValue } from "@/src/types/types";

/** Keep only the shown errors that still apply (so they clear as the user fixes them). */
function refreshShownErrors(shown: InvoiceFieldErrors, current: InvoiceFieldErrors): InvoiceFieldErrors {
  return Object.fromEntries(Object.keys(shown).flatMap((id) => (current[id] ? [[id, current[id]]] : [])));
}

/**
 * Validation for the invoice form: a field's error appears when it loses focus (or on
 * save/download), then updates live while the user edits until it is fixed.
 */
export default function useInvoiceValidationState(): InvoiceValidationContextValue {
  const [errors, setErrors] = useState<InvoiceFieldErrors>({});
  const [showSummary, setShowSummary] = useState(false);

  useEffect(
    () =>
      useInvoiceStore.subscribe((invoice) => {
        setErrors((shown) => {
          if (Object.keys(shown).length === 0) return shown;
          const next = refreshShownErrors(shown, validateInvoiceDraft(invoice));
          if (Object.keys(next).length === 0) setShowSummary(false);
          return next;
        });
      }),
    [],
  );

  const validateField = useCallback((id: string) => {
    const message = validateInvoiceDraft(useInvoiceStore.getState())[id];
    setErrors((shown) => {
      if (message) return { ...shown, [id]: message };
      if (!shown[id]) return shown;
      const rest = { ...shown };
      delete rest[id];
      return rest;
    });
  }, []);

  const validateAll = useCallback(() => {
    const all = validateInvoiceDraft(useInvoiceStore.getState());
    setErrors(all);
    const ok = Object.keys(all).length === 0;
    setShowSummary(!ok);
    return ok;
  }, []);

  return { errors, showSummary, validateField, validateAll };
}

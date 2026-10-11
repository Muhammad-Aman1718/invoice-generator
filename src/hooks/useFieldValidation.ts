"use client";

import useInvoiceValidation from "@/src/hooks/useInvoiceValidation";

/** Error text and the a11y wiring for one invoice input. */
export default function useFieldValidation(id: string) {
  const { errors, validateField } = useInvoiceValidation();
  const error = errors[id];
  return {
    error,
    inputProps: {
      onBlur: () => validateField(id),
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${id}Error` : undefined,
    },
  };
}

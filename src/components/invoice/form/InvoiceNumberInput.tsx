"use client";

import FormField from "@/src/components/ui/FormField";
import useFieldValidation from "@/src/hooks/useFieldValidation";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { DIGITS_ONLY, MAX_INVOICE_NUMBER_DIGITS } from "@/src/constant/limits";

export default function InvoiceNumberInput() {
  const invoiceNumber = useInvoiceStore((state) => state.invoiceNumber);
  const setField = useInvoiceStore((state) => state.setField);
  const { error, inputProps } = useFieldValidation("invoiceNumber");

  return (
    <FormField id="invoiceNumber" label="Invoice number" required error={error}>
      <div className="relative">
        <span
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-navy-400"
          aria-hidden="true"
        >
          #
        </span>
        <input
          id="invoiceNumber"
          type="text"
          inputMode="numeric"
          maxLength={MAX_INVOICE_NUMBER_DIGITS}
          className="input pl-7 tabular-nums"
          value={invoiceNumber === 0 ? "" : invoiceNumber}
          onChange={(event) => {
            const value = event.target.value;
            if (DIGITS_ONLY.test(value)) setField("invoiceNumber", value === "" ? 0 : Number(value));
          }}
          {...inputProps}
        />
      </div>
    </FormField>
  );
}

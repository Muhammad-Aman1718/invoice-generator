"use client";

import DateInput from "./DateInput";
import InvoiceNumberInput from "./InvoiceNumberInput";
import CurrencySelect from "./CurrencySelect";
import FormField from "@/src/components/ui/FormField";
import useFieldValidation from "@/src/hooks/useFieldValidation";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { FIELD_LIMITS } from "@/src/constant/limits";

export default function DetailsSection() {
  const { issueDate, dueDate, poNumber, setField } = useInvoiceStore();
  const po = useFieldValidation("poNumber");

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <InvoiceNumberInput />
      <CurrencySelect />
      <FormField id="poNumber" label="PO number (optional)" error={po.error}>
        <input
          id="poNumber"
          className="input"
          maxLength={FIELD_LIMITS.poNumber}
          value={poNumber ?? ""}
          onChange={(event) => setField("poNumber", event.target.value)}
          {...po.inputProps}
        />
      </FormField>
      <DateInput
        id="issueDate"
        label="Issue date"
        required
        value={issueDate}
        onChange={(value) => setField("issueDate", value)}
      />
      <DateInput
        id="dueDate"
        label="Due date"
        value={dueDate}
        onChange={(value) => setField("dueDate", value)}
      />
    </div>
  );
}

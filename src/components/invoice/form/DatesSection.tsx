"use client";

import DateInput from "./DateInput";
import Field from "@/src/components/ui/Field";
import { useInvoiceStore } from "@/src/lib/invoiceStore";

export default function DatesSection() {
  const { issueDate, dueDate, poNumber, setField } = useInvoiceStore();

  return (
    <div className="grid grid-cols-1 gap-3 xs:grid-cols-2">
      <DateInput
        id="issueDate"
        label="Issue Date"
        value={issueDate}
        onChange={(value) => setField("issueDate", value)}
      />
      <DateInput
        id="dueDate"
        label="Due Date"
        value={dueDate}
        onChange={(value) => setField("dueDate", value)}
      />
      <Field label="PO Number" htmlFor="poNumber">
        <input
          id="poNumber"
          className="input"
          placeholder="Optional"
          value={poNumber ?? ""}
          onChange={(event) => setField("poNumber", event.target.value)}
        />
      </Field>
    </div>
  );
}

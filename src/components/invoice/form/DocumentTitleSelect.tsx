"use client";

import FormField from "@/src/components/ui/FormField";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { DOCUMENT_TITLES } from "@/src/constant/invoice";
import type { DocumentTitle } from "@/src/types/types";

/** "Tax invoice" is required wording for VAT/GST invoices in the UK, Australia, India, the UAE and others. */
export default function DocumentTitleSelect() {
  const documentTitle = useInvoiceStore((state) => state.documentTitle);
  const setField = useInvoiceStore((state) => state.setField);
  const hint = DOCUMENT_TITLES.find((title) => title.value === documentTitle)?.hint;

  return (
    <FormField id="documentTitle" label="Document type" hint={hint}>
      <select
        id="documentTitle"
        className="input cursor-pointer"
        value={documentTitle}
        onChange={(event) => setField("documentTitle", event.target.value as DocumentTitle)}
      >
        {DOCUMENT_TITLES.map((title) => (
          <option key={title.value} value={title.value}>
            {title.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}

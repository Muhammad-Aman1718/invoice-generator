"use client";

import Field from "@/src/components/ui/Field";
import LogoUpload from "@/src/components/invoice/LogoUpload";
import { useInvoiceStore } from "@/src/lib/invoiceStore";

export default function NotesSection() {
  const { notes, terms, stampUrl, setField, setStampUrl } = useInvoiceStore();

  return (
    <div className="space-y-4">
      <Field label="Notes" htmlFor="notes">
        <textarea
          id="notes"
          className="input min-h-[80px] resize-none"
          placeholder="Payment instructions, thank you note..."
          value={notes}
          onChange={(event) => setField("notes", event.target.value)}
        />
      </Field>
      <Field label="Terms" htmlFor="terms">
        <textarea
          id="terms"
          className="input min-h-[60px] resize-none"
          placeholder="Terms & conditions..."
          value={terms}
          onChange={(event) => setField("terms", event.target.value)}
        />
      </Field>
      <Field label="Signature / Stamp" htmlFor="stamp">
        <LogoUpload id="stamp" value={stampUrl} onChange={setStampUrl} />
      </Field>
    </div>
  );
}

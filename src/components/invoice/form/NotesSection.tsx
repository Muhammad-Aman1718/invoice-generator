"use client";

import Field from "@/src/components/ui/Field";
import LogoUpload from "@/src/components/invoice/LogoUpload";
import SavedTextChoice from "./SavedTextChoice";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { FIELD_LIMITS } from "@/src/constant/limits";
import type { NotesSectionProps } from "@/src/types/types";

export default function NotesSection({ noteDefaults }: NotesSectionProps) {
  const { notes, terms, paymentDetails, stampUrl, setField, setStampUrl } = useInvoiceStore();

  return (
    <div className="space-y-5">
      <SavedTextChoice
        id="notes"
        label="Notes"
        hint="A thank-you line or anything the client should know."
        max={FIELD_LIMITS.notes}
        rows={3}
        value={notes}
        savedValue={noteDefaults?.notes}
        onChange={(value) => setField("notes", value)}
      />
      <SavedTextChoice
        id="terms"
        label="Terms & conditions"
        hint="Start lines with “- ” or “1. ” to print them as a list."
        max={FIELD_LIMITS.notes}
        rows={4}
        value={terms}
        savedValue={noteDefaults?.terms}
        onChange={(value) => setField("terms", value)}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_240px]">
        <SavedTextChoice
          id="paymentDetails"
          label="Payment details (optional)"
          hint="Bank name, account, IBAN, SWIFT or wallet."
          max={FIELD_LIMITS.paymentDetails}
          rows={4}
          value={paymentDetails}
          savedValue={noteDefaults?.paymentDetails}
          onChange={(value) => setField("paymentDetails", value)}
        />
        <Field label="Signature or stamp (optional)" htmlFor="stamp">
          <LogoUpload id="stamp" value={stampUrl} onChange={setStampUrl} />
        </Field>
      </div>
    </div>
  );
}

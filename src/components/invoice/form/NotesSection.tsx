"use client";

import Field from "@/src/components/ui/Field";
import FormField from "@/src/components/ui/FormField";
import LogoUpload from "@/src/components/invoice/LogoUpload";
import useFieldValidation from "@/src/hooks/useFieldValidation";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { FIELD_LIMITS } from "@/src/constant/limits";

export default function NotesSection() {
  const { notes, terms, stampUrl, setField, setStampUrl } = useInvoiceStore();
  const notesField = useFieldValidation("notes");
  const termsField = useFieldValidation("terms");

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <FormField
        id="notes"
        label="Notes"
        hint="Payment instructions or a thank-you note."
        error={notesField.error}
        count={{ length: notes.length, max: FIELD_LIMITS.notes, alwaysVisible: true }}
      >
        <textarea
          id="notes"
          className="input min-h-[96px] resize-y"
          maxLength={FIELD_LIMITS.notes}
          value={notes}
          onChange={(event) => setField("notes", event.target.value)}
          {...notesField.inputProps}
        />
      </FormField>
      <FormField
        id="terms"
        label="Terms"
        hint="Late fees, refund rules, etc."
        error={termsField.error}
        count={{ length: terms.length, max: FIELD_LIMITS.notes, alwaysVisible: true }}
      >
        <textarea
          id="terms"
          className="input min-h-[96px] resize-y"
          maxLength={FIELD_LIMITS.notes}
          value={terms}
          onChange={(event) => setField("terms", event.target.value)}
          {...termsField.inputProps}
        />
      </FormField>
      <Field label="Signature or stamp (optional)" htmlFor="stamp" className="sm:max-w-xs">
        <LogoUpload id="stamp" value={stampUrl} onChange={setStampUrl} />
      </Field>
    </div>
  );
}

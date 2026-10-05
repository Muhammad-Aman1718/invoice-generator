"use client";

import { Loader2 } from "lucide-react";
import Modal from "@/src/components/ui/Modal";
import TextField from "@/src/components/ui/TextField";
import TextAreaField from "@/src/components/ui/TextAreaField";
import { TEXT_LIMITS } from "@/src/constant/limits";
import type { ClientFormModalProps, ClientFormValues } from "@/src/types/types";

export default function ClientFormModal({
  open,
  isNew,
  values,
  saving,
  onChange,
  onSubmit,
  onClose,
}: ClientFormModalProps) {
  const update = (key: keyof ClientFormValues, value: string) => onChange({ ...values, [key]: value });

  return (
    <Modal
      open={open}
      onClose={() => !saving && onClose()}
      title={isNew ? "Add client" : "Edit client"}
      description="These details are copied onto invoices you create for this client."
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="grid gap-4 pb-2 sm:grid-cols-2"
      >
        <TextField
          id="clientName"
          label="Name / company *"
          className="sm:col-span-2"
          required
          maxLength={TEXT_LIMITS.name}
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
        />
        <TextField
          id="clientEmail"
          label="Email"
          type="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
        />
        <TextField
          id="clientPhone"
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
        />
        <TextAreaField
          id="clientAddress"
          label="Address"
          className="sm:col-span-2"
          value={values.address}
          onChange={(event) => update("address", event.target.value)}
        />
        <TextField
          id="clientTaxId"
          label="Tax / VAT ID"
          value={values.taxId}
          onChange={(event) => update("taxId", event.target.value)}
        />
        <TextField
          id="clientNotes"
          label="Internal note"
          value={values.notes}
          onChange={(event) => update("notes", event.target.value)}
        />
        <div className="flex flex-col-reverse gap-2 sm:col-span-2 sm:flex-row sm:justify-end">
          <button type="button" className="btn-outline" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving && <Loader2 size={14} className="animate-spin" />}
            {isNew ? "Add client" : "Save changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

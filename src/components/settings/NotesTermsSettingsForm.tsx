"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import DefaultTextEditor from "./DefaultTextEditor";
import { api } from "@/src/lib/apiClient";
import { getErrorMessage } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import { NOTE_DEFAULT_FIELDS } from "@/src/constant/noteDefaults";
import type { NoteDefaults, NotesTermsSettingsFormProps } from "@/src/types/types";

export default function NotesTermsSettingsForm({ defaults }: NotesTermsSettingsFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<NoteDefaults>(defaults);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      await api.profile.update({
        defaultNotes: values.notes,
        defaultTerms: values.terms,
        defaultPaymentDetails: values.paymentDetails,
      });
      showToast.success("Saved", "New invoices will start with these notes and terms.");
      router.refresh();
    } catch (error) {
      showToast.error("Could not save", getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {NOTE_DEFAULT_FIELDS.map((field) => (
        <DefaultTextEditor
          key={field.key}
          field={field}
          value={values[field.key]}
          onChange={(value) => setValues((current) => ({ ...current, [field.key]: value }))}
        />
      ))}
      <div className="flex justify-end">
        <button type="submit" className="btn-primary" disabled={isSaving}>
          {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save notes & terms
        </button>
      </div>
    </form>
  );
}

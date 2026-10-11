"use client";

import { Loader2, Save } from "lucide-react";
import SettingsSection from "./SettingsSection";
import BusinessDetailsFields from "./BusinessDetailsFields";
import InvoiceDefaultsFields from "./InvoiceDefaultsFields";
import TextField from "@/src/components/ui/TextField";
import useProfileSettings from "@/src/hooks/useProfileSettings";
import type { ProfileSettingsFormProps } from "@/src/types/types";

export default function ProfileSettingsForm({ profile, email }: ProfileSettingsFormProps) {
  const { values, setValue, isSaving, handleSubmit } = useProfileSettings(profile);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SettingsSection id="profile" title="Profile" description="How you appear in InvoiceGen.">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="fullName"
            label="Full name"
            value={values.fullName}
            onChange={(event) => setValue("fullName", event.target.value)}
          />
          <TextField id="accountEmail" label="Email" value={email} disabled />
        </div>
      </SettingsSection>
      <SettingsSection
        id="business"
        title="Business details"
        description="Pre-filled into the “From” section of every new invoice."
      >
        <BusinessDetailsFields values={values} onChange={setValue} />
      </SettingsSection>
      <SettingsSection
        id="defaults"
        title="Invoice defaults"
        description="Applied to new invoices. You can still change them on each invoice."
      >
        <InvoiceDefaultsFields values={values} onChange={setValue} />
      </SettingsSection>
      <div className="flex justify-end">
        <button type="submit" className="btn-primary" disabled={isSaving}>
          {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save settings
        </button>
      </div>
    </form>
  );
}

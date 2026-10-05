"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/src/lib/apiClient";
import { getErrorMessage } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import type { Profile, ProfileFormValues } from "@/src/types/types";

function toFormValues(profile: Profile): ProfileFormValues {
  return {
    fullName: profile.fullName ?? "",
    companyName: profile.companyName ?? "",
    businessInfo: profile.businessInfo ?? "",
    logoDataUrl: profile.logoDataUrl,
    defaultCurrency: profile.defaultCurrency,
    defaultTaxRate: profile.defaultTaxRate,
    paymentTermsDays: profile.paymentTermsDays,
    defaultNotes: profile.defaultNotes ?? "",
    defaultTerms: profile.defaultTerms ?? "",
  };
}

export default function useProfileSettings(profile: Profile) {
  const router = useRouter();
  const [values, setValues] = useState<ProfileFormValues>(() => toFormValues(profile));
  const [isSaving, setIsSaving] = useState(false);

  const setValue = <K extends keyof ProfileFormValues>(key: K, value: ProfileFormValues[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      await api.profile.update({
        ...values,
        defaultTaxRate: Number(values.defaultTaxRate) || 0,
        paymentTermsDays: Number(values.paymentTermsDays) || 0,
      });
      showToast.success("Settings saved", "New invoices will use these defaults.");
      router.refresh();
    } catch (error) {
      showToast.error("Could not save", getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return { values, setValue, isSaving, handleSubmit };
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiRequestError } from "@/src/lib/apiClient";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { saveInvoice } from "@/src/lib/supabase/invoicesClient";
import { getErrorMessage } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import { API_ERROR_CODES } from "@/src/constant/http";
import { ROUTES } from "@/src/constant/routes";
import type { InvoiceSaveOptions } from "@/src/types/types";

/** Validate and save the editor's invoice; plan-limit errors open the upgrade modal. */
export default function useInvoiceSave({ mode, invoiceId, onSaved }: InvoiceSaveOptions) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [limitMessage, setLimitMessage] = useState<string | null>(null);

  const save = async () => {
    const invoice = useInvoiceStore.getState();
    if (!invoice.clientName.trim()) {
      showToast.warning("Client required", "Add who this invoice is for under “Bill To”.");
      document.getElementById("clientName")?.focus();
      return;
    }
    setIsSaving(true);
    try {
      const saved = await saveInvoice({ ...invoice, id: mode === "edit" ? invoiceId : undefined });
      onSaved();
      if (mode === "edit") {
        showToast.success("Changes saved");
        return router.refresh();
      }
      showToast.success("Invoice saved", `Invoice #${invoice.invoiceNumber} was created.`);
      invoice.resetInvoice();
      router.push(`${ROUTES.invoices}/${saved.id}`);
    } catch (error) {
      if (error instanceof ApiRequestError && error.code === API_ERROR_CODES.planLimit)
        setLimitMessage(error.message);
      else showToast.error("Save failed", getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return { isSaving, save, limitMessage, clearLimitMessage: () => setLimitMessage(null) };
}

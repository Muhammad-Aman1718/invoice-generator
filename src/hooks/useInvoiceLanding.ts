"use client";

import { useState } from "react";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { supabase } from "@/src/lib/supabase/client";
import { saveInvoice } from "@/src/lib/supabase/invoicesClient";
import { getErrorMessage } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import { ROUTES } from "@/src/constant/routes";

/** Guests are sent to sign-up; the draft stays in localStorage and reappears after sign-in. */
function redirectGuestToSignUp() {
  showToast.info("Create a free account", "Sign in to save this invoice. Your draft is kept.");
  const params = new URLSearchParams({ next: ROUTES.newInvoice, action: "save_pending" });
  window.location.href = `${ROUTES.signUp}?${params}`;
}

export default function useInvoiceLanding() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return redirectGuestToSignUp();
      const invoice = useInvoiceStore.getState();
      const saved = await saveInvoice({ ...invoice, id: undefined });
      showToast.success("Invoice saved", "Find it in your dashboard.");
      invoice.resetInvoice();
      window.location.href = `${ROUTES.invoices}/${saved.id}`;
    } catch (error) {
      showToast.error("Save failed", getErrorMessage(error, "Please try again."));
    } finally {
      setIsSaving(false);
    }
  };

  return { isPreviewOpen, setIsPreviewOpen, isSaving, handleSave };
}

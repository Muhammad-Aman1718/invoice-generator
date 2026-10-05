"use client";

import { useState } from "react";
import { useInvoiceStore } from "@/src/lib/invoice-store";
import { supabase } from "@/src/lib/supabase/client";
import { saveInvoiceToDb } from "@/src/lib/supabase/invoices-client";
import { Tab } from "@/src/types/invoice-types";
import { showToast } from "@/src/utils/showToast";

const useInvoiceLanding = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [mobileTab, setMobileTab] = useState<Tab>("edit");
  const store = useInvoiceStore();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const { buildInvoiceData, generateInvoicePDF } = await import("@/src/lib/pdf-generator");
      await generateInvoicePDF(buildInvoiceData(useInvoiceStore.getState()), { branding: true });
      showToast.success("Downloaded", "Your invoice PDF is ready.");
    } catch (error) {
      console.error("PDF download error:", error);
      showToast.error("Download error", "Could not generate the PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // The draft is already persisted in localStorage; it reappears after sign-in.
        showToast.info("Create a free account", "Sign in to save this invoice — your draft is kept.");
        const params = new URLSearchParams({ next: "/dashboard/invoices/new", action: "save_pending" });
        window.location.href = `/auth/sign-up?${params}`;
        return;
      }

      const state = useInvoiceStore.getState();
      const result = await saveInvoiceToDb({ ...state, id: undefined });
      showToast.success("Invoice saved", "Find it in your dashboard.");
      state.resetInvoice();
      window.location.href = `/dashboard/invoices/${result.id}`;
    } catch (error) {
      showToast.error("Save failed", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isPreviewOpen,
    setIsPreviewOpen,
    handleDownload,
    handleSave,
    isSaving,
    isDownloading,
    mobileTab,
    setMobileTab,
    grandTotal: store.totalAmount,
    store,
  };
};

export default useInvoiceLanding;

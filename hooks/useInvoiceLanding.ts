import { useInvoiceStore } from "@/lib/invoice-store";
import {
  calculateGrandTotal,
  calculateSubtotal,
  CURRENCIES,
  formatCurrency,
} from "@/lib/invoice-utils";
import { buildInvoiceData, generateInvoicePDF } from "@/lib/pdf-generator";
import { supabase } from "@/lib/supabase/client";
import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
import { Tab } from "@/types/invoice-types";
import { useState } from "react";

const useInvoiceLanding = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [mobileTab, setMobileTab] = useState<Tab>("edit");

  const store = useInvoiceStore();
  const subtotal = calculateSubtotal(store.lineItems);
  const grandTotal = calculateGrandTotal(
    subtotal,
    store.taxRate,
    store.overallDiscount,
  );

  const subtotalAmount = store.subtotal;
  const overallDiscountAmount = subtotalAmount * (store.overallDiscount / 100);
  const taxableAmount = subtotalAmount - overallDiscountAmount;
  const taxAmount = taxableAmount * (store.taxRate / 100);


  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // 1. Store aur utilities se data prepare karein
      // Note: ensure karein ke ye variables (subtotal, etc.) aapke hook mein available hain
      const invoiceData = buildInvoiceData(
        store, // Aapka Zustand store
        subtotalAmount, // calculateSubtotal se aya hua
        overallDiscountAmount, // (subtotal * store.overallDiscount) / 100
        taxAmount, // (subtotal - discountAmount) * (store.taxRate / 100)
      );

      // 2. Ab element ID ki jagah direct 'invoiceData' send karein
      await generateInvoicePDF(invoiceData);
    } catch (error) {
      console.error("PDF Download Error:", error);
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
      if (session) {
        const result = await saveInvoiceToDb(store);
        if (result) {
          window.location.href = "/dashboard/invoices/new";
        } else {
          alert("Error saving invoice.");
        }
      } else {
        localStorage.setItem("pending_invoice", JSON.stringify(store));
        const loginUrl = new URL("/auth/login", window.location.origin);
        loginUrl.searchParams.set("next", "/dashboard/invoices/new");
        loginUrl.searchParams.set("action", "save_pending");
        window.location.href = loginUrl.toString();
      }
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
    setIsSaving,
    setIsDownloading,
    mobileTab,
    setMobileTab,
    grandTotal,
    store,
  };
};

export default useInvoiceLanding;

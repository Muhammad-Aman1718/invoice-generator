"use client";

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
import { showToast } from "@/utils/showToast";
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
    const toastId = showToast.loading("Preparing your PDF...");
    setIsDownloading(true);
    try {
      const invoiceData = buildInvoiceData(
        store,
        subtotalAmount,
        overallDiscountAmount,
        taxAmount,
      );

      await generateInvoicePDF(invoiceData);
      showToast.dismiss(toastId);
      showToast.success("Success", "Invoice downloaded successfully!");
    } catch (error) {
      showToast.dismiss(toastId);
      showToast.error("Download Error", "Could not generate PDF. Please try again.");
      console.error("PDF Download Error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const toastId = showToast.loading("Saving invoice...");
    
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const result = await saveInvoiceToDb(store);
        showToast.dismiss(toastId);
        
        if (result) {
          showToast.success("Invoice Saved", "Your invoice has been stored in your account.");
          // Chonkay window.location page reload karti hai, toast foran gayab ho sakta hai
          // isliye hum redirect se pehle thora wait karwa sakte hain ya direct redirect karein
          window.location.href = "/dashboard/invoices/new";
        } else {
          showToast.error("Save Failed", "Something went wrong while saving to database.");
        }
      } else {
        // Guest user logic
        showToast.dismiss(toastId);
        showToast.info("Login Required", "Redirecting to login to save your progress...");
        
        localStorage.setItem("pending_invoice", JSON.stringify(store));
        const loginUrl = new URL("/auth/login", window.location.origin);
        loginUrl.searchParams.set("next", "/dashboard/invoices/new");
        loginUrl.searchParams.set("action", "save_pending");
        
        // Timeout taake user info message parh sakay
        setTimeout(() => {
          window.location.href = loginUrl.toString();
        }, 1000);
      }
    } catch (error) {
      showToast.dismiss(toastId);
      showToast.error("Error", "An unexpected error occurred.");
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
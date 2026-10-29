"use client";

import { useState } from "react";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { recordIssuedNumber } from "@/src/lib/invoiceNumbering";
import { showToast } from "@/src/utils/showToast";

/** Download the invoice currently in the editor as a PDF (generator is lazy-loaded). */
export default function usePdfDownload(branding: boolean) {
  const [isDownloading, setIsDownloading] = useState(false);

  const download = async () => {
    setIsDownloading(true);
    try {
      const { downloadInvoicePdf } = await import("@/src/lib/pdfGenerator");
      const invoice = useInvoiceStore.getState();
      await downloadInvoicePdf({ invoice, branding });
      recordIssuedNumber(invoice.invoiceNumber);
    } catch (error) {
      console.error("[pdf] generation failed:", error);
      showToast.error("Download failed", "Could not generate the PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return { isDownloading, download };
}

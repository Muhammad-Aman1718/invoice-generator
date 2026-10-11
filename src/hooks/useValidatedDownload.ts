"use client";

import usePdfDownload from "@/src/hooks/usePdfDownload";
import useInvoiceValidation from "@/src/hooks/useInvoiceValidation";
import { showToast } from "@/src/utils/showToast";

/** PDF download that first checks the form and points to any problems. */
export default function useValidatedDownload(branding: boolean) {
  const { isDownloading, download } = usePdfDownload(branding);
  const { validateAll } = useInvoiceValidation();

  const validatedDownload = () => {
    if (!validateAll()) return showToast.error("Check the invoice", "Fix the highlighted fields first.");
    return download();
  };

  return { isDownloading, download: validatedDownload };
}

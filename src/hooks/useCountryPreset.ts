"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { findCountryGuide } from "@/src/constant/countries";

/** "/?country=pakistan#builder" (from a country page) sets currency, tax and document type once. */
export default function useCountryPreset() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("country");

  useEffect(() => {
    const guide = slug ? findCountryGuide(slug) : undefined;
    if (!guide) return;
    const { setField } = useInvoiceStore.getState();
    setField("currency", guide.currency);
    setField("documentTitle", guide.setup.documentTitle);
    setField("taxLabel", guide.setup.taxLabel);
    setField("taxRate", guide.setup.taxRate);
    // Drop the parameter so a reload doesn't overwrite later edits.
    const url = new URL(window.location.href);
    url.searchParams.delete("country");
    window.history.replaceState(null, "", url);
  }, [slug]);
}

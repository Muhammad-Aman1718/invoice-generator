"use client";

import { useEffect, useState } from "react";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { isPristineInvoice } from "@/src/lib/invoiceCalculations";

/** Track edits after the editor is ready and warn before leaving with unsaved work. */
export default function useUnsavedChanges(ready: boolean, mode: "new" | "edit") {
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!ready) return;
    return useInvoiceStore.subscribe((state) => setIsDirty(mode === "edit" || !isPristineInvoice(state)));
  }, [ready, mode]);

  useEffect(() => {
    if (!isDirty) return;
    const warnBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [isDirty]);

  return { isDirty, markSaved: () => setIsDirty(false) };
}

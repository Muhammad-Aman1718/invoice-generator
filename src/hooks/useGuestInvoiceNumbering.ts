"use client";

import { useCallback, useEffect, useState } from "react";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { isPristineInvoice } from "@/src/lib/invoiceCalculations";
import { buildNextInvoice, getNextInvoiceNumber, readLastIssuedNumber } from "@/src/lib/invoiceNumbering";
import { INVOICE_NUMBER_EVENT, STORAGE_KEYS } from "@/src/constant/app";

/**
 * Auto-numbering for the no-account builder: after #5 is downloaded the next invoice is #6,
 * even after the browser is closed. A typed-in number always wins.
 */
export default function useGuestInvoiceNumbering() {
  const invoiceNumber = useInvoiceStore((state) => state.invoiceNumber);
  const [lastIssued, setLastIssued] = useState(0);
  const [dismissedFor, setDismissedFor] = useState<number | null>(null);

  useEffect(() => {
    const sync = () => setLastIssued(readLastIssuedNumber());
    sync();
    const onStorage = (event: StorageEvent) => event.key === STORAGE_KEYS.lastInvoiceNumber && sync();
    window.addEventListener(INVOICE_NUMBER_EVENT, sync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(INVOICE_NUMBER_EVENT, sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // An empty draft has nothing to lose, so it moves to the next number silently.
  useEffect(() => {
    const store = useInvoiceStore.getState();
    if (lastIssued && store.invoiceNumber <= lastIssued && isPristineInvoice(store)) {
      store.setField("invoiceNumber", getNextInvoiceNumber(lastIssued));
    }
  }, [lastIssued]);

  const startNextInvoice = useCallback(() => {
    const store = useInvoiceStore.getState();
    store.loadInvoice(buildNextInvoice(store, getNextInvoiceNumber(readLastIssuedNumber())));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const alreadyIssued = lastIssued > 0 && invoiceNumber > 0 && invoiceNumber <= lastIssued;
  return {
    lastIssued,
    nextNumber: getNextInvoiceNumber(lastIssued),
    showNextPrompt: alreadyIssued && dismissedFor !== invoiceNumber,
    startNextInvoice,
    dismissNextPrompt: () => setDismissedFor(invoiceNumber),
  };
}

"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/src/lib/apiClient";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { isPristineInvoice } from "@/src/lib/invoiceCalculations";
import { getClientFields, getProfileDefaults } from "@/src/lib/editorDefaults";
import { backupDraft, takeDraftBackup } from "@/src/lib/draftBackup";
import { showToast } from "@/src/utils/showToast";
import type { EditorInitOptions } from "@/src/types/types";

function prepareNewInvoice({ clients, profile }: EditorInitOptions, searchParams: URLSearchParams) {
  const store = useInvoiceStore.getState();
  // Leftover from editing an existing invoice → start fresh.
  if (store.id) store.resetInvoice();
  const fresh = useInvoiceStore.getState();
  if (isPristineInvoice(fresh)) fresh.loadInvoice(getProfileDefaults(profile, fresh));

  const preset = clients.find((client) => client.id === searchParams.get("client"));
  if (preset) useInvoiceStore.setState(getClientFields(preset));

  api.invoices
    .getNextNumber()
    .then(({ next }) => useInvoiceStore.getState().setField("invoiceNumber", next))
    .catch((error) => console.warn("[editor] could not fetch next invoice number:", error));

  if (searchParams.get("action") === "save_pending") {
    showToast.info("Welcome!", "Your invoice draft is ready — click Save to store it.");
  }
}

function loadExistingInvoice({ invoiceId, onLoaded, onNotFound }: EditorInitOptions) {
  const store = useInvoiceStore.getState();
  if (!store.id && !isPristineInvoice(store)) backupDraft(store);
  api.invoices
    .get(invoiceId!)
    .then(({ invoice }) => {
      useInvoiceStore.getState().loadInvoice(invoice);
      onLoaded();
    })
    .catch(onNotFound);
}

/** Prepare the shared invoice store once when the editor opens; restore drafts on leave. */
export default function useEditorInitialization(options: EditorInitOptions) {
  const searchParams = useSearchParams();
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;
    if (options.mode === "new") prepareNewInvoice(options, searchParams);
    else loadExistingInvoice(options);
    // Runs once on mount by design.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (options.mode !== "edit") return;
    return () => {
      const store = useInvoiceStore.getState();
      store.resetInvoice();
      const draft = takeDraftBackup();
      if (draft) store.loadInvoice(draft);
    };
  }, [options.mode]);
}

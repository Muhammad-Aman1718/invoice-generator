"use client";

import { useState } from "react";
import EditorToolbar from "./EditorToolbar";
import EditorSummary from "./EditorSummary";
import PlanLimitModal from "./PlanLimitModal";
import EditorLoading from "./EditorLoading";
import InvoiceNotFound from "./InvoiceNotFound";
import InvoiceForm from "@/src/components/invoice/form/InvoiceForm";
import InvoicePreviewModal from "@/src/components/invoice/preview/InvoicePreviewModal";
import useEditorInitialization from "@/src/hooks/useEditorInitialization";
import useUnsavedChanges from "@/src/hooks/useUnsavedChanges";
import useInvoiceSave from "@/src/hooks/useInvoiceSave";
import useValidatedDownload from "@/src/hooks/useValidatedDownload";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { getNoteDefaults } from "@/src/lib/editorDefaults";
import type { InvoiceEditorProps } from "@/src/types/types";

/** Form on the left, summary rail on the right; the full preview opens in a dialog. */
export default function InvoiceEditorWorkspace({
  mode,
  invoiceId,
  clients,
  profile,
  pdfBranding,
}: InvoiceEditorProps) {
  const [ready, setReady] = useState(mode === "new");
  const [notFound, setNotFound] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const invoiceNumber = useInvoiceStore((state) => state.invoiceNumber);

  useEditorInitialization({
    mode,
    invoiceId,
    clients,
    profile,
    onLoaded: () => setReady(true),
    onNotFound: () => setNotFound(true),
  });
  const { isDirty, markSaved } = useUnsavedChanges(ready, mode);
  const { isSaving, save, limitMessage, clearLimitMessage } = useInvoiceSave({
    mode,
    invoiceId,
    onSaved: markSaved,
  });
  const { isDownloading, download } = useValidatedDownload(pdfBranding);

  if (notFound) return <InvoiceNotFound />;
  if (!ready) return <EditorLoading />;

  const subtitle = isDirty
    ? "Unsaved changes"
    : mode === "new"
      ? "Draft, not saved yet"
      : "All changes saved";
  return (
    <div className="min-h-[100dvh] bg-mist">
      <EditorToolbar
        title={mode === "new" ? "New invoice" : `Invoice #${invoiceNumber}`}
        shortTitle={mode === "new" ? "New" : `#${invoiceNumber}`}
        subtitle={subtitle}
        isSaving={isSaving}
        isDownloading={isDownloading}
        onPreview={() => setIsPreviewOpen(true)}
        onDownload={download}
        onSave={save}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8 lg:py-8">
        <InvoiceForm clients={clients} noteDefaults={getNoteDefaults(profile)} showTotals={false} />
        <EditorSummary />
      </div>
      <InvoicePreviewModal
        open={isPreviewOpen}
        isDownloading={isDownloading}
        onClose={() => setIsPreviewOpen(false)}
        onDownload={download}
      />
      <PlanLimitModal message={limitMessage} onClose={clearLimitMessage} />
    </div>
  );
}

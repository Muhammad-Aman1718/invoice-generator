"use client";

import { useState } from "react";
import EditorToolbar from "./EditorToolbar";
import PreviewPanel from "./PreviewPanel";
import PlanLimitModal from "./PlanLimitModal";
import EditorLoading from "./EditorLoading";
import InvoiceNotFound from "./InvoiceNotFound";
import InvoiceForm from "@/src/components/invoice/form/InvoiceForm";
import useEditorInitialization from "@/src/hooks/useEditorInitialization";
import useUnsavedChanges from "@/src/hooks/useUnsavedChanges";
import useInvoiceSave from "@/src/hooks/useInvoiceSave";
import usePdfDownload from "@/src/hooks/usePdfDownload";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { cn } from "@/src/lib/utils";
import { getPreviewVisibility } from "@/src/lib/editorDefaults";
import type { InvoiceEditorProps, Tab } from "@/src/types/types";

export default function InvoiceEditor({
  mode,
  invoiceId,
  clients,
  profile,
  pdfBranding,
}: InvoiceEditorProps) {
  const [tab, setTab] = useState<Tab>("edit");
  const [showPreviewPanel, setShowPreviewPanel] = useState(true);
  const [ready, setReady] = useState(mode === "new");
  const [notFound, setNotFound] = useState(false);
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
  const { isDownloading, download } = usePdfDownload(pdfBranding);

  if (notFound) return <InvoiceNotFound />;
  if (!ready) return <EditorLoading />;

  const subtitle = isDirty ? "Unsaved changes" : mode === "new" ? "Draft" : "All changes saved";
  return (
    <div className="flex h-[calc(100dvh-3.5rem)] w-full flex-col overflow-hidden lg:h-[100dvh]">
      <EditorToolbar
        title={mode === "new" ? "New invoice" : `Invoice #${invoiceNumber}`}
        subtitle={subtitle}
        tab={tab}
        showPreviewPanel={showPreviewPanel}
        isSaving={isSaving}
        isDownloading={isDownloading}
        onTabChange={setTab}
        onTogglePreview={() => setShowPreviewPanel((visible) => !visible)}
        onDownload={download}
        onSave={save}
      />
      <div className="relative flex min-h-0 flex-1">
        <div
          className={cn(
            "custom-scrollbar h-full flex-1 overflow-y-auto",
            tab === "edit" ? "block" : "hidden lg:block",
          )}
        >
          <div className="mx-auto max-w-3xl p-3 pb-24 sm:p-6 lg:p-8">
            <InvoiceForm clients={clients} />
          </div>
        </div>
        <PreviewPanel id={`invoicePreview${mode}`} className={getPreviewVisibility(tab, showPreviewPanel)} />
      </div>
      <PlanLimitModal message={limitMessage} onClose={clearLimitMessage} />
    </div>
  );
}

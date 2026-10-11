"use client";

import LandingToolbar from "./LandingToolbar";
import InvoiceForm from "@/src/components/invoice/form/InvoiceForm";
import EditorSummary from "@/src/components/invoice/editor/EditorSummary";
import InvoicePreviewModal from "@/src/components/invoice/preview/InvoicePreviewModal";
import useInvoiceLanding from "@/src/hooks/useInvoiceLanding";
import useValidatedDownload from "@/src/hooks/useValidatedDownload";

export default function InvoiceLandingWorkspace() {
  const { isPreviewOpen, setIsPreviewOpen, isSaving, handleSave } = useInvoiceLanding();
  const { isDownloading, download } = useValidatedDownload(true);

  return (
    <div className="space-y-5">
      <LandingToolbar
        isSaving={isSaving}
        isDownloading={isDownloading}
        onPreview={() => setIsPreviewOpen(true)}
        onDownload={download}
        onSave={handleSave}
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <InvoiceForm showTotals={false} />
        <EditorSummary showStatus={false} />
      </div>
      <InvoicePreviewModal
        open={isPreviewOpen}
        isDownloading={isDownloading}
        onClose={() => setIsPreviewOpen(false)}
        onDownload={download}
      />
    </div>
  );
}

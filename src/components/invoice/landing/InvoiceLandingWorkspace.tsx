"use client";

import LandingToolbar from "./LandingToolbar";
import NextInvoiceBanner from "./NextInvoiceBanner";
import InvoiceForm from "@/src/components/invoice/form/InvoiceForm";
import EditorSummary from "@/src/components/invoice/editor/EditorSummary";
import InvoicePreviewModal from "@/src/components/invoice/preview/InvoicePreviewModal";
import useInvoiceLanding from "@/src/hooks/useInvoiceLanding";
import useValidatedDownload from "@/src/hooks/useValidatedDownload";
import useGuestInvoiceNumbering from "@/src/hooks/useGuestInvoiceNumbering";
import useCountryPreset from "@/src/hooks/useCountryPreset";
import { useInvoiceStore } from "@/src/lib/invoiceStore";

export default function InvoiceLandingWorkspace() {
  const { isPreviewOpen, setIsPreviewOpen, isSaving, handleSave } = useInvoiceLanding();
  const { isDownloading, download } = useValidatedDownload(true);
  const numbering = useGuestInvoiceNumbering();
  useCountryPreset();
  const invoiceNumber = useInvoiceStore((state) => state.invoiceNumber);

  return (
    <div className="space-y-5">
      <LandingToolbar
        isSaving={isSaving}
        isDownloading={isDownloading}
        onPreview={() => setIsPreviewOpen(true)}
        onDownload={download}
        onSave={handleSave}
      />
      {numbering.showNextPrompt && (
        <NextInvoiceBanner
          currentNumber={invoiceNumber}
          nextNumber={numbering.nextNumber}
          onStartNext={numbering.startNextInvoice}
          onDismiss={numbering.dismissNextPrompt}
        />
      )}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
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

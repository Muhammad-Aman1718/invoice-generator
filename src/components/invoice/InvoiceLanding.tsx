"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import LandingToolbar from "./landing/LandingToolbar";
import LandingPreviewModal from "./landing/LandingPreviewModal";
import EditPreviewTabs from "./editor/EditPreviewTabs";
import InvoiceForm from "./form/InvoiceForm";
import InvoicePreview from "./preview/InvoicePreview";
import useInvoiceLanding from "@/src/hooks/useInvoiceLanding";
import usePdfDownload from "@/src/hooks/usePdfDownload";
import type { Tab } from "@/src/types/types";

/** Free, no-account invoice builder on the home page. */
export default function InvoiceLanding() {
  const [mobileTab, setMobileTab] = useState<Tab>("edit");
  const { isPreviewOpen, setIsPreviewOpen, isSaving, handleSave } = useInvoiceLanding();
  const { isDownloading, download } = usePdfDownload(true);

  return (
    <div className="space-y-4">
      <LandingToolbar
        isSaving={isSaving}
        isDownloading={isDownloading}
        onPreview={() => setIsPreviewOpen(true)}
        onDownload={download}
        onSave={handleSave}
      />
      <EditPreviewTabs tab={mobileTab} onChange={setMobileTab} className="sm:hidden" />
      <div className={mobileTab === "edit" ? "block" : "hidden sm:block"}>
        <InvoiceForm />
      </div>
      {mobileTab === "preview" && (
        <div className="pb-6 sm:hidden">
          <div className="custom-scrollbar relative overflow-x-auto rounded-xl border border-black/5 bg-white shadow-sm">
            <InvoicePreview id="invoicePreviewMobile" />
          </div>
          <button onClick={download} className="btn-primary mt-3 w-full">
            <Download size={14} /> Download PDF
          </button>
        </div>
      )}
      <LandingPreviewModal
        open={isPreviewOpen}
        isDownloading={isDownloading}
        onClose={() => setIsPreviewOpen(false)}
        onDownload={download}
      />
    </div>
  );
}

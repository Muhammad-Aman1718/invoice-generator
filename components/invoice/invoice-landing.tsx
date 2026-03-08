"use client";

import { InvoiceForm } from "@/components/invoice/invoice-form";
import { InvoicePreview } from "@/components/invoice/invoice-preview";
import { Download, Eye, Save, X, FileText, Loader2, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";
import useInvoiceLanding from "@/hooks/useInvoiceLanding";

type Tab = "edit" | "preview";

export function InvoiceLanding() {
  const {
    isPreviewOpen,
    setIsPreviewOpen,
    handleDownload,
    handleSave,
    isSaving,
    isDownloading,
    mobileTab,
    setMobileTab,
    grandTotal,
    store,
  } = useInvoiceLanding();

  return (
    <div className="space-y-4">
      {/* ══ ACTION BAR ══════════════════════════════════════════════════
          FIX: Below 460px → 2 rows so buttons never overlap logo/title
          Row 1 (always): logo + title
          Row 2 (<460px): tab toggle + download + save
          ≥460px: single row as before                                   */}

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#191970",
          boxShadow: "0 4px 20px rgba(25,25,112,0.15)",
        }}
      >
        <div className="flex flex-col @container">
          {/* Main Content Row */}
          <div className="flex items-center justify-between gap-2 px-3 py-3 sm:px-6">
            {/* 1. Title & Icon Section (Minimum width safe) */}
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: "rgba(255,193,7,0.15)" }}
              >
                <FileText size={14} style={{ color: "#FFC107" }} />
              </div>
              <div className="min-w-0  max-xs:hidden ">
                <h2 className="text-[13px] font-black text-white truncate leading-tight">
                  Builder
                </h2>
                {/* Hide sub-text below 340px to save space */}
                <p
                  className="text-[9px] hidden min-[340px]:block truncate"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Fill · Preview · Export
                </p>
              </div>
            </div>

            {/* 2. Actions Section */}
            <div className="flex items-center gap-1.5 ml-auto">
              {/* Toggle: Only visible on small screens (< 640px) */}
              <div
                className="flex sm:hidden items-center rounded-lg p-0.5"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                {(["edit", "preview"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setMobileTab(t)}
                    className="flex items-center justify-center p-1.5 rounded-md transition-all"
                    style={{
                      background: mobileTab === t ? "#FFC107" : "transparent",
                      color:
                        mobileTab === t ? "#191970" : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {t === "edit" ? <Edit3 size={12} /> : <Eye size={12} />}
                  </button>
                ))}
              </div>

              {/* Action Buttons: Preview (Desktop), Download, Save */}
              <div className="flex items-center gap-1.5">
                {/* Preview Text: Only on sm+ */}
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 text-white/80 bg-white/5 hover:bg-white/10"
                >
                  <Eye size={13} /> Preview
                </button>

                {/* Download: Icon only on mobile, text on 400px+ */}
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center justify-center gap-1.5 h-8 px-2 min-[400px]:px-3 rounded-lg border border-white/10 text-white/80 bg-white/5 hover:bg-white/10 disabled:opacity-50"
                >
                  {isDownloading ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Download size={13} />
                  )}
                  <span className="hidden min-[400px]:inline text-xs font-bold">
                    PDF
                  </span>
                </button>

                {/* Save Button: Compact on mobile */}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-xs font-black transition-transform active:scale-95 disabled:opacity-50"
                  style={{
                    background: "#FFC107",
                    color: "#191970",
                    boxShadow: "0 4px 10px rgba(255,193,7,0.2)",
                  }}
                >
                  {isSaving ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Save size={13} />
                  )}
                  <span className="hidden min-[320px]:inline">Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ CONTENT AREA ════════════════════════════════════════════════
          FIX: Wrap in a fixed-height container so form scroll does NOT
          push the preview out of view. Each panel scrolls independently.

          Mobile: tabs — edit OR preview (unchanged)
          Desktop (sm+): always show form | preview via modal (unchanged) */}

      {/* Mobile Form Tab */}
      <div
        className={cn("sm:hidden", mobileTab === "edit" ? "block" : "hidden")}
      >
        <div className="">
          {" "}
          {/* 300px par padding minimal honi chahiye */}
          <InvoiceForm />
        </div>
      </div>

      {/* Mobile Preview Tab */}
      <div
        className={cn(
          "sm:hidden  pb-6",
          mobileTab === "preview" ? "block" : "hidden",
        )}
      >
        <div
          className="rounded-xl overflow-hidden bg-white shadow-sm border border-black/5 origin-top"
          style={{
            /* 300px par preview ko thoda chota dikhana zaroori hai */
            transform: "scale(0.92)",
            width: "108.7%",
            marginLeft: "-4.35%",
          }}
        >
          <InvoicePreview id="invoice-preview-landing" />
        </div>

        <button
          onClick={handleDownload}
          className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black active:scale-95 transition-all"
          style={{
            background: "#FFC107",
            color: "#191970",
            boxShadow: "0 4px 12px rgba(255,193,7,0.3)",
          }}
        >
          <Download size={14} /> Download PDF
        </button>
      </div>

      {/* Desktop: form + hidden off-screen preview for PDF */}
      <div className="hidden sm:block">
        <InvoiceForm />

        {/* PDF Generation ke liye ye hidden rehta hai */}
        <div
          className="fixed -left-[9999px] -top-[9999px] w-[794px] opacity-0 pointer-events-none"
          aria-hidden
        >
          <InvoicePreview id="invoice-preview-landing" />
        </div>
      </div>

      {/* ══ DESKTOP PREVIEW MODAL ═══════════════════════════════════════ */}
      {/* ══ DESKTOP/TABLET PREVIEW MODAL ═══════════════════════════════════════ */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-[#191970]/70 backdrop-blur-md"
            onClick={() => setIsPreviewOpen(false)}
          />

          <div className="relative w-full max-w-4xl h-[94vh] rounded-3xl overflow-hidden flex flex-col bg-[#ECEFF1] shadow-2xl">
            {/* Header */}
            <div className="px-4 sm:px-6 py-3 flex items-center justify-between bg-[#191970] flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center">
                  <Eye size={16} className="text-[#FFC107]" />
                </div>
                <h3 className="text-sm font-black text-white">Preview Mode</h3>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-8 bg-[#ECEFF1]">
              <div className="max-w-[794px] mx-auto shadow-xl rounded-sm overflow-hidden border border-black/5">
                <InvoicePreview id="invoice-preview-modal" />
              </div>
            </div>

            {/* Footer - SMART RESPONSIVE */}
            <div className="p-4 bg-white border-t border-black/5 flex flex-col min-[480px]:flex-row items-center justify-between gap-4">
              {/* Total Pill */}
              <div className="flex items-center gap-3 bg-[#ECEFF1] px-4 py-2 rounded-2xl w-full min-[480px]:w-auto border border-black/5">
                <span className="text-[10px] font-black text-[#191970]/40 uppercase tracking-tighter">
                  Total
                </span>
                <span className="text-base font-black text-[#191970]">
                  {store.currency} {grandTotal.toLocaleString()}
                </span>
              </div>

              {/* Buttons Group */}
              <div className="flex items-center gap-2 w-full min-[480px]:w-auto">
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="flex-1 min-[480px]:flex-none px-5 py-2.5 rounded-xl text-xs font-bold border border-[#191970]/10 hover:bg-gray-50 transition-all text-[#191970]"
                >
                  Edit
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex-[2] min-[480px]:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black bg-[#FFC107] text-[#191970] shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                  {isDownloading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Download size={14} />
                  )}
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

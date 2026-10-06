"use client";

import { Download, Eye, Loader2, X } from "lucide-react";
import InvoicePreview from "@/src/components/invoice/preview/InvoicePreview";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { formatCurrency } from "@/src/lib/format";
import type { LandingPreviewModalProps } from "@/src/types/types";

export default function LandingPreviewModal({
  open,
  isDownloading,
  onClose,
  onDownload,
}: LandingPreviewModalProps) {
  const totalAmount = useInvoiceStore((state) => state.totalAmount);
  const currency = useInvoiceStore((state) => state.currency);
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Invoice preview"
    >
      <div className="absolute inset-0 bg-navy/70 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <div className="relative flex h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-mist shadow-2xl">
        <div className="flex flex-shrink-0 items-center justify-between bg-navy px-4 py-3 sm:px-6">
          <h3 className="flex items-center gap-3 text-sm font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/20">
              <Eye size={16} className="text-gold" />
            </span>
            Preview
          </h3>
          <button
            aria-label="Close preview"
            onClick={onClose}
            className="p-2 text-white/50 transition hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 sm:p-8">
          <div className="mx-auto max-w-[794px] overflow-hidden rounded-2xl bg-white shadow-lift">
            <InvoicePreview id="invoicePreviewModal" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/5 bg-white p-4 min-[480px]:flex-row">
          <div className="flex w-full items-center gap-3 rounded-2xl border border-black/5 bg-mist px-4 py-2 min-[480px]:w-auto">
            <span className="text-[10px] font-bold uppercase text-navy/40">Total</span>
            <span className="text-base font-bold text-navy">{formatCurrency(totalAmount, currency)}</span>
          </div>
          <div className="flex w-full items-center gap-2 min-[480px]:w-auto">
            <button onClick={onClose} className="btn-outline flex-1 min-[480px]:flex-none">
              Edit
            </button>
            <button
              onClick={onDownload}
              disabled={isDownloading}
              className="btn-primary flex-[2] min-[480px]:flex-none"
            >
              {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

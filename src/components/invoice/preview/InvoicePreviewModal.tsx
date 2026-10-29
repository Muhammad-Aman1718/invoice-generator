"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Loader2, X, ZoomIn, ZoomOut } from "lucide-react";
import InvoicePreview from "./InvoicePreview";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { formatCurrency } from "@/src/lib/format";
import { cn } from "@/src/lib/utils";
import type { InvoicePreviewModalProps } from "@/src/types/types";

/** Full-size A4 preview in a dialog; Escape or the backdrop closes it. */
export default function InvoicePreviewModal({
  open,
  isDownloading,
  onClose,
  onDownload,
}: InvoicePreviewModalProps) {
  const totalAmount = useInvoiceStore((state) => state.totalAmount);
  const currency = useInvoiceStore((state) => state.currency);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Phones show the whole page scaled down; "Actual size" lets people read it and scroll sideways.
  const [actualSize, setActualSize] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="previewTitle"
    >
      <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative flex h-[94dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-mist shadow-lift motion-safe:animate-fade-up">
        <div className="flex flex-shrink-0 items-center justify-between gap-3 border-b border-navy/[0.07] bg-white px-4 py-3 sm:px-6">
          <div>
            <h2 id="previewTitle" className="text-base font-bold text-navy">
              Invoice preview
            </h2>
            <p className="text-xs text-navy-500">Exactly as it will look in the PDF.</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-pressed={actualSize}
              onClick={() => setActualSize((current) => !current)}
              className="btn-ghost btn-sm sm:hidden"
            >
              {actualSize ? (
                <ZoomOut size={16} aria-hidden="true" />
              ) : (
                <ZoomIn size={16} aria-hidden="true" />
              )}
              {actualSize ? "Fit" : "Zoom"}
            </button>
            <button
              ref={closeRef}
              type="button"
              aria-label="Close preview"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-navy-500 transition hover:bg-mist hover:text-navy"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="custom-scrollbar flex-1 overflow-auto p-3 sm:p-8">
          <div
            className={cn(
              "mx-auto overflow-hidden rounded-xl bg-white shadow-card",
              actualSize ? "w-[794px]" : "max-w-[794px]",
            )}
          >
            <InvoicePreview id="invoicePreviewModal" />
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center justify-between gap-3 border-t border-navy/[0.07] bg-white px-4 py-3 sm:px-6">
          <p className="min-w-0 text-sm text-navy-500">
            <span className="hidden xs:inline">Total </span>
            <span className="font-bold tabular-nums text-navy xs:ml-1">
              {formatCurrency(totalAmount, currency)}
            </span>
          </p>
          <div className="flex flex-shrink-0 gap-2">
            <button type="button" onClick={onClose} className="btn-outline hidden h-10 sm:inline-flex">
              Keep editing
            </button>
            <button type="button" onClick={onDownload} disabled={isDownloading} className="btn-primary h-10">
              {isDownloading ? (
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              ) : (
                <Download size={16} aria-hidden="true" />
              )}
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FilePlus2, X } from "lucide-react";
import type { NextInvoiceBannerProps } from "@/src/types/types";

/** Shown once the current number has been downloaded: one click starts the next invoice. */
export default function NextInvoiceBanner({
  currentNumber,
  nextNumber,
  onStartNext,
  onDismiss,
}: NextInvoiceBannerProps) {
  return (
    <div
      role="status"
      className="flex flex-col gap-3 rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3 motion-safe:animate-fade-up sm:flex-row sm:items-center sm:justify-between sm:px-5"
    >
      <p className="text-sm text-navy">
        <span className="font-semibold">Invoice #{currentNumber} was downloaded.</span>{" "}
        <span className="text-navy-500">
          Start #{nextNumber} with your business details, notes and terms kept.
        </span>
      </p>
      <div className="flex flex-shrink-0 items-center gap-2">
        <button type="button" className="btn-navy btn-sm" onClick={onStartNext}>
          <FilePlus2 size={14} aria-hidden="true" />
          Start invoice #{nextNumber}
        </button>
        <button
          type="button"
          className="btn-ghost btn-sm"
          onClick={onDismiss}
          aria-label={`Keep editing invoice #${currentNumber}`}
        >
          <X size={14} aria-hidden="true" />
          <span className="sm:hidden lg:inline">Keep editing</span>
        </button>
      </div>
    </div>
  );
}

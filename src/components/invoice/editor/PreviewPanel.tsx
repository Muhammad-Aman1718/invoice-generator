"use client";

import InvoicePreview from "@/src/components/invoice/preview/InvoicePreview";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { formatCurrency } from "@/src/lib/format";
import { cn } from "@/src/lib/utils";
import type { PreviewPanelProps } from "@/src/types/types";

export default function PreviewPanel({ id, className }: PreviewPanelProps) {
  const totalAmount = useInvoiceStore((state) => state.totalAmount);
  const currency = useInvoiceStore((state) => state.currency);

  return (
    <div
      className={cn(
        "custom-scrollbar h-full flex-1 overflow-y-auto border-l border-navy/5 bg-mist-dark",
        className,
      )}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy/5 bg-mist-dark/90 px-5 py-3 backdrop-blur">
        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-navy-500">
          <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_rgba(255,193,7,0.8)]" />
          Live preview
        </span>
        <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-black text-navy">
          {formatCurrency(totalAmount, currency)}
        </span>
      </div>
      <div className="p-3 sm:p-6 xl:p-10">
        <div className="relative mx-auto max-w-[800px] overflow-x-auto rounded-xl bg-white shadow-2xl shadow-navy/10">
          <InvoicePreview id={id} />
        </div>
      </div>
    </div>
  );
}

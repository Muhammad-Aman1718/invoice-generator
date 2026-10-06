"use client";

import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { getTotalsBreakdown } from "@/src/lib/invoiceCalculations";
import { formatAmount } from "@/src/lib/format";

export default function InvoiceFormFooter() {
  const store = useInvoiceStore();
  const { discountAmount } = getTotalsBreakdown(store);

  return (
    <div className="flex items-center justify-between bg-navy px-4 py-3.5 sm:px-6">
      <div>
        <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-white">Summary</p>
        <p className="text-[11px] font-semibold text-navy-200">
          {store.currency} ·{" "}
          {store.overallDiscount > 0 ? (
            <span className="text-gold">
              {store.overallDiscount}% Off (−{formatAmount(discountAmount)})
            </span>
          ) : (
            "No Discount"
          )}
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.07] px-3 py-1.5 tabular-nums text-[10px] font-bold text-navy-200">
        <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_#FFC107]" aria-hidden="true" />#
        {store.invoiceNumber}
      </div>
    </div>
  );
}

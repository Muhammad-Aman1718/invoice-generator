import { getTotalsBreakdown } from "@/src/lib/invoiceCalculations";
import type { PreviewTotalsProps } from "@/src/types/types";

export default function PreviewTotals({ invoice, formatMoney }: PreviewTotalsProps) {
  const { discountAmount, taxAmount } = getTotalsBreakdown(invoice);
  return (
    <div className="text-[10.5px]">
      <div className="mb-1 flex justify-between text-navy/60">
        <span>Subtotal</span>
        <span className="font-mono">{formatMoney(invoice.subtotal)}</span>
      </div>
      {invoice.overallDiscount > 0 && (
        <div className="mb-1 flex justify-between text-emerald-600">
          <span>Discount ({invoice.overallDiscount}%)</span>
          <span className="font-mono">− {formatMoney(discountAmount)}</span>
        </div>
      )}
      {invoice.taxRate > 0 && (
        <div className="mb-1 flex justify-between text-navy/60">
          <span>Tax ({invoice.taxRate}%)</span>
          <span className="font-mono">{formatMoney(taxAmount)}</span>
        </div>
      )}
      <div className="mt-1 flex items-baseline justify-between border-t-2 border-navy pt-1.5">
        <span className="text-[13px] font-bold tracking-wide">TOTAL DUE</span>
        <span className="font-mono text-sm font-bold">{formatMoney(invoice.totalAmount)}</span>
      </div>
      <p className="mt-[3px] text-right text-[8px] text-navy/35">All amounts in {invoice.currency}</p>
    </div>
  );
}

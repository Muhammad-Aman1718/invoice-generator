import { getTotalsBreakdown } from "@/src/lib/invoiceCalculations";
import type { PreviewTotalsProps } from "@/src/types/types";

export default function PreviewTotals({ invoice, formatMoney }: PreviewTotalsProps) {
  const { discountAmount, taxAmount } = getTotalsBreakdown(invoice);
  const rows = [
    { label: "Subtotal", value: formatMoney(invoice.subtotal), className: "text-navy/65" },
    invoice.overallDiscount > 0 && {
      label: `Discount (${invoice.overallDiscount}%)`,
      value: `− ${formatMoney(discountAmount)}`,
      className: "text-emerald-700",
    },
    invoice.taxRate > 0 && {
      label: `Tax (${invoice.taxRate}%)`,
      value: formatMoney(taxAmount),
      className: "text-navy/65",
    },
  ].filter((row) => row !== false);

  return (
    <div className="avoid-break">
      {rows.map((row) => (
        <div key={row.label} className={`flex justify-between py-1 text-[11.5px] ${row.className}`}>
          <span>{row.label}</span>
          <span>{row.value}</span>
        </div>
      ))}
      <div className="mt-2 flex items-center justify-between gap-4 rounded-xl bg-navy px-4 py-3 text-white">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">Total due</span>
        <span className="font-display text-lg font-bold text-gold">{formatMoney(invoice.totalAmount)}</span>
      </div>
      <p className="mt-1.5 text-right text-[10px] text-navy/40">All amounts in {invoice.currency}</p>
    </div>
  );
}

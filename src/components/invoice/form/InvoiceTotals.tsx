"use client";

import TaxSelect from "./TaxSelect";
import PercentInput from "./PercentInput";
import TotalRow from "./TotalRow";
import useTaxSelection from "@/src/hooks/useTaxSelection";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { getTotalsBreakdown } from "@/src/lib/invoiceCalculations";
import { formatCurrency } from "@/src/lib/format";

export default function InvoiceTotals() {
  const store = useInvoiceStore();
  const { taxLabel, isCustom, selectTax } = useTaxSelection();
  const { discountAmount, taxAmount } = getTotalsBreakdown(store);
  const money = (amount: number) => formatCurrency(amount, store.currency);

  return (
    <div className="space-y-3">
      <TotalRow label="Subtotal" value={money(store.subtotal)} />
      <PercentInput
        id="overallDiscount"
        label="Discount"
        value={store.overallDiscount}
        onChange={(value) => store.setField("overallDiscount", value)}
      />
      {discountAmount > 0 && (
        <TotalRow label="Discount amount" value={`- ${money(discountAmount)}`} className="text-emerald-700" />
      )}
      <TaxSelect taxLabel={taxLabel} onSelect={selectTax} />
      {isCustom && (
        <PercentInput
          id="customTaxRate"
          label="Custom tax rate"
          value={store.taxRate}
          onChange={(value) => store.setField("taxRate", value)}
        />
      )}
      <TotalRow label={`Tax (${store.taxRate}%)`} value={money(taxAmount)} />
      <div className="flex items-center justify-between gap-3 rounded-xl bg-navy px-4 py-3 text-white">
        <span className="text-sm font-semibold">Total due</span>
        <span className="font-display text-lg font-bold tabular-nums text-gold" aria-live="polite">
          {money(store.totalAmount)}
        </span>
      </div>
    </div>
  );
}

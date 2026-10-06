"use client";

import TaxSelect from "./TaxSelect";
import PercentInput from "./PercentInput";
import TotalRow from "./TotalRow";
import useTaxSelection from "@/src/hooks/useTaxSelection";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { getTotalsBreakdown } from "@/src/lib/invoiceCalculations";
import { formatAmount, getCurrency } from "@/src/lib/format";

export default function InvoiceTotals() {
  const store = useInvoiceStore();
  const { taxLabel, isCustom, selectTax } = useTaxSelection();
  const { discountAmount, taxAmount } = getTotalsBreakdown(store);
  const symbol = getCurrency(store.currency).symbol;
  const money = (amount: number) => `${symbol} ${formatAmount(amount)}`;

  return (
    <div className="space-y-3">
      <TotalRow label="Subtotal" value={money(store.subtotal)} />
      <PercentInput
        id="overallDiscount"
        label="Overall Discount"
        value={store.overallDiscount}
        onChange={(value) => store.setField("overallDiscount", value)}
      />
      {discountAmount > 0 && (
        <TotalRow
          label={`Discount (${store.overallDiscount}%)`}
          value={`− ${money(discountAmount)}`}
          className="font-semibold text-emerald-700"
        />
      )}
      <TotalRow label={<TaxSelect taxLabel={taxLabel} onSelect={selectTax} />} value={money(taxAmount)} />
      {isCustom && (
        <PercentInput
          id="customTaxRate"
          label="Custom tax rate"
          value={store.taxRate}
          onChange={(value) => store.setField("taxRate", value)}
        />
      )}
      <div className="border-t-2 border-navy pt-3" />
      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-navy">Total</span>
        <span className="rounded-xl border border-gold/30 bg-gold/20 px-4 py-1.5 tabular-nums text-base font-bold text-navy">
          {money(store.totalAmount)}
        </span>
      </div>
    </div>
  );
}

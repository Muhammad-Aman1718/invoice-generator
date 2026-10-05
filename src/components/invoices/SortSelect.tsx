import { ArrowDownUp } from "lucide-react";
import { INVOICE_SORT_OPTIONS } from "@/src/constant/invoice";
import type { InvoiceSortKey, SortSelectProps } from "@/src/types/types";

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative">
      <ArrowDownUp
        size={14}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-400"
      />
      <label htmlFor="invoiceSort" className="sr-only">
        Sort invoices
      </label>
      <select
        id="invoiceSort"
        className="input cursor-pointer pl-8 pr-8"
        value={value}
        onChange={(event) => onChange(event.target.value as InvoiceSortKey)}
      >
        {INVOICE_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

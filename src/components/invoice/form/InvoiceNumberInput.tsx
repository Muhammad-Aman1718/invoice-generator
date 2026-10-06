"use client";

import { Hash } from "lucide-react";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { DIGITS_ONLY } from "@/src/constant/limits";

export default function InvoiceNumberInput() {
  const invoiceNumber = useInvoiceStore((state) => state.invoiceNumber);
  const setField = useInvoiceStore((state) => state.setField);

  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1 transition focus-within:border-gold/50">
      <Hash size={12} className="flex-shrink-0 text-gold" aria-hidden="true" />
      <label htmlFor="invoiceNumber" className="sr-only">
        Invoice number
      </label>
      <input
        id="invoiceNumber"
        type="text"
        inputMode="numeric"
        placeholder="#"
        className="w-12 border-none bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/40 sm:w-24 sm:text-base"
        value={invoiceNumber === 0 ? "" : invoiceNumber}
        onChange={(event) => {
          const value = event.target.value;
          if (DIGITS_ONLY.test(value)) setField("invoiceNumber", value === "" ? 0 : Number(value));
        }}
      />
    </div>
  );
}

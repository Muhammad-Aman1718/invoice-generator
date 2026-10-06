"use client";

import { ChevronDown } from "lucide-react";
import useDropdown from "@/src/hooks/useDropdown";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { getCurrency } from "@/src/lib/format";
import { CURRENCIES } from "@/src/constant/currencies";
import { cn } from "@/src/lib/utils";

export default function CurrencySelect() {
  const currencyCode = useInvoiceStore((state) => state.currency);
  const setField = useInvoiceStore((state) => state.setField);
  const { open, setOpen, toggle, containerRef } = useDropdown();
  const selected = getCurrency(currencyCode);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Currency: ${selected.code}`}
        className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-[10px] font-bold text-white transition hover:border-gold/40 hover:bg-gold/10 sm:text-xs"
      >
        <span className="text-gold">{selected.symbol}</span>
        <span className="hidden min-[380px]:inline">{selected.code}</span>
        <ChevronDown
          size={10}
          aria-hidden="true"
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Select currency"
          className="custom-scrollbar absolute right-0 top-full z-50 mt-2 max-h-56 w-56 overflow-y-auto rounded-xl border border-navy/10 bg-white shadow-2xl sm:w-60"
        >
          {CURRENCIES.map((currency) => (
            <button
              key={currency.code}
              type="button"
              role="option"
              aria-selected={currency.code === currencyCode}
              onClick={() => {
                setField("currency", currency.code);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between border-b border-black/5 px-4 py-2.5 text-left text-xs text-navy transition last:border-none hover:bg-gray-100",
                currency.code === currencyCode && "bg-gold/10 font-bold",
              )}
            >
              <span className="min-w-0">
                <span className="block truncate">{currency.label}</span>
                <span className="block text-[10px] uppercase text-[#555]">{currency.code}</span>
              </span>
              <span className="ml-2 rounded-md bg-navy/5 px-1.5 py-0.5 tabular-nums text-[10px]">
                {currency.symbol}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

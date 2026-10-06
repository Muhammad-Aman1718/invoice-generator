"use client";

import { ChevronDown } from "lucide-react";
import useDropdown from "@/src/hooks/useDropdown";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { CUSTOM_TAX_LABEL, NO_TAX_LABEL, TAX_TYPES } from "@/src/constant/taxTypes";
import { cn } from "@/src/lib/utils";
import type { TaxSelectProps } from "@/src/types/types";

export default function TaxSelect({ taxLabel, onSelect }: TaxSelectProps) {
  const taxRate = useInvoiceStore((state) => state.taxRate);
  const { open, setOpen, toggle, containerRef } = useDropdown();

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Tax type: ${taxLabel}`}
        className="flex items-center gap-1.5 text-sm font-medium text-navy-500 transition hover:text-gold-dark"
      >
        <span>{taxLabel}</span>
        {taxLabel !== NO_TAX_LABEL && (
          <span className="rounded-lg bg-gold/15 px-1.5 py-0.5 tabular-nums text-xs font-bold text-navy">
            {taxRate}%
          </span>
        )}
        <ChevronDown
          size={11}
          aria-hidden="true"
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Select tax type"
          className="custom-scrollbar absolute bottom-full left-0 z-50 mb-2 max-h-56 w-44 overflow-y-auto rounded-xl border border-navy/10 bg-white shadow-2xl"
        >
          {TAX_TYPES.map((tax) => (
            <button
              key={tax.label}
              type="button"
              role="option"
              aria-selected={tax.label === taxLabel}
              onClick={() => {
                onSelect(tax);
                setOpen(false);
              }}
              className={cn(
                "flex w-full justify-between px-4 py-2.5 text-left text-xs text-navy transition hover:bg-mist",
                tax.label === taxLabel && "bg-gold/10 font-extrabold",
              )}
            >
              <span>{tax.label}</span>
              {tax.label !== NO_TAX_LABEL && tax.label !== CUSTOM_TAX_LABEL && (
                <span className="text-navy-500">{tax.rate}%</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { EDITABLE_STATUSES, STATUS_META } from "@/src/constant/invoice";
import { cn } from "@/src/lib/utils";
import type { InvoiceStatus, StatusSelectProps } from "@/src/types/types";

export default function StatusSelect({ className }: StatusSelectProps) {
  const status = useInvoiceStore((state) => state.status);
  const setField = useInvoiceStore((state) => state.setField);

  return (
    <select
      aria-label="Invoice status"
      value={status}
      onChange={(event) => setField("status", event.target.value as InvoiceStatus)}
      className={cn(
        "h-9 cursor-pointer rounded-xl border border-navy/10 bg-white px-2.5 text-xs font-bold text-navy outline-none focus:border-gold",
        className,
      )}
    >
      {EDITABLE_STATUSES.map((value) => (
        <option key={value} value={value}>
          {STATUS_META[value].label}
        </option>
      ))}
    </select>
  );
}

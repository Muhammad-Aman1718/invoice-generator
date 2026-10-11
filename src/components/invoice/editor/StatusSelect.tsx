"use client";

import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { EDITABLE_STATUSES, STATUS_META } from "@/src/constant/invoice";
import { cn } from "@/src/lib/utils";
import type { InvoiceStatus, StatusSelectProps } from "@/src/types/types";

export default function StatusSelect({ id, className }: StatusSelectProps) {
  const status = useInvoiceStore((state) => state.status);
  const setField = useInvoiceStore((state) => state.setField);

  return (
    <select
      id={id}
      value={status}
      onChange={(event) => setField("status", event.target.value as InvoiceStatus)}
      className={cn("input cursor-pointer", className)}
    >
      {EDITABLE_STATUSES.map((value) => (
        <option key={value} value={value}>
          {STATUS_META[value].label}
        </option>
      ))}
    </select>
  );
}

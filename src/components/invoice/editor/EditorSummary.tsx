"use client";

import StatusSelect from "./StatusSelect";
import InvoiceTotals from "@/src/components/invoice/form/InvoiceTotals";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { formatInvoiceDate } from "@/src/lib/format";
import type { EditorSummaryProps } from "@/src/types/types";

/** Right-hand rail: status, who/when at a glance, and the totals with discount & tax controls. */
export default function EditorSummary({ showStatus = true }: EditorSummaryProps) {
  const clientName = useInvoiceStore((state) => state.clientName);
  const dueDate = useInvoiceStore((state) => state.dueDate);

  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" aria-label="Invoice summary">
      <div className="rounded-2xl border border-navy/[0.08] bg-white p-5 shadow-card">
        <h2 className="mb-4 text-base font-bold text-navy">Summary</h2>
        {showStatus && (
          <div className="mb-4 space-y-1.5">
            <label htmlFor="invoiceStatus" className="label mb-0">
              Status
            </label>
            <StatusSelect id="invoiceStatus" className="w-full" />
          </div>
        )}
        <dl className="mb-5 space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-navy-500">Client</dt>
            <dd className="truncate font-semibold text-navy">{clientName || "Not set"}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-navy-500">Due</dt>
            <dd className="font-semibold text-navy">{dueDate ? formatInvoiceDate(dueDate) : "Not set"}</dd>
          </div>
        </dl>
        <InvoiceTotals />
      </div>
    </aside>
  );
}

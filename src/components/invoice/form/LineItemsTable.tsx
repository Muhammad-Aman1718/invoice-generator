"use client";

import { Plus } from "lucide-react";
import LineItemRow from "./LineItemRow";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { getCurrency } from "@/src/lib/format";
import { LINE_ITEM_COLUMNS } from "@/src/constant/invoice";
import { MAX_LINE_ITEMS } from "@/src/constant/app";

/** Line items as responsive rows: a table-like grid on desktop, stacked cards on phones. */
export default function LineItemsTable() {
  const lineItems = useInvoiceStore((state) => state.lineItems);
  const currency = useInvoiceStore((state) => state.currency);
  const addLineItem = useInvoiceStore((state) => state.addLineItem);
  const isFull = lineItems.length >= MAX_LINE_ITEMS;
  const currencySymbol = getCurrency(currency).symbol;

  return (
    <div>
      <div className="line-item-grid mb-2 hidden border-b border-navy/[0.08] pb-2 sm:grid" aria-hidden="true">
        {LINE_ITEM_COLUMNS.map((column) => (
          <span key={column.label} className={`label mb-0 ${column.className}`}>
            {column.label}
          </span>
        ))}
        <span />
      </div>
      <ol className="space-y-3 sm:space-y-2" aria-label="Invoice items">
        {lineItems.map((item, index) => (
          <LineItemRow
            key={item.id || index}
            item={item}
            index={index}
            currencySymbol={currencySymbol}
            canRemove={lineItems.length > 1}
          />
        ))}
      </ol>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={addLineItem} disabled={isFull} className="btn-outline btn-sm">
          <Plus size={14} aria-hidden="true" /> Add item
        </button>
        <p className="text-xs text-navy-500" aria-live="polite">
          {isFull
            ? `You've reached the limit of ${MAX_LINE_ITEMS} items.`
            : `${lineItems.length} of ${MAX_LINE_ITEMS} items`}
        </p>
      </div>
    </div>
  );
}

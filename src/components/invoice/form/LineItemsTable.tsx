"use client";

import { Plus } from "lucide-react";
import LineItemRow from "./LineItemRow";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { LINE_ITEM_COLUMNS } from "@/src/constant/invoice";
import type { LineItemsTableProps } from "@/src/types/types";

export default function LineItemsTable({ currencySymbol }: LineItemsTableProps) {
  const lineItems = useInvoiceStore((state) => state.lineItems);
  const addLineItem = useInvoiceStore((state) => state.addLineItem);

  return (
    <section
      className="w-full overflow-hidden rounded-2xl border border-navy/10 shadow-card"
      aria-labelledby="itemsHeading"
    >
      <div className="flex items-center justify-between bg-navy px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <div className="h-4 w-1 rounded-full bg-gold" />
          <h2 id="itemsHeading" className="text-[10px] font-bold uppercase tracking-widest text-navy-200">
            Line Items
          </h2>
        </div>
        <span
          className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold"
          aria-live="polite"
        >
          {lineItems.length} item{lineItems.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="custom-scrollbar relative overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-navy/[0.08] bg-navy/[0.04]">
              {LINE_ITEM_COLUMNS.map((column) => (
                <th
                  key={column.label}
                  scope="col"
                  className={`py-3 text-[10px] font-bold uppercase tracking-widest text-navy-500 ${column.className}`}
                >
                  {column.label}
                </th>
              ))}
              <th scope="col" className="w-[8%]">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, index) => (
              <LineItemRow
                key={item.id || index}
                item={item}
                index={index}
                currencySymbol={currencySymbol}
                canRemove={lineItems.length > 1}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-navy/[0.06] bg-white">
              <td colSpan={LINE_ITEM_COLUMNS.length + 1} className="px-3 py-3 sm:px-4">
                <button
                  type="button"
                  onClick={addLineItem}
                  className="flex items-center gap-1.5 rounded-xl bg-gold/15 px-4 py-2.5 text-xs font-bold text-navy shadow-sm transition hover:bg-gold/25"
                >
                  <Plus size={14} strokeWidth={3} className="text-gold-dark" />
                  Add New Item
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

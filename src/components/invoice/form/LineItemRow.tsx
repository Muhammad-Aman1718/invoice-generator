"use client";

import { Trash2 } from "lucide-react";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { formatAmount } from "@/src/lib/format";
import { clampPercent, toPositiveNumber } from "@/src/lib/numberUtils";
import { LINE_ITEM_INPUT_CLASS } from "@/src/constant/theme";
import { MAX_PERCENT } from "@/src/constant/limits";
import type { LineItemRowProps } from "@/src/types/types";

export default function LineItemRow({ item, index, currencySymbol, canRemove }: LineItemRowProps) {
  const updateLineItem = useInvoiceStore((state) => state.updateLineItem);
  const removeLineItem = useInvoiceStore((state) => state.removeLineItem);
  const id = item.id!;
  const position = index + 1;

  return (
    <tr className={index % 2 === 0 ? "bg-mist" : "bg-white"}>
      <td className="px-3 py-2.5 sm:px-4">
        <input
          aria-label={`Description for item ${position}`}
          value={item.description}
          onChange={(event) => updateLineItem(id, "description", event.target.value)}
          placeholder="Item description..."
          className={LINE_ITEM_INPUT_CLASS}
        />
      </td>
      <td className="min-w-[60px] px-2 py-2.5 sm:px-3">
        <input
          type="number"
          min={0}
          aria-label={`Quantity for item ${position}`}
          value={item.quantity || ""}
          onChange={(event) => updateLineItem(id, "quantity", toPositiveNumber(event.target.value))}
          placeholder="0"
          className={`${LINE_ITEM_INPUT_CLASS} text-center`}
        />
      </td>
      <td className="min-w-[80px] px-1 py-2.5 sm:px-3">
        <div className="relative flex items-center">
          <span
            className="pointer-events-none absolute left-2.5 text-xs font-bold text-navy-500"
            aria-hidden="true"
          >
            {currencySymbol}
          </span>
          <input
            type="number"
            min={0}
            step={0.01}
            aria-label={`Rate per unit for item ${position}`}
            value={item.rate || ""}
            onChange={(event) => updateLineItem(id, "rate", toPositiveNumber(event.target.value))}
            placeholder="0.00"
            className={`${LINE_ITEM_INPUT_CLASS} pl-7 text-right`}
          />
        </div>
      </td>
      <td className="min-w-[70px] px-2 py-2.5 sm:px-3">
        <div className="relative flex items-center">
          <input
            type="number"
            min={0}
            max={MAX_PERCENT}
            aria-label={`Discount percentage for item ${position}`}
            value={item.discount || ""}
            onChange={(event) => updateLineItem(id, "discount", clampPercent(parseFloat(event.target.value)))}
            placeholder="0"
            className={`${LINE_ITEM_INPUT_CLASS} pr-5 text-center`}
          />
          <span
            className="pointer-events-none absolute right-2.5 text-xs font-bold text-navy-500"
            aria-hidden="true"
          >
            %
          </span>
        </div>
      </td>
      <td className="px-3 py-2.5 text-right sm:px-4">
        <div className="rounded-xl border border-gold/20 bg-gold/10 px-2.5 py-2 text-right text-sm font-black tabular-nums text-navy">
          {currencySymbol}
          {formatAmount(item.amount)}
        </div>
      </td>
      <td className="px-2 py-2.5 text-center">
        <button
          type="button"
          onClick={() => removeLineItem(id)}
          disabled={!canRemove}
          aria-label={`Delete item ${position}`}
          className="rounded-lg p-1.5 text-red-500/80 transition hover:bg-red-50 disabled:opacity-20"
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  );
}

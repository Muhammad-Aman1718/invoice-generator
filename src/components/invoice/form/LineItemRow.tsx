"use client";

import { AlertCircle, Trash2 } from "lucide-react";
import useInvoiceValidation from "@/src/hooks/useInvoiceValidation";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { formatAmount } from "@/src/lib/format";
import { clampPercent, toPositiveNumber } from "@/src/lib/numberUtils";
import { FIELD_LIMITS, MAX_PERCENT } from "@/src/constant/limits";
import { LINE_ITEM_FIELD_IDS } from "@/src/constant/validation";
import type { LineItemRowProps } from "@/src/types/types";

const MOBILE_LABEL = "label mb-1 sm:sr-only";

export default function LineItemRow({ item, index, currencySymbol, canRemove }: LineItemRowProps) {
  const updateLineItem = useInvoiceStore((state) => state.updateLineItem);
  const removeLineItem = useInvoiceStore((state) => state.removeLineItem);
  const { errors, validateField } = useInvoiceValidation();
  const id = item.id!;
  const ids = {
    description: LINE_ITEM_FIELD_IDS.description(index),
    quantity: LINE_ITEM_FIELD_IDS.quantity(index),
    rate: LINE_ITEM_FIELD_IDS.rate(index),
  };
  const rowErrors = [errors[ids.description], errors[ids.quantity], errors[ids.rate]].filter(Boolean);
  const errorId = `item${index}Errors`;
  const fieldProps = (fieldId: string) => ({
    id: fieldId,
    onBlur: () => validateField(fieldId),
    "aria-invalid": errors[fieldId] ? true : undefined,
    "aria-describedby": errors[fieldId] ? errorId : undefined,
  });

  return (
    <li className="rounded-xl border border-navy/[0.08] p-3 sm:rounded-none sm:border-0 sm:p-0">
      <div className="line-item-grid grid grid-cols-6 items-end gap-2">
        <div className="col-span-6 sm:col-span-1">
          <label htmlFor={ids.description} className={MOBILE_LABEL}>
            Description, item {index + 1}
          </label>
          <input
            {...fieldProps(ids.description)}
            className="input"
            maxLength={FIELD_LIMITS.lineDescription}
            value={item.description}
            onChange={(event) => updateLineItem(id, "description", event.target.value)}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor={ids.quantity} className={MOBILE_LABEL}>
            Qty, item {index + 1}
          </label>
          <input
            {...fieldProps(ids.quantity)}
            type="number"
            inputMode="decimal"
            min={0}
            className="input text-right tabular-nums"
            value={item.quantity || ""}
            onChange={(event) => updateLineItem(id, "quantity", toPositiveNumber(event.target.value))}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor={ids.rate} className={MOBILE_LABEL}>
            Rate ({currencySymbol}), item {index + 1}
          </label>
          <input
            {...fieldProps(ids.rate)}
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            className="input text-right tabular-nums"
            value={item.rate || ""}
            onChange={(event) => updateLineItem(id, "rate", toPositiveNumber(event.target.value))}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor={`itemDiscount${index}`} className={MOBILE_LABEL}>
            Discount %, item {index + 1}
          </label>
          <input
            id={`itemDiscount${index}`}
            type="number"
            inputMode="decimal"
            min={0}
            max={MAX_PERCENT}
            className="input text-right tabular-nums"
            value={item.discount || ""}
            onChange={(event) => updateLineItem(id, "discount", clampPercent(parseFloat(event.target.value)))}
          />
        </div>
        <p
          className="col-span-4 py-2.5 text-right text-sm font-bold tabular-nums text-navy sm:col-span-1"
          aria-label={`Amount, item ${index + 1}`}
        >
          {currencySymbol}
          {formatAmount(item.amount)}
        </p>
        <button
          type="button"
          onClick={() => removeLineItem(id)}
          disabled={!canRemove}
          aria-label={`Remove item ${index + 1}`}
          className="col-span-2 flex h-11 items-center justify-center rounded-xl text-navy-400 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-30 sm:col-span-1 sm:h-10"
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </div>
      {rowErrors.length > 0 && (
        <ul id={errorId} className="mt-1.5 space-y-0.5">
          {rowErrors.map((message) => (
            <li key={message} className="flex items-start gap-1.5 text-xs font-medium text-red-700">
              <AlertCircle size={13} className="mt-px flex-shrink-0" aria-hidden="true" />
              {message}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

"use client";

import { Plus, Trash2 } from "lucide-react";
import { LineItemsTableProps } from "@/src/types/invoice-types";
import useLineItemsTable from "@/src/hooks/useLineItemsTable";

export function LineItemsTable({
  currency = "$",
  showDiscount = false,
}: LineItemsTableProps) {
  const {
    lineItems,
    handleQtyChange,
    handleRateChange,
    handleDiscountChange,
    canRemove,
    inp,
    addLineItem,
    removeLineItem,
    updateLineItem,
    fmt,
  } = useLineItemsTable();

  return (
    <section
      className="rounded-2xl overflow-hidden w-full"
      aria-labelledby="items-heading"
      style={{
        border: "1px solid rgba(25,25,112,0.1)",
        boxShadow: "0 4px 20px rgba(25,25,112,0.06)",
      }}
    >
      {/* ── Section label ── */}
      <div
        className="px-4 sm:px-5 py-3 flex items-center justify-between"
        style={{ background: "#191970" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-1 h-4 rounded-full"
            style={{ background: "#FFC107" }}
          />
          <h2
            id="items-heading"
            className="text-[10px] font-black uppercase tracking-widest"
            style={{ color: "#C8C8E8" }}
          >
            Line Items
          </h2>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          aria-live="polite"
          style={{
            background: "rgba(255,193,7,0.15)",
            color: "#FFC107",
          }}
        >
          {lineItems.length} item{lineItems.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table
          className="w-full text-sm border-collapse"
          style={{ minWidth: "520px" }}
        >
          <thead>
            <tr
              style={{
                background: "rgba(25,25,112,0.04)",
                borderBottom: "2px solid rgba(25,25,112,0.08)",
              }}
            >
              <th
                scope="col"
                className="text-left px-3 sm:px-4 py-3 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "#3D3D6B", width: "38%" }}
              >
                Description
              </th>
              <th
                scope="col"
                className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "#3D3D6B", width: "10%" }}
              >
                Qty
              </th>
              <th
                scope="col"
                className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "#3D3D6B", width: "16%" }}
              >
                Rate
              </th>
              {showDiscount && (
                <th
                  scope="col"
                  className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
                  style={{ color: "#3D3D6B", width: "12%" }}
                >
                  Disc %
                </th>
              )}
              <th
                scope="col"
                className="text-right px-3 sm:px-4 py-3 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "#3D3D6B", width: "16%" }}
              >
                Amount
              </th>
              <th scope="col" style={{ width: "8%" }}>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody style={{ background: "#ECEFF1" }}>
            {lineItems.map((item, idx) => (
              <tr
                key={item.id || idx}
                className="group"
                style={{
                  background: idx % 2 === 0 ? "#ECEFF1" : "#ffffff",
                  borderBottom: "1px solid rgba(25,25,112,0.05)",
                }}
              >
                <td className="px-3 sm:px-4 py-2.5">
                  <label
                    htmlFor={`item-description-${idx}`}
                    className="sr-only"
                  >
                    Description for item {idx + 1}
                  </label>
                  <input
                    id={`item-description-${idx}`}
                    name={`item-description-${idx}`}
                    value={item.description}
                    aria-label={`Description for item ${idx + 1}`}
                    onChange={(e) =>
                      updateLineItem(item.id!, "description", e.target.value)
                    }
                    placeholder="Item description..."
                    className={inp}
                  />
                </td>

                <td className="px-2 sm:px-3 py-2.5 min-w-[60px]">
                  <label htmlFor={`item-qty-${idx}`} className="sr-only">
                    Quantity for item {idx + 1}
                  </label>
                  <input
                    id={`item-qty-${idx}`}
                    name={`item-qty-${idx}`}
                    type="number"
                    min={0}
                    value={item.quantity || ""}
                    aria-label={`Quantity for item ${idx + 1}`}
                    onChange={(e) => handleQtyChange(item.id!, e.target.value)}
                    placeholder="0"
                    className={`${inp} text-center`}
                  />
                </td>

                <td className="px-1 sm:px-3 py-2.5 min-w-[80px]">
                  <div className="relative flex items-center">
                    <span
                      className="absolute left-2.5 text-xs font-bold pointer-events-none"
                      aria-hidden="true"
                      style={{ color: "#3D3D6B" }}
                    >
                      {currency}
                    </span>
                    <label htmlFor={`item-rate-${idx}`} className="sr-only">
                      Rate per unit for item {idx + 1}
                    </label>
                    <input
                      id={`item-rate-${idx}`}
                      name={`item-rate-${idx}`}
                      type="number"
                      min={0}
                      step={0.01}
                      value={item.rate || ""}
                      aria-label={`Rate per unit for item ${idx + 1}`}
                      onChange={(e) =>
                        handleRateChange(item.id!, e.target.value)
                      }
                      placeholder="0.00"
                      className={`${inp} text-right pl-7`}
                    />
                  </div>
                </td>

                {showDiscount && (
                  <td className="px-2 sm:px-3 py-2.5 min-w-[70px]">
                    <div className="relative flex items-center">
                      <label
                        htmlFor={`item-discount-${idx}`}
                        className="sr-only"
                      >
                        Discount percentage for item {idx + 1}
                      </label>
                      <input
                        id={`item-discount-${idx}`}
                        name={`item-discount-${idx}`}
                        type="number"
                        min={0}
                        max={100}
                        value={item.discount || ""}
                        aria-label={`Discount percentage for item ${idx + 1}`}
                        onChange={(e) =>
                          handleDiscountChange(item.id!, e.target.value)
                        }
                        placeholder="0"
                        className={`${inp} text-center pr-5`}
                      />
                      <span
                        className="absolute right-2.5 text-xs font-bold pointer-events-none"
                        aria-hidden="true"
                        style={{ color: "#3D3D6B" }}
                      >
                        %
                      </span>
                    </div>
                  </td>
                )}

                <td className="px-3 sm:px-4 py-2.5 text-right">
                  <div
                    role="status"
                    className="px-2.5 py-2 rounded-xl text-sm font-black tabular-nums text-right border"
                    style={{
                      background: "rgba(255,193,7,0.1)",
                      color: "#191970",
                      borderColor: "rgba(255,193,7,0.2)",
                    }}
                  >
                    <span className="sr-only">
                      Total amount for item {idx + 1}:
                    </span>
                    {currency}
                    {fmt(item.amount)}
                  </div>
                </td>

                <td className="px-2 py-2.5 text-center">
                  <button
                    type="button"
                    onClick={() => removeLineItem(item.id!)}
                    disabled={!canRemove}
                    aria-label={`Delete item ${idx + 1}`}
                    className="p-1.5 rounded-lg transition-all disabled:opacity-20"
                    style={{ color: "rgba(239,68,68,0.8)" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr
              style={{
                background: "#ffffff",
                borderTop: "1px solid rgba(25,25,112,0.06)",
              }}
            >
              <td colSpan={showDiscount ? 6 : 5} className="px-3 sm:px-4 py-3">
                <button
                  type="button"
                  onClick={addLineItem}
                  aria-label="Add new line item"
                  className="flex items-center gap-1.5 text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-sm"
                  style={{
                    color: "#191970",
                    background: "rgba(255,193,7,0.15)",
                  }}
                >
                  <Plus
                    size={14}
                    strokeWidth={3}
                    style={{ color: "#B8860B" }}
                  />
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

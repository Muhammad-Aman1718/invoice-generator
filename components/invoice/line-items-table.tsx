// "use client";

// import { Plus, Trash2 } from "lucide-react";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateLineItemAmount, formatCurrency } from "@/lib/invoice-utils";
// import type { CurrencyCode } from "@/types/invoice-types";

// // ─────────────────────────────────────────────
// //  COLOR THEME — Corporate Navy  (60 · 30 · 10)
// //  60% → #F5F7FA  row alternating / backgrounds
// //  30% → #1B2A4A  text, borders, header
// //  10% → #3A7BD5  Add Item button, focus, amount
// // ─────────────────────────────────────────────

// interface LineItemsTableProps {
//   currency?: CurrencyCode | string;
//   showDiscount?: boolean;
// }

// // Shared cell input style — borderless inside table
// const cellInput =
//   "w-full bg-transparent border-none outline-none text-sm transition-all " +
//   "text-[#1B2A4A] placeholder:text-[#1B2A4A]/25 " +
//   "focus:bg-[#3A7BD5]/05 rounded px-1 py-0.5";

// export function LineItemsTable({
//   currency,
//   showDiscount = false,
// }: LineItemsTableProps) {
//   const { lineItems, addLineItem, removeLineItem, updateLineItem } =
//     useInvoiceStore();

//   const handleQtyChange = (id: string, v: string) => {
//     const q = parseFloat(v) || 0;
//     updateLineItem(id, "quantity", q);
//     const item = lineItems.find((i) => i.id === id);
//     if (item)
//       updateLineItem(id, "amount", calculateLineItemAmount(q, item.rate));
//   };

//   const handleRateChange = (id: string, v: string) => {
//     const r = parseFloat(v) || 0;
//     updateLineItem(id, "rate", r);
//     const item = lineItems.find((i) => i.id === id);
//     if (item)
//       updateLineItem(id, "amount", calculateLineItemAmount(item.quantity, r));
//   };

//   const handleDiscountChange = (id: string, v: string) => {
//     const d = Math.min(100, Math.max(0, parseFloat(v) || 0));
//     updateLineItem(id, "discount", d);
//     // Recalculate amount with discount applied
//     const item = lineItems.find((i) => i.id === id);
//     if (item) {
//       const base = calculateLineItemAmount(item.quantity, item.rate);
//       updateLineItem(id, "amount", base - (base * d) / 100);
//     }
//   };

//   const canRemove = lineItems.length > 1;

//   return (
//     <div className="space-y-0">
//       {/* ── Table ─────────────────────────────────────────────────────── */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm border-collapse">
//           <tbody>
//             {lineItems.map((item, idx) => (
//               <tr
//                 key={item.id}
//                 className="group transition-colors"
//                 style={{
//                   background: idx % 2 === 0 ? "#ffffff" : "#F5F7FA",
//                   borderBottom: "1px solid #1B2A4A08",
//                 }}
//               >
//                 {/* Description */}
//                 <td className="px-4 py-2.5" style={{ minWidth: 180 }}>
//                   <input
//                     value={item.description}
//                     onChange={(e) =>
//                       updateLineItem(item.id, "description", e.target.value)
//                     }
//                     placeholder="Item description..."
//                     className={cellInput}
//                   />
//                 </td>

//                 {/* Qty */}
//                 <td className="px-3 py-2.5 w-20">
//                   <input
//                     type="number"
//                     min={0}
//                     value={item.quantity || ""}
//                     onChange={(e) => handleQtyChange(item.id, e.target.value)}
//                     placeholder="0"
//                     className={cellInput + " text-right"}
//                   />
//                 </td>

//                 {/* Rate */}
//                 <td className="px-3 py-2.5 w-28">
//                   <input
//                     type="number"
//                     min={0}
//                     step={0.01}
//                     value={item.rate || ""}
//                     onChange={(e) => handleRateChange(item.id, e.target.value)}
//                     placeholder="0.00"
//                     className={cellInput + " text-right"}
//                   />
//                 </td>

//                 {/* Discount % — only if showDiscount */}
//                 {showDiscount && (
//                   <td className="px-3 py-2.5 w-24">
//                     <div className="flex items-center justify-center gap-1">
//                       <input
//                         type="number"
//                         min={0}
//                         max={100}
//                         value={item.discount || ""}
//                         onChange={(e) =>
//                           handleDiscountChange(item.id, e.target.value)
//                         }
//                         placeholder="0"
//                         className={cellInput + " text-right w-12"}
//                       />
//                       <span
//                         className="text-xs font-mono"
//                         style={{ color: "#1B2A4A40" }}
//                       >
//                         %
//                       </span>
//                     </div>
//                   </td>
//                 )}

//                 {/* Amount — 10% accent color */}
//                 <td
//                   className="px-4 py-2.5 w-28 text-right tabular-nums font-semibold"
//                   style={{ color: "#1B2A4A" }}
//                 >
//                   {formatCurrency(item.amount, currency as CurrencyCode)}
//                 </td>

//                 {/* Delete */}
//                 <td className="px-2 py-2.5 w-10">
//                   <button
//                     type="button"
//                     onClick={() => removeLineItem(item.id)}
//                     disabled={!canRemove}
//                     aria-label="Remove item"
//                     className="h-7 w-7 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0 disabled:cursor-not-allowed hover:bg-red-50"
//                   >
//                     <Trash2 size={13} className="text-red-400" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ── Add Item button ────────────────────────────────────────────── */}
//       <div
//         className="px-4 py-2.5 border-t"
//         style={{ borderColor: "#1B2A4A08" }}
//       >
//         <button
//           type="button"
//           onClick={addLineItem}
//           className="flex items-center gap-1.5 text-xs font-bold transition-all rounded-lg px-3 py-1.5 hover:bg-[#3A7BD5]/08"
//           style={{ color: "#3A7BD5" }}
//         >
//           <Plus size={13} strokeWidth={2.5} />
//           Add Line Item
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { Plus, Trash2 } from "lucide-react";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateLineItemAmount, formatCurrency } from "@/lib/invoice-utils";

// // ─────────────────────────────────────────────
// //  COLOR THEME — Corporate Navy  (60 · 30 · 10)
// //  60% → #F5F7FA  background / alternating rows
// //  30% → #1B2A4A  navy — text, borders
// //  10% → #3A7BD5  accent — Add Item button, focus
// // ─────────────────────────────────────────────

// interface LineItemsTableProps {
//   currency?: string;   // now accepts symbol string e.g. "$", "€"
//   showDiscount?: boolean;
// }

// // ── Shared cell input style ────────────────────────────────────────────────
// const cellInput =
//   "w-full bg-transparent border-none outline-none text-sm text-[#1B2A4A] " +
//   "placeholder:text-[#1B2A4A]/25 focus:bg-[#3A7BD5]/05 rounded px-1 py-0.5 transition-all";

// export function LineItemsTable({
//   currency = "$",
//   showDiscount = false,
// }: LineItemsTableProps) {
//   const { lineItems, addLineItem, removeLineItem, updateLineItem } =
//     useInvoiceStore();

//   const handleQtyChange = (id: string, v: string) => {
//     const q = parseFloat(v) || 0;
//     updateLineItem(id, "quantity", q);
//     const item = lineItems.find((i) => i.id === id);
//     if (item)
//       updateLineItem(id, "amount", calculateLineItemAmount(q, item.rate));
//   };

//   const handleRateChange = (id: string, v: string) => {
//     const r = parseFloat(v) || 0;
//     updateLineItem(id, "rate", r);
//     const item = lineItems.find((i) => i.id === id);
//     if (item)
//       updateLineItem(
//         id,
//         "amount",
//         calculateLineItemAmount(item.quantity, r)
//       );
//   };

//   const handleDiscountChange = (id: string, v: string) => {
//     const d = Math.min(100, parseFloat(v) || 0);
//     updateLineItem(id, "discount", d);
//     const item = lineItems.find((i) => i.id === id);
//     if (item) {
//       const base = calculateLineItemAmount(item.quantity, item.rate);
//       updateLineItem(id, "amount", base - (base * d) / 100);
//     }
//   };

//   const canRemove = lineItems.length > 1;

//   return (
//     <div className="w-full">
//       {/* ── Table ── */}
//       <table className="w-full text-sm border-collapse">
//         <tbody>
//           {lineItems.map((item, idx) => (
//             <tr
//               key={item.id}
//               style={{
//                 background: idx % 2 === 0 ? "#ffffff" : "#F5F7FA",
//                 borderBottom: "1px solid #1B2A4A08",
//               }}
//             >
//               {/* Description */}
//               <td className="px-4 py-2.5" style={{ width: "40%" }}>
//                 <input
//                   value={item.description}
//                   onChange={(e) =>
//                     updateLineItem(item.id, "description", e.target.value)
//                   }
//                   placeholder="Item description..."
//                   className={cellInput}
//                 />
//               </td>

//               {/* Qty */}
//               <td className="px-3 py-2.5 text-center" style={{ width: "10%" }}>
//                 <input
//                   type="number"
//                   min={0}
//                   value={item.quantity || ""}
//                   onChange={(e) => handleQtyChange(item.id, e.target.value)}
//                   placeholder="0"
//                   className={cellInput + " text-center"}
//                 />
//               </td>

//               {/* Rate */}
//               <td className="px-3 py-2.5 text-center" style={{ width: "15%" }}>
//                 <div className="flex items-center justify-center gap-1">
//                   <span className="text-[#1B2A4A]/30 text-xs">{currency}</span>
//                   <input
//                     type="number"
//                     min={0}
//                     step={0.01}
//                     value={item.rate || ""}
//                     onChange={(e) => handleRateChange(item.id, e.target.value)}
//                     placeholder="0.00"
//                     className={cellInput + " text-right"}
//                   />
//                 </div>
//               </td>

//               {/* Discount % — only if showDiscount */}
//               {showDiscount && (
//                 <td className="px-3 py-2.5 text-center" style={{ width: "12%" }}>
//                   <div className="flex items-center justify-center gap-0.5">
//                     <input
//                       type="number"
//                       min={0}
//                       max={100}
//                       value={item.discount || ""}
//                       onChange={(e) =>
//                         handleDiscountChange(item.id, e.target.value)
//                       }
//                       placeholder="0"
//                       className={cellInput + " text-center"}
//                     />
//                     <span className="text-[#1B2A4A]/30 text-xs">%</span>
//                   </div>
//                 </td>
//               )}

//               {/* Amount */}
//               <td
//                 className="px-4 py-2.5 text-right tabular-nums font-semibold"
//                 style={{ color: "#1B2A4A", width: "13%" }}
//               >
//                 {currency}
//                 {(item.amount || 0).toLocaleString("en-US", {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//               </td>

//               {/* Delete */}
//               <td className="px-2 py-2.5 text-center" style={{ width: "5%" }}>
//                 <button
//                   type="button"
//                   onClick={() => removeLineItem(item.id)}
//                   disabled={!canRemove}
//                   className="p-1.5 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:bg-red-50"
//                   aria-label="Remove item"
//                 >
//                   <Trash2 size={14} className="text-red-400" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ── Add Item row ── */}
//       <div
//         className="px-4 py-2.5 flex items-center"
//         style={{ borderTop: "1px solid #1B2A4A08" }}
//       >
//         <button
//           type="button"
//           onClick={addLineItem}
//           className="flex items-center gap-1.5 text-xs font-bold transition-all px-3 py-1.5 rounded-lg"
//           style={{ color: "#3A7BD5" }}
//           onMouseEnter={(e) => {
//             (e.currentTarget as HTMLButtonElement).style.background =
//               "#3A7BD510";
//           }}
//           onMouseLeave={(e) => {
//             (e.currentTarget as HTMLButtonElement).style.background =
//               "transparent";
//           }}
//         >
//           <Plus size={13} />
//           Add Item
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { Plus, Trash2 } from "lucide-react";
import { useInvoiceStore } from "@/lib/invoice-store";
import { calculateLineItemAmount } from "@/lib/invoice-utils";

// ─────────────────────────────────────────────
//  COLOR THEME — Corporate Navy  (60 · 30 · 10)
//  60% → #F5F7FA  alternating rows
//  30% → #1B2A4A  navy header, text, borders
//  10% → #3A7BD5  accent — Add Item, focus ring
// ─────────────────────────────────────────────

interface LineItemsTableProps {
  currency?: string; // symbol e.g. "$", "€", "₨"
  showDiscount?: boolean;
}

export function LineItemsTable({
  currency = "$",
  showDiscount = false,
}: LineItemsTableProps) {
  const { lineItems, addLineItem, removeLineItem, updateLineItem } =
    useInvoiceStore();

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleQtyChange = (id: string, v: string) => {
    const q = parseFloat(v) || 0;
    const item = lineItems.find((i) => i.id === id);
    updateLineItem(id, "quantity", q);
    if (item) {
      const base = calculateLineItemAmount(q, item.rate);
      const disc = item.discount || 0;
      updateLineItem(id, "amount", base - (base * disc) / 100);
    }
  };

  const handleRateChange = (id: string, v: string) => {
    const r = parseFloat(v) || 0;
    const item = lineItems.find((i) => i.id === id);
    updateLineItem(id, "rate", r);
    if (item) {
      const base = calculateLineItemAmount(item.quantity, r);
      const disc = item.discount || 0;
      updateLineItem(id, "amount", base - (base * disc) / 100);
    }
  };

  const handleDiscountChange = (id: string, v: string) => {
    const d = Math.min(100, Math.max(0, parseFloat(v) || 0));
    const item = lineItems.find((i) => i.id === id);
    updateLineItem(id, "discount", d);
    if (item) {
      const base = calculateLineItemAmount(item.quantity, item.rate);
      updateLineItem(id, "amount", base - (base * d) / 100);
    }
  };

  const fmt = (n: number) =>
    (n || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const canRemove = lineItems.length > 1;

  // ── Shared input style ────────────────────────────────────────────────────
  const inp =
    "w-full bg-transparent border border-transparent rounded-lg px-2 py-1 text-sm " +
    "text-[#1B2A4A] placeholder:text-[#1B2A4A]/25 outline-none transition-all " +
    "hover:border-[#1B2A4A]/15 focus:border-[#3A7BD5] focus:ring-1 focus:ring-[#3A7BD5]/20 focus:bg-white";

  return (
    <div
      className="rounded-xl overflow-hidden shadow-sm w-full"
      style={{ border: "1px solid #1B2A4A10" }}
    >
      <table className="w-full text-sm border-collapse">
        {/* ══ HEADER — 30% navy ══════════════════════════════════════════ */}
        <thead>
          <tr style={{ background: "#1B2A4A" }}>
            <th
              className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.70)", width: "38%" }}
            >
              Item Description
            </th>
            <th
              className="text-center px-3 py-3 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.70)", width: "10%" }}
            >
              Qty
            </th>
            <th
              className="text-center px-3 py-3 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.70)", width: "16%" }}
            >
              Rate
            </th>
            {showDiscount && (
              <th
                className="text-center px-3 py-3 text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.70)", width: "12%" }}
              >
                Disc %
              </th>
            )}
            <th
              className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.70)", width: "16%" }}
            >
              Amount
            </th>
            <th style={{ width: "8%" }} />
          </tr>
        </thead>

        {/* ══ BODY — rows with editable inputs ══════════════════════════ */}
        <tbody>
          {lineItems.map((item, idx) => (
            <tr
              key={item.id}
              style={{
                background: idx % 2 === 0 ? "#ffffff" : "#F5F7FA",
                borderBottom: "1px solid #1B2A4A08",
              }}
            >
              {/* ── Description ── */}
              <td className="px-3 py-2">
                <input
                  value={item.description}
                  onChange={(e) =>
                    updateLineItem(item.id, "description", e.target.value)
                  }
                  placeholder="Enter item description..."
                  className={inp}
                />
              </td>

              {/* ── Qty ── */}
              <td className="px-3 py-2">
                <input
                  type="number"
                  min={0}
                  value={item.quantity || ""}
                  onChange={(e) => handleQtyChange(item.id, e.target.value)}
                  placeholder="0"
                  className={inp + " text-center"}
                />
              </td>

              {/* ── Rate ── */}
              <td className="px-3 py-2">
                <div className="relative flex items-center">
                  <span
                    className="absolute left-2.5 text-xs pointer-events-none select-none"
                    style={{ color: "#1B2A4A40" }}
                  >
                    {currency}
                  </span>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={item.rate || ""}
                    onChange={(e) => handleRateChange(item.id, e.target.value)}
                    placeholder="0.00"
                    className={inp + " text-right pl-6"}
                  />
                </div>
              </td>

              {/* ── Discount % ── */}
              {showDiscount && (
                <td className="px-3 py-2">
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={item.discount || ""}
                      onChange={(e) =>
                        handleDiscountChange(item.id, e.target.value)
                      }
                      placeholder="0"
                      className={inp + " text-center pr-5"}
                    />
                    <span
                      className="absolute right-2.5 text-xs pointer-events-none select-none"
                      style={{ color: "#1B2A4A40" }}
                    >
                      %
                    </span>
                  </div>
                </td>
              )}

              {/* ── Amount — read only ── */}
              <td className="px-4 py-2 text-right">
                <div
                  className="px-2 py-1 rounded-lg text-sm font-semibold tabular-nums text-right"
                  style={{
                    background: "#1B2A4A05",
                    color: "#1B2A4A",
                    border: "1px solid #1B2A4A08",
                  }}
                >
                  {currency}
                  {fmt(item.amount)}
                </div>
              </td>

              {/* ── Delete ── */}
              <td className="px-2 py-2 text-center">
                <button
                  type="button"
                  onClick={() => removeLineItem(item.id)}
                  disabled={!canRemove}
                  className="p-1.5 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  style={{ color: "#FDA4A4" }}
                  onMouseEnter={(e) => {
                    if (canRemove)
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#FEF2F2";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                  }}
                  aria-label="Remove item"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        {/* ══ FOOTER — Add Item row ══════════════════════════════════════ */}
        <tfoot>
          <tr
            style={{ borderTop: "1px solid #1B2A4A0A", background: "#ffffff" }}
          >
            <td colSpan={showDiscount ? 6 : 5} className="px-4 py-2.5">
              <button
                type="button"
                onClick={addLineItem}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                style={{ color: "#3A7BD5" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#3A7BD510";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }}
              >
                <Plus size={13} />
                Add Item
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

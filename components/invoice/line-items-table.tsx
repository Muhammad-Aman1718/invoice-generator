// "use client";

// import { Plus, Trash2 } from "lucide-react";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateLineItemAmount } from "@/lib/invoice-utils";

// interface LineItemsTableProps {
//   currency?: string; // symbol e.g. "$", "€", "₨"
//   showDiscount?: boolean;
// }

// export function LineItemsTable({
//   currency = "$",
//   showDiscount = false,
// }: LineItemsTableProps) {
//   const { lineItems, addLineItem, removeLineItem, updateLineItem } =
//     useInvoiceStore();

//   // ── Handlers ─────────────────────────────────────────────────────────────
//   const handleQtyChange = (id: string, v: string) => {
//     const q = parseFloat(v) || 0;
//     const item = lineItems.find((i) => i.id === id);
//     updateLineItem(id, "quantity", q);
//     if (item) {
//       const base = calculateLineItemAmount(q, item.rate);
//       const disc = item.discount || 0;
//       updateLineItem(id, "amount", base - (base * disc) / 100);
//     }
//   };

//   const handleRateChange = (id: string, v: string) => {
//     const r = parseFloat(v) || 0;
//     const item = lineItems.find((i) => i.id === id);
//     updateLineItem(id, "rate", r);
//     if (item) {
//       const base = calculateLineItemAmount(item.quantity, r);
//       const disc = item.discount || 0;
//       updateLineItem(id, "amount", base - (base * disc) / 100);
//     }
//   };

//   const handleDiscountChange = (id: string, v: string) => {
//     const d = Math.min(100, Math.max(0, parseFloat(v) || 0));
//     const item = lineItems.find((i) => i.id === id);
//     updateLineItem(id, "discount", d);
//     if (item) {
//       const base = calculateLineItemAmount(item.quantity, item.rate);
//       updateLineItem(id, "amount", base - (base * d) / 100);
//     }
//   };

//   const fmt = (n: number) =>
//     (n || 0).toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });

//   const canRemove = lineItems.length > 1;

//   // ── Shared input style ────────────────────────────────────────────────────
//   const inp =
//     "w-full bg-transparent border border-transparent rounded-lg px-2 py-1 text-sm " +
//     "text-[#1B2A4A] placeholder:text-[#1B2A4A]/25 outline-none transition-all " +
//     "hover:border-[#1B2A4A]/15 focus:border-[#3A7BD5] focus:ring-1 focus:ring-[#3A7BD5]/20 focus:bg-white";

//   return (
//     <div
//       className="rounded-xl overflow-hidden shadow-sm w-full"
//       style={{ border: "1px solid #1B2A4A10" }}
//     >
//       <table className="w-full text-sm border-collapse">
//         {/* ══ HEADER — 30% navy ══════════════════════════════════════════ */}
//         <thead>
//           <tr style={{ background: "#1B2A4A" }}>
//             <th
//               className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest"
//               style={{ color: "rgba(255,255,255,0.70)", width: "38%" }}
//             >
//               Item Description
//             </th>
//             <th
//               className="text-center px-3 py-3 text-[10px] font-bold uppercase tracking-widest"
//               style={{ color: "rgba(255,255,255,0.70)", width: "10%" }}
//             >
//               Qty
//             </th>
//             <th
//               className="text-center px-3 py-3 text-[10px] font-bold uppercase tracking-widest"
//               style={{ color: "rgba(255,255,255,0.70)", width: "16%" }}
//             >
//               Rate
//             </th>
//             {showDiscount && (
//               <th
//                 className="text-center px-3 py-3 text-[10px] font-bold uppercase tracking-widest"
//                 style={{ color: "rgba(255,255,255,0.70)", width: "12%" }}
//               >
//                 Disc %
//               </th>
//             )}
//             <th
//               className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-widest"
//               style={{ color: "rgba(255,255,255,0.70)", width: "16%" }}
//             >
//               Amount
//             </th>
//             <th style={{ width: "8%" }} />
//           </tr>
//         </thead>

//         {/* ══ BODY — rows with editable inputs ══════════════════════════ */}
//         <tbody>
//           {lineItems.map((item, idx) => (
//             <tr
//               key={item.id}
//               style={{
//                 background: idx % 2 === 0 ? "#ffffff" : "#F5F7FA",
//                 borderBottom: "1px solid #1B2A4A08",
//               }}
//             >
//               {/* ── Description ── */}
//               <td className="px-3 py-2">
//                 <input
//                   value={item.description}
//                   onChange={(e) =>
//                     updateLineItem(item.id, "description", e.target.value)
//                   }
//                   placeholder="Enter item description..."
//                   className={inp}
//                 />
//               </td>

//               {/* ── Qty ── */}
//               <td className="px-3 py-2">
//                 <input
//                   type="number"
//                   min={0}
//                   value={item.quantity || ""}
//                   onChange={(e) => handleQtyChange(item.id, e.target.value)}
//                   placeholder="0"
//                   className={inp + " text-center"}
//                 />
//               </td>

//               {/* ── Rate ── */}
//               <td className="px-3 py-2">
//                 <div className="relative flex items-center">
//                   <span
//                     className="absolute left-2.5 text-xs pointer-events-none select-none"
//                     style={{ color: "#1B2A4A40" }}
//                   >
//                     {currency}
//                   </span>
//                   <input
//                     type="number"
//                     min={0}
//                     step={0.01}
//                     value={item.rate || ""}
//                     onChange={(e) => handleRateChange(item.id, e.target.value)}
//                     placeholder="0.00"
//                     className={inp + " text-right pl-6"}
//                   />
//                 </div>
//               </td>

//               {/* ── Discount % ── */}
//               {showDiscount && (
//                 <td className="px-3 py-2">
//                   <div className="relative flex items-center">
//                     <input
//                       type="number"
//                       min={0}
//                       max={100}
//                       value={item.discount || ""}
//                       onChange={(e) =>
//                         handleDiscountChange(item.id, e.target.value)
//                       }
//                       placeholder="0"
//                       className={inp + " text-center pr-5"}
//                     />
//                     <span
//                       className="absolute right-2.5 text-xs pointer-events-none select-none"
//                       style={{ color: "#1B2A4A40" }}
//                     >
//                       %
//                     </span>
//                   </div>
//                 </td>
//               )}

//               {/* ── Amount — read only ── */}
//               <td className="px-4 py-2 text-right">
//                 <div
//                   className="px-2 py-1 rounded-lg text-sm font-semibold tabular-nums text-right"
//                   style={{
//                     background: "#1B2A4A05",
//                     color: "#1B2A4A",
//                     border: "1px solid #1B2A4A08",
//                   }}
//                 >
//                   {currency}
//                   {fmt(item.amount)}
//                 </div>
//               </td>

//               {/* ── Delete ── */}
//               <td className="px-2 py-2 text-center">
//                 <button
//                   type="button"
//                   onClick={() => removeLineItem(item.id)}
//                   disabled={!canRemove}
//                   className="p-1.5 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed"
//                   style={{ color: "#FDA4A4" }}
//                   onMouseEnter={(e) => {
//                     if (canRemove)
//                       (e.currentTarget as HTMLButtonElement).style.background =
//                         "#FEF2F2";
//                   }}
//                   onMouseLeave={(e) => {
//                     (e.currentTarget as HTMLButtonElement).style.background =
//                       "transparent";
//                   }}
//                   aria-label="Remove item"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>

//         {/* ══ FOOTER — Add Item row ══════════════════════════════════════ */}
//         <tfoot>
//           <tr
//             style={{ borderTop: "1px solid #1B2A4A0A", background: "#ffffff" }}
//           >
//             <td colSpan={showDiscount ? 6 : 5} className="px-4 py-2.5">
//               <button
//                 type="button"
//                 onClick={addLineItem}
//                 className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
//                 style={{ color: "#3A7BD5" }}
//                 onMouseEnter={(e) => {
//                   (e.currentTarget as HTMLButtonElement).style.background =
//                     "#3A7BD510";
//                 }}
//                 onMouseLeave={(e) => {
//                   (e.currentTarget as HTMLButtonElement).style.background =
//                     "transparent";
//                 }}
//               >
//                 <Plus size={13} />
//                 Add Item
//               </button>
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// }






"use client";

import { Plus, Trash2 } from "lucide-react";
import { useInvoiceStore } from "@/lib/invoice-store";
import { calculateLineItemAmount } from "@/lib/invoice-utils";

// ─────────────────────────────────────────────
//  COLOR THEME  (60 · 30 · 10)
//  60% → #ECEFF1  background
//  30% → #191970  midnight blue
//  10% → #FFC107  amber accent
// ─────────────────────────────────────────────

interface LineItemsTableProps {
  currency?: string;
  showDiscount?: boolean;
}

export function LineItemsTable({
  currency = "$",
  showDiscount = false,
}: LineItemsTableProps) {
  const { lineItems, addLineItem, removeLineItem, updateLineItem } =
    useInvoiceStore();

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

  // Base input style
  const inp =
    "w-full bg-white border border-transparent rounded-lg px-2.5 py-2 text-sm " +
    "text-[#191970] font-medium placeholder:text-[#191970]/25 outline-none transition-all " +
    "hover:border-[#191970]/15 focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20";

  return (
    <div
      className="rounded-2xl overflow-hidden w-full"
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
          <div className="w-1 h-4 rounded-full" style={{ background: "#FFC107" }} />
          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.65)" }}>
            Line Items
          </span>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(255,193,7,0.15)",
            color: "#FFC107",
          }}
        >
          {lineItems.length} item{lineItems.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Responsive scroll wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse" style={{ minWidth: "520px" }}>

          {/* ── Table Header ── */}
          <thead>
            <tr style={{ background: "rgba(25,25,112,0.04)", borderBottom: "2px solid rgba(25,25,112,0.08)" }}>
              <th
                className="text-left px-3 sm:px-4 py-3 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "rgba(25,25,112,0.45)", width: "38%" }}
              >
                Description
              </th>
              <th
                className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "rgba(25,25,112,0.45)", width: "10%" }}
              >
                Qty
              </th>
              <th
                className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "rgba(25,25,112,0.45)", width: "16%" }}
              >
                Rate
              </th>
              {showDiscount && (
                <th
                  className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
                  style={{ color: "rgba(25,25,112,0.45)", width: "12%" }}
                >
                  Disc %
                </th>
              )}
              <th
                className="text-right px-3 sm:px-4 py-3 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "rgba(25,25,112,0.45)", width: "16%" }}
              >
                Amount
              </th>
              <th style={{ width: "8%" }} />
            </tr>
          </thead>

          {/* ── Table Body ── */}
          <tbody style={{ background: "#ECEFF1" }}>
            {lineItems.map((item, idx) => (
              <tr
                key={item.id || idx}
                style={{
                  background: idx % 2 === 0 ? "#ECEFF1" : "#ffffff",
                  borderBottom: "1px solid rgba(25,25,112,0.05)",
                  transition: "background 0.15s",
                }}
              >
                {/* Description */}
                <td className="px-3 sm:px-4 py-2.5">
                  <input
                    value={item.description}
                    onChange={(e) =>
                      updateLineItem(item.id!, "description", e.target.value)
                    }
                    placeholder="Item description..."
                    className={inp}
                  />
                </td>

                {/* Qty */}
                <td className="px-2 sm:px-3 py-2.5">
                  <input
                    type="number"
                    min={0}
                    value={item.quantity || ""}
                    onChange={(e) => handleQtyChange(item.id!, e.target.value)}
                    placeholder="0"
                    className={inp + " text-center"}
                  />
                </td>

                {/* Rate */}
                <td className="px-1 sm:px-3 py-2.5">
                  <div className="relative flex items-center">
                    <span
                      className="absolute left-2.5 text-xs font-bold pointer-events-none select-none"
                      style={{ color: "rgba(25,25,112,0.3)" }}
                    >
                      {currency}
                    </span>
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={item.rate || ""}
                      onChange={(e) => handleRateChange(item.id!, e.target.value)}
                      placeholder="0.00"
                      className={inp + " text-right pl-7"}
                    />
                  </div>
                </td>

                {/* Discount */}
                {showDiscount && (
                  <td className="px-2 sm:px-3 py-2.5">
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={item.discount || ""}
                        onChange={(e) =>
                          handleDiscountChange(item.id!, e.target.value)
                        }
                        placeholder="0"
                        className={inp + " text-center pr-5"}
                      />
                      <span
                        className="absolute right-2.5 text-xs pointer-events-none select-none font-bold"
                        style={{ color: "rgba(25,25,112,0.3)" }}
                      >
                        %
                      </span>
                    </div>
                  </td>
                )}

                {/* Amount — read only */}
                <td className="px-3 sm:px-4 py-2.5 text-right">
                  <div
                    className="px-2.5 py-2 rounded-xl text-sm font-black tabular-nums text-right"
                    style={{
                      background: "rgba(255,193,7,0.1)",
                      color: "#191970",
                      border: "1px solid rgba(255,193,7,0.2)",
                    }}
                  >
                    {currency}{fmt(item.amount)}
                  </div>
                </td>

                {/* Delete */}
                <td className="px-2 py-2.5 text-center">
                  <button
                    type="button"
                    onClick={() => removeLineItem(item.id!)}
                    disabled={!canRemove}
                    className="p-1.5 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                    style={{ color: "rgba(239,68,68,0.6)" }}
                    onMouseEnter={(e) => {
                      if (canRemove) {
                        e.currentTarget.style.background = "#FEF2F2";
                        e.currentTarget.style.color = "#EF4444";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(239,68,68,0.6)";
                    }}
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          {/* ── Footer: Add Item ── */}
          <tfoot>
            <tr style={{ background: "#ffffff", borderTop: "1px solid rgba(25,25,112,0.06)" }}>
              <td colSpan={showDiscount ? 6 : 5} className="px-3 sm:px-4 py-3">
                <button
                  type="button"
                  onClick={addLineItem}
                  className="flex items-center gap-1.5 text-xs font-black px-3 py-2 rounded-xl transition-all"
                  style={{ color: "#191970", background: "rgba(255,193,7,0.1)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,193,7,0.2)";
                    e.currentTarget.style.color = "#191970";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,193,7,0.1)";
                    e.currentTarget.style.color = "#191970";
                  }}
                >
                  <Plus size={13} style={{ color: "#FFC107" }} />
                  Add Item
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
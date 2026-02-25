// "use client";

// import { useMemo } from "react";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { formatCurrency, calculateSubtotal, calculateTaxAmount, calculateDiscountAmount, calculateGrandTotal } from "@/lib/invoice-utils";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";

// interface InvoicePreviewProps {
//   className?: string;
//   id?: string;
// }

// export function InvoicePreview({ className, id = "invoice-preview" }: InvoicePreviewProps) {
//   const store = useInvoiceStore();
//   const subtotal = useMemo(() => calculateSubtotal(store.lineItems), [store.lineItems]);
//   const taxAmount = useMemo(() => calculateTaxAmount(subtotal, store.tax), [subtotal, store.tax]);
//   const discountAmount = useMemo(() => calculateDiscountAmount(subtotal, store.discount), [subtotal, store.discount]);
//   const grandTotal = useMemo(() => calculateGrandTotal(subtotal, store.tax, store.discount), [subtotal, store.tax, store.discount]);
//   const currency = store.currency;

//   return (
//     <article id={id} className={cn("bg-white rounded-lg shadow-md border border-slate-200 p-6 md:p-8 max-w-[210mm]", className)}>
//       <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-8 pb-6 border-b border-slate-200">
//         <div className="flex items-start gap-4">
//           {store.logoDataUrl && <img src={store.logoDataUrl} alt="Logo" className="h-14 object-contain max-w-[120px]" />}
//           <div>
//             {store.businessName && <h2 className="text-lg font-semibold">{store.businessName}</h2>}
//             {store.businessAddress && <p className="text-sm text-slate-500 mt-1 whitespace-pre-line">{store.businessAddress}</p>}
//             {store.businessEmail && <p className="text-sm text-slate-500">{store.businessEmail}</p>}
//             {store.businessPhone && <p className="text-sm text-slate-500">{store.businessPhone}</p>}
//           </div>
//         </div>
//         <div className="text-right">
//           <h1 className="text-2xl font-bold text-indigo-600">INVOICE</h1>
//           <p className="text-sm mt-2 font-medium">#{store.invoiceNumber}</p>
//           {store.issueDate && <p className="text-sm text-slate-500">Issue: {format(new Date(store.issueDate), "MMM d, yyyy")}</p>}
//           {store.dueDate && <p className="text-sm text-slate-500">Due: {format(new Date(store.dueDate), "MMM d, yyyy")}</p>}
//         </div>
//       </header>
//       <section className="mb-8">
//         <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Bill To</h3>
//         {store.clientName && <p className="font-medium">{store.clientName}</p>}
//         {store.clientAddress && <p className="text-sm text-slate-500 whitespace-pre-line">{store.clientAddress}</p>}
//         {store.clientEmail && <p className="text-sm text-slate-500">{store.clientEmail}</p>}
//       </section>
//       <div className="overflow-x-auto -mx-2">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b-2 border-indigo-200">
//               <th className="text-left py-3 px-2 font-semibold">Description</th>
//               <th className="text-right py-3 px-2 font-semibold w-20">Qty</th>
//               <th className="text-right py-3 px-2 font-semibold w-24">Rate</th>
//               <th className="text-right py-3 px-2 font-semibold w-28">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {store.lineItems.map((item) => (
//               <tr key={item.id} className="border-b border-slate-100">
//                 <td className="py-3 px-2">{item.description || "—"}</td>
//                 <td className="py-3 px-2 text-right tabular-nums">{item.quantity}</td>
//                 <td className="py-3 px-2 text-right tabular-nums">{formatCurrency(item.rate, currency)}</td>
//                 <td className="py-3 px-2 text-right tabular-nums font-medium">{formatCurrency(item.amount, currency)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-6 flex justify-end">
//         <div className="w-full max-w-[280px] space-y-2 text-sm">
//           <div className="flex justify-between">
//             <span className="text-slate-500">Subtotal</span>
//             <span className="tabular-nums font-medium">{formatCurrency(subtotal, currency)}</span>
//           </div>
//           {taxAmount > 0 && (
//             <div className="flex justify-between">
//               <span className="text-slate-500">{store.tax.label}{store.tax.type === "percentage" ? ` (${store.tax.value}%)` : ""}</span>
//               <span className="tabular-nums font-medium">{formatCurrency(taxAmount, currency)}</span>
//             </div>
//           )}
//           {discountAmount > 0 && (
//             <div className="flex justify-between text-emerald-600">
//               <span>{store.discount.label}{store.discount.type === "percentage" ? ` (${store.discount.value}%)` : ""}</span>
//               <span className="tabular-nums font-medium">-{formatCurrency(discountAmount, currency)}</span>
//             </div>
//           )}
//           <div className="flex justify-between pt-2 border-t-2 border-indigo-200 font-semibold text-base">
//             <span>Grand Total</span>
//             <span className="tabular-nums text-indigo-600">{formatCurrency(grandTotal, currency)}</span>
//           </div>
//         </div>
//       </div>
//       {(store.paymentInstructions || store.notes) && (
//         <footer className="mt-8 pt-6 border-t border-slate-200 space-y-3 text-sm text-slate-500">
//           {store.paymentInstructions && <div><h4 className="font-medium text-slate-700 mb-1">Payment Instructions</h4><p className="whitespace-pre-line">{store.paymentInstructions}</p></div>}
//           {store.notes && <div><h4 className="font-medium text-slate-700 mb-1">Notes</h4><p className="whitespace-pre-line">{store.notes}</p></div>}
//         </footer>
//       )}
//     </article>
//   );
// }




// "use client";

// import { useMemo } from "react";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import {
//   formatCurrency,
//   calculateSubtotal,
//   calculateTaxAmount,
//   calculateDiscountAmount,
//   calculateGrandTotal,
// } from "@/lib/invoice-utils";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";

// // ─────────────────────────────────────────────
// //  COLOR THEME — Corporate Navy  (60 · 30 · 10)
// //  60% → #F5F7FA  page / section backgrounds
// //  30% → #1B2A4A  header bar, table head, labels
// //  10% → #3A7BD5  accent — totals, balance due, highlights
// // ─────────────────────────────────────────────

// interface InvoicePreviewProps {
//   className?: string;
//   id?: string;
//   style?: React.CSSProperties;
//   // New fields passed from InvoiceForm / InvoiceLanding
//   currencySymbol?: string;
//   currencyCode?: string;
//   taxType?: string;
//   taxRate?: number;
//   overallDiscount?: number;
//   discountAmt?: number;
//   taxAmt?: number;
//   total?: number;
//   signatureUrl?: string | null;
// }

// export function InvoicePreview({
//   className,
//   id = "invoice-preview",
//   style,
//   currencySymbol = "$",
//   currencyCode = "USD",
//   taxType = "GST",
//   taxRate = 10,
//   overallDiscount = 0,
//   discountAmt = 0,
//   taxAmt = 0,
//   total = 0,
//   signatureUrl = null,
// }: InvoicePreviewProps) {
//   const store = useInvoiceStore();

//   const subtotal = useMemo(
//     () => calculateSubtotal(store.lineItems),
//     [store.lineItems]
//   );

//   const formatAmt = (n: number) =>
//     `${currencySymbol}${n.toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })}`;

//   return (
//     // 60% base — white card
//     <article
//       id={id}
//       style={style}
//       className={cn(
//         "bg-white max-w-[210mm] text-sm font-sans overflow-hidden",
//         className
//       )}
//     >
//       {/* ══ HEADER — 30% navy bar ════════════════════════════════════════ */}
//       <header
//         className="px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
//         style={{ background: "#1B2A4A" }}
//       >
//         {/* Logo + Business Info */}
//         <div className="flex items-center gap-4">
//           {store.logoDataUrl && (
//             <img
//               src={store.logoDataUrl}
//               alt="Logo"
//               className="h-12 object-contain max-w-[100px] rounded"
//             />
//           )}
//           <div>
//             {store.businessName && (
//               <p className="text-white font-bold text-base leading-tight">
//                 {store.businessName}
//               </p>
//             )}
//             {store.businessAddress && (
//               <p
//                 className="text-xs mt-0.5 whitespace-pre-line leading-relaxed"
//                 style={{ color: "#ffffff80" }}
//               >
//                 {store.businessAddress}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Invoice title + number */}
//         <div className="text-right">
//           <h1 className="text-3xl font-black tracking-[0.15em] text-white">
//             INVOICE
//           </h1>
//           {/* 10% accent number */}
//           <p
//             className="text-sm font-bold mt-1 font-mono"
//             style={{ color: "#3A7BD5" }}
//           >
//             #{store.invoiceNumber}
//           </p>
//           {store.issueDate && (
//             <p className="text-xs mt-1" style={{ color: "#ffffff60" }}>
//               Issued:{" "}
//               {format(new Date(store.issueDate), "MMM d, yyyy")}
//             </p>
//           )}
//           {store.dueDate && (
//             <p className="text-xs" style={{ color: "#ffffff60" }}>
//               Due: {format(new Date(store.dueDate), "MMM d, yyyy")}
//             </p>
//           )}
//         </div>
//       </header>

//       {/* ══ BILL TO / SHIP TO + META ══════════════════════════════════════ */}
//       {/* 60% soft background strip */}
//       <div
//         className="px-8 py-5 grid grid-cols-2 sm:grid-cols-3 gap-6"
//         style={{ background: "#F5F7FA", borderBottom: "1px solid #1B2A4A0F" }}
//       >
//         {/* Bill To */}
//         <div>
//           {/* 10% accent micro-line */}
//           <div
//             className="w-5 h-0.5 rounded-full mb-1.5"
//             style={{ background: "#3A7BD5" }}
//           />
//           <p
//             className="text-[10px] font-bold uppercase tracking-widest mb-1"
//             style={{ color: "#1B2A4A80" }}
//           >
//             Bill To
//           </p>
//           {store.clientName && (
//             <p className="font-bold text-sm" style={{ color: "#1B2A4A" }}>
//               {store.clientName}
//             </p>
//           )}
//           {store.clientAddress && (
//             <p
//               className="text-xs mt-0.5 whitespace-pre-line leading-relaxed"
//               style={{ color: "#1B2A4A80" }}
//             >
//               {store.clientAddress}
//             </p>
//           )}
//           {store.clientEmail && (
//             <p className="text-xs" style={{ color: "#1B2A4A80" }}>
//               {store.clientEmail}
//             </p>
//           )}
//         </div>

//         {/* Ship To (if present) */}
//         {store.shipTo && (
//           <div>
//             <div className="w-5 h-0.5 rounded-full mb-1.5 bg-[#1B2A4A]/20" />
//             <p
//               className="text-[10px] font-bold uppercase tracking-widest mb-1"
//               style={{ color: "#1B2A4A80" }}
//             >
//               Ship To
//             </p>
//             <p
//               className="text-xs whitespace-pre-line leading-relaxed"
//               style={{ color: "#1B2A4A80" }}
//             >
//               {store.shipTo}
//             </p>
//           </div>
//         )}

//         {/* Meta: PO + Currency */}
//         <div className="sm:text-right">
//           <div className="w-5 h-0.5 rounded-full mb-1.5 sm:ml-auto bg-[#1B2A4A]/20" />
//           <p
//             className="text-[10px] font-bold uppercase tracking-widest mb-1"
//             style={{ color: "#1B2A4A80" }}
//           >
//             Details
//           </p>
//           {store.poNumber && (
//             <p className="text-xs" style={{ color: "#1B2A4A" }}>
//               PO: <span className="font-semibold">{store.poNumber}</span>
//             </p>
//           )}
//           <p className="text-xs" style={{ color: "#1B2A4A" }}>
//             Currency:{" "}
//             <span className="font-semibold font-mono">
//               {currencySymbol} {currencyCode}
//             </span>
//           </p>
//           {taxType !== "None" && (
//             <p className="text-xs" style={{ color: "#1B2A4A" }}>
//               Tax:{" "}
//               <span className="font-semibold">
//                 {taxType} {taxRate}%
//               </span>
//             </p>
//           )}
//         </div>
//       </div>

//       {/* ══ LINE ITEMS TABLE ══════════════════════════════════════════════ */}
//       <div className="px-8 pt-6 pb-2">
//         <table className="w-full text-sm">
//           <thead>
//             {/* 30% navy table header */}
//             <tr
//               className="text-[10px] font-bold uppercase tracking-widest"
//               style={{ color: "#1B2A4A" }}
//             >
//               <th
//                 className="text-left py-2.5 px-3 rounded-l-lg"
//                 style={{ background: "#1B2A4A0C" }}
//               >
//                 Description
//               </th>
//               <th
//                 className="text-center py-2.5 px-3 w-16"
//                 style={{ background: "#1B2A4A0C" }}
//               >
//                 Qty
//               </th>
//               <th
//                 className="text-right py-2.5 px-3 w-24"
//                 style={{ background: "#1B2A4A0C" }}
//               >
//                 Rate
//               </th>
//               <th
//                 className="text-center py-2.5 px-3 w-20"
//                 style={{ background: "#1B2A4A0C" }}
//               >
//                 Disc %
//               </th>
//               <th
//                 className="text-right py-2.5 px-3 w-28 rounded-r-lg"
//                 style={{ background: "#1B2A4A0C" }}
//               >
//                 Amount
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {store.lineItems.map((item, idx) => (
//               <tr
//                 key={item.id}
//                 style={{
//                   background: idx % 2 === 0 ? "#ffffff" : "#F5F7FA",
//                   borderBottom: "1px solid #1B2A4A08",
//                 }}
//               >
//                 <td className="py-3 px-3" style={{ color: "#1B2A4A" }}>
//                   {item.description || "—"}
//                 </td>
//                 <td
//                   className="py-3 px-3 text-center tabular-nums"
//                   style={{ color: "#1B2A4A80" }}
//                 >
//                   {item.quantity}
//                 </td>
//                 <td
//                   className="py-3 px-3 text-right tabular-nums"
//                   style={{ color: "#1B2A4A80" }}
//                 >
//                   {formatAmt(item.rate)}
//                 </td>
//                 <td
//                   className="py-3 px-3 text-center tabular-nums"
//                   style={{ color: "#1B2A4A80" }}
//                 >
//                   {item.discount ? `${item.discount}%` : "—"}
//                 </td>
//                 <td
//                   className="py-3 px-3 text-right tabular-nums font-semibold"
//                   style={{ color: "#1B2A4A" }}
//                 >
//                   {formatAmt(item.amount)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ══ TOTALS + NOTES ════════════════════════════════════════════════ */}
//       <div className="px-8 py-6 grid grid-cols-2 gap-10 items-start">

//         {/* Left — Notes + Terms + Signature */}
//         <div className="space-y-4 text-xs" style={{ color: "#1B2A4A80" }}>
//           {store.notes && (
//             <div>
//               <p
//                 className="text-[10px] font-bold uppercase tracking-widest mb-1"
//                 style={{ color: "#1B2A4A" }}
//               >
//                 Notes
//               </p>
//               <p className="whitespace-pre-line leading-relaxed">
//                 {store.notes}
//               </p>
//             </div>
//           )}
//           {store.paymentInstructions && (
//             <div>
//               <p
//                 className="text-[10px] font-bold uppercase tracking-widest mb-1"
//                 style={{ color: "#1B2A4A" }}
//               >
//                 Terms
//               </p>
//               <p className="whitespace-pre-line leading-relaxed">
//                 {store.paymentInstructions}
//               </p>
//             </div>
//           )}

//           {/* Signature */}
//           {signatureUrl && (
//             <div>
//               <p
//                 className="text-[10px] font-bold uppercase tracking-widest mb-2"
//                 style={{ color: "#1B2A4A" }}
//               >
//                 Authorized Signature
//               </p>
//               <img
//                 src={signatureUrl}
//                 alt="Signature"
//                 className="h-12 object-contain"
//               />
//               <div
//                 className="mt-1 w-32 border-t"
//                 style={{ borderColor: "#1B2A4A30" }}
//               />
//             </div>
//           )}
//         </div>

//         {/* Right — Totals */}
//         <div className="space-y-2">

//           {/* Subtotal */}
//           <div
//             className="flex justify-between text-xs"
//             style={{ color: "#1B2A4A80" }}
//           >
//             <span>Subtotal</span>
//             <span className="tabular-nums font-medium">
//               {formatAmt(subtotal)}
//             </span>
//           </div>

//           {/* Per-item discount summary */}
//           {overallDiscount > 0 && (
//             <div className="flex justify-between text-xs text-emerald-600">
//               <span>Overall Discount ({overallDiscount}%)</span>
//               <span className="tabular-nums font-medium">
//                 − {formatAmt(discountAmt)}
//               </span>
//             </div>
//           )}

//           {/* Tax */}
//           {taxType !== "None" && taxAmt > 0 && (
//             <div
//               className="flex justify-between text-xs"
//               style={{ color: "#1B2A4A80" }}
//             >
//               <span>
//                 {taxType} ({taxRate}%)
//               </span>
//               <span className="tabular-nums font-medium">
//                 {formatAmt(taxAmt)}
//               </span>
//             </div>
//           )}

//           {/* Divider */}
//           <div
//             className="border-t pt-2 mt-1"
//             style={{ borderColor: "#1B2A4A15" }}
//           />

//           {/* Grand Total */}
//           <div
//             className="flex justify-between text-sm font-bold"
//             style={{ color: "#1B2A4A" }}
//           >
//             <span>Total</span>
//             <span className="tabular-nums">{formatAmt(total)}</span>
//           </div>

//           {/* Balance Due — 10% accent */}
//           <div
//             className="flex justify-between items-center px-4 py-3 rounded-xl text-sm font-bold mt-1"
//             style={{
//               background: "#3A7BD510",
//               border: "1.5px solid #3A7BD530",
//               color: "#3A7BD5",
//             }}
//           >
//             <span>Balance Due</span>
//             <span className="tabular-nums text-base">{formatAmt(total)}</span>
//           </div>
//         </div>
//       </div>

//       {/* ══ FOOTER BAR — subtle navy ══════════════════════════════════════ */}
//       <div
//         className="px-8 py-3 flex items-center justify-between"
//         style={{
//           background: "#1B2A4A08",
//           borderTop: "1px solid #1B2A4A10",
//         }}
//       >
//         <p
//           className="text-[10px] font-mono"
//           style={{ color: "#1B2A4A40" }}
//         >
//           {currencyCode} &middot;{" "}
//           {taxType !== "None" ? `${taxType} ${taxRate}%` : "No Tax"} &middot;{" "}
//           {overallDiscount > 0
//             ? `${overallDiscount}% Discount`
//             : "No Discount"}
//         </p>
//         <p
//           className="text-[10px] font-mono"
//           style={{ color: "#1B2A4A40" }}
//         >
//           Invoice #{store.invoiceNumber}
//         </p>
//       </div>
//     </article>
//   );
// }





"use client";

import { useMemo } from "react";
import { useInvoiceStore } from "@/lib/invoice-store";
import {
  formatCurrency,
  calculateSubtotal,
  calculateTaxAmount,
  calculateDiscountAmount,
  calculateGrandTotal,
} from "@/lib/invoice-utils";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
//  PRINT-FRIENDLY THEME  —  Corporate Navy  (60 · 30 · 10)
//
//  Strategy: NO heavy filled backgrounds — use borders, thin accent lines,
//  and subtle tints so the page prints cleanly with minimal ink.
//
//  60% → #FFFFFF  pure white (page body)
//  30% → #1B2A4A  navy — only for text, borders, thin lines  (NO filled bg)
//  10% → #3A7BD5  accent — only for key highlights & left border stripe
// ─────────────────────────────────────────────────────────────────────────────

interface InvoicePreviewProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  currencySymbol?: string;
  currencyCode?: string;
  taxType?: string;
  taxRate?: number;
  overallDiscount?: number;
  discountAmt?: number;
  taxAmt?: number;
  total?: number;
  signatureUrl?: string | null;
}

export function InvoicePreview({
  className,
  id = "invoice-preview",
  style,
  currencySymbol = "$",
  currencyCode = "USD",
  taxType = "GST",
  taxRate = 10,
  overallDiscount = 0,
  discountAmt = 0,
  taxAmt = 0,
  total = 0,
  signatureUrl = null,
}: InvoicePreviewProps) {
  const store = useInvoiceStore();

  const subtotal = useMemo(
    () => calculateSubtotal(store.lineItems),
    [store.lineItems]
  );

  const fmt = (n: number) =>
    `${currencySymbol}${n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <article
      id={id}
      style={style}
      className={cn(
        "bg-white max-w-[210mm] text-sm font-sans",
        className
      )}
    >
      {/* ══ HEADER — white bg, navy text, accent left border ════════════ */}
      <header className="px-8 pt-8 pb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6"
        style={{ borderBottom: "2px solid #1B2A4A" }}
      >
        {/* Left: Logo + Business */}
        <div className="flex items-start gap-4">
          {store.logoDataUrl && (
            <img
              src={store.logoDataUrl}
              alt="Logo"
              className="h-14 object-contain max-w-[110px]"
            />
          )}
          <div>
            {store.businessName && (
              <p
                className="font-black text-lg leading-tight"
                style={{ color: "#1B2A4A" }}
              >
                {store.businessName}
              </p>
            )}
            {store.businessAddress && (
              <p
                className="text-xs mt-1 whitespace-pre-line leading-relaxed"
                style={{ color: "#1B2A4A80" }}
              >
                {store.businessAddress}
              </p>
            )}
            {store.businessEmail && (
              <p className="text-xs" style={{ color: "#1B2A4A80" }}>
                {store.businessEmail}
              </p>
            )}
          </div>
        </div>

        {/* Right: INVOICE title + meta */}
        <div className="text-right">
          {/* Big INVOICE title — navy text only, no fill */}
          <h1
            className="text-4xl font-black tracking-[0.15em]"
            style={{ color: "#1B2A4A" }}
          >
            INVOICE
          </h1>

          {/* 10% accent underline — thin, not a filled block */}
          <div
            className="ml-auto mt-1 mb-2 h-[3px] rounded-full w-24"
            style={{ background: "#3A7BD5" }}
          />

          <p
            className="text-sm font-bold font-mono"
            style={{ color: "#3A7BD5" }}
          >
            #{store.invoiceNumber}
          </p>
          {store.issueDate && (
            <p className="text-xs mt-1" style={{ color: "#1B2A4A80" }}>
              Issued: {format(new Date(store.issueDate), "MMM d, yyyy")}
            </p>
          )}
          {store.dueDate && (
            <p className="text-xs" style={{ color: "#1B2A4A80" }}>
              Due: {format(new Date(store.dueDate), "MMM d, yyyy")}
            </p>
          )}
        </div>
      </header>

      {/* ══ BILL TO / SHIP TO / META ═════════════════════════════════════ */}
      {/* No bg fill — just a very light top border to separate sections   */}
      <div
        className="px-8 py-5 grid grid-cols-2 sm:grid-cols-3 gap-6"
        style={{ borderBottom: "1px solid #1B2A4A15" }}
      >
        {/* Bill To */}
        <div>
          {/* 10% accent micro-stripe — replaces the filled bg label */}
          <div
            className="w-6 h-[3px] rounded-full mb-2"
            style={{ background: "#3A7BD5" }}
          />
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-1"
            style={{ color: "#1B2A4A60" }}
          >
            Bill To
          </p>
          {store.clientName && (
            <p className="font-bold" style={{ color: "#1B2A4A" }}>
              {store.clientName}
            </p>
          )}
          {store.clientAddress && (
            <p
              className="text-xs mt-0.5 whitespace-pre-line leading-relaxed"
              style={{ color: "#1B2A4A70" }}
            >
              {store.clientAddress}
            </p>
          )}
          {store.clientEmail && (
            <p className="text-xs" style={{ color: "#1B2A4A70" }}>
              {store.clientEmail}
            </p>
          )}
        </div>

        {/* Ship To */}
        {store.shipTo && (
          <div>
            <div
              className="w-6 h-[3px] rounded-full mb-2"
              style={{ background: "#1B2A4A30" }}
            />
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: "#1B2A4A60" }}
            >
              Ship To
            </p>
            <p
              className="text-xs whitespace-pre-line leading-relaxed"
              style={{ color: "#1B2A4A70" }}
            >
              {store.shipTo}
            </p>
          </div>
        )}

        {/* Meta — PO, Currency, Tax */}
        <div className="sm:text-right">
          <div
            className="w-6 h-[3px] rounded-full mb-2 sm:ml-auto"
            style={{ background: "#1B2A4A20" }}
          />
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-1"
            style={{ color: "#1B2A4A60" }}
          >
            Details
          </p>
          {store.poNumber && (
            <p className="text-xs" style={{ color: "#1B2A4A" }}>
              PO:{" "}
              <span className="font-semibold">{store.poNumber}</span>
            </p>
          )}
          <p className="text-xs" style={{ color: "#1B2A4A" }}>
            Currency:{" "}
            <span className="font-semibold font-mono">
              {currencySymbol} {currencyCode}
            </span>
          </p>
          {taxType !== "None" && (
            <p className="text-xs" style={{ color: "#1B2A4A" }}>
              Tax:{" "}
              <span className="font-semibold">
                {taxType} {taxRate}%
              </span>
            </p>
          )}
        </div>
      </div>

      {/* ══ LINE ITEMS TABLE ══════════════════════════════════════════════ */}
      <div className="px-8 pt-6 pb-2">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ borderBottom: "2px solid #1B2A4A" }}>
              {/* Column headers — navy text, NO filled background */}
              {["Description", "Qty", "Rate", "Disc %", "Amount"].map(
                (h, i) => (
                  <th
                    key={h}
                    className={cn(
                      "py-2.5 text-[10px] font-bold uppercase tracking-widest",
                      i === 0 ? "text-left" : i === 4 ? "text-right" : "text-center"
                    )}
                    style={{ color: "#1B2A4A" }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {store.lineItems.map((item, idx) => (
              <tr
                key={item.id}
                style={{
                  borderBottom: "1px solid #1B2A4A10",
                  // Very light alternating tint — almost invisible on print
                  background: idx % 2 !== 0 ? "#1B2A4A04" : "#ffffff",
                }}
              >
                <td className="py-3 text-left" style={{ color: "#1B2A4A" }}>
                  {item.description || "—"}
                </td>
                <td
                  className="py-3 text-center tabular-nums"
                  style={{ color: "#1B2A4A80" }}
                >
                  {item.quantity}
                </td>
                <td
                  className="py-3 text-center tabular-nums"
                  style={{ color: "#1B2A4A80" }}
                >
                  {fmt(item.rate)}
                </td>
                <td
                  className="py-3 text-center tabular-nums"
                  style={{ color: "#1B2A4A80" }}
                >
                  {item.discount ? `${item.discount}%` : "—"}
                </td>
                <td
                  className="py-3 text-right tabular-nums font-semibold"
                  style={{ color: "#1B2A4A" }}
                >
                  {fmt(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ══ TOTALS + NOTES ════════════════════════════════════════════════ */}
      <div className="px-8 py-6 grid grid-cols-2 gap-10 items-start">

        {/* Left — Notes, Terms, Signature */}
        <div className="space-y-4 text-xs" style={{ color: "#1B2A4A70" }}>
          {store.notes && (
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-1"
                style={{ color: "#1B2A4A" }}
              >
                Notes
              </p>
              <p className="whitespace-pre-line leading-relaxed">
                {store.notes}
              </p>
            </div>
          )}
          {store.paymentInstructions && (
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-1"
                style={{ color: "#1B2A4A" }}
              >
                Terms
              </p>
              <p className="whitespace-pre-line leading-relaxed">
                {store.paymentInstructions}
              </p>
            </div>
          )}

          {/* Signature */}
          {signatureUrl && (
            <div className="pt-2">
              <img
                src={signatureUrl}
                alt="Signature"
                className="h-12 object-contain mb-1"
              />
              <div
                className="w-36 border-t"
                style={{ borderColor: "#1B2A4A40" }}
              />
              <p
                className="text-[10px] mt-1 uppercase tracking-widest"
                style={{ color: "#1B2A4A50" }}
              >
                Authorized Signature
              </p>
            </div>
          )}
        </div>

        {/* Right — Totals */}
        <div className="space-y-2 text-sm">

          <div
            className="flex justify-between"
            style={{ color: "#1B2A4A80" }}
          >
            <span>Subtotal</span>
            <span className="tabular-nums">{fmt(subtotal)}</span>
          </div>

          {overallDiscount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount ({overallDiscount}%)</span>
              <span className="tabular-nums">− {fmt(discountAmt)}</span>
            </div>
          )}

          {taxType !== "None" && taxAmt > 0 && (
            <div
              className="flex justify-between"
              style={{ color: "#1B2A4A80" }}
            >
              <span>
                {taxType} ({taxRate}%)
              </span>
              <span className="tabular-nums">{fmt(taxAmt)}</span>
            </div>
          )}

          {/* Total row — navy top border, NO filled bg */}
          <div
            className="flex justify-between font-bold text-base pt-2 border-t-2"
            style={{ borderColor: "#1B2A4A", color: "#1B2A4A" }}
          >
            <span>Total</span>
            <span className="tabular-nums">{fmt(total)}</span>
          </div>

          {/* Balance Due — 10% accent LEFT BORDER only, white bg for print */}
          <div
            className="flex justify-between items-center px-4 py-3 font-bold"
            style={{
              borderLeft: "4px solid #3A7BD5",
              background: "#ffffff",
              color: "#3A7BD5",
            }}
          >
            <span>Balance Due</span>
            <span className="tabular-nums text-base">{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* ══ FOOTER — thin top border, no bg fill ═════════════════════════ */}
      <div
        className="px-8 py-3 flex items-center justify-between"
        style={{ borderTop: "1px solid #1B2A4A15" }}
      >
        <p
          className="text-[10px] font-mono"
          style={{ color: "#1B2A4A40" }}
        >
          {currencyCode} &middot;{" "}
          {taxType !== "None" ? `${taxType} ${taxRate}%` : "No Tax"} &middot;{" "}
          {overallDiscount > 0 ? `${overallDiscount}% Discount` : "No Discount"}
        </p>
        <p
          className="text-[10px] font-mono"
          style={{ color: "#1B2A4A40" }}
        >
          Invoice #{store.invoiceNumber}
        </p>
      </div>
    </article>
  );
}
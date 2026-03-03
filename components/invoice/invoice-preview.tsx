
// "use client";

// import { useInvoiceStore } from "@/lib/invoice-store";
// import { formatCurrency } from "@/lib/invoice-utils";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { CURRENCIES } from "@/constant/data";
// import { InvoicePreviewProps } from "@/types/invoice-types";
// import useInvoicePreview from "@/hooks/useInvoicePreview";


// export function InvoicePreview({
//   className,
//   id = "invoice-preview",
//   style,
// }: InvoicePreviewProps) {
//   const {
//     currencyInfo,
//     subtotal,
//     overallDiscountAmount,
//     store,
//     fmt,
//   } = useInvoicePreview();
//   if (!store) return null;

//   return (
//     <article
//       id={id}
//       style={style}
//       className={cn("bg-white max-w-[210mm] text-sm font-sans", className)}
//     >
//       {/* ══ HEADER — white bg, navy text, accent left border ════════════ */}
//       <header
//         className="px-8 pt-8 pb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6"
//         style={{ borderBottom: "2px solid #1B2A4A" }}
//       >
//         {/* Left: Logo + Business */}
//         <div className="flex items-start gap-4">
//           {store.logoDataUrl && (
//             <img
//               src={store.logoDataUrl}
//               alt="Logo"
//               className="h-14 object-contain max-w-[110px]"
//             />
//           )}
//           <div>
//             {store.businessName && (
//               <p
//                 className="font-black text-lg leading-tight"
//                 style={{ color: "#1B2A4A" }}
//               >
//                 {store.businessName}
//               </p>
//             )}
//             {store.bussinessInfo && (
//               <p
//                 className="text-xs mt-1 whitespace-pre-line leading-relaxed"
//                 style={{ color: "#1B2A4A80" }}
//               >
//                 {store.bussinessInfo}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Right: INVOICE title + meta */}
//         <div className="text-right">
//           {/* Big INVOICE title — navy text only, no fill */}
//           <h1
//             className="text-4xl font-black tracking-[0.15em]"
//             style={{ color: "#1B2A4A" }}
//           >
//             INVOICE
//           </h1>

//           {/* 10% accent underline — thin, not a filled block */}
//           <div
//             className="ml-auto mt-1 mb-2 h-[3px] rounded-full w-24"
//             style={{ background: "#3A7BD5" }}
//           />

//           <p
//             className="text-sm font-bold font-mono"
//             style={{ color: "#3A7BD5" }}
//           >
//             #{store.invoiceNumber}
//           </p>
//           {store.issueDate && (
//             <p className="text-xs mt-1" style={{ color: "#1B2A4A80" }}>
//               Issued: {format(new Date(store.issueDate), "MMM d, yyyy")}
//             </p>
//           )}
//           {store.dueDate && (
//             <p className="text-xs" style={{ color: "#1B2A4A80" }}>
//               Due: {format(new Date(store.dueDate), "MMM d, yyyy")}
//             </p>
//           )}
//         </div>
//       </header>

//       {/* ══ BILL TO / SHIP TO / META ═════════════════════════════════════ */}
//       {/* No bg fill — just a very light top border to separate sections   */}
//       <div
//         className="px-8 py-5 grid grid-cols-2 sm:grid-cols-3 gap-6"
//         style={{ borderBottom: "1px solid #1B2A4A15" }}
//       >
//         {/* Bill To */}
//         <div>
//           {/* 10% accent micro-stripe — replaces the filled bg label */}
//           <div
//             className="w-6 h-[3px] rounded-full mb-2"
//             style={{ background: "#3A7BD5" }}
//           />
//           <p
//             className="text-[10px] font-bold uppercase tracking-widest mb-1"
//             style={{ color: "#1B2A4A60" }}
//           >
//             Bill To
//           </p>
//           {store.clientName && (
//             <p className="font-bold" style={{ color: "#1B2A4A" }}>
//               {store.clientName}
//             </p>
//           )}
//           {store.clientAddress && (
//             <p
//               className="text-xs mt-0.5 whitespace-pre-line leading-relaxed"
//               style={{ color: "#1B2A4A70" }}
//             >
//               {store.clientAddress}
//             </p>
//           )}
//         </div>

//         {/* Ship To */}
//         {store.shipTo && (
//           <div>
//             <div
//               className="w-6 h-[3px] rounded-full mb-2"
//               style={{ background: "#1B2A4A30" }}
//             />
//             <p
//               className="text-[10px] font-bold uppercase tracking-widest mb-1"
//               style={{ color: "#1B2A4A60" }}
//             >
//               Ship To
//             </p>
//             <p
//               className="text-xs whitespace-pre-line leading-relaxed"
//               style={{ color: "#1B2A4A70" }}
//             >
//               {store.shipTo}
//             </p>
//           </div>
//         )}

//         {/* Meta — PO, Currency, Tax */}
//         <div className="sm:text-right">
//           <div
//             className="w-6 h-[3px] rounded-full mb-2 sm:ml-auto"
//             style={{ background: "#1B2A4A20" }}
//           />
//           <p
//             className="text-[10px] font-bold uppercase tracking-widest mb-1"
//             style={{ color: "#1B2A4A60" }}
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
//             <span className="font-semibold font-mono">{store.currency}</span> (
//             {currencyInfo.symbol})
//           </p>
//           {store.taxRate > 0 && (
//             <p className="text-xs" style={{ color: "#1B2A4A" }}>
//               Tax:{" "}
//               <span className="font-semibold">
//                 {/* {store.taxType}  */}
//                 {store.taxRate}%
//               </span>
//             </p>
//           )}
//         </div>
//       </div>

//       {/* ══ LINE ITEMS TABLE ══════════════════════════════════════════════ */}
//       <div className="px-8 pt-6 pb-2">
//         <table className="w-full text-sm border-collapse">
//           <thead>
//             <tr style={{ borderBottom: "2px solid #1B2A4A" }}>
//               {/* Column headers — navy text, NO filled background */}
//               {["Description", "Qty", "Rate", "Disc %", "Amount"].map(
//                 (h, i) => (
//                   <th
//                     key={h}
//                     className={cn(
//                       "py-2.5 text-[10px] font-bold uppercase tracking-widest",
//                       i === 0
//                         ? "text-left"
//                         : i === 4
//                           ? "text-right"
//                           : "text-center",
//                     )}
//                     style={{ color: "#1B2A4A" }}
//                   >
//                     {h}
//                   </th>
//                 ),
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {store.lineItems.map((item, idx) => (
//               <tr
//                 key={item.id}
//                 style={{
//                   borderBottom: "1px solid #1B2A4A10",
//                   // Very light alternating tint — almost invisible on print
//                   background: idx % 2 !== 0 ? "#1B2A4A04" : "#ffffff",
//                 }}
//               >
//                 <td className="py-3 text-left" style={{ color: "#1B2A4A" }}>
//                   {item.description || "—"}
//                 </td>
//                 <td
//                   className="py-3 text-center tabular-nums"
//                   style={{ color: "#1B2A4A80" }}
//                 >
//                   {item.quantity}
//                 </td>
//                 <td
//                   className="py-3 text-center tabular-nums"
//                   style={{ color: "#1B2A4A80" }}
//                 >
//                   {fmt(item.rate)}
//                 </td>
//                 <td
//                   className="py-3 text-center tabular-nums"
//                   style={{ color: "#1B2A4A80" }}
//                 >
//                   {item.discount ? `${item.discount}%` : "—"}
//                 </td>
//                 <td
//                   className="py-3 text-right tabular-nums font-semibold"
//                   style={{ color: "#1B2A4A" }}
//                 >
//                   {fmt(item.amount)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ══ TOTALS + NOTES ════════════════════════════════════════════════ */}
//       <div className="px-8 py-6 grid grid-cols-2 gap-10 items-start">
//         {/* Left — Notes, Terms, Signature */}
//         <div className="space-y-4 text-xs" style={{ color: "#1B2A4A70" }}>
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
//           {store.terms && (
//             <div>
//               <p
//                 className="text-[10px] font-bold uppercase tracking-widest mb-1"
//                 style={{ color: "#1B2A4A" }}
//               >
//                 Terms
//               </p>
//               <p className="whitespace-pre-line leading-relaxed">
//                 {store.terms}
//               </p>
//             </div>
//           )}

//           {/* Signature */}
//           {store.stampUrl && (
//             <div className="pt-2">
//               <img
//                 src={store.stampUrl}
//                 alt="Signature"
//                 className="h-12 object-contain mb-1"
//               />
//               <div
//                 className="w-36 border-t"
//                 style={{ borderColor: "#1B2A4A40" }}
//               />
//               <p
//                 className="text-[10px] mt-1 uppercase tracking-widest"
//                 style={{ color: "#1B2A4A50" }}
//               >
//                 Authorized Signature
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Right — Totals */}
//         <div className="space-y-2 text-sm">
//           <div className="flex justify-between" style={{ color: "#1B2A4A80" }}>
//             <span>Subtotal</span>
//             <span className="tabular-nums">{fmt(subtotal)}</span>
//           </div>

//           {store.overallDiscount > 0 && (
//             <div className="flex justify-between text-emerald-600">
//               <span>Discount ({store.overallDiscount}%)</span>
//               <span className="tabular-nums">
//                 − {fmt(overallDiscountAmount)}
//               </span>
//             </div>
//           )}

//           {store.taxRate > 0 && (
//             <div
//               className="flex justify-between"
//               style={{ color: "#1B2A4A80" }}
//             >
//               <span>({store.taxRate}%)</span>
//               <span className="tabular-nums">{fmt(store.taxRate)}</span>
//             </div>
//           )}

//           {/* Total row — navy top border, NO filled bg */}
//           <div
//             className="flex justify-between font-bold text-base pt-2 border-t-2"
//             style={{ borderColor: "#1B2A4A", color: "#1B2A4A" }}
//           >
//             <span>Total</span>
//             <span className="tabular-nums">{fmt(store.totalAmount)}</span>
//           </div>
//         </div>
//       </div>

//       {/* ══ FOOTER — thin top border, no bg fill ═════════════════════════ */}
//       <div
//         className="px-8 py-3 flex items-center justify-between"
//         style={{ borderTop: "1px solid #1B2A4A15" }}
//       >
//         <p className="text-[10px] font-mono" style={{ color: "#1B2A4A40" }}>
//           {store.currency} &middot;{" "}
//           {store.overallDiscount > 0
//             ? `${store.overallDiscount}% Discount (${overallDiscountAmount.toFixed(2)})`
//             : "No Discount"}
//         </p>
//         <p className="text-[10px] font-mono" style={{ color: "#1B2A4A40" }}>
//           Invoice #{store.invoiceNumber}
//         </p>
//       </div>
//     </article>
//   );
// }










// "use client";

// import { useInvoiceStore } from "@/lib/invoice-store";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { InvoicePreviewProps } from "@/types/invoice-types";
// import useInvoicePreview from "@/hooks/useInvoicePreview";

// // ─────────────────────────────────────────────
// //  COLOR THEME  (60 · 30 · 10)
// //  60% → #ECEFF1  background
// //  30% → #191970  midnight blue
// //  10% → #FFC107  amber accent
// // ─────────────────────────────────────────────

// export function InvoicePreview({
//   className,
//   id = "invoice-preview",
//   style,
// }: InvoicePreviewProps) {
//   const {
//     currencyInfo,
//     subtotal,
//     overallDiscountAmount,
//     store,
//     fmt,
//   } = useInvoicePreview();

//   if (!store) return null;

//   return (
//     <article
//       id={id}
//       style={{
//         ...style,
//         background: "#ffffff",
//         maxWidth: "210mm",
//       }}
//       className={cn("text-sm font-sans", className)}
//     >
//       {/* ══ HEADER ══════════════════════════════════════════════════════ */}
//       <header
//         className="px-8 pt-8 pb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6"
//         style={{
//           background: "#191970",
//         }}
//       >
//         {/* Left: Logo + Business */}
//         <div className="flex items-start gap-4">
//           {store.logoDataUrl && (
//             <img
//               src={store.logoDataUrl}
//               alt="Logo"
//               className="h-12 object-contain max-w-[100px] rounded-xl"
//               style={{
//                 background: "rgba(255,255,255,0.1)",
//                 padding: "4px",
//               }}
//             />
//           )}
//           <div>
//             {store.businessName && (
//               <p className="font-black text-base leading-tight text-white">
//                 {store.businessName}
//               </p>
//             )}
//             {store.bussinessInfo && (
//               <p
//                 className="text-xs mt-1 whitespace-pre-line leading-relaxed"
//                 style={{ color: "rgba(255,255,255,0.5)" }}
//               >
//                 {store.bussinessInfo}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Right: INVOICE title + meta */}
//         <div className="text-right">
//           <h1
//             className="text-3xl sm:text-4xl font-black tracking-[0.15em] text-white"
//           >
//             INVOICE
//           </h1>
//           {/* Amber accent underline */}
//           <div
//             className="ml-auto mt-1 mb-2 h-[3px] rounded-full w-20"
//             style={{ background: "#FFC107" }}
//           />
//           <p className="text-sm font-black font-mono" style={{ color: "#FFC107" }}>
//             #{store.invoiceNumber}
//           </p>
//           {store.issueDate && (
//             <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
//               Issued: {format(new Date(store.issueDate), "MMM d, yyyy")}
//             </p>
//           )}
//           {store.dueDate && (
//             <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
//               Due: {format(new Date(store.dueDate), "MMM d, yyyy")}
//             </p>
//           )}
//         </div>
//       </header>

//       {/* ══ BILL TO / SHIP TO / META ════════════════════════════════════ */}
//       <div
//         className="px-8 py-5 grid grid-cols-2 sm:grid-cols-3 gap-6"
//         style={{
//           background: "#ECEFF1",
//           borderBottom: "1px solid rgba(25,25,112,0.08)",
//         }}
//       >
//         {/* Bill To */}
//         <div>
//           <div
//             className="w-6 h-[3px] rounded-full mb-2"
//             style={{ background: "#FFC107" }}
//           />
//           <p
//             className="text-[10px] font-black uppercase tracking-widest mb-1"
//             style={{ color: "rgba(25,25,112,0.45)" }}
//           >
//             Bill To
//           </p>
//           {store.clientName && (
//             <p className="font-black text-sm" style={{ color: "#191970" }}>
//               {store.clientName}
//             </p>
//           )}
//           {store.clientAddress && (
//             <p
//               className="text-xs mt-0.5 whitespace-pre-line leading-relaxed"
//               style={{ color: "rgba(25,25,112,0.6)" }}
//             >
//               {store.clientAddress}
//             </p>
//           )}
//         </div>

//         {/* Ship To */}
//         {store.shipTo && (
//           <div>
//             <div
//               className="w-6 h-[3px] rounded-full mb-2"
//               style={{ background: "rgba(25,25,112,0.2)" }}
//             />
//             <p
//               className="text-[10px] font-black uppercase tracking-widest mb-1"
//               style={{ color: "rgba(25,25,112,0.45)" }}
//             >
//               Ship To
//             </p>
//             <p
//               className="text-xs whitespace-pre-line leading-relaxed"
//               style={{ color: "rgba(25,25,112,0.6)" }}
//             >
//               {store.shipTo}
//             </p>
//           </div>
//         )}

//         {/* Meta */}
//         <div className="sm:text-right">
//           <div
//             className="w-6 h-[3px] rounded-full mb-2 sm:ml-auto"
//             style={{ background: "rgba(25,25,112,0.15)" }}
//           />
//           <p
//             className="text-[10px] font-black uppercase tracking-widest mb-1"
//             style={{ color: "rgba(25,25,112,0.45)" }}
//           >
//             Details
//           </p>
//           {store.poNumber && (
//             <p className="text-xs" style={{ color: "#191970" }}>
//               PO: <span className="font-bold">{store.poNumber}</span>
//             </p>
//           )}
//           <p className="text-xs" style={{ color: "#191970" }}>
//             Currency:{" "}
//             <span className="font-bold font-mono">{store.currency}</span> (
//             {currencyInfo.symbol})
//           </p>
//           {store.taxRate > 0 && (
//             <p className="text-xs" style={{ color: "#191970" }}>
//               Tax: <span className="font-bold">{store.taxRate}%</span>
//             </p>
//           )}
//         </div>
//       </div>

//       {/* ══ LINE ITEMS TABLE ════════════════════════════════════════════ */}
//       <div className="px-8 pt-6 pb-2" style={{ background: "#ffffff" }}>
//         <table className="w-full text-sm border-collapse">
//           <thead>
//             <tr>
//               {["Description", "Qty", "Rate", "Disc %", "Amount"].map(
//                 (h, i) => (
//                   <th
//                     key={h}
//                     className={cn(
//                       "py-2.5 text-[10px] font-black uppercase tracking-widest",
//                       i === 0 ? "text-left" : i === 4 ? "text-right" : "text-center",
//                     )}
//                     style={{
//                       color: "rgba(255,255,255,0.85)",
//                       background: "#191970",
//                       padding: i === 0 ? "10px 16px 10px 0" : "10px 8px",
//                       borderRadius:
//                         i === 0
//                           ? "8px 0 0 8px"
//                           : i === 4
//                           ? "0 8px 8px 0"
//                           : undefined,
//                     }}
//                   >
//                     {h}
//                   </th>
//                 ),
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {store.lineItems.map((item, idx) => (
//               <tr
//                 key={item.id}
//                 style={{
//                   borderBottom: "1px solid rgba(25,25,112,0.06)",
//                   background: idx % 2 !== 0 ? "#ECEFF1" : "#ffffff",
//                 }}
//               >
//                 <td
//                   className="py-3 text-left font-medium"
//                   style={{ color: "#191970" }}
//                 >
//                   {item.description || "—"}
//                 </td>
//                 <td
//                   className="py-3 text-center tabular-nums"
//                   style={{ color: "rgba(25,25,112,0.6)" }}
//                 >
//                   {item.quantity}
//                 </td>
//                 <td
//                   className="py-3 text-center tabular-nums"
//                   style={{ color: "rgba(25,25,112,0.6)" }}
//                 >
//                   {fmt(item.rate)}
//                 </td>
//                 <td
//                   className="py-3 text-center tabular-nums"
//                   style={{ color: "rgba(25,25,112,0.6)" }}
//                 >
//                   {item.discount ? `${item.discount}%` : "—"}
//                 </td>
//                 <td
//                   className="py-3 text-right tabular-nums font-black"
//                   style={{ color: "#191970" }}
//                 >
//                   {fmt(item.amount)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ══ TOTALS + NOTES ══════════════════════════════════════════════ */}
//       <div className="px-8 py-6 grid grid-cols-2 gap-10 items-start" style={{ background: "#ffffff" }}>
//         {/* Left — Notes, Terms, Signature */}
//         <div className="space-y-4 text-xs" style={{ color: "rgba(25,25,112,0.6)" }}>
//           {store.notes && (
//             <div>
//               <p
//                 className="text-[10px] font-black uppercase tracking-widest mb-1"
//                 style={{ color: "#191970" }}
//               >
//                 Notes
//               </p>
//               <p className="whitespace-pre-line leading-relaxed">{store.notes}</p>
//             </div>
//           )}
//           {store.terms && (
//             <div>
//               <p
//                 className="text-[10px] font-black uppercase tracking-widest mb-1"
//                 style={{ color: "#191970" }}
//               >
//                 Terms
//               </p>
//               <p className="whitespace-pre-line leading-relaxed">{store.terms}</p>
//             </div>
//           )}
//           {store.stampUrl && (
//             <div className="pt-2">
//               <img
//                 src={store.stampUrl}
//                 alt="Signature"
//                 className="h-12 object-contain mb-1"
//               />
//               <div
//                 className="w-36 border-t"
//                 style={{ borderColor: "rgba(25,25,112,0.25)" }}
//               />
//               <p
//                 className="text-[10px] mt-1 uppercase tracking-widest font-black"
//                 style={{ color: "rgba(25,25,112,0.35)" }}
//               >
//                 Authorized Signature
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Right — Totals */}
//         <div className="space-y-2 text-sm">
//           <div
//             className="flex justify-between"
//             style={{ color: "rgba(25,25,112,0.55)" }}
//           >
//             <span>Subtotal</span>
//             <span className="tabular-nums font-semibold">{fmt(subtotal)}</span>
//           </div>

//           {store.overallDiscount > 0 && (
//             <div className="flex justify-between font-semibold text-emerald-600">
//               <span>Discount ({store.overallDiscount}%)</span>
//               <span className="tabular-nums">− {fmt(overallDiscountAmount)}</span>
//             </div>
//           )}

//           {store.taxRate > 0 && (
//             <div
//               className="flex justify-between"
//               style={{ color: "rgba(25,25,112,0.55)" }}
//             >
//               <span>Tax ({store.taxRate}%)</span>
//               <span className="tabular-nums">{fmt(store.taxRate)}</span>
//             </div>
//           )}

//           {/* Total — amber highlight */}
//           <div className="pt-3">
//             <div
//               className="flex justify-between items-center font-black text-base px-4 py-3 rounded-xl"
//               style={{
//                 background: "#191970",
//                 color: "#ffffff",
//               }}
//             >
//               <span>Total</span>
//               <span className="tabular-nums" style={{ color: "#FFC107" }}>
//                 {fmt(store.totalAmount)}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
//       <div
//         className="px-8 py-3 flex items-center justify-between"
//         style={{
//           background: "#ECEFF1",
//           borderTop: "1px solid rgba(25,25,112,0.08)",
//         }}
//       >
//         <p className="text-[10px] font-mono" style={{ color: "rgba(25,25,112,0.35)" }}>
//           {store.currency} &middot;{" "}
//           {store.overallDiscount > 0
//             ? `${store.overallDiscount}% Discount (−${overallDiscountAmount.toFixed(2)})`
//             : "No Discount"}
//         </p>
//         <div className="flex items-center gap-2">
//           <span
//             className="w-1.5 h-1.5 rounded-full"
//             style={{ background: "#FFC107" }}
//           />
//           <p
//             className="text-[10px] font-mono font-bold"
//             style={{ color: "rgba(25,25,112,0.4)" }}
//           >
//             Invoice #{store.invoiceNumber}
//           </p>
//         </div>
//       </div>
//     </article>
//   );
// }





























































"use client";

import { useInvoiceStore } from "@/lib/invoice-store";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { InvoicePreviewProps } from "@/types/invoice-types";
import useInvoicePreview from "@/hooks/useInvoicePreview";

// ─────────────────────────────────────────────────────────────────────────────
//  INVOICE PREVIEW — Printer Optimized & Ink-Saving
//
//  Rules:
//  • Pure white background everywhere — zero ink on bg
//  • Color blocks removed — only thin borders (0.5-2px)
//  • #191970 text/borders only — no solid navy fills
//  • #FFC107 only for tiny 2px accent lines — almost zero ink
//  • Compact line-height & padding — more content per page
//  • 100+ items: table spans pages naturally with thead repeating
//  • @media print: correct page breaks, no shadows/radius
// ─────────────────────────────────────────────────────────────────────────────

export function InvoicePreview({
  className,
  id = "invoice-preview",
  style,
}: InvoicePreviewProps) {
  const { currencyInfo, subtotal, overallDiscountAmount, store, fmt } =
    useInvoicePreview();

  if (!store) return null;

  const taxAmount =
    store.taxRate > 0
      ? (subtotal - overallDiscountAmount) * (store.taxRate / 100)
      : 0;

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #${id}, #${id} * { visibility: visible !important; }
          #${id} {
            position: fixed !important;
            inset: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            font-size: 10pt !important;
          }
          .inv-thead { display: table-header-group; }
          .inv-tbody { display: table-row-group; }
          .inv-no-break { page-break-inside: avoid; }
          .inv-row { page-break-inside: avoid; }
        }
      `}</style>

      <article
        id={id}
        style={{
          ...style,
          background: "#ffffff",
          width: "100%",
          maxWidth: "794px", /* A4 px width */
          fontFamily: "'Georgia', 'Times New Roman', serif",
          color: "#191970",
          fontSize: "11px",
          lineHeight: "1.5",
        }}
        className={cn(className)}
      >

        {/* ══ HEADER ════════════════════════════════════════════════════════ */}
        <header
          style={{
            padding: "28px 36px 18px 36px",
            borderBottom: "2px solid #191970",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "24px",
          }}
        >
          {/* Left: Logo + Business */}
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", flex: 1 }}>
            {store.logoDataUrl && (
              <img
                src={store.logoDataUrl}
                alt="Logo"
                style={{ height: "48px", maxWidth: "80px", objectFit: "contain", flexShrink: 0 }}
              />
            )}
            <div>
              {store.businessName && (
                <p style={{ fontWeight: 700, fontSize: "13px", color: "#191970", margin: 0, lineHeight: 1.3 }}>
                  {store.businessName}
                </p>
              )}
              {store.bussinessInfo && (
                <p style={{ fontSize: "9px", color: "rgba(25,25,112,0.55)", marginTop: "4px", whiteSpace: "pre-line", lineHeight: 1.5 }}>
                  {store.bussinessInfo}
                </p>
              )}
            </div>
          </div>

          {/* Right: Title + meta */}
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "0.12em", color: "#191970", margin: 0, lineHeight: 1 }}>
              INVOICE
            </p>
            {/* Amber accent — minimal ink */}
            <div style={{ height: "2px", width: "64px", background: "#FFC107", marginLeft: "auto", marginTop: "6px", marginBottom: "6px" }} />
            <p style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "11px", color: "#191970", margin: 0 }}>
              #{store.invoiceNumber}
            </p>
            {store.issueDate && (
              <p style={{ fontSize: "9px", color: "rgba(25,25,112,0.55)", marginTop: "2px" }}>
                Issued: {format(new Date(store.issueDate), "MMM d, yyyy")}
              </p>
            )}
            {store.dueDate && (
              <p style={{ fontSize: "9px", color: "rgba(25,25,112,0.55)" }}>
                Due: {format(new Date(store.dueDate), "MMM d, yyyy")}
              </p>
            )}
          </div>
        </header>

        {/* ══ BILL TO / SHIP TO / DETAILS ═══════════════════════════════════ */}
        <div
          className="inv-no-break"
          style={{
            padding: "14px 36px",
            borderBottom: "1px solid rgba(25,25,112,0.1)",
            display: "grid",
            gridTemplateColumns: store.shipTo ? "1fr 1fr 1fr" : "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Bill To */}
          <div>
            <p style={{ fontSize: "7.5px", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(25,25,112,0.4)", margin: "0 0 4px 0", paddingBottom: "2px", borderBottom: "1.5px solid #FFC107", display: "inline-block" }}>
              Bill To
            </p>
            {store.clientName && (
              <p style={{ fontWeight: 700, fontSize: "11px", color: "#191970", margin: "0 0 2px 0" }}>
                {store.clientName}
              </p>
            )}
            {store.clientAddress && (
              <p style={{ fontSize: "9.5px", color: "rgba(25,25,112,0.6)", margin: 0, whiteSpace: "pre-line", lineHeight: 1.5 }}>
                {store.clientAddress}
              </p>
            )}
          </div>

          {/* Ship To */}
          {store.shipTo && (
            <div>
              <p style={{ fontSize: "7.5px", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(25,25,112,0.4)", margin: "0 0 4px 0", paddingBottom: "2px", borderBottom: "1.5px solid rgba(25,25,112,0.2)", display: "inline-block" }}>
                Ship To
              </p>
              <p style={{ fontSize: "9.5px", color: "rgba(25,25,112,0.6)", margin: 0, whiteSpace: "pre-line", lineHeight: 1.5 }}>
                {store.shipTo}
              </p>
            </div>
          )}

          {/* Details */}
          <div style={{ textAlign: store.shipTo ? "left" : "right" }}>
            <p style={{ fontSize: "7.5px", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(25,25,112,0.4)", margin: "0 0 4px 0", paddingBottom: "2px", borderBottom: "1.5px solid rgba(25,25,112,0.12)", display: "inline-block" }}>
              Details
            </p>
            {store.poNumber && (
              <p style={{ fontSize: "9.5px", color: "#191970", margin: "0 0 1px 0" }}>
                PO: <strong>{store.poNumber}</strong>
              </p>
            )}
            <p style={{ fontSize: "9.5px", color: "#191970", margin: "0 0 1px 0" }}>
              Currency: <strong style={{ fontFamily: "monospace" }}>{store.currency}</strong> ({currencyInfo.symbol})
            </p>
            {store.taxRate > 0 && (
              <p style={{ fontSize: "9.5px", color: "#191970", margin: 0 }}>
                Tax: <strong>{store.taxRate}%</strong>
              </p>
            )}
          </div>
        </div>

        {/* ══ LINE ITEMS ════════════════════════════════════════════════════
            No background fills. Handles any number of rows.
            thead repeats on print page breaks automatically.                */}
        <div style={{ padding: "16px 36px 0 36px" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: "10.5px" }}
          >
            <thead className="inv-thead">
              <tr style={{ borderBottom: "1.5px solid #191970" }}>
                {[
                  { l: "Description", a: "left", w: "40%" },
                  { l: "Qty", a: "center", w: "8%" },
                  { l: "Unit Rate", a: "right", w: "15%" },
                  { l: "Disc %", a: "center", w: "9%" },
                  { l: "Amount", a: "right", w: "16%" },
                ].map((c) => (
                  <th
                    key={c.l}
                    style={{
                      textAlign: c.a as any,
                      width: c.w,
                      padding: "3px 4px 5px",
                      fontSize: "7.5px",
                      fontWeight: 900,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(25,25,112,0.45)",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {c.l}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="inv-tbody">
              {store.lineItems.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  className="inv-row"
                  style={{
                    borderBottom: "0.5px solid rgba(25,25,112,0.08)",
                    background: idx % 2 !== 0 ? "rgba(25,25,112,0.018)" : "#ffffff",
                  }}
                >
                  <td style={{ padding: "5px 4px 5px 0", color: "#191970", fontWeight: 500, verticalAlign: "top" }}>
                    {item.description || "—"}
                  </td>
                  <td style={{ padding: "5px 4px", textAlign: "center", color: "rgba(25,25,112,0.6)", fontFamily: "monospace", verticalAlign: "top" }}>
                    {item.quantity}
                  </td>
                  <td style={{ padding: "5px 4px", textAlign: "right", color: "rgba(25,25,112,0.6)", fontFamily: "monospace", verticalAlign: "top" }}>
                    {fmt(item.rate)}
                  </td>
                  <td style={{ padding: "5px 4px", textAlign: "center", color: "rgba(25,25,112,0.5)", fontFamily: "monospace", verticalAlign: "top" }}>
                    {item.discount ? `${item.discount}%` : "—"}
                  </td>
                  <td style={{ padding: "5px 0 5px 4px", textAlign: "right", color: "#191970", fontWeight: 700, fontFamily: "monospace", verticalAlign: "top" }}>
                    {fmt(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ══ TOTALS + NOTES ════════════════════════════════════════════════
            Placed after all items — spans into next page if needed          */}
        <div
          className="inv-no-break"
          style={{
            padding: "12px 36px 20px 36px",
            borderTop: "1px solid rgba(25,25,112,0.1)",
            marginTop: "8px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Left: Notes + Terms + Signature */}
          <div style={{ fontSize: "9.5px", color: "rgba(25,25,112,0.6)" }}>
            {store.notes && (
              <div style={{ marginBottom: "10px" }}>
                <p style={{ fontSize: "7.5px", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#191970", marginBottom: "3px" }}>
                  Notes
                </p>
                <p style={{ whiteSpace: "pre-line", lineHeight: 1.55 }}>{store.notes}</p>
              </div>
            )}
            {store.terms && (
              <div style={{ marginBottom: "10px" }}>
                <p style={{ fontSize: "7.5px", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#191970", marginBottom: "3px" }}>
                  Terms & Conditions
                </p>
                <p style={{ whiteSpace: "pre-line", lineHeight: 1.55 }}>{store.terms}</p>
              </div>
            )}
            {store.stampUrl && (
              <div style={{ marginTop: "12px" }}>
                <img src={store.stampUrl} alt="Signature" style={{ height: "40px", objectFit: "contain", marginBottom: "4px" }} />
                <div style={{ width: "110px", borderTop: "1px solid rgba(25,25,112,0.25)" }} />
                <p style={{ fontSize: "7.5px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(25,25,112,0.4)", marginTop: "3px" }}>
                  Authorized Signature
                </p>
              </div>
            )}
            {/* Placeholder if nothing */}
            {!store.notes && !store.terms && !store.stampUrl && (
              <span />
            )}
          </div>

          {/* Right: Totals */}
          <div style={{ fontSize: "10.5px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", color: "rgba(25,25,112,0.6)" }}>
              <span>Subtotal</span>
              <span style={{ fontFamily: "monospace" }}>{fmt(subtotal)}</span>
            </div>

            {store.overallDiscount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", color: "#059669" }}>
                <span>Discount ({store.overallDiscount}%)</span>
                <span style={{ fontFamily: "monospace" }}>− {fmt(overallDiscountAmount)}</span>
              </div>
            )}

            {store.taxRate > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", color: "rgba(25,25,112,0.6)" }}>
                <span>Tax ({store.taxRate}%)</span>
                <span style={{ fontFamily: "monospace" }}>{fmt(taxAmount)}</span>
              </div>
            )}

            {/* Grand total — only element with real visual weight */}
            <div style={{ borderTop: "2px solid #191970", paddingTop: "6px", marginTop: "4px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: 700, fontSize: "13px", color: "#191970", letterSpacing: "0.04em" }}>
                TOTAL DUE
              </span>
              <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "14px", color: "#191970" }}>
                {fmt(store.totalAmount)}
              </span>
            </div>

            <p style={{ fontSize: "8px", color: "rgba(25,25,112,0.35)", textAlign: "right", marginTop: "3px" }}>
              All amounts in {store.currency}
            </p>
          </div>
        </div>

        {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
        <div
          style={{
            padding: "8px 36px",
            borderTop: "0.5px solid rgba(25,25,112,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "8px", color: "rgba(25,25,112,0.3)", fontFamily: "monospace", margin: 0 }}>
            {store.businessName ? `${store.businessName} · ` : ""}
            {store.currency}
            {store.overallDiscount > 0 ? ` · ${store.overallDiscount}% Discount` : ""}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FFC107", display: "inline-block" }} />
            <p style={{ fontSize: "8px", color: "rgba(25,25,112,0.3)", fontFamily: "monospace", margin: 0 }}>
              Invoice #{store.invoiceNumber}
            </p>
          </div>
        </div>

      </article>
    </>
  );
}
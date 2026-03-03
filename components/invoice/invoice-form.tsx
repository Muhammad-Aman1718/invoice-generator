// "use client";

// import useInvoiceForm from "@/hooks/useInvoiceForm";
// import Field from "../ui/field";

// import { ChevronDown, Upload, X, Percent, Hash } from "lucide-react";
// import { CURRENCIES, SI, TAX_TYPES } from "@/constant/data";
// import { LogoUpload } from "./logo-upload";
// import { cn } from "@/lib/utils";
// import { LineItemsTable } from "./line-items-table";
// import { createClient, supabase } from "@/lib/supabase/client";
// import { useEffect } from "react";
// import { usePathname } from "next/navigation";


// // ───────────────────────────────────────────────────────────────────────────
// export function InvoiceForm() {
//   const {
//     showCurrencyDrop,
//     taxType,
//     showTaxDrop,
//     subtotal,
//     overallDiscountVal,
//     taxVal,
//     dropdownRef,
//     taxDropdownRef,
//     selectedCurrency,
//     store,
//     setShowCurrencyDrop,
//     setShowTaxDrop,
//     handleTaxChange,
//   } = useInvoiceForm();

//   return (
//     <form
//       className="rounded-2xl shadow-lg border border-[#1B2A4A]/08  overflow-hidden"
//       style={{ background: "#F5F7FA" }}
//       onSubmit={(e) => e.preventDefault()}
//     >
//       {/* ══ HEADER BAR — 30% navy ══════════════════════════════════════ */}
//       <div
//         className="px-8 py-5 flex items-center justify-between"
//         style={{ background: "#1B2A4A" }}
//       >
//         {/* Invoice number */}

//         <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 focus-within:border-[#3A7BD5] transition-all">
//           <Hash size={15} className="text-[#3A7BD5]" />
//           <input
//             type="text"
//             inputMode="numeric"
//             placeholder="Invoice #"
//             className="bg-transparent border-none outline-none text-white font-bold text-lg w-32 appearance-none"
//             // Value handle karein taake 0 ki jagah khali nazar aaye typing ke waqt
//             value={store.invoiceNumber === 0 ? "" : store.invoiceNumber}
//             onChange={(e) => {
//               const val = e.target.value;
//               console.log("Invoice Number Input Changed:", val);
//               if (/^\d*$/.test(val)) {
//                 // USER KI MARZI: User yahan jo type karega woh final hoga
//                 const num = val === "" ? 0 : parseInt(val);
//                 store.setField("invoiceNumber", num);
//               }
//             }}
//           />
//         </div>

//         <span className="text-2xl font-bold tracking-[0.2em] text-white/90">
//           INVOICE
//         </span>

//         <div className="relative" ref={dropdownRef}>
//           <button
//             type="button"
//             onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
//             className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-all border border-white/15"
//           >
//             <span>{selectedCurrency.symbol}</span>
//             <span>{selectedCurrency.code}</span>
//             <ChevronDown
//               size={12}
//               className={cn(
//                 "transition-transform",
//                 showCurrencyDrop && "rotate-180",
//               )}
//             />
//           </button>

//           {showCurrencyDrop && (
//             <div className="absolute right-0 top-10 bg-white rounded-xl shadow-2xl border border-[#1B2A4A]/10 z-50 w-64 overflow-hidden">
//               {/* Scrollable Container */}
//               <div className="max-h-60 overflow-y-auto custom-scrollbar overscroll-contain ">
//                 {CURRENCIES.map((c) => (
//                   <button
//                     key={c.code}
//                     type="button"
//                     onClick={() => {
//                       store.setField("currency", c.code); // Store update hoga
//                       setShowCurrencyDrop(false);
//                     }}
//                     className={cn(
//                       "w-full text-left px-4 py-2.5 text-sm flex justify-between items-center hover:bg-[#F5F7FA] transition-all border-b border-gray-50 last:border-none",
//                       c.code === store.currency
//                         ? "text-[#3A7BD5] font-bold bg-[#3A7BD5]/5"
//                         : "text-[#1B2A4A]",
//                     )}
//                   >
//                     <div className="flex flex-col">
//                       <span className="font-medium">{c.label}</span>
//                       <span className="text-[10px] opacity-50 uppercase">
//                         {c.code}
//                       </span>
//                     </div>
//                     <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded text-[#1B2A4A]/60">
//                       {c.symbol}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ══ BODY ═══════════════════════════════════════════════════════ */}
//       <div className="p-8 space-y-8">
//         {/* Logo + From + Dates */}
//         <div className="grid grid-cols-12 gap-6">
//           <div className="col-span-3">
//             <Field label="Logo">
//               <LogoUpload value={store.logoDataUrl} onChange={store.setLogo} />
//             </Field>
//           </div>

//           <div className="col-span-5 space-y-3">
//             <Field label="From">
//               <input
//                 className={SI}
//                 placeholder="Your business name"
//                 value={store.businessName}
//                 onChange={(e) => store.setField("businessName", e.target.value)}
//               />
//             </Field>
//             <textarea
//               className={cn(SI, "resize-none")}
//               placeholder="Address, phone, email..."
//               rows={3}
//               value={store.bussinessInfo}
//               onChange={(e) => store.setField("bussinessInfo", e.target.value)}
//             />
//           </div>

//           <div className="col-span-4 space-y-3">
//             `
//             <Field label="Issue Date">
//               <input
//                 type="date"
//                 className={SI}
//                 value={store.issueDate || ""}
//                 onChange={(e) => store.setField("issueDate", e.target.value)}
//               />{" "}
//             </Field>
//             `
//             <Field label="Due Date">
//               <input
//                 type="date"
//                 className={SI}
//                 value={store.dueDate || ""}
//                 onChange={(e) => store.setField("dueDate", e.target.value)}
//               />
//             </Field>
//             <Field label="PO Number">
//               <input
//                 className={SI}
//                 placeholder="Optional"
//                 value={store.poNumber}
//                 onChange={(e) => store.setField("poNumber", e.target.value)}
//               />
//             </Field>
//           </div>
//         </div>

//         <div className="border-t border-[#1B2A4A]/08" />

//         {/* Bill To / Ship To */}
//         <div className="grid grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <div
//               className="w-6 h-0.5 rounded-full"
//               style={{ background: "#3A7BD5" }}
//             />
//             <Field label="Bill To">
//               <input
//                 className={SI}
//                 placeholder="Client name"
//                 value={store.clientName}
//                 onChange={(e) => store.setField("clientName", e.target.value)}
//               />
//             </Field>
//             <textarea
//               className={cn(SI, "resize-none")}
//               placeholder="Client address..."
//               rows={2}
//               value={store.clientAddress}
//               onChange={(e) => store.setField("clientAddress", e.target.value)}
//             />
//           </div>

//           <div className="space-y-2">
//             <div className="w-6 h-0.5 rounded-full bg-[#1B2A4A]/15" />
//             <Field label="Ship To (Optional)">
//               <input
//                 className={SI}
//                 placeholder="Shipping address..."
//                 onChange={(e) => store.setField("shipTo", e.target.value)}
//               />
//             </Field>
//           </div>
//         </div>

//         <div className="border-t border-[#1B2A4A]/08" />

//         {/* Line Items Table */}

//         <LineItemsTable currency={selectedCurrency.symbol} showDiscount />

//         {/* // ── Left: Notes, Terms, Signature ── */}
//         {/* Notes + Totals */}
//         <div className="grid grid-cols-2 gap-10">
//           {/* ── Left: Notes, Terms, Signature ── */}
//           <div className="space-y-5">
//             <Field label="Notes">
//               <textarea
//                 className={cn(SI, "resize-none min-h-[80px]")}
//                 placeholder="Payment instructions, thank you note..."
//                 value={store.notes}
//                 onChange={(e) => store.setField("notes", e.target.value)}
//               />
//             </Field>

//             <Field label="Terms">
//               <textarea
//                 className={cn(SI, "resize-none min-h-[60px]")}
//                 placeholder="Terms & conditions..."
//                 value={store.terms}
//                 onChange={(e) => store.setField("terms", e.target.value)}
//               />
//             </Field>

//             {/* Signature / Stamp upload */}
//             {/* <Field label="Signature / Stamp">
//               {signatureUrl ? (
//                 <div className="relative inline-block">
//                   <img
//                     src={signatureUrl}
//                     alt="Signature"
//                     className="h-16 object-contain rounded-lg border border-[#1B2A4A]/10 bg-white p-2"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setSignatureUrl(null); // Local UI clear
//                       store.setField("stampUrl", null); // Store/DB clear
//                     }}
//                     className="absolute -top-2 -right-2 bg-[#1B2A4A] text-white rounded-full p-0.5 hover:bg-red-500 transition-all"
//                   >
//                     <X size={11} />
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={() => sigRef.current?.click()}
//                   className="flex items-center gap-2 border-2 border-dashed border-[#1B2A4A]/20 hover:border-[#3A7BD5] rounded-xl px-4 py-3 text-sm text-[#1B2A4A]/40 hover:text-[#3A7BD5] transition-all w-full justify-center"
//                 >
//                   <Upload size={14} />
//                   Upload signature or stamp
//                 </button>
//               )}
//               <input
//                 ref={sigRef}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleSignature}
//               />
//             </Field> */}

//             <Field label="Signature / Stamp">
//               <LogoUpload
//                 value={store.stampUrl} // Store ka stamp wala field
//                 onChange={(val) => store.setField("stampUrl", val)} // Store update logic
//                 className="min-h-[100px]" // Aap height choti bhi kar sakte hain stamp ke liye
//               />
//             </Field>
//           </div>

//           {/* ── Right: Totals ── */}
//           <div className="space-y-3">
//             {/* Subtotal */}
//             <div className="flex justify-between text-sm text-[#1B2A4A]/60">
//               <span>Subtotal</span>
//               <span className="font-mono">
//                 {selectedCurrency.symbol} {subtotal.toFixed(2)}
//               </span>
//             </div>

//             {/* Overall discount */}
//             <div className="flex justify-between items-center gap-3">
//               <span className="text-sm text-[#1B2A4A]/60">
//                 Overall Discount
//               </span>
//               <div className="flex items-center gap-1.5 bg-white border border-[#1B2A4A]/15 rounded-lg px-2 py-1">
//                 <input
//                   type="text"
//                   inputMode="numeric"
//                   pattern="[0-9]*"
//                   min={0}
//                   max={100}
//                   className="w-14 text-right text-sm text-[#1B2A4A] font-mono outline-none bg-transparent"
//                   value={store.overallDiscount}
//                   onChange={(e) =>
//                     store.setField(
//                       "overallDiscount",
//                       parseFloat(e.target.value) || 0,
//                     )
//                   }
//                 />
//                 <Percent size={12} className="text-[#1B2A4A]/40" />
//               </div>
//             </div>

//             {overallDiscountVal > 0 && (
//               <div className="flex justify-between text-sm text-green-600">
//                 <span>Discount ({store.overallDiscount}%)</span>
//                 <span className="font-mono">
//                   − {selectedCurrency.symbol} {overallDiscountVal.toFixed(2)}
//                 </span>
//               </div>
//             )}

//             {/* Tax selector */}
//             <div className="flex justify-between items-center gap-3">
//               {/* Ref ko yahan lagana hai takay poora tax area cover ho */}
//               <div className="relative" ref={taxDropdownRef}>
//                 <button
//                   type="button"
//                   onClick={() => setShowTaxDrop(!showTaxDrop)}
//                   className="flex items-center gap-1.5 text-sm text-[#1B2A4A]/60 hover:text-[#3A7BD5] transition-all"
//                 >
//                   <span>{taxType}</span>
//                   {taxType !== "None" && (
//                     <span className="text-xs font-mono bg-[#3A7BD5]/10 text-[#3A7BD5] px-1.5 py-0.5 rounded">
//                       {store.taxRate}%
//                     </span>
//                   )}
//                   <ChevronDown
//                     size={12}
//                     className={cn(
//                       "transition-transform",
//                       showTaxDrop && "rotate-180",
//                     )}
//                   />
//                 </button>

//                 {showTaxDrop && (
//                   <div className="absolute left-0 bottom-full mb-2 bg-white rounded-xl shadow-2xl border border-[#1B2A4A]/10 z-50 w-44 max-h-60 overflow-y-auto custom-scrollbar overscroll-contain">
//                     {TAX_TYPES.map((t) => (
//                       <button
//                         key={t.label}
//                         type="button"
//                         onClick={() => {
//                           handleTaxChange(t.rate, t.label);
//                           setShowTaxDrop(false);
//                         }}
//                         className={cn(
//                           "w-full text-left px-4 py-2.5 text-sm flex justify-between hover:bg-[#F5F7FA] transition-all",
//                           t.label === taxType
//                             ? "text-[#3A7BD5] font-bold"
//                             : "text-[#1B2A4A]",
//                         )}
//                       >
//                         <span>{t.label}</span>
//                         {t.label !== "None" && t.label !== "Custom" && (
//                           <span className="text-xs text-[#1B2A4A]/40">
//                             {t.rate}%
//                           </span>
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Custom Input Section */}
//               <span className="text-sm font-mono text-[#1B2A4A]/60">
//                 {selectedCurrency.symbol} {taxVal.toFixed(2)}
//               </span>
//             </div>

//             <div className="border-t-2 border-[#1B2A4A]/08 pt-3 mt-1" />

//             {/* Total */}
//             <div className="flex justify-between items-center">
//               <span
//                 className="font-bold text-base"
//                 style={{ color: "#1B2A4A" }}
//               >
//                 Total
//               </span>
//               <span
//                 className="font-bold text-base font-mono"
//                 style={{ color: "#1B2A4A" }}
//               >
//                 {selectedCurrency.symbol} {store.totalAmount.toFixed(2)}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ══ FOOTER BAR ═════════════════════════════════════════════════ */}
//       <div
//         className="px-6 py-4 flex items-center justify-between backdrop-blur-sm"
//         style={{
//           background: "rgba(255, 255, 255, 0.5)",
//           borderTop: "1px solid #e2e8f0",
//         }}
//       >
//         <div className="flex flex-col gap-0.5">
//           <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
//             Pricing Details
//           </span>
//           <p className="text-[11px] font-medium text-slate-600">
//             {store.currency} &middot;{" "}
//             {store.overallDiscount > 0 ? (
//               <span className="text-emerald-600">
//                 {store.overallDiscount}% Off (-{overallDiscountVal.toFixed(2)})
//               </span>
//             ) : (
//               "No Discount Applied"
//             )}
//           </p>
//         </div>

//         <div className="px-3 py-1 bg-slate-100 rounded-full flex items-center gap-2 text-[10px] font-mono font-semibold text-slate-500 border border-slate-200">
//           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
//           #{store.invoiceNumber}
//         </div>
//       </div>
//     </form>
//   );
// }



// ─────────────────────────────────────────────

// MAde by Caloude



// "use client";

// import useInvoiceForm from "@/hooks/useInvoiceForm";
// import Field from "../ui/field";

// import { ChevronDown, Percent, Hash } from "lucide-react";
// import { CURRENCIES, SI, TAX_TYPES } from "@/constant/data";
// import { LogoUpload } from "./logo-upload";
// import { cn } from "@/lib/utils";
// import { LineItemsTable } from "./line-items-table";
// import { useEffect } from "react";
// import { usePathname } from "next/navigation";

// // ─────────────────────────────────────────────
// //  COLOR THEME  (60 · 30 · 10)
// //  60% → #ECEFF1  background (cool light grey)
// //  30% → #191970  midnight blue (structure)
// //  10% → #FFC107  amber (CTAs, highlights)
// // ─────────────────────────────────────────────

// // Shared input style override — use ECEFF1 bg, midnight blue text
// const INPUT =
//   "w-full bg-[#ECEFF1] border border-[#191970]/10 rounded-xl px-3 py-2 text-sm text-[#191970] placeholder:text-[#191970]/30 outline-none focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 transition-all";

// export function InvoiceForm() {
//   const {
//     showCurrencyDrop,
//     taxType,
//     showTaxDrop,
//     subtotal,
//     overallDiscountVal,
//     taxVal,
//     dropdownRef,
//     taxDropdownRef,
//     selectedCurrency,
//     store,
//     setShowCurrencyDrop,
//     setShowTaxDrop,
//     handleTaxChange,
//   } = useInvoiceForm();

//   return (
//     <form
//       className="rounded-2xl overflow-hidden border"
//       style={{
//         background: "#ffffff",
//         borderColor: "rgba(25,25,112,0.08)",
//         boxShadow: "0 2px 20px rgba(25,25,112,0.06)",
//       }}
//       onSubmit={(e) => e.preventDefault()}
//     >
//       {/* ══ HEADER BAR — midnight blue ══════════════════════════════════ */}
//       <div
//         className="px-4 sm:px-8 py-4 flex items-center justify-between gap-3"
//         style={{ background: "#191970" }}
//       >
//         {/* Invoice number input */}
//         <div
//           className="flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all focus-within:border-[#FFC107]"
//           style={{
//             background: "rgba(255,255,255,0.07)",
//             borderColor: "rgba(255,255,255,0.15)",
//           }}
//         >
//           <Hash size={13} style={{ color: "#FFC107" }} />
//           <input
//             type="text"
//             inputMode="numeric"
//             placeholder="Invoice #"
//             className="bg-transparent border-none outline-none text-white font-black text-base w-20 sm:w-28 appearance-none placeholder:text-white/30"
//             value={store.invoiceNumber === 0 ? "" : store.invoiceNumber}
//             onChange={(e) => {
//               const val = e.target.value;
//               if (/^\d*$/.test(val)) {
//                 const num = val === "" ? 0 : parseInt(val);
//                 store.setField("invoiceNumber", num);
//               }
//             }}
//           />
//         </div>

//         <span
//           className="text-lg sm:text-2xl font-black tracking-[0.2em]"
//           style={{ color: "rgba(255,255,255,0.9)" }}
//         >
//           INVOICE
//         </span>

//         {/* Currency dropdown */}
//         <div className="relative" ref={dropdownRef}>
//           <button
//             type="button"
//             onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
//             className="flex items-center gap-1.5 text-white text-xs font-bold px-3 py-1.5 rounded-xl border transition-all"
//             style={{
//               background: "rgba(255,255,255,0.08)",
//               borderColor: "rgba(255,255,255,0.15)",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "rgba(255,193,7,0.15)";
//               e.currentTarget.style.borderColor = "rgba(255,193,7,0.4)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "rgba(255,255,255,0.08)";
//               e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
//             }}
//           >
//             <span style={{ color: "#FFC107" }}>{selectedCurrency.symbol}</span>
//             <span>{selectedCurrency.code}</span>
//             <ChevronDown
//               size={11}
//               className={cn(
//                 "transition-transform",
//                 showCurrencyDrop && "rotate-180",
//               )}
//             />
//           </button>

//           {showCurrencyDrop && (
//             <div
//               className="absolute right-0 top-10 rounded-xl shadow-2xl border z-50 w-60 overflow-hidden"
//               style={{
//                 background: "#fff",
//                 borderColor: "rgba(25,25,112,0.1)",
//               }}
//             >
//               <div className="max-h-56 overflow-y-auto custom-scrollbar">
//                 {CURRENCIES.map((c) => (
//                   <button
//                     key={c.code}
//                     type="button"
//                     onClick={() => {
//                       store.setField("currency", c.code);
//                       setShowCurrencyDrop(false);
//                     }}
//                     className={cn(
//                       "w-full text-left px-4 py-2.5 text-xs flex justify-between items-center transition-all border-b last:border-none",
//                       c.code === store.currency
//                         ? "font-bold"
//                         : "text-[#191970]",
//                     )}
//                     style={{
//                       borderColor: "rgba(25,25,112,0.05)",
//                       background:
//                         c.code === store.currency
//                           ? "rgba(255,193,7,0.08)"
//                           : undefined,
//                       color:
//                         c.code === store.currency ? "#191970" : undefined,
//                     }}
//                     onMouseEnter={(e) => {
//                       if (c.code !== store.currency)
//                         e.currentTarget.style.background = "#ECEFF1";
//                     }}
//                     onMouseLeave={(e) => {
//                       if (c.code !== store.currency)
//                         e.currentTarget.style.background = "transparent";
//                     }}
//                   >
//                     <div>
//                       <p className="font-semibold">{c.label}</p>
//                       <p className="text-[10px] opacity-40 uppercase">{c.code}</p>
//                     </div>
//                     <span
//                       className="font-mono text-xs px-1.5 py-0.5 rounded-lg"
//                       style={{
//                         background: "rgba(25,25,112,0.06)",
//                         color: "#191970",
//                       }}
//                     >
//                       {c.symbol}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ══ BODY ════════════════════════════════════════════════════════ */}
//       <div className="p-4 sm:p-8 space-y-6 sm:space-y-8" style={{ background: "#ECEFF1" }}>

//         {/* Logo + From + Dates */}
//         <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
//           {/* Logo — full width on mobile */}
//           <div className="sm:col-span-3">
//             <Field label="Logo">
//               <LogoUpload value={store.logoDataUrl} onChange={store.setLogo} />
//             </Field>
//           </div>

//           {/* From */}
//           <div className="sm:col-span-5 space-y-3">
//             <Field label="From">
//               <input
//                 className={INPUT}
//                 placeholder="Your business name"
//                 value={store.businessName}
//                 onChange={(e) => store.setField("businessName", e.target.value)}
//               />
//             </Field>
//             <textarea
//               className={cn(INPUT, "resize-none")}
//               placeholder="Address, phone, email..."
//               rows={3}
//               value={store.bussinessInfo}
//               onChange={(e) => store.setField("bussinessInfo", e.target.value)}
//             />
//           </div>

//           {/* Dates */}
//           <div className="sm:col-span-4 space-y-3">
//             <Field label="Issue Date">
//               <input
//                 type="date"
//                 className={INPUT}
//                 value={store.issueDate || ""}
//                 onChange={(e) => store.setField("issueDate", e.target.value)}
//               />
//             </Field>
//             <Field label="Due Date">
//               <input
//                 type="date"
//                 className={INPUT}
//                 value={store.dueDate || ""}
//                 onChange={(e) => store.setField("dueDate", e.target.value)}
//               />
//             </Field>
//             <Field label="PO Number">
//               <input
//                 className={INPUT}
//                 placeholder="Optional"
//                 value={store.poNumber}
//                 onChange={(e) => store.setField("poNumber", e.target.value)}
//               />
//             </Field>
//           </div>
//         </div>

//         <div className="border-t" style={{ borderColor: "rgba(25,25,112,0.08)" }} />

//         {/* Bill To / Ship To */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//           <div className="space-y-2">
//             {/* Amber accent bar */}
//             <div className="w-8 h-[3px] rounded-full" style={{ background: "#FFC107" }} />
//             <Field label="Bill To">
//               <input
//                 className={INPUT}
//                 placeholder="Client name"
//                 value={store.clientName}
//                 onChange={(e) => store.setField("clientName", e.target.value)}
//               />
//             </Field>
//             <textarea
//               className={cn(INPUT, "resize-none")}
//               placeholder="Client address..."
//               rows={2}
//               value={store.clientAddress}
//               onChange={(e) => store.setField("clientAddress", e.target.value)}
//             />
//           </div>

//           <div className="space-y-2">
//             <div
//               className="w-8 h-[3px] rounded-full"
//               style={{ background: "rgba(25,25,112,0.15)" }}
//             />
//             <Field label="Ship To (Optional)">
//               <input
//                 className={INPUT}
//                 placeholder="Shipping address..."
//                 onChange={(e) => store.setField("shipTo", e.target.value)}
//               />
//             </Field>
//           </div>
//         </div>

//         <div className="border-t" style={{ borderColor: "rgba(25,25,112,0.08)" }} />

//         {/* Line Items */}
//         <LineItemsTable currency={selectedCurrency.symbol} showDiscount />

//         {/* Notes + Totals */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">

//           {/* Left: Notes, Terms, Signature */}
//           <div className="space-y-4">
//             <Field label="Notes">
//               <textarea
//                 className={cn(INPUT, "resize-none min-h-[80px]")}
//                 placeholder="Payment instructions, thank you note..."
//                 value={store.notes}
//                 onChange={(e) => store.setField("notes", e.target.value)}
//               />
//             </Field>
//             <Field label="Terms">
//               <textarea
//                 className={cn(INPUT, "resize-none min-h-[60px]")}
//                 placeholder="Terms & conditions..."
//                 value={store.terms}
//                 onChange={(e) => store.setField("terms", e.target.value)}
//               />
//             </Field>
//             <Field label="Signature / Stamp">
//               <LogoUpload
//                 value={store.stampUrl}
//                 onChange={(val) => store.setField("stampUrl", val)}
//                 className="min-h-[90px]"
//               />
//             </Field>
//           </div>

//           {/* Right: Totals */}
//           <div className="space-y-3">
//             {/* Subtotal */}
//             <div
//               className="flex justify-between text-sm"
//               style={{ color: "rgba(25,25,112,0.55)" }}
//             >
//               <span>Subtotal</span>
//               <span className="font-mono font-semibold">
//                 {selectedCurrency.symbol} {subtotal.toFixed(2)}
//               </span>
//             </div>

//             {/* Overall Discount */}
//             <div className="flex justify-between items-center gap-3">
//               <span className="text-sm" style={{ color: "rgba(25,25,112,0.55)" }}>
//                 Overall Discount
//               </span>
//               <div
//                 className="flex items-center gap-1.5 rounded-xl px-2.5 py-1 border"
//                 style={{
//                   background: "#fff",
//                   borderColor: "rgba(25,25,112,0.12)",
//                 }}
//               >
//                 <input
//                   type="text"
//                   inputMode="numeric"
//                   min={0}
//                   max={100}
//                   className="w-12 text-right text-sm font-mono font-bold outline-none bg-transparent"
//                   style={{ color: "#191970" }}
//                   value={store.overallDiscount}
//                   onChange={(e) =>
//                     store.setField(
//                       "overallDiscount",
//                       parseFloat(e.target.value) || 0,
//                     )
//                   }
//                 />
//                 <Percent size={11} style={{ color: "rgba(25,25,112,0.35)" }} />
//               </div>
//             </div>

//             {overallDiscountVal > 0 && (
//               <div className="flex justify-between text-sm font-semibold text-emerald-600">
//                 <span>Discount ({store.overallDiscount}%)</span>
//                 <span className="font-mono">
//                   − {selectedCurrency.symbol} {overallDiscountVal.toFixed(2)}
//                 </span>
//               </div>
//             )}

//             {/* Tax selector */}
//             <div className="flex justify-between items-center gap-3">
//               <div className="relative" ref={taxDropdownRef}>
//                 <button
//                   type="button"
//                   onClick={() => setShowTaxDrop(!showTaxDrop)}
//                   className="flex items-center gap-1.5 text-sm transition-all"
//                   style={{ color: "rgba(25,25,112,0.55)" }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.color = "#FFC107";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.color = "rgba(25,25,112,0.55)";
//                   }}
//                 >
//                   <span>{taxType}</span>
//                   {taxType !== "None" && (
//                     <span
//                       className="text-xs font-mono font-bold px-1.5 py-0.5 rounded-lg"
//                       style={{
//                         background: "rgba(255,193,7,0.15)",
//                         color: "#191970",
//                       }}
//                     >
//                       {store.taxRate}%
//                     </span>
//                   )}
//                   <ChevronDown
//                     size={11}
//                     className={cn("transition-transform", showTaxDrop && "rotate-180")}
//                   />
//                 </button>

//                 {showTaxDrop && (
//                   <div
//                     className="absolute left-0 bottom-full mb-2 rounded-xl shadow-2xl border z-50 w-44 max-h-56 overflow-y-auto custom-scrollbar"
//                     style={{
//                       background: "#fff",
//                       borderColor: "rgba(25,25,112,0.1)",
//                     }}
//                   >
//                     {TAX_TYPES.map((t) => (
//                       <button
//                         key={t.label}
//                         type="button"
//                         onClick={() => {
//                           handleTaxChange(t.rate, t.label);
//                           setShowTaxDrop(false);
//                         }}
//                         className={cn(
//                           "w-full text-left px-4 py-2.5 text-xs flex justify-between transition-all",
//                           t.label === taxType ? "font-black" : "text-[#191970]",
//                         )}
//                         style={{
//                           color: t.label === taxType ? "#191970" : undefined,
//                           background:
//                             t.label === taxType
//                               ? "rgba(255,193,7,0.1)"
//                               : undefined,
//                         }}
//                         onMouseEnter={(e) => {
//                           if (t.label !== taxType)
//                             e.currentTarget.style.background = "#ECEFF1";
//                         }}
//                         onMouseLeave={(e) => {
//                           if (t.label !== taxType)
//                             e.currentTarget.style.background = "transparent";
//                         }}
//                       >
//                         <span>{t.label}</span>
//                         {t.label !== "None" && t.label !== "Custom" && (
//                           <span style={{ color: "rgba(25,25,112,0.4)" }}>
//                             {t.rate}%
//                           </span>
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <span
//                 className="text-sm font-mono font-semibold"
//                 style={{ color: "rgba(25,25,112,0.55)" }}
//               >
//                 {selectedCurrency.symbol} {taxVal.toFixed(2)}
//               </span>
//             </div>

//             {/* Divider */}
//             <div
//               className="border-t-2 pt-3"
//               style={{ borderColor: "#191970" }}
//             />

//             {/* Grand Total */}
//             <div className="flex justify-between items-center">
//               <span className="font-black text-base" style={{ color: "#191970" }}>
//                 Total
//               </span>
//               <span
//                 className="font-black text-base font-mono px-3 py-1 rounded-xl"
//                 style={{
//                   color: "#191970",
//                   background: "rgba(255,193,7,0.15)",
//                 }}
//               >
//                 {selectedCurrency.symbol} {store.totalAmount.toFixed(2)}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ══ FOOTER BAR ══════════════════════════════════════════════════ */}
//       <div
//         className="px-4 sm:px-6 py-3.5 flex items-center justify-between"
//         style={{
//           background: "#191970",
//           borderTop: "none",
//         }}
//       >
//         <div>
//           <p
//             className="text-[9px] uppercase tracking-widest font-black mb-0.5"
//             style={{ color: "rgba(255,255,255,0.35)" }}
//           >
//             Pricing Summary
//           </p>
//           <p className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
//             {store.currency} &middot;{" "}
//             {store.overallDiscount > 0 ? (
//               <span style={{ color: "#FFC107" }}>
//                 {store.overallDiscount}% Off (−{overallDiscountVal.toFixed(2)})
//               </span>
//             ) : (
//               "No Discount"
//             )}
//           </p>
//         </div>

//         <div
//           className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-mono font-bold"
//           style={{
//             background: "rgba(255,255,255,0.07)",
//             borderColor: "rgba(255,255,255,0.12)",
//             color: "rgba(255,255,255,0.6)",
//           }}
//         >
//           <span
//             className="w-1.5 h-1.5 rounded-full"
//             style={{ background: "#FFC107", boxShadow: "0 0 6px #FFC107" }}
//           />
//           #{store.invoiceNumber}
//         </div>
//       </div>
//     </form>
//   );
// }














"use client";

import useInvoiceForm from "@/hooks/useInvoiceForm";
import Field from "../ui/field";
import { ChevronDown, Percent, Hash, Calendar } from "lucide-react";
import { CURRENCIES, SI, TAX_TYPES } from "@/constant/data";
import { LogoUpload } from "./logo-upload";
import { cn } from "@/lib/utils";
import { LineItemsTable } from "./line-items-table";

// ─────────────────────────────────────────────
//  COLOR THEME  (60 · 30 · 10)
//  60% → #ECEFF1  background
//  30% → #191970  midnight blue
//  10% → #FFC107  amber accent
// ─────────────────────────────────────────────

const INPUT =
  "w-full bg-white border border-[#191970]/10 rounded-xl px-3 py-2.5 text-sm text-[#191970] font-medium " +
  "placeholder:text-[#191970]/30 outline-none focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 transition-all";

// ── Custom Date Input with amber calendar icon ──────────────────────────────
function DateInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full">
      {/* Amber calendar icon on left */}
      <div
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center"
        style={{ color: "#FFC107" }}
      >
        <Calendar size={15} strokeWidth={2.5} />
      </div>

      <input
        type="date"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={
          "w-full bg-white border border-[#191970]/10 rounded-xl pl-9 pr-3 py-2.5 " +
          "text-sm text-[#191970] font-medium outline-none transition-all " +
          "focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 " +
          "[color-scheme:light] cursor-pointer"
        }
      />

      {/* Style native date picker icon to match theme */}
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          border-radius: 4px;
          opacity: 0.7;
          filter: invert(14%) sepia(80%) saturate(800%) hue-rotate(215deg) brightness(90%);
          transition: opacity 0.2s;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
          filter: invert(75%) sepia(60%) saturate(500%) hue-rotate(5deg) brightness(105%);
        }
        input[type="date"]::-webkit-inner-spin-button {
          display: none;
        }
        input[type="date"]::-webkit-clear-button {
          display: none;
        }
      `}</style>
    </div>
  );
}

export function InvoiceForm() {
  const {
    showCurrencyDrop,
    taxType,
    showTaxDrop,
    subtotal,
    overallDiscountVal,
    taxVal,
    dropdownRef,
    taxDropdownRef,
    selectedCurrency,
    store,
    setShowCurrencyDrop,
    setShowTaxDrop,
    handleTaxChange,
  } = useInvoiceForm();

  return (
    <form
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(25,25,112,0.08)",
        boxShadow: "0 4px 24px rgba(25,25,112,0.07)",
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      {/* ══ HEADER BAR ══════════════════════════════════════════════════ */}
    <div
  className="px-2 sm:px-8 py-3.5 flex items-center justify-between gap-2 sm:gap-3 flex-wrap min-[400px]:flex-nowrap"
  style={{ background: "#191970" }}
>
  {/* 1. Invoice # Section */}
  <div
    className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-white/10 bg-white/5 transition-all focus-within:border-amber-400/50 order-1"
  >
    <Hash size={12} className="text-amber-400 flex-shrink-0" />
    <input
      type="text"
      inputMode="numeric"
      placeholder="#"
      className="bg-transparent border-none outline-none text-white font-black text-sm sm:text-base w-12 sm:w-24 appearance-none placeholder:text-white/20"
      value={store.invoiceNumber === 0 ? "" : store.invoiceNumber}
      onChange={(e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) {
          store.setField("invoiceNumber", val === "" ? 0 : parseInt(val));
        }
      }}
    />
  </div>

  {/* 2. Center Text - Hidden on very small screens to save space, or scaled down */}
  <span className="order-2 text-sm sm:text-2xl font-black tracking-[0.1em] sm:tracking-[0.2em] text-white/90 uppercase text-center flex-1 min-[400px]:flex-none">
    <span className="hidden min-[340px]:inline">INVOICE</span>
  </span>

  {/* 3. Currency Dropdown */}
  <div className="relative order-3" ref={dropdownRef}>
    <button
      type="button"
      onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
      className="flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-1.5 rounded-lg border border-white/10 text-white bg-white/5 hover:bg-amber-400/10 hover:border-amber-400/40 transition-all"
    >
      <span className="text-amber-400">{selectedCurrency.symbol}</span>
      <span className="hidden min-[380px]:inline">{selectedCurrency.code}</span>
      <ChevronDown
        size={10}
        className={cn("transition-transform", showCurrencyDrop && "rotate-180")}
      />
    </button>

    {showCurrencyDrop && (
      <div
        className="absolute right-0 top-full mt-2 rounded-xl shadow-2xl border z-50 w-52 sm:w-60 overflow-hidden bg-white"
        style={{ borderColor: "rgba(25,25,112,0.1)" }}
      >
        <div className="max-h-48 sm:max-h-56 overflow-y-auto custom-scrollbar">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                store.setField("currency", c.code);
                setShowCurrencyDrop(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2.5 text-[11px] sm:text-xs flex justify-between items-center transition-all border-b last:border-none border-black/5 hover:bg-gray-100",
                c.code === store.currency ? "bg-amber-400/10 text-[#191970] font-black" : "text-[#191970]"
              )}
            >
              <div className="min-w-0">
                <p className="truncate">{c.label}</p>
                <p className="text-[9px] opacity-40 uppercase">{c.code}</p>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-navy-900/5 ml-2">
                {c.symbol}
              </span>
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
</div>
      {/* ══ BODY ════════════════════════════════════════════════════════ */}
      <div
        className="p-4 sm:p-8 space-y-6 sm:space-y-8"
        style={{ background: "#ECEFF1" }}
      >
        {/* Logo + From + Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
          {/* Logo */}
          <div className="sm:col-span-3">
            <Field label="Logo">
              <LogoUpload value={store.logoDataUrl} onChange={store.setLogo} />
            </Field>
          </div>

          {/* From */}
          <div className="sm:col-span-5 space-y-3">
            <Field label="From">
              <input
                className={INPUT}
                placeholder="Your business name"
                value={store.businessName}
                onChange={(e) => store.setField("businessName", e.target.value)}
              />
            </Field>
            <textarea
              className={cn(INPUT, "resize-none")}
              placeholder="Address, phone, email..."
              rows={3}
              value={store.bussinessInfo}
              onChange={(e) => store.setField("bussinessInfo", e.target.value)}
            />
          </div>

          {/* Dates */}
          <div className="sm:col-span-4 space-y-3">
            <Field label="Issue Date">
              <DateInput
                value={store.issueDate || ""}
                onChange={(v) => store.setField("issueDate", v)}
              />
            </Field>
            <Field label="Due Date">
              <DateInput
                value={store.dueDate || ""}
                onChange={(v) => store.setField("dueDate", v)}
              />
            </Field>
            <Field label="PO Number">
              <input
                className={INPUT}
                placeholder="Optional"
                value={store.poNumber}
                onChange={(e) => store.setField("poNumber", e.target.value)}
              />
            </Field>
          </div>
        </div>

        <div
          className="border-t"
          style={{ borderColor: "rgba(25,25,112,0.08)" }}
        />

        {/* Bill To / Ship To */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <div
              className="w-8 h-[3px] rounded-full"
              style={{ background: "#FFC107" }}
            />
            <Field label="Bill To">
              <input
                className={INPUT}
                placeholder="Client name"
                value={store.clientName}
                onChange={(e) => store.setField("clientName", e.target.value)}
              />
            </Field>
            <textarea
              className={cn(INPUT, "resize-none")}
              placeholder="Client address..."
              rows={2}
              value={store.clientAddress}
              onChange={(e) => store.setField("clientAddress", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div
              className="w-8 h-[3px] rounded-full"
              style={{ background: "rgba(25,25,112,0.15)" }}
            />
            <Field label="Ship To (Optional)">
              <input
                className={INPUT}
                placeholder="Shipping address..."
                onChange={(e) => store.setField("shipTo", e.target.value)}
              />
            </Field>
          </div>
        </div>

        <div
          className="border-t"
          style={{ borderColor: "rgba(25,25,112,0.08)" }}
        />

        {/* Line Items */}
        <LineItemsTable currency={selectedCurrency.symbol} showDiscount />

        {/* Notes + Totals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {/* Left */}
          <div className="space-y-4">
            <Field label="Notes">
              <textarea
                className={cn(INPUT, "resize-none min-h-[80px]")}
                placeholder="Payment instructions, thank you note..."
                value={store.notes}
                onChange={(e) => store.setField("notes", e.target.value)}
              />
            </Field>
            <Field label="Terms">
              <textarea
                className={cn(INPUT, "resize-none min-h-[60px]")}
                placeholder="Terms & conditions..."
                value={store.terms}
                onChange={(e) => store.setField("terms", e.target.value)}
              />
            </Field>
            <Field label="Signature / Stamp">
              <LogoUpload
                value={store.stampUrl}
                onChange={(val) => store.setField("stampUrl", val)}
                className="min-h-[90px]"
              />
            </Field>
          </div>

          {/* Right: Totals */}
          <div className="space-y-3">
            <div
              className="flex justify-between text-sm"
              style={{ color: "rgba(25,25,112,0.55)" }}
            >
              <span>Subtotal</span>
              <span className="font-mono font-semibold">
                {selectedCurrency.symbol} {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center gap-3">
              <span
                className="text-sm"
                style={{ color: "rgba(25,25,112,0.55)" }}
              >
                Overall Discount
              </span>
              <div
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-1 border"
                style={{
                  background: "#fff",
                  borderColor: "rgba(25,25,112,0.12)",
                }}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-12 text-right text-sm font-mono font-bold outline-none bg-transparent"
                  style={{ color: "#191970" }}
                  value={store.overallDiscount}
                  onChange={(e) =>
                    store.setField(
                      "overallDiscount",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                />
                <Percent
                  size={11}
                  style={{ color: "rgba(25,25,112,0.35)" }}
                />
              </div>
            </div>

            {overallDiscountVal > 0 && (
              <div className="flex justify-between text-sm font-semibold text-emerald-600">
                <span>Discount ({store.overallDiscount}%)</span>
                <span className="font-mono">
                  − {selectedCurrency.symbol} {overallDiscountVal.toFixed(2)}
                </span>
              </div>
            )}

            {/* Tax */}
            <div className="flex justify-between items-center gap-3">
              <div className="relative" ref={taxDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowTaxDrop(!showTaxDrop)}
                  className="flex items-center gap-1.5 text-sm transition-all"
                  style={{ color: "rgba(25,25,112,0.55)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#FFC107";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(25,25,112,0.55)";
                  }}
                >
                  <span>{taxType}</span>
                  {taxType !== "None" && (
                    <span
                      className="text-xs font-mono font-bold px-1.5 py-0.5 rounded-lg"
                      style={{
                        background: "rgba(255,193,7,0.15)",
                        color: "#191970",
                      }}
                    >
                      {store.taxRate}%
                    </span>
                  )}
                  <ChevronDown
                    size={11}
                    className={cn(
                      "transition-transform",
                      showTaxDrop && "rotate-180",
                    )}
                  />
                </button>

                {showTaxDrop && (
                  <div
                    className="absolute left-0 bottom-full mb-2 rounded-xl shadow-2xl border z-50 w-44 max-h-56 overflow-y-auto custom-scrollbar"
                    style={{
                      background: "#fff",
                      borderColor: "rgba(25,25,112,0.1)",
                    }}
                  >
                    {TAX_TYPES.map((t) => (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => {
                          handleTaxChange(t.rate, t.label);
                          setShowTaxDrop(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs flex justify-between transition-all"
                        style={{
                          color: "#191970",
                          background:
                            t.label === taxType
                              ? "rgba(255,193,7,0.1)"
                              : undefined,
                          fontWeight: t.label === taxType ? 800 : undefined,
                        }}
                        onMouseEnter={(e) => {
                          if (t.label !== taxType)
                            e.currentTarget.style.background = "#ECEFF1";
                        }}
                        onMouseLeave={(e) => {
                          if (t.label !== taxType)
                            e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <span>{t.label}</span>
                        {t.label !== "None" && t.label !== "Custom" && (
                          <span style={{ color: "rgba(25,25,112,0.4)" }}>
                            {t.rate}%
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span
                className="text-sm font-mono font-semibold"
                style={{ color: "rgba(25,25,112,0.55)" }}
              >
                {selectedCurrency.symbol} {taxVal.toFixed(2)}
              </span>
            </div>

            <div
              className="border-t-2 pt-3"
              style={{ borderColor: "#191970" }}
            />

            {/* Grand Total */}
            <div className="flex justify-between items-center">
              <span
                className="font-black text-base"
                style={{ color: "#191970" }}
              >
                Total
              </span>
              <span
                className="font-black text-base font-mono px-4 py-1.5 rounded-xl"
                style={{
                  color: "#191970",
                  background: "rgba(255,193,7,0.18)",
                  border: "1px solid rgba(255,193,7,0.3)",
                }}
              >
                {selectedCurrency.symbol} {store.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ FOOTER BAR ══════════════════════════════════════════════════ */}
      <div
        className="px-4 sm:px-6 py-3.5 flex items-center justify-between"
        style={{ background: "#191970" }}
      >
        <div>
          <p
            className="text-[9px] uppercase tracking-widest font-black mb-0.5"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Summary
          </p>
          <p
            className="text-[11px] font-semibold"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {store.currency} &middot;{" "}
            {store.overallDiscount > 0 ? (
              <span style={{ color: "#FFC107" }}>
                {store.overallDiscount}% Off (−{overallDiscountVal.toFixed(2)})
              </span>
            ) : (
              "No Discount"
            )}
          </p>
        </div>

        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-mono font-bold"
          style={{
            background: "rgba(255,255,255,0.07)",
            borderColor: "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#FFC107", boxShadow: "0 0 6px #FFC107" }}
          />
          #{store.invoiceNumber}
        </div>
      </div>
    </form>
  );
}





// "use client";

// import useInvoiceForm from "@/hooks/useInvoiceForm";
// import Field from "../ui/field";
// import { ChevronDown, Percent, Hash, Calendar } from "lucide-react";
// import { CURRENCIES, SI, TAX_TYPES } from "@/constant/data";
// import { LogoUpload } from "./logo-upload";
// import { cn } from "@/lib/utils";
// import { LineItemsTable } from "./line-items-table";

// // ─────────────────────────────────────────────
// //  COLOR THEME  (60 · 30 · 10)
// //  60% → #ECEFF1  background
// //  30% → #191970  midnight blue
// //  10% → #FFC107  amber accent
// // ─────────────────────────────────────────────

// const INPUT =
//   "w-full bg-white border border-[#191970]/10 rounded-xl px-3 py-2.5 text-sm text-[#191970] font-medium " +
//   "placeholder:text-[#191970]/30 outline-none focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 transition-all";

// // ── Custom Date Input with amber calendar icon ──────────────────────────────
// function DateInput({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (v: string) => void;
// }) {
//   return (
//     <div className="relative w-full">
//       {/* Amber calendar icon on left */}
//       <div
//         className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center"
//         style={{ color: "#FFC107" }}
//       >
//         <Calendar size={15} strokeWidth={2.5} />
//       </div>

//       <input
//         type="date"
//         value={value || ""}
//         onChange={(e) => onChange(e.target.value)}
//         className={
//           "w-full bg-white border border-[#191970]/10 rounded-xl pl-9 pr-3 py-2.5 " +
//           "text-sm text-[#191970] font-medium outline-none transition-all " +
//           "focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 " +
//           "[color-scheme:light] cursor-pointer"
//         }
//       />

//       {/* Style native date picker icon to match theme */}
//       <style>{`
//         input[type="date"]::-webkit-calendar-picker-indicator {
//           cursor: pointer;
//           border-radius: 4px;
//           opacity: 0.7;
//           filter: invert(14%) sepia(80%) saturate(800%) hue-rotate(215deg) brightness(90%);
//           transition: opacity 0.2s;
//         }
//         input[type="date"]::-webkit-calendar-picker-indicator:hover {
//           opacity: 1;
//           filter: invert(75%) sepia(60%) saturate(500%) hue-rotate(5deg) brightness(105%);
//         }
//         input[type="date"]::-webkit-inner-spin-button {
//           display: none;
//         }
//         input[type="date"]::-webkit-clear-button {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// }

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
//       className="rounded-2xl overflow-hidden"
//       style={{
//         background: "#ffffff",
//         border: "1px solid rgba(25,25,112,0.08)",
//         boxShadow: "0 4px 24px rgba(25,25,112,0.07)",
//       }}
//       onSubmit={(e) => e.preventDefault()}
//     >
//       {/* ══ HEADER BAR ══════════════════════════════════════════════════ */}
//       <div
//         className="px-2 sm:px-8 py-3.5 flex items-center justify-between gap-2 sm:gap-3 flex-wrap min-[400px]:flex-nowrap"
//         style={{ background: "#191970" }}
//       >
//         {/* 1. Invoice # Section */}
//         <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-white/10 bg-white/5 transition-all focus-within:border-amber-400/50 order-1">
//           <Hash size={12} className="text-amber-400 flex-shrink-0" />
//           <input
//             type="text"
//             inputMode="numeric"
//             placeholder="#"
//             className="bg-transparent border-none outline-none text-white font-black text-sm sm:text-base w-12 sm:w-24 appearance-none placeholder:text-white/20"
//             value={store.invoiceNumber === 0 ? "" : store.invoiceNumber}
//             onChange={(e) => {
//               const val = e.target.value;
//               if (/^\d*$/.test(val)) {
//                 store.setField("invoiceNumber", val === "" ? 0 : parseInt(val));
//               }
//             }}
//           />
//         </div>

//         {/* 2. Center Text - Hidden on very small screens to save space, or scaled down */}
//         <span className="order-2 text-sm sm:text-2xl font-black tracking-[0.1em] sm:tracking-[0.2em] text-white/90 uppercase text-center flex-1 min-[400px]:flex-none">
//           <span className="hidden min-[340px]:inline">INVOICE</span>
//         </span>

//         {/* 3. Currency Dropdown */}
//         <div className="relative order-3" ref={dropdownRef}>
//           <button
//             type="button"
//             onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
//             className="flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-1.5 rounded-lg border border-white/10 text-white bg-white/5 hover:bg-amber-400/10 hover:border-amber-400/40 transition-all"
//           >
//             <span className="text-amber-400">{selectedCurrency.symbol}</span>
//             <span className="hidden min-[380px]:inline">
//               {selectedCurrency.code}
//             </span>
//             <ChevronDown
//               size={10}
//               className={cn(
//                 "transition-transform",
//                 showCurrencyDrop && "rotate-180",
//               )}
//             />
//           </button>

//           {showCurrencyDrop && (
//             <div
//               className="absolute right-0 top-full mt-2 rounded-xl shadow-2xl border z-50 w-52 sm:w-60 overflow-hidden bg-white"
//               style={{ borderColor: "rgba(25,25,112,0.1)" }}
//             >
//               <div className="max-h-48 sm:max-h-56 overflow-y-auto custom-scrollbar">
//                 {CURRENCIES.map((c) => (
//                   <button
//                     key={c.code}
//                     type="button"
//                     onClick={() => {
//                       store.setField("currency", c.code);
//                       setShowCurrencyDrop(false);
//                     }}
//                     className={cn(
//                       "w-full text-left px-4 py-2.5 text-[11px] sm:text-xs flex justify-between items-center transition-all border-b last:border-none border-black/5 hover:bg-gray-100",
//                       c.code === store.currency
//                         ? "bg-amber-400/10 text-[#191970] font-black"
//                         : "text-[#191970]",
//                     )}
//                   >
//                     <div className="min-w-0">
//                       <p className="truncate">{c.label}</p>
//                       <p className="text-[9px] opacity-40 uppercase">
//                         {c.code}
//                       </p>
//                     </div>
//                     <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-navy-900/5 ml-2">
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
//       <div
//         className="p-4 sm:p-8 space-y-6 sm:space-y-8"
//         style={{ background: "#ECEFF1" }}
//       >
//         {/* Logo + From + Dates */}
//         <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
//           {/* Logo */}
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
//               <DateInput
//                 value={store.issueDate || ""}
//                 onChange={(v) => store.setField("issueDate", v)}
//               />
//             </Field>
//             <Field label="Due Date">
//               <DateInput
//                 value={store.dueDate || ""}
//                 onChange={(v) => store.setField("dueDate", v)}
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

//         <div
//           className="border-t"
//           style={{ borderColor: "rgba(25,25,112,0.08)" }}
//         />

//         {/* Bill To / Ship To */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//           <div className="space-y-2">
//             <div
//               className="w-8 h-[3px] rounded-full"
//               style={{ background: "#FFC107" }}
//             />
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

//         <div
//           className="border-t"
//           style={{ borderColor: "rgba(25,25,112,0.08)" }}
//         />

//         {/* Line Items */}
//         <LineItemsTable currency={selectedCurrency.symbol} showDiscount />

//         {/* Notes + Totals */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
//           {/* Left */}
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
//             <div
//               className="flex justify-between text-sm"
//               style={{ color: "rgba(25,25,112,0.55)" }}
//             >
//               <span>Subtotal</span>
//               <span className="font-mono font-semibold">
//                 {selectedCurrency.symbol} {subtotal.toFixed(2)}
//               </span>
//             </div>

//             <div className="flex justify-between items-center gap-3">
//               <span
//                 className="text-sm"
//                 style={{ color: "rgba(25,25,112,0.55)" }}
//               >
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

//             {/* Tax */}
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
//                     className={cn(
//                       "transition-transform",
//                       showTaxDrop && "rotate-180",
//                     )}
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
//                         className="w-full text-left px-4 py-2.5 text-xs flex justify-between transition-all"
//                         style={{
//                           color: "#191970",
//                           background:
//                             t.label === taxType
//                               ? "rgba(255,193,7,0.1)"
//                               : undefined,
//                           fontWeight: t.label === taxType ? 800 : undefined,
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

//             <div
//               className="border-t-2 pt-3"
//               style={{ borderColor: "#191970" }}
//             />

//             {/* Grand Total */}
//             <div className="flex justify-between items-center">
//               <span
//                 className="font-black text-base"
//                 style={{ color: "#191970" }}
//               >
//                 Total
//               </span>
//               <span
//                 className="font-black text-base font-mono px-4 py-1.5 rounded-xl"
//                 style={{
//                   color: "#191970",
//                   background: "rgba(255,193,7,0.18)",
//                   border: "1px solid rgba(255,193,7,0.3)",
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
//         style={{ background: "#191970" }}
//       >
//         <div>
//           <p
//             className="text-[9px] uppercase tracking-widest font-black mb-0.5"
//             style={{ color: "rgba(255,255,255,0.3)" }}
//           >
//             Summary
//           </p>
//           <p
//             className="text-[11px] font-semibold"
//             style={{ color: "rgba(255,255,255,0.6)" }}
//           >
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
//             color: "rgba(255,255,255,0.55)",
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

// "use client";

// import useInvoiceForm from "@/hooks/useInvoiceForm";
// import Field from "../ui/field";
// import { ChevronDown, Percent, Hash, Calendar } from "lucide-react";
// import { CURRENCIES, SI, TAX_TYPES } from "@/constant/data";
// import { LogoUpload } from "./logo-upload";
// import { cn } from "@/lib/utils";
// import { LineItemsTable } from "./line-items-table";

// // ─────────────────────────────────────────────
// //  COLOR THEME  (60 · 30 · 10)
// //  60% → #ECEFF1  background
// //  30% → #191970  midnight blue
// //  10% → #FFC107  amber accent
// //
// //  CONTRAST-SAFE COLORS (all pass 4.5:1 on their backgrounds):
// //  On #ECEFF1 bg  → use #3D3D6B  (was rgba(25,25,112,0.55) ≈ #7878A9 → FAIL)
// //  On #191970 bg  → use rgba(255,255,255,0.75)+ for small text
// //  Footer summary → use #B0B0D0  (was rgba(255,255,255,0.6) → FAIL on #191970)
// //  Footer label   → use #8888B8  (was rgba(255,255,255,0.3) → FAIL)
// // ─────────────────────────────────────────────

// // INPUT variable mein placeholder color update karein
// const INPUT =
//   "w-full bg-white border border-[#191970]/10 rounded-xl px-3 py-2.5 text-sm text-[#191970] font-medium " +
//   "placeholder:text-[#707070] outline-none focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 transition-all";

// // ── Custom Date Input with amber calendar icon ──────────────────────────────
// function DateInput({
//   name,
//   value,
//   onChange,
// }: {
//   name: string;
//   value: string;
//   onChange: (v: string) => void;
// }) {
//   return (
//     <div className="relative w-full">
//       <div
//         className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center"
//         style={{ color: "#FFC107" }}
//       >
//         <Calendar size={15} strokeWidth={2.5} />
//       </div>

//       <input
//         name={name}
//         type="date"
//         value={value || ""}
//         onChange={(e) => onChange(e.target.value)}
//         aria-label={name === "issueDate" ? "Issue Date" : "Due Date"}
//         className={
//           "w-full bg-white border border-[#191970]/10 rounded-xl pl-9 pr-3 py-2.5 " +
//           "text-sm text-[#191970] font-medium outline-none transition-all " +
//           "focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 " +
//           "[color-scheme:light] cursor-pointer"
//         }
//       />

//       <style>{`
//         input[type="date"]::-webkit-calendar-picker-indicator {
//           cursor: pointer;
//           border-radius: 4px;
//           opacity: 0.7;
//           filter: invert(14%) sepia(80%) saturate(800%) hue-rotate(215deg) brightness(90%);
//           transition: opacity 0.2s;
//         }
//         input[type="date"]::-webkit-calendar-picker-indicator:hover {
//           opacity: 1;
//           filter: invert(75%) sepia(60%) saturate(500%) hue-rotate(5deg) brightness(105%);
//         }
//         input[type="date"]::-webkit-inner-spin-button { display: none; }
//         input[type="date"]::-webkit-clear-button { display: none; }
//       `}</style>
//     </div>
//   );
// }

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
//       className="rounded-2xl overflow-hidden"
//       style={{
//         background: "#ffffff",
//         border: "1px solid rgba(25,25,112,0.08)",
//         boxShadow: "0 4px 24px rgba(25,25,112,0.07)",
//       }}
//       onSubmit={(e) => e.preventDefault()}
//       aria-label="Invoice Form"
//     >
//       {/* ══ HEADER BAR ══════════════════════════════════════════════════ */}
//       <div
//         className="px-2 sm:px-8 py-3.5 flex items-center justify-between gap-2 sm:gap-3 flex-wrap min-[400px]:flex-nowrap"
//         style={{ background: "#191970" }}
//       >
//         {/* 1. Invoice # */}
//         <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-white/10 bg-white/5 transition-all focus-within:border-amber-400/50 order-1">
//           <Hash
//             size={12}
//             className="text-amber-400 flex-shrink-0"
//             aria-hidden="true"
//           />
//           <label htmlFor="invoiceNumber" className="sr-only" >
//             Invoice Number
//           </label>
//           <input
//             id="invoiceNumber"
//             name="invoiceNumber"
//             type="text"
//             inputMode="numeric"
//             placeholder="#"
//             aria-label="Invoice Number"
//             className="bg-transparent border-none outline-none text-white font-black text-sm sm:text-base w-12 sm:w-24 appearance-none placeholder:text-white/40"
//             value={store.invoiceNumber === 0 ? "" : store.invoiceNumber}
//             onChange={(e) => {
//               const val = e.target.value;
//               if (/^\d*$/.test(val)) {
//                 store.setField("invoiceNumber", val === "" ? 0 : parseInt(val));
//               }
//             }}
//           />
//         </div>

//         {/* 2. Center Text */}
//         <span className="order-2 text-sm sm:text-2xl font-black tracking-[0.1em] sm:tracking-[0.2em] text-white uppercase text-center flex-1 min-[400px]:flex-none">
//           <span className="hidden min-[340px]:inline">INVOICE</span>
//         </span>

//         {/* 3. Currency Dropdown */}
//         <div className="relative order-3" ref={dropdownRef}>
//           <button
//             type="button"
//             onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
//             aria-haspopup="listbox"
//             aria-expanded={showCurrencyDrop}
//             aria-label={`Currency: ${selectedCurrency.code}`}
//             className="flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-1.5 rounded-lg border border-white/10 text-white bg-white/5 hover:bg-amber-400/10 hover:border-amber-400/40 transition-all"
//           >
//             <span className="text-amber-400">{selectedCurrency.symbol}</span>
//             <span className="hidden min-[380px]:inline">
//               {selectedCurrency.code}
//             </span>
//             <ChevronDown
//               size={10}
//               aria-hidden="true"
//               className={cn(
//                 "transition-transform",
//                 showCurrencyDrop && "rotate-180",
//               )}
//             />
//           </button>

//           {showCurrencyDrop && (
//             <div
//               role="listbox"
//               aria-label="Select Currency"
//               className="absolute right-0 top-full mt-2 rounded-xl shadow-2xl border z-50 w-52 sm:w-60 overflow-hidden bg-white"
//               style={{ borderColor: "rgba(25,25,112,0.1)" }}
//             >
//               <div className="max-h-48 sm:max-h-56 overflow-y-auto custom-scrollbar">
//                 {CURRENCIES.map((c) => (
//                   <button
//                     key={c.code}
//                     type="button"
//                     role="option"
//                     aria-selected={c.code === store.currency}
//                     onClick={() => {
//                       store.setField("currency", c.code);
//                       setShowCurrencyDrop(false);
//                     }}
//                     className={cn(
//                       "w-full text-left px-4 py-2.5 text-[11px] sm:text-xs flex justify-between items-center transition-all border-b last:border-none border-black/5 hover:bg-gray-100",
//                       c.code === store.currency
//                         ? "bg-amber-400/10 text-[#191970] font-black"
//                         : "text-[#191970]",
//                     )}
//                   >
//                     <div className="min-w-0">
//                       <p className="truncate">{c.label}</p>
//                       <p className="text-[9px] text-[#555] uppercase">
//                         {c.code}
//                       </p>
//                     </div>
//                     <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-navy-900/5 ml-2">
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
//       <div
//         className="p-4 sm:p-8 space-y-6 sm:space-y-8"
//         style={{ background: "#ECEFF1" }}
//       >
//         {/* Logo + From + Dates */}
//         <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
//           {/* Logo */}
//           <div className="sm:col-span-3">
//             <Field label="Logo">
//               <LogoUpload value={store.logoDataUrl} onChange={store.setLogo} />
//             </Field>
//           </div>

//           {/* From */}
//           <div className="sm:col-span-5 space-y-3">
//             <Field label="From" htmlFor="businessName">
//               <input
//                 id="businessName" // Zaroori hai htmlFor ke liye
//                 name="businessName"
//                 className={INPUT}
//                 placeholder="Your business name"
//                 aria-label="Business Name"
//                 value={store.businessName}
//                 onChange={(e) => store.setField("businessName", e.target.value)}
//               />
//             </Field>
//             <label htmlFor="businessInfo" className="sr-only">
//               Business Address and Contact Info
//             </label>
//             <textarea
//               name="businessInfo"
//               className={cn(INPUT, "resize-none")}
//               placeholder="Address, phone, email..."
//               rows={3}
//               aria-label="Business Address and Contact Info"
//               value={store.bussinessInfo}
//               onChange={(e) => store.setField("bussinessInfo", e.target.value)}
//             />
//           </div>

//           {/* Dates */}
//           <div className="sm:col-span-4 space-y-3">
//             <Field label="Issue Date" htmlFor="issueDate">
//               <DateInput
//                 name="issueDate"
//                 value={store.issueDate || ""}
//                 onChange={(v) => store.setField("issueDate", v)}
//               />
//             </Field>
//             <Field label="Due Date" htmlFor="dueDate">
//               <DateInput
//                 name="dueDate"
//                 value={store.dueDate || ""}
//                 onChange={(v) => store.setField("dueDate", v)}
//               />
//             </Field>
//             <Field label="PO Number" htmlFor="poNumber">
//               <input
//                 name="poNumber"
//                 className={INPUT}
//                 placeholder="Optional"
//                 aria-label="PO Number"
//                 value={store.poNumber}
//                 onChange={(e) => store.setField("poNumber", e.target.value)}
//               />
//             </Field>
//           </div>
//         </div>

//         <div
//           className="border-t"
//           style={{ borderColor: "rgba(25,25,112,0.08)" }}
//         />

//         {/* Bill To / Ship To */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//           <div className="space-y-2">
//             <div
//               className="w-8 h-[3px] rounded-full"
//               style={{ background: "#FFC107" }}
//             />
//             <Field label="Bill To" htmlFor="clientName">
//               <input
//                 name="clientName"
//                 className={INPUT}
//                 placeholder="Client name"
//                 aria-label="Client Name"
//                 value={store.clientName}
//                 onChange={(e) => store.setField("clientName", e.target.value)}
//               />
//             </Field>
//             <label htmlFor="clientAddress" className="sr-only">
//               Client Address
//             </label>
//             <textarea
//               name="clientAddress"
//               className={cn(INPUT, "resize-none")}
//               placeholder="Client address..."
//               rows={2}
//               aria-label="Client Address"
//               value={store.clientAddress}
//               onChange={(e) => store.setField("clientAddress", e.target.value)}
//             />
//           </div>
//           <div className="space-y-2">
//             <div
//               className="w-8 h-[3px] rounded-full"
//               style={{ background: "rgba(25,25,112,0.15)" }}
//             />
//             <Field label="Ship To (Optional)" htmlFor="shipTo">
//               <input
//                 name="shipTo"
//                 className={INPUT}
//                 placeholder="Shipping address..."
//                 aria-label="Ship To Address"
//                 onChange={(e) => store.setField("shipTo", e.target.value)}
//               />
//             </Field>
//           </div>
//         </div>

//         <div
//           className="border-t"
//           style={{ borderColor: "rgba(25,25,112,0.08)" }}
//         />

//         {/* Line Items */}
//         <LineItemsTable currency={selectedCurrency.symbol} showDiscount />

//         {/* Notes + Totals */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
//           {/* Left */}
//           <div className="space-y-4">
//             <Field label="Notes" htmlFor="notes">
//               <textarea
//                 name="notes"
//                 className={cn(INPUT, "resize-none min-h-[80px]")}
//                 placeholder="Payment instructions, thank you note..."
//                 aria-label="Notes"
//                 value={store.notes}
//                 onChange={(e) => store.setField("notes", e.target.value)}
//               />
//             </Field>
//             <Field label="Terms" htmlFor="terms">
//               <textarea
//                 name="terms"
//                 className={cn(INPUT, "resize-none min-h-[60px]")}
//                 placeholder="Terms & conditions..."
//                 aria-label="Terms and Conditions"
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
//             {/* FIX: was rgba(25,25,112,0.55) = ~#7878A9 on #ECEFF1 → ratio 3.2:1 FAIL
//                 NOW: #3D3D6B on #ECEFF1 → ratio ~5.8:1 PASS */}
//             <div
//               className="flex justify-between text-sm"
//               style={{ color: "#3D3D6B" }}
//             >
//               <span>Subtotal</span>
//               <span className="font-mono font-semibold">
//                 {selectedCurrency.symbol} {subtotal.toFixed(2)}
//               </span>
//             </div>

//             <div className="flex justify-between items-center gap-3">
//               <span className="text-sm" style={{ color: "#3D3D6B" }}>
//                 Overall Discount
//               </span>
//               <div
//                 className="flex items-center gap-1.5 rounded-xl px-2.5 py-1 border"
//                 style={{
//                   background: "#fff",
//                   borderColor: "rgba(25,25,112,0.12)",
//                 }}
//               >
//                 <label htmlFor="overallDiscount" className="sr-only">
//                   Overall Discount Percentage
//                 </label>
//                 <input
//                   name="overallDiscount"
//                   type="text"
//                   inputMode="numeric"
//                   aria-label="Overall Discount Percentage"
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
//                 <Percent
//                   size={11}
//                   style={{ color: "#555" }}
//                   aria-hidden="true"
//                 />
//               </div>
//             </div>

//             {overallDiscountVal > 0 && (
//               <div className="flex justify-between text-sm font-semibold text-emerald-700">
//                 <span>Discount ({store.overallDiscount}%)</span>
//                 <span className="font-mono">
//                   − {selectedCurrency.symbol} {overallDiscountVal.toFixed(2)}
//                 </span>
//               </div>
//             )}

//             {/* Tax */}
//             <div className="flex justify-between items-center gap-3">
//               <div className="relative" ref={taxDropdownRef}>
//                 <button
//                   type="button"
//                   onClick={() => setShowTaxDrop(!showTaxDrop)}
//                   aria-haspopup="listbox"
//                   aria-expanded={showTaxDrop}
//                   aria-label={`Tax type: ${taxType}`}
//                   className="flex items-center gap-1.5 text-sm transition-all font-medium"
//                   style={{ color: "#3D3D6B" }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.color = "#B8860B";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.color = "#3D3D6B";
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
//                     aria-hidden="true"
//                     className={cn(
//                       "transition-transform",
//                       showTaxDrop && "rotate-180",
//                     )}
//                   />
//                 </button>

//                 {showTaxDrop && (
//                   <div
//                     role="listbox"
//                     aria-label="Select Tax Type"
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
//                         role="option"
//                         aria-selected={t.label === taxType}
//                         onClick={() => {
//                           handleTaxChange(t.rate, t.label);
//                           setShowTaxDrop(false);
//                         }}
//                         className="w-full text-left px-4 py-2.5 text-xs flex justify-between transition-all"
//                         style={{
//                           color: "#191970",
//                           background:
//                             t.label === taxType
//                               ? "rgba(255,193,7,0.1)"
//                               : undefined,
//                           fontWeight: t.label === taxType ? 800 : undefined,
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
//                           <span style={{ color: "#3D3D6B" }}>{t.rate}%</span>
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <span
//                 className="text-sm font-mono font-semibold"
//                 style={{ color: "#3D3D6B" }}
//               >
//                 {selectedCurrency.symbol} {taxVal.toFixed(2)}
//               </span>
//             </div>

//             <div
//               className="border-t-2 pt-3"
//               style={{ borderColor: "#191970" }}
//             />

//             {/* Grand Total */}
//             <div className="flex justify-between items-center">
//               <span
//                 className="font-black text-base"
//                 style={{ color: "#191970" }}
//               >
//                 Total
//               </span>
//               <span
//                 className="font-black text-base font-mono px-4 py-1.5 rounded-xl"
//                 style={{
//                   color: "#191970",
//                   background: "rgba(255,193,7,0.18)",
//                   border: "1px solid rgba(255,193,7,0.3)",
//                 }}
//               >
//                 {selectedCurrency.symbol} {store.totalAmount.toFixed(2)}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ══ FOOTER BAR ══════════════════════════════════════════════════ */}
//       {/* FIX: All footer text updated for contrast on #191970 background
//           Old: rgba(255,255,255,0.3) → ratio ~1.6:1 FAIL
//           Old: rgba(255,255,255,0.6) → ratio ~3.2:1 FAIL
//           New: #9999CC → ratio ~4.6:1 PASS  (label)
//           New: #C8C8E8 → ratio ~7.1:1 PASS  (value text) */}
//       <div
//         className="px-4 sm:px-6 py-3.5 flex items-center justify-between"
//         style={{ background: "#191970" }}
//       >
//         <div>
//           <p className="text-[9px] uppercase tracking-widest font-black mb-0.5 text-white">
//             Summary
//           </p>
//           <p className="text-[11px] font-semibold" style={{ color: "#C8C8E8" }}>
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
//             borderColor: "rgba(255,255,255,0.2)",
//             color: "#C8C8E8",
//           }}
//         >
//           <span
//             className="w-1.5 h-1.5 rounded-full"
//             style={{ background: "#FFC107", boxShadow: "0 0 6px #FFC107" }}
//             aria-hidden="true"
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
//
//  CONTRAST-SAFE COLORS (all pass 4.5:1 on their backgrounds):
//  On #ECEFF1 bg  → use #3D3D6B  (was rgba(25,25,112,0.55) ≈ #7878A9 → FAIL)
//  On #191970 bg  → use rgba(255,255,255,0.75)+ for small text
//  Footer summary → use #B0B0D0  (was rgba(255,255,255,0.6) → FAIL on #191970)
//  Footer label   → use #8888B8  (was rgba(255,255,255,0.3) → FAIL)
// ─────────────────────────────────────────────

const INPUT =
  "w-full bg-white border border-[#191970]/10 rounded-xl px-3 py-2.5 text-sm text-[#191970] font-medium " +
  "placeholder:text-[#707070] outline-none focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 transition-all";

// ── Custom Date Input with amber calendar icon ──────────────────────────────
function DateInput({
  name,
  id,
  value,
  onChange,
}: {
  name: string;
  id?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full">
      <div
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center"
        style={{ color: "#FFC107" }}
      >
        <Calendar size={15} strokeWidth={2.5} />
      </div>

      <input
        id={id}
        name={name}
        type="date"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        aria-label={name === "issueDate" ? "Issue Date" : "Due Date"}
        className={
          "w-full bg-white border border-[#191970]/10 rounded-xl pl-9 pr-3 py-2.5 " +
          "text-sm text-[#191970] font-medium outline-none transition-all " +
          "focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 " +
          "[color-scheme:light] cursor-pointer"
        }
      />

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
        input[type="date"]::-webkit-inner-spin-button { display: none; }
        input[type="date"]::-webkit-clear-button { display: none; }
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
      aria-label="Invoice Form"
    >
      {/* ══ HEADER BAR ══════════════════════════════════════════════════ */}
      <div
        className="px-2 sm:px-8 py-3.5 flex items-center justify-between gap-2 sm:gap-3 flex-wrap min-[400px]:flex-nowrap"
        style={{ background: "#191970" }}
      >
        {/* 1. Invoice # */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-white/10 bg-white/5 transition-all focus-within:border-amber-400/50 order-1">
          <Hash
            size={12}
            className="text-amber-400 flex-shrink-0"
            aria-hidden="true"
          />
          <label htmlFor="invoiceNumber" className="sr-only">
            Invoice Number
          </label>
          <input
            id="invoiceNumber"
            name="invoiceNumber"
            type="text"
            inputMode="numeric"
            placeholder="#"
            aria-label="Invoice Number"
            className="bg-transparent border-none outline-none text-white font-black text-sm sm:text-base w-12 sm:w-24 appearance-none placeholder:text-white/40"
            value={store.invoiceNumber === 0 ? "" : store.invoiceNumber}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) {
                store.setField("invoiceNumber", val === "" ? 0 : parseInt(val));
              }
            }}
          />
        </div>

        {/* 2. Center Text */}
        <span className="order-2 text-sm sm:text-2xl font-black tracking-[0.1em] sm:tracking-[0.2em] text-white uppercase text-center flex-1 min-[400px]:flex-none">
          <span className="hidden min-[340px]:inline">INVOICE</span>
        </span>

        {/* 3. Currency Dropdown */}
        <div className="relative order-3" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
            aria-haspopup="listbox"
            aria-expanded={showCurrencyDrop}
            aria-label={`Currency: ${selectedCurrency.code}`}
            className="flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-1.5 rounded-lg border border-white/10 text-white bg-white/5 hover:bg-amber-400/10 hover:border-amber-400/40 transition-all"
          >
            <span className="text-amber-400">{selectedCurrency.symbol}</span>
            <span className="hidden min-[380px]:inline">
              {selectedCurrency.code}
            </span>
            <ChevronDown
              size={10}
              aria-hidden="true"
              className={cn(
                "transition-transform",
                showCurrencyDrop && "rotate-180",
              )}
            />
          </button>

          {showCurrencyDrop && (
            <div
              role="listbox"
              aria-label="Select Currency"
              className="absolute right-0 top-full mt-2 rounded-xl shadow-2xl border z-50 w-52 sm:w-60 overflow-hidden bg-white"
              style={{ borderColor: "rgba(25,25,112,0.1)" }}
            >
              <div className="max-h-48 sm:max-h-56 overflow-y-auto custom-scrollbar">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={c.code === store.currency}
                    onClick={() => {
                      store.setField("currency", c.code);
                      setShowCurrencyDrop(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-[11px] sm:text-xs flex justify-between items-center transition-all border-b last:border-none border-black/5 hover:bg-gray-100",
                      c.code === store.currency
                        ? "bg-amber-400/10 text-[#191970] font-black"
                        : "text-[#191970]",
                    )}
                  >
                    <div className="min-w-0">
                      <p className="truncate">{c.label}</p>
                      <p className="text-[9px] text-[#555] uppercase">
                        {c.code}
                      </p>
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
            <Field label="Logo" htmlFor="logo"> 
              <LogoUpload id="logo" value={store.logoDataUrl} onChange={store.setLogo} />
            </Field>
          </div>

          {/* From */}
          <div className="sm:col-span-5 space-y-3">
            <Field label="From" htmlFor="businessName">
              <input
                id="businessName"
                name="businessName"
                className={INPUT}
                placeholder="Your business name"
                aria-label="Business Name"
                value={store.businessName}
                onChange={(e) => store.setField("businessName", e.target.value)}
              />
            </Field>
            {/* FIX: label + textarea ko id se connect kiya */}
            <label htmlFor="businessInfo" className="sr-only">
              Business Address and Contact Info
            </label>
            <textarea
              id="businessInfo"
              name="businessInfo"
              className={cn(INPUT, "resize-none")}
              placeholder="Address, phone, email..."
              rows={3}
              aria-label="Business Address and Contact Info"
              value={store.bussinessInfo}
              onChange={(e) => store.setField("bussinessInfo", e.target.value)}
            />
          </div>

          {/* Dates */}
          <div className="sm:col-span-4 space-y-3">
            <Field label="Issue Date" htmlFor="issueDate">
              <DateInput
                id="issueDate"
                name="issueDate"
                value={store.issueDate || ""}
                onChange={(v) => store.setField("issueDate", v)}
              />
            </Field>
            <Field label="Due Date" htmlFor="dueDate">
              <DateInput
                id="dueDate"
                name="dueDate"
                value={store.dueDate || ""}
                onChange={(v) => store.setField("dueDate", v)}
              />
            </Field>
            <Field label="PO Number" htmlFor="poNumber">
              <input
                id="poNumber"
                name="poNumber"
                className={INPUT}
                placeholder="Optional"
                aria-label="PO Number"
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
            <Field label="Bill To" htmlFor="clientName">
              <input
                id="clientName"
                name="clientName"
                className={INPUT}
                placeholder="Client name"
                aria-label="Client Name"
                value={store.clientName}
                onChange={(e) => store.setField("clientName", e.target.value)}
              />
            </Field>
            {/* FIX: textarea ko id diya */}
            <label htmlFor="clientAddress" className="sr-only">
              Client Address
            </label>
            <textarea
              id="clientAddress"
              name="clientAddress"
              className={cn(INPUT, "resize-none")}
              placeholder="Client address..."
              rows={2}
              aria-label="Client Address"
              value={store.clientAddress}
              onChange={(e) => store.setField("clientAddress", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div
              className="w-8 h-[3px] rounded-full"
              style={{ background: "rgba(25,25,112,0.15)" }}
            />
            <Field label="Ship To (Optional)" htmlFor="shipTo">
              <input
                id="shipTo"
                name="shipTo"
                className={INPUT}
                placeholder="Shipping address..."
                aria-label="Ship To Address"
                value={store.shipTo ?? ""}
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
            <Field label="Notes" htmlFor="notes">
              <textarea
                id="notes"
                name="notes"
                className={cn(INPUT, "resize-none min-h-[80px]")}
                placeholder="Payment instructions, thank you note..."
                aria-label="Notes"
                value={store.notes}
                onChange={(e) => store.setField("notes", e.target.value)}
              />
            </Field>
            <Field label="Terms" htmlFor="terms">
              <textarea
                id="terms"
                name="terms"
                className={cn(INPUT, "resize-none min-h-[60px]")}
                placeholder="Terms & conditions..."
                aria-label="Terms and Conditions"
                value={store.terms}
                onChange={(e) => store.setField("terms", e.target.value)}
              />
            </Field>
            <Field label="Signature / Stamp" htmlFor="stamp">
              <LogoUpload
                id="stamp"
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
              style={{ color: "#3D3D6B" }}
            >
              <span>Subtotal</span>
              <span className="font-mono font-semibold">
                {selectedCurrency.symbol} {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center gap-3">
              <label
                htmlFor="overallDiscount"
                className="text-sm"
                style={{ color: "#3D3D6B" }}
              >
                Overall Discount
              </label>
              <div
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-1 border"
                style={{
                  background: "#fff",
                  borderColor: "rgba(25,25,112,0.12)",
                }}
              >
                <input
                  id="overallDiscount"
                  name="overallDiscount"
                  type="text"
                  inputMode="numeric"
                  aria-label="Overall Discount Percentage"
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
                  style={{ color: "#555" }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {overallDiscountVal > 0 && (
              <div className="flex justify-between text-sm font-semibold text-emerald-700">
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
                  aria-haspopup="listbox"
                  aria-expanded={showTaxDrop}
                  aria-label={`Tax type: ${taxType}`}
                  className="flex items-center gap-1.5 text-sm transition-all font-medium"
                  style={{ color: "#3D3D6B" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#B8860B";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#3D3D6B";
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
                    aria-hidden="true"
                    className={cn(
                      "transition-transform",
                      showTaxDrop && "rotate-180",
                    )}
                  />
                </button>

                {showTaxDrop && (
                  <div
                    role="listbox"
                    aria-label="Select Tax Type"
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
                        role="option"
                        aria-selected={t.label === taxType}
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
                          <span style={{ color: "#3D3D6B" }}>{t.rate}%</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span
                className="text-sm font-mono font-semibold"
                style={{ color: "#3D3D6B" }}
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
          <p className="text-[9px] uppercase tracking-widest font-black mb-0.5 text-white">
            Summary
          </p>
          <p className="text-[11px] font-semibold" style={{ color: "#C8C8E8" }}>
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
            borderColor: "rgba(255,255,255,0.2)",
            color: "#C8C8E8",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#FFC107", boxShadow: "0 0 6px #FFC107" }}
            aria-hidden="true"
          />
          #{store.invoiceNumber}
        </div>
      </div>
    </form>
  );
}
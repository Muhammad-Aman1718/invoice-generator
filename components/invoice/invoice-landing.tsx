// "use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X, Hash, Percent } from "lucide-react";
// import { supabase } from "@/lib/supabase/client";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(
//     subtotal,
//     store.taxRate,
//     store.overallDiscount,
//   );

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };
//   const handleSave = async () => {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();

//     if (session) {
//       const result = await saveInvoiceToDb(store);
//       if (result) {
//         window.location.href = "/dashboard/invoices/new";
//       } else {
//         alert("Error saving invoice.");
//       }
//     } else {
//       // Save to LocalStorage
//       localStorage.setItem("pending_invoice", JSON.stringify(store));
//       console.log("Invoice saved to localStorage for later:", store);
//       // Redirect to Login with encoded params
//       const returnPath = "/dashboard/invoices/new";
//       const loginUrl = new URL("/auth/login", window.location.origin);
//       loginUrl.searchParams.set("next", returnPath);
//       loginUrl.searchParams.set("action", "save_pending");

//       window.location.href = loginUrl.toString();
//     }
//   };
//   return (
//     // 60% background
//     <div className="min-h-screen space-y-6" style={{ background: "#F5F7FA" }}>
//       {/* ══ ACTION BAR ════════════════════════════════════════════════════ */}
//       <div
//         className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 rounded-2xl shadow-sm border"
//         style={{
//           background: "#FFFFFF",
//           borderColor: "#1B2A4A12",
//         }}
//       >
//         {/* Title */}
//         <div className="flex items-center gap-3">
//           {/* 10% accent dot */}
//           <div
//             className="w-2 h-8 rounded-full"
//             style={{ background: "#3A7BD5" }}
//           />
//           <div>
//             <h2 className="text-base font-bold" style={{ color: "#1B2A4A" }}>
//               Invoice Details
//             </h2>
//             <p className="text-xs" style={{ color: "#1B2A4A66" }}>
//               Fill in the information below
//             </p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-wrap items-center gap-2">
//           {/* Preview */}
//           <button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border transition-all"
//             style={{
//               borderColor: "#3A7BD5",
//               color: "#3A7BD5",
//               background: "transparent",
//             }}
//             onMouseEnter={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.background =
//                 "#3A7BD5";
//               (e.currentTarget as HTMLButtonElement).style.color = "#fff";
//             }}
//             onMouseLeave={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.background =
//                 "transparent";
//               (e.currentTarget as HTMLButtonElement).style.color = "#3A7BD5";
//             }}
//           >
//             <Eye size={15} />
//             Live Preview
//           </button>

//           {/* Download */}
//           <button
//             type="button"
//             onClick={handleDownload}
//             className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border transition-all"
//             style={{
//               borderColor: "#1B2A4A20",
//               color: "#1B2A4A",
//               background: "#fff",
//             }}
//             onMouseEnter={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.background =
//                 "#F5F7FA";
//             }}
//             onMouseLeave={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.background = "#fff";
//             }}
//           >
//             <Download size={15} />
//             Download
//           </button>

//           {/* Save — 10% accent filled */}
//           <button
//             type="button"
//             onClick={handleSave}
//             className="flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-xl text-white transition-all shadow-md"
//             style={{ background: "#3A7BD5" }}
//             onMouseEnter={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.background =
//                 "#2C62B0";
//             }}
//             onMouseLeave={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.background =
//                 "#3A7BD5";
//             }}
//           >
//             <Save size={15} />
//             Save Invoice
//           </button>
//         </div>
//       </div>

//       {/* ══ FORM ══════════════════════════════════════════════════════════ */}
//       <InvoiceForm />

//       {/* ══ PREVIEW MODAL ════════════════════════════════════════════════ */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//           {/* Animated Backdrop */}
//           <div
//             className="absolute inset-0 bg-[#1B2A4A]/60 backdrop-blur-md transition-all duration-500"
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal Container */}
//           <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
//             {/* ── Modern Header ── */}
//             <div className="px-8 py-5 flex items-center justify-between bg-white border-b border-slate-100">
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-xl bg-[#3A7BD5]/10 flex items-center justify-center">
//                   <Eye size={20} className="text-[#3A7BD5]" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-[#1B2A4A]">
//                     Invoice Preview
//                   </h3>
//                   <p className="text-xs text-slate-400 font-medium">
//                     Review before sending to client
//                   </p>
//                 </div>
//               </div>

//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-red-500"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             {/* ── Preview Body (The Paper Feel) ── */}
//             <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-12 custom-scrollbar">
//               <div className="max-w-[850px] mx-auto">
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl border border-slate-200/60"
//                 />
//               </div>
//             </div>

//             {/* ── Modern Footer Action Bar ── */}
//             <div className="px-8 py-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
//               {/* Quick Stats Pill */}
//               <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-4 py-2 rounded-2xl">
//                 <div className="flex flex-col">
//                   <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
//                     Total Amount
//                   </span>
//                   <span className="text-sm font-bold text-[#1B2A4A]">
//                     {store.currency} {grandTotal.toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="w-px h-8 bg-slate-200 mx-2" />
//                 <div className="flex flex-col">
//                   <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
//                     Status
//                   </span>
//                   <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
//                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
//                     Ready
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 w-full sm:w-auto">
//                 <button
//                   onClick={() => setIsPreviewOpen(false)}
//                   className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
//                 >
//                   Back to Edit
//                 </button>
//                 <button
//                   onClick={handleDownload}
//                   className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#3A7BD5] hover:bg-[#2C62B0] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
//                 >
//                   <Download size={18} />
//                   Download PDF
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X, Sparkles, FileText } from "lucide-react";
// import { supabase } from "@/lib/supabase/client";

// // ─────────────────────────────────────────────
// //  COLOR THEME  (60 · 30 · 10)
// //  60% → #ECEFF1  background (cool light grey)
// //  30% → #191970  midnight blue (structure)
// //  10% → #FFC107  amber (CTAs, highlights)
// // ─────────────────────────────────────────────

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(
//     subtotal,
//     store.taxRate,
//     store.overallDiscount,
//   );

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();

//     if (session) {
//       const result = await saveInvoiceToDb(store);
//       if (result) {
//         window.location.href = "/dashboard/invoices/new";
//       } else {
//         alert("Error saving invoice.");
//       }
//     } else {
//       localStorage.setItem("pending_invoice", JSON.stringify(store));
//       const returnPath = "/dashboard/invoices/new";
//       const loginUrl = new URL("/auth/login", window.location.origin);
//       loginUrl.searchParams.set("next", returnPath);
//       loginUrl.searchParams.set("action", "save_pending");
//       window.location.href = loginUrl.toString();
//     }
//   };

//   return (
//     <div className="min-h-screen space-y-5" style={{ background: "#ECEFF1" }}>

//       {/* ══ ACTION BAR ══════════════════════════════════════════════════ */}
//       <div
//         className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 rounded-2xl border"
//         style={{
//           background: "#191970",
//           borderColor: "transparent",
//           boxShadow: "0 4px 24px rgba(25,25,112,0.18)",
//         }}
//       >
//         {/* Title */}
//         <div className="flex items-center gap-3 min-w-0">
//           <div
//             className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
//             style={{ background: "#FFC107" }}
//           >
//             <FileText size={16} style={{ color: "#191970" }} />
//           </div>
//           <div className="min-w-0">
//             <h2 className="text-sm font-black tracking-wide text-white truncate">
//               Invoice Builder
//             </h2>
//             <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
//               Fill details below
//             </p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-wrap items-center gap-2">
//           {/* Preview */}
//           <button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all"
//             style={{
//               borderColor: "rgba(255,255,255,0.2)",
//               color: "rgba(255,255,255,0.85)",
//               background: "rgba(255,255,255,0.07)",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "rgba(255,255,255,0.14)";
//               e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "rgba(255,255,255,0.07)";
//               e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
//             }}
//           >
//             <Eye size={13} />
//             Preview
//           </button>

//           {/* Download */}
//           <button
//             type="button"
//             onClick={handleDownload}
//             className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all"
//             style={{
//               borderColor: "rgba(255,255,255,0.2)",
//               color: "rgba(255,255,255,0.85)",
//               background: "rgba(255,255,255,0.07)",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "rgba(255,255,255,0.14)";
//               e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "rgba(255,255,255,0.07)";
//               e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
//             }}
//           >
//             <Download size={13} />
//             Download
//           </button>

//           {/* Save — amber accent */}
//           <button
//             type="button"
//             onClick={handleSave}
//             className="flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl transition-all"
//             style={{
//               background: "#FFC107",
//               color: "#191970",
//               boxShadow: "0 4px 14px rgba(255,193,7,0.35)",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "#FFD54F";
//               e.currentTarget.style.boxShadow = "0 4px 18px rgba(255,193,7,0.5)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "#FFC107";
//               e.currentTarget.style.boxShadow = "0 4px 14px rgba(255,193,7,0.35)";
//             }}
//           >
//             <Save size={13} />
//             Save Invoice
//           </button>
//         </div>
//       </div>

//       {/* ══ FORM ════════════════════════════════════════════════════════ */}
//       <InvoiceForm />

//       {/* ══ PREVIEW MODAL ═══════════════════════════════════════════════ */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
//           {/* Backdrop */}
//           <div
//             className="absolute inset-0 backdrop-blur-sm"
//             style={{ background: "rgba(25,25,112,0.7)" }}
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal */}
//           <div
//             className="relative w-full max-w-5xl h-[92vh] rounded-2xl overflow-hidden flex flex-col"
//             style={{
//               background: "#ECEFF1",
//               boxShadow: "0 40px 80px rgba(25,25,112,0.3)",
//             }}
//           >
//             {/* Header */}
//             <div
//               className="px-5 sm:px-8 py-4 flex items-center justify-between flex-shrink-0"
//               style={{
//                 background: "#191970",
//               }}
//             >
//               <div className="flex items-center gap-3">
//                 <div
//                   className="w-8 h-8 rounded-lg flex items-center justify-center"
//                   style={{ background: "#FFC107" }}
//                 >
//                   <Eye size={15} style={{ color: "#191970" }} />
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-black text-white">Invoice Preview</h3>
//                   <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
//                     Review before download
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="p-2 rounded-xl transition-all"
//                 style={{ color: "rgba(255,255,255,0.5)" }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "rgba(255,255,255,0.1)";
//                   e.currentTarget.style.color = "#FFC107";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "transparent";
//                   e.currentTarget.style.color = "rgba(255,255,255,0.5)";
//                 }}
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Preview Body */}
//             <div
//               className="flex-1 overflow-y-auto p-4 sm:p-8"
//               style={{ background: "#ECEFF1" }}
//             >
//               <div className="max-w-[850px] mx-auto">
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="rounded-2xl border"
//                   style={{
//                     boxShadow: "0 8px 40px rgba(25,25,112,0.1)",
//                     borderColor: "rgba(25,25,112,0.08)",
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Footer */}
//             <div
//               className="px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0 border-t"
//               style={{
//                 background: "#fff",
//                 borderColor: "rgba(25,25,112,0.08)",
//               }}
//             >
//               {/* Stats pill */}
//               <div
//                 className="flex items-center gap-3 px-4 py-2 rounded-xl border"
//                 style={{
//                   background: "#ECEFF1",
//                   borderColor: "rgba(25,25,112,0.1)",
//                 }}
//               >
//                 <div>
//                   <p className="text-[9px] uppercase tracking-widest font-black" style={{ color: "rgba(25,25,112,0.4)" }}>
//                     Total Due
//                   </p>
//                   <p className="text-sm font-black" style={{ color: "#191970" }}>
//                     {store.currency} {grandTotal.toLocaleString()}
//                   </p>
//                 </div>
//                 <div
//                   className="w-px h-8"
//                   style={{ background: "rgba(25,25,112,0.1)" }}
//                 />
//                 <div className="flex items-center gap-1.5">
//                   <span
//                     className="w-2 h-2 rounded-full"
//                     style={{ background: "#FFC107", boxShadow: "0 0 6px #FFC107" }}
//                   />
//                   <span className="text-xs font-bold" style={{ color: "#191970" }}>
//                     Ready
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 w-full sm:w-auto">
//                 <button
//                   onClick={() => setIsPreviewOpen(false)}
//                   className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border"
//                   style={{
//                     color: "#191970",
//                     borderColor: "rgba(25,25,112,0.15)",
//                     background: "transparent",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "#ECEFF1";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "transparent";
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={handleDownload}
//                   className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all"
//                   style={{
//                     background: "#FFC107",
//                     color: "#191970",
//                     boxShadow: "0 4px 14px rgba(255,193,7,0.4)",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "#FFD54F";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "#FFC107";
//                   }}
//                 >
//                   <Download size={15} />
//                   Download PDF
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X, FileText, Loader2, Edit3 } from "lucide-react";
// import { supabase } from "@/lib/supabase/client";
// import { cn } from "@/lib/utils";

// // ─────────────────────────────────────────────
// //  COLOR THEME  (60 · 30 · 10)
// //  60% → #ECEFF1  background
// //  30% → #191970  midnight blue
// //  10% → #FFC107  amber
// // ─────────────────────────────────────────────

// type Tab = "edit" | "preview";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isDownloading, setIsDownloading] = useState(false);
//   // Mobile tab state for inline preview (not modal)
//   const [mobileTab, setMobileTab] = useState<Tab>("edit");

//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.taxRate, store.overallDiscount);

//   const handleDownload = async () => {
//     setIsDownloading(true);
//     try {
//       await generateInvoicePDF("invoice-preview-landing");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session) {
//         const result = await saveInvoiceToDb(store);
//         if (result) {
//           window.location.href = "/dashboard/invoices/new";
//         } else {
//           alert("Error saving invoice.");
//         }
//       } else {
//         localStorage.setItem("pending_invoice", JSON.stringify(store));
//         const loginUrl = new URL("/auth/login", window.location.origin);
//         loginUrl.searchParams.set("next", "/dashboard/invoices/new");
//         loginUrl.searchParams.set("action", "save_pending");
//         window.location.href = loginUrl.toString();
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="space-y-4">

//       {/* ══ ACTION BAR ══════════════════════════════════════════════════ */}
//       <div
//         className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3.5 rounded-2xl"
//         style={{
//           background: "#191970",
//           boxShadow: "0 4px 20px rgba(25,25,112,0.15)",
//         }}
//       >
//         {/* Title */}
//         <div className="flex items-center gap-3 min-w-0">
//           <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,193,7,0.15)" }}>
//             <FileText size={15} style={{ color: "#FFC107" }} />
//           </div>
//           <div className="min-w-0">
//             <h2 className="text-sm font-black text-white truncate">Invoice Builder</h2>
//             <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Fill details · Preview · Export</p>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex flex-wrap items-center gap-2">
//           {/* Mobile tab toggle */}
//           <div
//             className="flex sm:hidden items-center rounded-xl p-0.5"
//             style={{ background: "rgba(255,255,255,0.08)" }}
//           >
//             {(["edit", "preview"] as Tab[]).map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setMobileTab(t)}
//                 className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black capitalize transition-all"
//                 style={{
//                   background: mobileTab === t ? "#FFC107" : "transparent",
//                   color: mobileTab === t ? "#191970" : "rgba(255,255,255,0.55)",
//                 }}
//               >
//                 {t === "edit" ? <Edit3 size={10} /> : <Eye size={10} />}
//                 {t}
//               </button>
//             ))}
//           </div>

//           {/* Desktop: Preview button */}
//           <button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all"
//             style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.07)" }}
//             onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; e.currentTarget.style.color = "#fff"; }}
//             onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
//           >
//             <Eye size={13} /> Preview
//           </button>

//           {/* Download */}
//           <button
//             type="button"
//             onClick={handleDownload}
//             disabled={isDownloading}
//             className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all disabled:opacity-60"
//             style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.07)" }}
//             onMouseEnter={(e) => { if (!isDownloading) { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; e.currentTarget.style.color = "#fff"; } }}
//             onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
//           >
//             {isDownloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
//             <span className="hidden xs:inline">Download</span>
//           </button>

//           {/* Save — amber CTA */}
//           <button
//             type="button"
//             onClick={handleSave}
//             disabled={isSaving}
//             className="flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl transition-all disabled:opacity-60"
//             style={{ background: "#FFC107", color: "#191970", boxShadow: "0 4px 14px rgba(255,193,7,0.3)" }}
//             onMouseEnter={(e) => { if (!isSaving) e.currentTarget.style.background = "#FFD54F"; }}
//             onMouseLeave={(e) => { e.currentTarget.style.background = "#FFC107"; }}
//           >
//             {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
//             Save Invoice
//           </button>
//         </div>
//       </div>

//       {/* ══ CONTENT AREA ════════════════════════════════════════════════
//           Mobile: tabs — edit OR preview
//           Desktop (sm+): always show form (preview via modal)              */}

//       {/* Mobile edit tab */}
//       <div className={cn("sm:hidden", mobileTab === "edit" ? "block" : "hidden")}>
//         <InvoiceForm />
//       </div>

//       {/* Mobile preview tab — inline, no modal */}
//       <div className={cn("sm:hidden", mobileTab === "preview" ? "block" : "hidden")}>
//         <div
//           className="rounded-2xl overflow-hidden"
//           style={{ boxShadow: "0 4px 24px rgba(25,25,112,0.08)", border: "1px solid rgba(25,25,112,0.08)" }}
//         >
//           <InvoicePreview id="invoice-preview-landing" />
//         </div>
//         <button
//           onClick={handleDownload}
//           className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all"
//           style={{ background: "#FFC107", color: "#191970", boxShadow: "0 4px 14px rgba(255,193,7,0.25)" }}
//         >
//           <Download size={13} />
//           Download PDF
//         </button>
//       </div>

//       {/* Desktop: always show form */}
//       <div className="hidden sm:block">
//         <InvoiceForm />
//         {/* Hidden preview for PDF generation */}
//         <div className="fixed -left-[9999px] -top-[9999px] w-[794px] opacity-0 pointer-events-none" aria-hidden>
//           <InvoicePreview id="invoice-preview-landing" />
//         </div>
//       </div>

//       {/* ══ DESKTOP PREVIEW MODAL ═══════════════════════════════════════ */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
//           {/* Backdrop */}
//           <div
//             className="absolute inset-0"
//             style={{ background: "rgba(25,25,112,0.65)", backdropFilter: "blur(4px)" }}
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal */}
//           <div
//             className="relative w-full max-w-4xl h-[92vh] rounded-2xl overflow-hidden flex flex-col"
//             style={{ background: "#ECEFF1", boxShadow: "0 40px 80px rgba(25,25,112,0.3)" }}
//           >
//             {/* Modal header */}
//             <div
//               className="px-5 sm:px-7 py-3.5 flex items-center justify-between flex-shrink-0"
//               style={{ background: "#191970" }}
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,193,7,0.15)" }}>
//                   <Eye size={13} style={{ color: "#FFC107" }} />
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-black text-white">Invoice Preview</h3>
//                   <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Review before download</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
//                 style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
//                 onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#F87171"; }}
//                 onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
//               >
//                 <X size={16} />
//               </button>
//             </div>

//             {/* Preview scroll area */}
//             <div className="flex-1 overflow-y-auto p-4 sm:p-8" style={{ background: "#ECEFF1" }}>
//               <div className="max-w-[794px] mx-auto">
//                 <div
//                   className="rounded-2xl overflow-hidden"
//                   style={{ boxShadow: "0 8px 40px rgba(25,25,112,0.1)", border: "1px solid rgba(25,25,112,0.07)" }}
//                 >
//                   <InvoicePreview id="invoice-preview-modal" />
//                 </div>
//               </div>
//             </div>

//             {/* Modal footer */}
//             <div
//               className="px-5 sm:px-7 py-3.5 flex items-center justify-between gap-3 flex-shrink-0"
//               style={{ background: "#fff", borderTop: "1px solid rgba(25,25,112,0.07)" }}
//             >
//               {/* Total pill */}
//               <div
//                 className="flex items-center gap-2 px-3 py-2 rounded-xl"
//                 style={{ background: "#ECEFF1", border: "1px solid rgba(25,25,112,0.08)" }}
//               >
//                 <div>
//                   <p className="text-[9px] uppercase tracking-widest font-black" style={{ color: "rgba(25,25,112,0.35)" }}>Total</p>
//                   <p className="text-sm font-black" style={{ color: "#191970" }}>{store.currency} {grandTotal.toLocaleString()}</p>
//                 </div>
//                 <div className="w-px h-7 mx-1" style={{ background: "rgba(25,25,112,0.08)" }} />
//                 <div className="flex items-center gap-1.5">
//                   <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#FFC107", boxShadow: "0 0 5px #FFC107" }} />
//                   <span className="text-xs font-bold" style={{ color: "#191970" }}>Ready</span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setIsPreviewOpen(false)}
//                   className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all"
//                   style={{ color: "#191970", borderColor: "rgba(25,25,112,0.12)", background: "transparent" }}
//                   onMouseEnter={(e) => { e.currentTarget.style.background = "#ECEFF1"; }}
//                   onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={handleDownload}
//                   disabled={isDownloading}
//                   className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black transition-all disabled:opacity-60"
//                   style={{ background: "#FFC107", color: "#191970", boxShadow: "0 4px 14px rgba(255,193,7,0.3)" }}
//                   onMouseEnter={(e) => { if (!isDownloading) e.currentTarget.style.background = "#FFD54F"; }}
//                   onMouseLeave={(e) => { e.currentTarget.style.background = "#FFC107"; }}
//                 >
//                   {isDownloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
//                   Download PDF
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X, FileText, Loader2, Edit3 } from "lucide-react";
// import { supabase } from "@/lib/supabase/client";
// import { cn } from "@/lib/utils";

// // ─────────────────────────────────────────────
// //  COLOR THEME  (60 · 30 · 10)
// //  60% → #ECEFF1  background
// //  30% → #191970  midnight blue
// //  10% → #FFC107  amber
// // ─────────────────────────────────────────────

// type Tab = "edit" | "preview";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isDownloading, setIsDownloading] = useState(false);
//   // Mobile tab state for inline preview (not modal)
//   const [mobileTab, setMobileTab] = useState<Tab>("edit");

//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.taxRate, store.overallDiscount);

//   const handleDownload = async () => {
//     setIsDownloading(true);
//     try {
//       await generateInvoicePDF("invoice-preview-landing");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session) {
//         const result = await saveInvoiceToDb(store);
//         if (result) {
//           window.location.href = "/dashboard/invoices/new";
//         } else {
//           alert("Error saving invoice.");
//         }
//       } else {
//         localStorage.setItem("pending_invoice", JSON.stringify(store));
//         const loginUrl = new URL("/auth/login", window.location.origin);
//         loginUrl.searchParams.set("next", "/dashboard/invoices/new");
//         loginUrl.searchParams.set("action", "save_pending");
//         window.location.href = loginUrl.toString();
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="space-y-4">

//       {/* ══ ACTION BAR ══════════════════════════════════════════════════ */}
//       <div
//         className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3.5 rounded-2xl"
//         style={{
//           background: "#191970",
//           boxShadow: "0 4px 20px rgba(25,25,112,0.15)",
//         }}
//       >
//         {/* Title */}
//         <div className="flex items-center gap-3 min-w-0">
//           <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,193,7,0.15)" }}>
//             <FileText size={15} style={{ color: "#FFC107" }} />
//           </div>
//           <div className="min-w-0">
//             <h2 className="text-sm font-black text-white truncate">Invoice Builder</h2>
//             <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Fill details · Preview · Export</p>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex flex-wrap items-center gap-2">
//           {/* Mobile tab toggle */}
//           <div
//             className="flex sm:hidden items-center rounded-xl p-0.5"
//             style={{ background: "rgba(255,255,255,0.08)" }}
//           >
//             {(["edit", "preview"] as Tab[]).map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setMobileTab(t)}
//                 className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black capitalize transition-all"
//                 style={{
//                   background: mobileTab === t ? "#FFC107" : "transparent",
//                   color: mobileTab === t ? "#191970" : "rgba(255,255,255,0.55)",
//                 }}
//               >
//                 {t === "edit" ? <Edit3 size={10} /> : <Eye size={10} />}
//                 {t}
//               </button>
//             ))}
//           </div>

//           {/* Desktop: Preview button */}
//           <button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all"
//             style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.07)" }}
//             onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; e.currentTarget.style.color = "#fff"; }}
//             onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
//           >
//             <Eye size={13} /> Preview
//           </button>

//           {/* Download */}
//           <button
//             type="button"
//             onClick={handleDownload}
//             disabled={isDownloading}
//             className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all disabled:opacity-60"
//             style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.07)" }}
//             onMouseEnter={(e) => { if (!isDownloading) { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; e.currentTarget.style.color = "#fff"; } }}
//             onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
//           >
//             {isDownloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
//             <span className="hidden xs:inline">Download</span>
//           </button>

//           {/* Save — amber CTA */}
//           <button
//             type="button"
//             onClick={handleSave}
//             disabled={isSaving}
//             className="flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl transition-all disabled:opacity-60"
//             style={{ background: "#FFC107", color: "#191970", boxShadow: "0 4px 14px rgba(255,193,7,0.3)" }}
//             onMouseEnter={(e) => { if (!isSaving) e.currentTarget.style.background = "#FFD54F"; }}
//             onMouseLeave={(e) => { e.currentTarget.style.background = "#FFC107"; }}
//           >
//             {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
//             Save Invoice
//           </button>
//         </div>
//       </div>

//       {/* ══ CONTENT AREA ════════════════════════════════════════════════
//           Mobile: tabs — edit OR preview
//           Desktop (sm+): always show form (preview via modal)              */}

//       {/* Mobile edit tab */}
//       <div className={cn("sm:hidden", mobileTab === "edit" ? "block" : "hidden")}>
//         <InvoiceForm />
//       </div>

//       {/* Mobile preview tab — inline, no modal */}
//       <div className={cn("sm:hidden", mobileTab === "preview" ? "block" : "hidden")}>
//         <div
//           className="rounded-2xl overflow-hidden"
//           style={{ boxShadow: "0 4px 24px rgba(25,25,112,0.08)", border: "1px solid rgba(25,25,112,0.08)" }}
//         >
//           <InvoicePreview id="invoice-preview-landing" />
//         </div>
//         <button
//           onClick={handleDownload}
//           className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all"
//           style={{ background: "#FFC107", color: "#191970", boxShadow: "0 4px 14px rgba(255,193,7,0.25)" }}
//         >
//           <Download size={13} />
//           Download PDF
//         </button>
//       </div>

//       {/* Desktop: always show form */}
//       <div className="hidden sm:block">
//         <InvoiceForm />
//         {/* Hidden preview for PDF generation */}
//         <div className="fixed -left-[9999px] -top-[9999px] w-[794px] opacity-0 pointer-events-none" aria-hidden>
//           <InvoicePreview id="invoice-preview-landing" />
//         </div>
//       </div>

//       {/* ══ DESKTOP PREVIEW MODAL ═══════════════════════════════════════ */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
//           {/* Backdrop */}
//           <div
//             className="absolute inset-0"
//             style={{ background: "rgba(25,25,112,0.65)", backdropFilter: "blur(4px)" }}
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal */}
//           <div
//             className="relative w-full max-w-4xl h-[92vh] rounded-2xl overflow-hidden flex flex-col"
//             style={{ background: "#ECEFF1", boxShadow: "0 40px 80px rgba(25,25,112,0.3)" }}
//           >
//             {/* Modal header */}
//             <div
//               className="px-5 sm:px-7 py-3.5 flex items-center justify-between flex-shrink-0"
//               style={{ background: "#191970" }}
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,193,7,0.15)" }}>
//                   <Eye size={13} style={{ color: "#FFC107" }} />
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-black text-white">Invoice Preview</h3>
//                   <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Review before download</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
//                 style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
//                 onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#F87171"; }}
//                 onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
//               >
//                 <X size={16} />
//               </button>
//             </div>

//             {/* Preview scroll area */}
//             <div className="flex-1 overflow-y-auto p-4 sm:p-8" style={{ background: "#ECEFF1" }}>
//               <div className="max-w-[794px] mx-auto">
//                 <div
//                   className="rounded-2xl overflow-hidden"
//                   style={{ boxShadow: "0 8px 40px rgba(25,25,112,0.1)", border: "1px solid rgba(25,25,112,0.07)" }}
//                 >
//                   <InvoicePreview id="invoice-preview-modal" />
//                 </div>
//               </div>
//             </div>

//             {/* Modal footer */}
//             <div
//               className="px-5 sm:px-7 py-3.5 flex items-center justify-between gap-3 flex-shrink-0"
//               style={{ background: "#fff", borderTop: "1px solid rgba(25,25,112,0.07)" }}
//             >
//               {/* Total pill */}
//               <div
//                 className="flex items-center gap-2 px-3 py-2 rounded-xl"
//                 style={{ background: "#ECEFF1", border: "1px solid rgba(25,25,112,0.08)" }}
//               >
//                 <div>
//                   <p className="text-[9px] uppercase tracking-widest font-black" style={{ color: "rgba(25,25,112,0.35)" }}>Total</p>
//                   <p className="text-sm font-black" style={{ color: "#191970" }}>{store.currency} {grandTotal.toLocaleString()}</p>
//                 </div>
//                 <div className="w-px h-7 mx-1" style={{ background: "rgba(25,25,112,0.08)" }} />
//                 <div className="flex items-center gap-1.5">
//                   <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#FFC107", boxShadow: "0 0 5px #FFC107" }} />
//                   <span className="text-xs font-bold" style={{ color: "#191970" }}>Ready</span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setIsPreviewOpen(false)}
//                   className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all"
//                   style={{ color: "#191970", borderColor: "rgba(25,25,112,0.12)", background: "transparent" }}
//                   onMouseEnter={(e) => { e.currentTarget.style.background = "#ECEFF1"; }}
//                   onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={handleDownload}
//                   disabled={isDownloading}
//                   className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black transition-all disabled:opacity-60"
//                   style={{ background: "#FFC107", color: "#191970", boxShadow: "0 4px 14px rgba(255,193,7,0.3)" }}
//                   onMouseEnter={(e) => { if (!isDownloading) e.currentTarget.style.background = "#FFD54F"; }}
//                   onMouseLeave={(e) => { e.currentTarget.style.background = "#FFC107"; }}
//                 >
//                   {isDownloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
//                   Download PDF
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, FileText, Loader2, Edit3 } from "lucide-react";
// import { supabase } from "@/lib/supabase/client";
// import { cn } from "@/lib/utils";

// // ─────────────────────────────────────────────────────────────────────────────
// //  INVOICE LANDING — Public-facing invoice builder
// //
// //  Layout:
// //  Desktop (md+):
// //    ┌─────────────────────┬──────────────────────┐
// //    │  ACTION BAR (full width, sticky)            │
// //    ├─────────────────────┼──────────────────────┤
// //    │  Invoice Form       │  Live Preview        │
// //    │  (flex-1, scroll)   │  (flex-1, scroll)    │
// //    └─────────────────────┴──────────────────────┘
// //
// //  Mobile (<md):
// //    ┌──────────────────────────────────────────────┐
// //    │  ACTION BAR  [Edit tab] [Preview tab] [Save] │
// //    ├──────────────────────────────────────────────┤
// //    │  Form OR Preview (tab-controlled)            │
// //    └──────────────────────────────────────────────┘
// // ─────────────────────────────────────────────────────────────────────────────

// type Tab = "edit" | "preview";

// export function InvoiceLanding() {
//   const [mobileTab, setMobileTab] = useState<Tab>("edit");
//   const [isSaving, setIsSaving] = useState(false);
//   const [isDownloading, setIsDownloading] = useState(false);

//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(
//     subtotal,
//     store.taxRate,
//     store.overallDiscount,
//   );

//   const handleDownload = async () => {
//     setIsDownloading(true);
//     try {
//       await generateInvoicePDF("invoice-preview-landing");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       if (session) {
//         const result = await saveInvoiceToDb(store);
//         if (result) window.location.href = "/dashboard/invoices/new";
//         else alert("Error saving invoice.");
//       } else {
//         localStorage.setItem("pending_invoice", JSON.stringify(store));
//         const loginUrl = new URL("/auth/login", window.location.origin);
//         loginUrl.searchParams.set("next", "/dashboard/invoices/new");
//         loginUrl.searchParams.set("action", "save_pending");
//         window.location.href = loginUrl.toString();
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     // Full viewport height — action bar + split panels fill screen
//     <div
//       className="flex flex-col"
//       style={{ minHeight: "100vh", background: "#ECEFF1" }}
//     >
//       {/* ══ STICKY ACTION BAR ══════════════════════════════════════════════ */}
//       <div
//         className="sticky top-0 z-30 flex-shrink-0"
//         style={{
//           background: "#191970",
//           boxShadow: "0 2px 20px rgba(25,25,112,0.2)",
//         }}
//       >
//         <div className="flex items-center justify-between px-4 sm:px-6 py-3">
//           {/* Logo + title */}
//           <div className="flex items-center gap-3 min-w-0">
//             <div
//               className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
//               style={{ background: "#FFC107" }}
//             >
//               <FileText size={15} style={{ color: "#191970" }} />
//             </div>
//             <div className="min-w-0 hidden xs:block">
//               <p className="text-sm font-black text-white leading-tight truncate">
//                 Invoice Builder
//               </p>
//               <p
//                 className="text-[9px] leading-tight"
//                 style={{ color: "rgba(255,255,255,0.4)" }}
//               >
//                 Fill · Preview · Export
//               </p>
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="flex items-center gap-2">
//             {/* Mobile tab toggle */}
//             <div
//               className="flex md:hidden items-center rounded-xl p-0.5"
//               style={{ background: "rgba(255,255,255,0.08)" }}
//             >
//               {(["edit", "preview"] as Tab[]).map((t) => (
//                 <button
//                   key={t}
//                   onClick={() => setMobileTab(t)}
//                   className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black capitalize transition-all"
//                   style={{
//                     background: mobileTab === t ? "#FFC107" : "transparent",
//                     color:
//                       mobileTab === t ? "#191970" : "rgba(255,255,255,0.55)",
//                   }}
//                 >
//                   {t === "edit" ? <Edit3 size={10} /> : <Eye size={10} />}
//                   {t}
//                 </button>
//               ))}
//             </div>

//             {/* Download */}
//             <button
//               type="button"
//               onClick={handleDownload}
//               disabled={isDownloading}
//               className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all disabled:opacity-60"
//               style={{
//                 borderColor: "rgba(255,255,255,0.15)",
//                 color: "rgba(255,255,255,0.75)",
//                 background: "rgba(255,255,255,0.07)",
//               }}
//               onMouseEnter={(e) => {
//                 if (!isDownloading) {
//                   e.currentTarget.style.background = "rgba(255,255,255,0.13)";
//                   e.currentTarget.style.color = "#fff";
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "rgba(255,255,255,0.07)";
//                 e.currentTarget.style.color = "rgba(255,255,255,0.75)";
//               }}
//             >
//               {isDownloading ? (
//                 <Loader2 size={13} className="animate-spin" />
//               ) : (
//                 <Download size={13} />
//               )}
//               <span className="hidden sm:inline">Download</span>
//             </button>

//             {/* Save — amber CTA */}
//             <button
//               type="button"
//               onClick={handleSave}
//               disabled={isSaving}
//               className="flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl transition-all disabled:opacity-60"
//               style={{
//                 background: "#FFC107",
//                 color: "#191970",
//                 boxShadow: "0 4px 14px rgba(255,193,7,0.35)",
//               }}
//               onMouseEnter={(e) => {
//                 if (!isSaving) e.currentTarget.style.background = "#FFD54F";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "#FFC107";
//               }}
//             >
//               {isSaving ? (
//                 <Loader2 size={13} className="animate-spin" />
//               ) : (
//                 <Save size={13} />
//               )}
//               Save Invoice
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ══ MAIN SPLIT AREA ════════════════════════════════════════════════
//           Desktop (md+): form LEFT + preview RIGHT — both flex-1 (50/50)
//           Mobile (<md):  tab-controlled full-width panels                   */}
//       <div
//         className="flex flex-1 min-h-0  max-md:block  "
//         style={{ height: "calc(100vh - 56px)" }}
//       >
//         {/* ── LEFT: Invoice Form ── */}
//         <div
//           className={cn(
//             "overflow-y-auto",
//             // Mobile: show/hide by tab
//             mobileTab === "edit" ? "flex" : "hidden",
//             // Desktop: always show, 50%
//             "md:flex md:flex-1 flex-col",
//           )}
//           style={{ minWidth: 0, background: "#ECEFF1" }}
//         >
//           <div className="flex-1 p-4 sm:p-6">
//             <div className="max-w-2xl mx-auto">
//               <InvoiceForm />
//             </div>
//           </div>
//         </div>

//         {/* ── RIGHT: Live Preview ── */}
//         <div
//           className={cn(
//             "overflow-y-auto flex flex-col",
//             // Mobile: show/hide by tab
//             mobileTab === "preview" ? "flex" : "hidden",
//             // Desktop: always show, 50%
//             "md:flex md:flex-1",
//           )}
//           style={{
//             minWidth: 0,
//             background: "#DDE3EA",
//             borderLeft: "1px solid rgba(25,25,112,0.09)",
//           }}
//         >
//           {/* Panel header — sticky inside this panel */}
//           <div
//             className="sticky top-0 z-10 flex items-center justify-between px-5 py-2.5 flex-shrink-0"
//             style={{
//               background: "rgba(221,227,234,0.92)",
//               backdropFilter: "blur(8px)",
//               borderBottom: "1px solid rgba(25,25,112,0.08)",
//             }}
//           >
//             <div className="flex items-center gap-2">
//               <span
//                 className="w-2 h-2 rounded-full"
//                 style={{
//                   background: "#FFC107",
//                   boxShadow: "0 0 7px rgba(255,193,7,0.85)",
//                 }}
//               />
//               <Eye size={12} style={{ color: "rgba(25,25,112,0.5)" }} />
//               <span
//                 className="text-[9px] font-black uppercase tracking-widest"
//                 style={{ color: "rgba(25,25,112,0.45)" }}
//               >
//                 Live Preview
//               </span>
//             </div>
//             {/* Running total */}
//             <div
//               className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black"
//               style={{
//                 background: "rgba(255,193,7,0.15)",
//                 color: "#191970",
//                 border: "1px solid rgba(255,193,7,0.3)",
//               }}
//             >
//               <span style={{ fontWeight: 400, color: "rgba(25,25,112,0.45)" }}>
//                 Total
//               </span>
//               <span className="font-black">
//                 {store.currency} {grandTotal.toLocaleString()}
//               </span>
//             </div>
//           </div>

//           {/* Invoice "paper" */}
//           <div className="flex-1 p-4 sm:p-6 xl:p-8">
//             <div
//               style={{
//                 maxWidth: "640px",
//                 margin: "0 auto",
//                 borderRadius: "12px",
//                 overflow: "hidden",
//                 boxShadow:
//                   "0 1px 3px rgba(25,25,112,0.05), " +
//                   "0 8px 24px rgba(25,25,112,0.1), " +
//                   "0 32px 64px rgba(25,25,112,0.07)",
//               }}
//             >
//               <InvoicePreview id="invoice-preview-landing" />
//             </div>

//             {/* Download shortcut below preview */}
//             <div style={{ maxWidth: "640px", margin: "12px auto 0" }}>
//               <button
//                 onClick={handleDownload}
//                 className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all"
//                 style={{
//                   background: "rgba(25,25,112,0.06)",
//                   color: "rgba(25,25,112,0.5)",
//                   border: "1px solid rgba(25,25,112,0.1)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "#FFC107";
//                   e.currentTarget.style.color = "#191970";
//                   e.currentTarget.style.borderColor = "#FFC107";
//                   e.currentTarget.style.boxShadow =
//                     "0 4px 14px rgba(255,193,7,0.3)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "rgba(25,25,112,0.06)";
//                   e.currentTarget.style.color = "rgba(25,25,112,0.5)";
//                   e.currentTarget.style.borderColor = "rgba(25,25,112,0.1)";
//                   e.currentTarget.style.boxShadow = "none";
//                 }}
//               >
//                 <Download size={13} />
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useRef } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import {
//   Download, Eye, Save, FileText, Loader2,
//   Edit3, ZoomIn, ZoomOut, RotateCcw,
// } from "lucide-react";
// import { supabase } from "@/lib/supabase/client";
// import { cn } from "@/lib/utils";

// // ─────────────────────────────────────────────────────────────────────────────
// //  CONCEPT: Blueprint Studio
// //
// //  SCROLL FIX: The entire page is fixed height (100vh).
// //  Left panel (form) scrolls independently.
// //  Right panel (preview) is position:absolute centered — never scrolls with form.
// //  This means preview is ALWAYS visible in its quadrant regardless of form scroll.
// //
// //  HEADER FIX:
// //  < 460px → 2 rows: [logo+title] then [tabs][download][save]
// //  ≥ 460px → 1 row: [logo+title] ··· [tabs][download][save]
// // ─────────────────────────────────────────────────────────────────────────────

// type Tab = "edit" | "preview";

// export function InvoiceLanding() {
//   const [mobileTab, setMobileTab] = useState<Tab>("edit");
//   const [isSaving, setIsSaving]     = useState(false);
//   const [isDl, setIsDl]             = useState(false);
//   const [rotation, setRotation]     = useState(-2);
//   const [zoom, setZoom]             = useState(0.66);

//   const store    = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.taxRate, store.overallDiscount);

//   const dl = async () => {
//     setIsDl(true);
//     try { await generateInvoicePDF("invoice-preview-landing"); }
//     finally { setIsDl(false); }
//   };

//   const save = async () => {
//     setIsSaving(true);
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session) {
//         const r = await saveInvoiceToDb(store);
//         if (r) window.location.href = "/dashboard/invoices/new";
//         else alert("Error saving.");
//       } else {
//         localStorage.setItem("pending_invoice", JSON.stringify(store));
//         const u = new URL("/auth/login", window.location.origin);
//         u.searchParams.set("next", "/dashboard/invoices/new");
//         u.searchParams.set("action", "save_pending");
//         window.location.href = u.toString();
//       }
//     } finally { setIsSaving(false); }
//   };

//   return (
//     <>
//       <style>{`
//         /* ── Animations ── */
//         @keyframes il-floatIn {
//           from { opacity:0; transform:rotate(-5deg) scale(0.93) translateY(22px); }
//           to   { opacity:1; transform:rotate(var(--rot,0deg)) scale(1) translateY(0); }
//         }
//         @keyframes il-pin {
//           0%  { opacity:0; transform:translateY(-16px) scale(0.7); }
//           65% { transform:translateY(4px) scale(1.12); opacity:1; }
//           100%{ transform:translateY(0) scale(1); opacity:1; }
//         }
//         @keyframes il-fade { from{opacity:0} to{opacity:1} }

//         .il-paper  { animation: il-floatIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
//         .il-pin    { animation: il-pin 0.5s 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
//         .il-fade   { animation: il-fade 0.4s 0.2s ease both; }

//         /* Drafting table dot grid */
//         .il-table {
//           background-color: #0C1930;
//           background-image: radial-gradient(circle, rgba(255,193,7,0.17) 1px, transparent 1px);
//           background-size: 26px 26px;
//         }
//         /* Ruler lines */
//         .il-ruler-t {
//           position:absolute; top:0; left:0; right:0; height:18px; z-index:2; pointer-events:none;
//           background: repeating-linear-gradient(90deg,transparent,transparent 25px,rgba(255,193,7,0.1) 25px,rgba(255,193,7,0.1) 26px);
//           border-bottom: 1px solid rgba(255,193,7,0.07);
//         }
//         .il-ruler-l {
//           position:absolute; top:0; left:0; bottom:0; width:18px; z-index:2; pointer-events:none;
//           background: repeating-linear-gradient(180deg,transparent,transparent 25px,rgba(255,193,7,0.1) 25px,rgba(255,193,7,0.1) 26px);
//           border-right: 1px solid rgba(255,193,7,0.07);
//         }

//         /* Toolbar button */
//         .il-tb {
//           width:28px; height:28px; border-radius:7px; flex-shrink:0;
//           display:flex; align-items:center; justify-content:center;
//           border:1px solid rgba(255,193,7,0.14);
//           background:rgba(255,255,255,0.04);
//           color:rgba(255,193,7,0.55);
//           cursor:pointer; transition:all 0.13s;
//         }
//         .il-tb:hover { background:rgba(255,193,7,0.1); color:#FFC107; border-color:rgba(255,193,7,0.38); }
//         .il-tb-sep { width:1px; height:16px; background:rgba(255,193,7,0.12); flex-shrink:0; }
//         .il-tb-lbl { font-size:9px; font-weight:900; font-family:monospace; color:rgba(255,193,7,0.6); min-width:30px; text-align:center; }

//         /* Paper shadow */
//         .il-shadow {
//           filter:
//             drop-shadow(0 4px 12px rgba(0,0,0,0.4))
//             drop-shadow(0 20px 50px rgba(0,0,0,0.35));
//         }

//         /* Clipboard width on desktop */
//         @media (min-width:768px) {
//           .il-clipboard { width:430px !important; flex-shrink:0 !important; }
//         }
//       `}</style>

//       {/* ── Root: fixed height, no page scroll ── */}
//       <div style={{ display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden" }}>

//         {/* ══ HEADER ══════════════════════════════════════════════════════════
//             Strategy:
//             < 460px  → 2 rows stacked
//             ≥ 460px  → 1 single row
//         ════════════════════════════════════════════════════════════════════ */}
//         <header style={{
//           flexShrink:0, zIndex:30,
//           background:"#191970",
//           boxShadow:"0 2px 20px rgba(25,25,112,0.3)",
//         }}>
//           {/* Row 1 — brand (always visible) */}
//           <div style={{
//             display:"flex", alignItems:"center", justifyContent:"space-between",
//             padding:"10px 16px 0 16px",
//             // On ≥460px this row also carries the action buttons
//           }}>
//             {/* Brand */}
//             <div style={{ display:"flex", alignItems:"center", gap:10, minWidth:0 }}>
//               <div style={{ width:28, height:28, borderRadius:8, background:"#FFC107", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//                 <FileText size={13} style={{ color:"#191970" }} />
//               </div>
//               <span style={{ fontWeight:900, fontSize:13, color:"#fff", letterSpacing:"-0.02em", whiteSpace:"nowrap" }}>
//                 Invoice<span style={{ color:"#FFC107" }}>Gen</span>
//               </span>
//             </div>

//             {/* ≥460px: action buttons in row 1 */}
//             <div className="hidden min-[460px]:flex" style={{ alignItems:"center", gap:8 }}>
//               {/* Mobile tab toggle (only on <md) */}
//               <div className="md:hidden" style={{ display:"flex", alignItems:"center", background:"rgba(255,255,255,0.08)", borderRadius:10, padding:2 }}>
//                 {(["edit","preview"] as Tab[]).map(t => (
//                   <button key={t} onClick={() => setMobileTab(t)} style={{
//                     display:"flex", alignItems:"center", gap:4, padding:"5px 10px",
//                     borderRadius:8, border:"none", fontSize:10, fontWeight:900,
//                     textTransform:"capitalize", cursor:"pointer", transition:"all 0.13s",
//                     background: mobileTab===t ? "#FFC107" : "transparent",
//                     color: mobileTab===t ? "#191970" : "rgba(255,255,255,0.5)",
//                   }}>
//                     {t==="edit" ? <Edit3 size={9}/> : <Eye size={9}/>}{t}
//                   </button>
//                 ))}
//               </div>
//               <ActionButtons dl={dl} isDl={isDl} save={save} isSaving={isSaving} />
//             </div>
//           </div>

//           {/* Row 2 — <460px only: tabs + action buttons */}
//           <div className="flex min-[460px]:hidden" style={{
//             alignItems:"center", justifyContent:"space-between",
//             padding:"8px 14px 10px 14px", gap:8,
//             borderTop:"1px solid rgba(255,255,255,0.07)",
//           }}>
//             {/* Tab toggle */}
//             <div style={{ display:"flex", alignItems:"center", background:"rgba(255,255,255,0.08)", borderRadius:10, padding:2 }}>
//               {(["edit","preview"] as Tab[]).map(t => (
//                 <button key={t} onClick={() => setMobileTab(t)} style={{
//                   display:"flex", alignItems:"center", gap:4, padding:"5px 10px",
//                   borderRadius:8, border:"none", fontSize:10, fontWeight:900,
//                   textTransform:"capitalize", cursor:"pointer", transition:"all 0.13s",
//                   background: mobileTab===t ? "#FFC107" : "transparent",
//                   color: mobileTab===t ? "#191970" : "rgba(255,255,255,0.5)",
//                 }}>
//                   {t==="edit" ? <Edit3 size={9}/> : <Eye size={9}/>}{t}
//                 </button>
//               ))}
//             </div>
//             {/* Compact action buttons */}
//             <ActionButtons dl={dl} isDl={isDl} save={save} isSaving={isSaving} compact />
//           </div>

//           {/* Pad bottom on ≥460px (single row) */}
//           <div className="hidden min-[460px]:block" style={{ height:10 }} />
//         </header>

//         {/* ══ BODY ════════════════════════════════════════════════════════════ */}
//         <div style={{ display:"flex", flex:1, minHeight:0 }}>

//           {/* ── LEFT: Clipboard (form) — independently scrollable ── */}
//           <div
//             className={cn("il-clipboard", mobileTab==="edit" ? "flex" : "hidden", "md:flex")}
//             style={{
//               flexDirection:"column", width:"100%",
//               background:"#F4F6FA",
//               borderRight:"1px solid rgba(25,25,112,0.08)",
//               overflow:"hidden",
//             }}
//           >
//             {/* Clipboard header strip */}
//             <div style={{
//               flexShrink:0, display:"flex", alignItems:"center", gap:8,
//               padding:"9px 16px",
//               background:"#fff",
//               borderBottom:"1px solid rgba(25,25,112,0.07)",
//             }}>
//               {/* Ring */}
//               <div style={{ width:18, height:18, borderRadius:"50%", border:"3px solid #191970", background:"#ECEFF1", flexShrink:0 }} />
//               <span style={{ fontSize:9, fontWeight:900, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(25,25,112,0.4)" }}>
//                 Invoice Details
//               </span>
//               {/* Live total */}
//               <div style={{
//                 marginLeft:"auto", display:"flex", alignItems:"center", gap:4,
//                 padding:"3px 10px", borderRadius:20,
//                 background:"rgba(255,193,7,0.1)", border:"1px solid rgba(255,193,7,0.2)",
//               }}>
//                 <span style={{ width:5, height:5, borderRadius:"50%", background:"#FFC107", boxShadow:"0 0 5px rgba(255,193,7,0.8)", display:"inline-block" }} />
//                 <span style={{ fontSize:10, fontWeight:900, color:"#191970" }}>
//                   {store.currency} {grandTotal.toLocaleString()}
//                 </span>
//               </div>
//             </div>

//             {/* Form — ONLY this div scrolls, preview is unaffected */}
//             <div style={{ flex:1, overflowY:"auto", padding:16 }}>
//               <InvoiceForm />
//             </div>
//           </div>

//           {/* ── RIGHT: Drafting Table — fixed, never scrolls ── */}
//           <div
//             className={cn("il-table relative", mobileTab==="preview" ? "flex" : "hidden", "md:flex flex-1")}
//             style={{ overflow:"hidden", alignItems:"center", justifyContent:"center" }}
//           >
//             <div className="il-ruler-t" />
//             <div className="il-ruler-l" />

//             {/* Studio label */}
//             <div style={{ position:"absolute", top:24, right:16, zIndex:3, pointerEvents:"none",
//               fontFamily:"monospace", fontSize:8, fontWeight:900, letterSpacing:"0.2em",
//               color:"rgba(255,193,7,0.28)", textTransform:"uppercase" }}>
//               LIVE PREVIEW · STUDIO
//             </div>

//             {/* Ambient glow */}
//             <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
//               width:650, height:700, pointerEvents:"none", borderRadius:"50%",
//               background:"radial-gradient(ellipse, rgba(255,193,7,0.03) 0%, transparent 65%)" }} />

//             {/* ── Paper ── */}
//             <div style={{ position:"relative", zIndex:10 }}>
//               {/* Pin */}
//               <div className="il-pin" style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", zIndex:20 }}>
//                 <div style={{ width:12, height:12, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, #FF7675, #C0392B)", boxShadow:"0 2px 8px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.3)", margin:"0 auto" }} />
//                 <div style={{ width:2, height:11, background:"linear-gradient(180deg,#aaa,#666)", margin:"0 auto" }} />
//               </div>

//               {/* Tape */}
//               <div style={{ position:"absolute", top:-8, left:"50%", marginLeft:-30, zIndex:15, pointerEvents:"none",
//                 width:60, height:14, background:"rgba(255,240,120,0.45)", borderRadius:2,
//                 boxShadow:"0 2px 6px rgba(0,0,0,0.18)", border:"0.5px solid rgba(255,210,0,0.3)", backdropFilter:"blur(1px)" }} />

//               {/* Invoice document */}
//               <div
//                 className="il-paper il-shadow"
//                 style={{
//                   "--rot": `${rotation}deg`,
//                   transform: `rotate(${rotation}deg) scale(${zoom})`,
//                   transformOrigin: "top center",
//                   transition: "transform 0.38s cubic-bezier(0.34,1.56,0.64,1)",
//                   willChange: "transform",
//                   borderRadius: 3,
//                   overflow: "hidden",
//                   background: "#fff",
//                   minWidth: "595px",
//                 } as any}
//               >
//                 <InvoicePreview id="invoice-preview-landing" />
//                 {/* Page curl */}
//                 <div style={{ position:"absolute", bottom:0, right:0, width:26, height:26, pointerEvents:"none",
//                   background:"linear-gradient(135deg,transparent 50%,rgba(0,0,0,0.11) 50%)", borderRadius:"0 0 3px 0" }} />
//               </div>
//             </div>

//             {/* ── Floating toolbar ── */}
//             <div className="il-fade" style={{
//               position:"absolute", bottom:18, left:"50%", transform:"translateX(-50%)",
//               display:"flex", alignItems:"center", gap:6, zIndex:20,
//               padding:"7px 12px", borderRadius:14,
//               background:"rgba(10,20,50,0.88)", backdropFilter:"blur(14px)",
//               border:"1px solid rgba(255,193,7,0.13)",
//               boxShadow:"0 8px 32px rgba(0,0,0,0.45)",
//               whiteSpace:"nowrap",
//             }}>
//               <button className="il-tb" onClick={() => setZoom(z => +(Math.max(0.35,z-0.08)).toFixed(2))} title="Zoom out"><ZoomOut size={11}/></button>
//               <span className="il-tb-lbl">{Math.round(zoom*100)}%</span>
//               <button className="il-tb" onClick={() => setZoom(z => +(Math.min(1.2,z+0.08)).toFixed(2))} title="Zoom in"><ZoomIn size={11}/></button>
//               <div className="il-tb-sep"/>
//               <button className="il-tb" onClick={() => setRotation(r => Math.max(-15,r-3))} title="Tilt left"><RotateCcw size={11}/></button>
//               <span className="il-tb-lbl">{rotation>0?"+":""}{rotation}°</span>
//               <button className="il-tb" style={{ transform:"scaleX(-1)" }} onClick={() => setRotation(r => Math.min(15,r+3))} title="Tilt right"><RotateCcw size={11}/></button>
//               <div className="il-tb-sep"/>
//               <button className="il-tb" onClick={() => { setZoom(0.66); setRotation(-2); }}
//                 style={{ width:"auto", padding:"0 9px", fontSize:8, fontFamily:"monospace", fontWeight:900, color:"rgba(255,193,7,0.5)" }}
//               >RESET</button>
//               <div className="il-tb-sep"/>
//               <button className="il-tb" onClick={dl} title="Download PDF"
//                 style={{ background:"rgba(255,193,7,0.12)", borderColor:"rgba(255,193,7,0.3)", color:"#FFC107" }}>
//                 <Download size={11}/>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // ── Shared action buttons — reused in both header rows ──────────────────────
// function ActionButtons({
//   dl, isDl, save, isSaving, compact = false,
// }: {
//   dl: () => void; isDl: boolean;
//   save: () => void; isSaving: boolean;
//   compact?: boolean;
// }) {
//   return (
//     <div style={{ display:"flex", alignItems:"center", gap:6 }}>
//       <button onClick={dl} disabled={isDl} style={{
//         display:"flex", alignItems:"center", gap:5,
//         fontSize:11, fontWeight:700,
//         padding: compact ? "5px 10px" : "6px 12px",
//         borderRadius:10, border:"1px solid rgba(255,255,255,0.14)",
//         background:"rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.75)",
//         cursor:"pointer", transition:"all 0.13s", opacity: isDl ? 0.6 : 1,
//       }}
//         onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.13)"; e.currentTarget.style.color="#fff"; }}
//         onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.07)"; e.currentTarget.style.color="rgba(255,255,255,0.75)"; }}
//       >
//         {isDl ? <Loader2 size={11} className="animate-spin"/> : <Download size={11}/>}
//         {!compact && <span>PDF</span>}
//       </button>

//       <button onClick={save} disabled={isSaving} style={{
//         display:"flex", alignItems:"center", gap:5,
//         fontSize:11, fontWeight:900,
//         padding: compact ? "5px 12px" : "6px 16px",
//         borderRadius:10, border:"none",
//         background:"#FFC107", color:"#191970",
//         cursor:"pointer", transition:"all 0.13s",
//         boxShadow:"0 4px 14px rgba(255,193,7,0.4)",
//         opacity: isSaving ? 0.7 : 1,
//       }}
//         onMouseEnter={e => { if(!isSaving) e.currentTarget.style.background="#FFD54F"; }}
//         onMouseLeave={e => { e.currentTarget.style.background="#FFC107"; }}
//       >
//         {isSaving ? <Loader2 size={11} className="animate-spin"/> : <Save size={11}/>}
//         Save
//       </button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { InvoiceForm } from "@/components/invoice/invoice-form";
import { InvoicePreview } from "@/components/invoice/invoice-preview";
import { generateInvoicePDF } from "@/lib/pdf-generator";
import { useInvoiceStore } from "@/lib/invoice-store";
import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
import { Download, Eye, Save, X, FileText, Loader2, Edit3 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Tab = "edit" | "preview";

export function InvoiceLanding() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [mobileTab, setMobileTab] = useState<Tab>("edit");

  const store = useInvoiceStore();
  const subtotal = calculateSubtotal(store.lineItems);
  const grandTotal = calculateGrandTotal(
    subtotal,
    store.taxRate,
    store.overallDiscount,
  );

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await generateInvoicePDF("invoice-preview-landing");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const result = await saveInvoiceToDb(store);
        if (result) {
          window.location.href = "/dashboard/invoices/new";
        } else {
          alert("Error saving invoice.");
        }
      } else {
        localStorage.setItem("pending_invoice", JSON.stringify(store));
        const loginUrl = new URL("/auth/login", window.location.origin);
        loginUrl.searchParams.set("next", "/dashboard/invoices/new");
        loginUrl.searchParams.set("action", "save_pending");
        window.location.href = loginUrl.toString();
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* ══ ACTION BAR ══════════════════════════════════════════════════
          FIX: Below 460px → 2 rows so buttons never overlap logo/title
          Row 1 (always): logo + title
          Row 2 (<460px): tab toggle + download + save
          ≥460px: single row as before                                   */}


      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#191970",
          boxShadow: "0 4px 20px rgba(25,25,112,0.15)",
        }}
      >
        <div className="flex flex-col @container">
          {/* Main Content Row */}
          <div className="flex items-center justify-between gap-2 px-3 py-3 sm:px-6">
            {/* 1. Title & Icon Section (Minimum width safe) */}
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: "rgba(255,193,7,0.15)" }}
              >
                <FileText size={14} style={{ color: "#FFC107" }} />
              </div>
              <div className="min-w-0  max-xs:hidden ">
                <h2 className="text-[13px] font-black text-white truncate leading-tight">
                  Builder
                </h2>
                {/* Hide sub-text below 340px to save space */}
                <p
                  className="text-[9px] hidden min-[340px]:block truncate"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Fill · Preview · Export
                </p>
              </div>
            </div>

            {/* 2. Actions Section */}
            <div className="flex items-center gap-1.5 ml-auto">
              {/* Toggle: Only visible on small screens (< 640px) */}
              <div
                className="flex sm:hidden items-center rounded-lg p-0.5"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                {(["edit", "preview"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setMobileTab(t)}
                    className="flex items-center justify-center p-1.5 rounded-md transition-all"
                    style={{
                      background: mobileTab === t ? "#FFC107" : "transparent",
                      color:
                        mobileTab === t ? "#191970" : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {t === "edit" ? <Edit3 size={12} /> : <Eye size={12} />}
                  </button>
                ))}
              </div>

              {/* Action Buttons: Preview (Desktop), Download, Save */}
              <div className="flex items-center gap-1.5">
                {/* Preview Text: Only on sm+ */}
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 text-white/80 bg-white/5 hover:bg-white/10"
                >
                  <Eye size={13} /> Preview
                </button>

                {/* Download: Icon only on mobile, text on 400px+ */}
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center justify-center gap-1.5 h-8 px-2 min-[400px]:px-3 rounded-lg border border-white/10 text-white/80 bg-white/5 hover:bg-white/10 disabled:opacity-50"
                >
                  {isDownloading ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Download size={13} />
                  )}
                  <span className="hidden min-[400px]:inline text-xs font-bold">
                    PDF
                  </span>
                </button>

                {/* Save Button: Compact on mobile */}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-xs font-black transition-transform active:scale-95 disabled:opacity-50"
                  style={{
                    background: "#FFC107",
                    color: "#191970",
                    boxShadow: "0 4px 10px rgba(255,193,7,0.2)",
                  }}
                >
                  {isSaving ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Save size={13} />
                  )}
                  <span className="hidden min-[320px]:inline">Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ CONTENT AREA ════════════════════════════════════════════════
          FIX: Wrap in a fixed-height container so form scroll does NOT
          push the preview out of view. Each panel scrolls independently.

          Mobile: tabs — edit OR preview (unchanged)
          Desktop (sm+): always show form | preview via modal (unchanged) */}

   {/* Mobile Form Tab */}
<div className={cn("sm:hidden", mobileTab === "edit" ? "block" : "hidden")}>
  <div className=""> {/* 300px par padding minimal honi chahiye */}
    <InvoiceForm />
  </div>
</div>

{/* Mobile Preview Tab */}
<div className={cn("sm:hidden  pb-6", mobileTab === "preview" ? "block" : "hidden")}>
  <div 
    className="rounded-xl overflow-hidden bg-white shadow-sm border border-black/5 origin-top"
    style={{ 
      /* 300px par preview ko thoda chota dikhana zaroori hai */
      transform: "scale(0.92)", 
      width: "108.7%", 
      marginLeft: "-4.35%" 
    }}
  >
    <InvoicePreview id="invoice-preview-landing" />
  </div>
  
  <button
    onClick={handleDownload}
    className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black active:scale-95 transition-all"
    style={{ 
      background: "#FFC107", 
      color: "#191970",
      boxShadow: "0 4px 12px rgba(255,193,7,0.3)" 
    }}
  >
    <Download size={14} /> Download PDF
  </button>
</div>


{/* Desktop: form + hidden off-screen preview for PDF */}
<div className="hidden sm:block">
  <InvoiceForm />
  
  {/* PDF Generation ke liye ye hidden rehta hai */}
  <div
    className="fixed -left-[9999px] -top-[9999px] w-[794px] opacity-0 pointer-events-none"
    aria-hidden
  >
    <InvoicePreview id="invoice-preview-landing" />
  </div>
</div>

      {/* ══ DESKTOP PREVIEW MODAL ═══════════════════════════════════════ */}
     {/* ══ DESKTOP/TABLET PREVIEW MODAL ═══════════════════════════════════════ */}
{isPreviewOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
    <div className="absolute inset-0 bg-[#191970]/70 backdrop-blur-md" onClick={() => setIsPreviewOpen(false)} />

    <div className="relative w-full max-w-4xl h-[94vh] rounded-3xl overflow-hidden flex flex-col bg-[#ECEFF1] shadow-2xl">
      
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between bg-[#191970] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center">
            <Eye size={16} className="text-[#FFC107]" />
          </div>
          <h3 className="text-sm font-black text-white">Preview Mode</h3>
        </div>
        <button onClick={() => setIsPreviewOpen(false)} className="p-2 text-white/50 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-8 bg-[#ECEFF1]">
        <div className="max-w-[794px] mx-auto shadow-xl rounded-sm overflow-hidden border border-black/5">
          <InvoicePreview id="invoice-preview-modal" />
        </div>
      </div>

      {/* Footer - SMART RESPONSIVE */}
      <div className="p-4 bg-white border-t border-black/5 flex flex-col min-[480px]:flex-row items-center justify-between gap-4">
        
        {/* Total Pill */}
        <div className="flex items-center gap-3 bg-[#ECEFF1] px-4 py-2 rounded-2xl w-full min-[480px]:w-auto border border-black/5">
          <span className="text-[10px] font-black text-[#191970]/40 uppercase tracking-tighter">Total</span>
          <span className="text-base font-black text-[#191970]">
            {store.currency} {grandTotal.toLocaleString()}
          </span>
        </div>

        {/* Buttons Group */}
        <div className="flex items-center gap-2 w-full min-[480px]:w-auto">
          <button
            onClick={() => setIsPreviewOpen(false)}
            className="flex-1 min-[480px]:flex-none px-5 py-2.5 rounded-xl text-xs font-bold border border-[#191970]/10 hover:bg-gray-50 transition-all text-[#191970]"
          >
            Edit
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-[2] min-[480px]:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black bg-[#FFC107] text-[#191970] shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

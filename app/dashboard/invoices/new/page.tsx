// "use client";

// import { useEffect, useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { useRouter } from "next/navigation";
// import { Download, Eye, Edit3 } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { supabase } from "@/lib/supabase/client";

// type Mode = "edit" | "preview";

// export default function NewInvoicePage() {
//   const [mode, setMode] = useState<Mode>("edit");
//   const [isSaving, setIsSaving] = useState(false);
//   const router = useRouter();
//   const store = useInvoiceStore();

//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(
//     subtotal,
//     store.taxRate,
//     store.overallDiscount,
//   );

//   const [nextInvoiceNo, setNextInvoiceNo] = useState<number | null>(null);

// useEffect(() => {
//   const fetchInvoiceNumber = async () => {
//     const { data: { user } } = await supabase.auth.getUser();
    
//     if (user) {
//       // Humne jo SQL function banaya tha usay call karein
//       const { data, error } = await supabase.rpc('get_next_invoice_number', {
//         target_user_id: user.id
//       });

//       if (!error) {
//         setNextInvoiceNo(data);
//         // Agar aapke pass 'store' hai toh usme bhi update kar dein
//         // setStore(prev => ({ ...prev, invoiceNumber: data }));
//       }
//     }
//   };

//   fetchInvoiceNumber();
// }, []);
//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       const result = await saveInvoiceToDb(store);
//       if (result) {
//         store.resetInvoice(); // Store reset karein after successful save
//         router.push("/dashboard");
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h1 className="text-2xl font-semibold text-slate-900">
//           Create Invoice
//         </h1>
//         <div className="flex flex-wrap gap-2">
//           <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
//             <button
//               type="button"
//               onClick={() => setMode("edit")}
//               className={cn(
//                 "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
//                 mode === "edit"
//                   ? "bg-indigo-50 text-indigo-600"
//                   : "text-slate-600 hover:bg-slate-50",
//               )}
//             >
//               <Edit3 className="h-4 w-4" /> Edit
//             </button>
//             <button
//               type="button"
//               onClick={() => setMode("preview")}
//               className={cn(
//                 "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
//                 mode === "preview"
//                   ? "bg-indigo-50 text-indigo-600"
//                   : "text-slate-600 hover:bg-slate-50",
//               )}
//             >
//               <Eye className="h-4 w-4" /> Preview
//             </button>
//           </div>
//           <Button
//             onClick={handleDownload}
//             variant="outline"
//             size="sm"
//             className="border-indigo-200 text-indigo-600"
//           >
//             <Download className="h-4 w-4 mr-2" /> Download PDF
//           </Button>
//           <Button
//             onClick={handleSave}
//             disabled={isSaving}
//             className="bg-indigo-600 hover:bg-indigo-700"
//           >
//             {isSaving ? "Saving..." : "Save Invoice"}
//           </Button>
//         </div>
//       </div>

//       <div className=" gap-8 items-start">
//         <div
//           className={cn(
//             "transition-opacity duration-200",
//             mode === "edit" ? "block" : "hidden  lg:opacity-50",
//           )}
//         >
//           <InvoiceForm />
//         </div>
//         <div
//           className={cn(
//             "transition-opacity duration-200",
//             mode === "preview" ? "block" : "hidden  lg:opacity-50",
//           )}
//         >
//           <div className="lg:sticky lg:top-24">
//             <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
//               Live Preview
//             </h2>
//             <InvoicePreview id="invoice-preview" className="shadow-lg" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { useRouter } from "next/navigation";
// import {
//   Download,
//   Eye,
//   Edit3,
//   Save,
//   FileText,
//   Loader2,
//   ArrowLeft,
//   SplitSquareHorizontal,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { supabase } from "@/lib/supabase/client";
// import Link from "next/link";

// // ─────────────────────────────────────────────
// //  COLOR THEME  (60 · 30 · 10)
// //  60% → #ECEFF1  background
// //  30% → #191970  midnight blue
// //  10% → #FFC107  amber accent
// // ─────────────────────────────────────────────

// type Tab = "edit" | "preview";

// export default function NewInvoicePage() {
//   const [tab, setTab] = useState<Tab>("edit");
//   const [isSaving, setIsSaving] = useState(false);
//   const [showPreviewPanel, setShowPreviewPanel] = useState(true);
//   const router = useRouter();
//   const store = useInvoiceStore();

//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.taxRate, store.overallDiscount);

//   // Auto-set invoice number
//   useEffect(() => {
//     const fetchInvoiceNumber = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (user) {
//         const { data, error } = await supabase.rpc("get_next_invoice_number", {
//           target_user_id: user.id,
//         });
//         if (!error) store.setField("invoiceNumber", data);
//       }
//     };
//     fetchInvoiceNumber();
//   }, []);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       const result = await saveInvoiceToDb(store);
//       if (result) {
//         store.resetInvoice();
//         router.push("/dashboard");
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div
//       className="flex flex-col min-h-screen"
//       style={{ background: "#ECEFF1" }}
//     >
//       {/* ══ TOP ACTION BAR ════════════════════════════════════════════════ */}
//       <div
//         className="sticky top-0 z-30 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 flex-shrink-0"
//         style={{
//           background: "#191970",
//           boxShadow: "0 2px 16px rgba(25,25,112,0.2)",
//         }}
//       >
//         {/* Left: back + title */}
//         <div className="flex items-center gap-3 min-w-0">
//           <Link
//             href="/dashboard"
//             className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
//             style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "rgba(255,255,255,0.14)";
//               e.currentTarget.style.color = "#fff";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "rgba(255,255,255,0.08)";
//               e.currentTarget.style.color = "rgba(255,255,255,0.6)";
//             }}
//           >
//             <ArrowLeft size={15} />
//           </Link>
//           <div className="flex items-center gap-2 min-w-0">
//             <div
//               className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
//               style={{ background: "rgba(255,193,7,0.15)" }}
//             >
//               <FileText size={13} style={{ color: "#FFC107" }} />
//             </div>
//             <span className="font-black text-sm text-white truncate">
//               New Invoice
//             </span>
//           </div>
//         </div>

//         {/* Center: mobile tab toggle (hidden on lg) */}
//         <div
//           className="flex lg:hidden items-center rounded-xl p-0.5 gap-0.5"
//           style={{ background: "rgba(255,255,255,0.08)" }}
//         >
//           {(["edit", "preview"] as Tab[]).map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black capitalize transition-all"
//               style={{
//                 background: tab === t ? "#FFC107" : "transparent",
//                 color: tab === t ? "#191970" : "rgba(255,255,255,0.55)",
//               }}
//             >
//               {t === "edit" ? <Edit3 size={11} /> : <Eye size={11} />}
//               {t}
//             </button>
//           ))}
//         </div>

//         {/* Right: actions */}
//         <div className="flex items-center gap-2">
//           {/* Toggle split panel — desktop only */}
//           <button
//             onClick={() => setShowPreviewPanel((p) => !p)}
//             className="hidden lg:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all"
//             style={{
//               background: showPreviewPanel ? "rgba(255,193,7,0.12)" : "rgba(255,255,255,0.07)",
//               borderColor: showPreviewPanel ? "rgba(255,193,7,0.3)" : "rgba(255,255,255,0.14)",
//               color: showPreviewPanel ? "#FFC107" : "rgba(255,255,255,0.6)",
//             }}
//           >
//             <SplitSquareHorizontal size={13} />
//             <span className="hidden xl:inline">Split View</span>
//           </button>

//           {/* Download */}
//           <button
//             onClick={handleDownload}
//             className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all"
//             style={{
//               background: "rgba(255,255,255,0.07)",
//               borderColor: "rgba(255,255,255,0.14)",
//               color: "rgba(255,255,255,0.75)",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "rgba(255,255,255,0.12)";
//               e.currentTarget.style.color = "#fff";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "rgba(255,255,255,0.07)";
//               e.currentTarget.style.color = "rgba(255,255,255,0.75)";
//             }}
//           >
//             <Download size={13} />
//             <span className="hidden sm:inline">Download</span>
//           </button>

//           {/* Save — amber CTA */}
//           <button
//             onClick={handleSave}
//             disabled={isSaving}
//             className="flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-xl transition-all disabled:opacity-60"
//             style={{
//               background: "#FFC107",
//               color: "#191970",
//               boxShadow: "0 4px 14px rgba(255,193,7,0.3)",
//             }}
//             onMouseEnter={(e) => { if (!isSaving) e.currentTarget.style.background = "#FFD54F"; }}
//             onMouseLeave={(e) => { e.currentTarget.style.background = "#FFC107"; }}
//           >
//             {isSaving ? (
//               <><Loader2 size={13} className="animate-spin" /> Saving...</>
//             ) : (
//               <><Save size={13} /> Save</>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* ══ MAIN SPLIT PANEL ══════════════════════════════════════════════ */}
//       <div className="flex flex-1 overflow-hidden">

//         {/* ── Left: Form (always shown on desktop, tab-controlled on mobile) ── */}
//         <div
//           className={cn(
//             "flex-1 overflow-y-auto p-4 sm:p-6",
//             // Mobile: show based on tab
//             tab === "edit" ? "block" : "hidden",
//             // Desktop: always show
//             "lg:block",
//           )}
//           style={{ minWidth: 0 }}
//         >
//           <div className="max-w-3xl mx-auto">
//             <InvoiceForm />
//           </div>
//         </div>

//         {/* ── Right: Live Preview panel (desktop split / mobile tab) ── */}
//         {showPreviewPanel && (
//           <div
//             className={cn(
//               "overflow-y-auto",
//               // Mobile: show based on tab
//               tab === "preview" ? "block" : "hidden",
//               // Desktop: always show as side panel
//               "lg:block lg:w-[460px] xl:w-[520px] flex-shrink-0",
//             )}
//             style={{
//               borderLeft: "1px solid rgba(25,25,112,0.08)",
//               background: "#E3E8EF",
//             }}
//           >
//             {/* Preview panel header */}
//             <div
//               className="sticky top-0 z-10 flex items-center justify-between px-5 py-3"
//               style={{
//                 background: "rgba(25,25,112,0.04)",
//                 borderBottom: "1px solid rgba(25,25,112,0.07)",
//               }}
//             >
//               <div className="flex items-center gap-2">
//                 <Eye size={13} style={{ color: "#FFC107" }} />
//                 <span
//                   className="text-[10px] font-black uppercase tracking-widest"
//                   style={{ color: "rgba(25,25,112,0.45)" }}
//                 >
//                   Live Preview
//                 </span>
//               </div>
//               {/* Total pill */}
//               <div
//                 className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black"
//                 style={{
//                   background: "rgba(255,193,7,0.12)",
//                   color: "#191970",
//                   border: "1px solid rgba(255,193,7,0.2)",
//                 }}
//               >
//                 <span style={{ color: "rgba(25,25,112,0.45)" }}>Total</span>
//                 <span>{store.currency} {grandTotal.toLocaleString()}</span>
//               </div>
//             </div>

//             {/* Preview content */}
//             <div className="p-4 sm:p-6">
//               <div
//                 className="rounded-2xl overflow-hidden"
//                 style={{
//                   boxShadow: "0 8px 40px rgba(25,25,112,0.12)",
//                   border: "1px solid rgba(25,25,112,0.06)",
//                 }}
//               >
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="rounded-2xl"
//                 />
//               </div>

//               {/* Download shortcut */}
//               <button
//                 onClick={handleDownload}
//                 className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all border"
//                 style={{
//                   background: "transparent",
//                   borderColor: "rgba(25,25,112,0.15)",
//                   color: "rgba(25,25,112,0.5)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "#FFC107";
//                   e.currentTarget.style.color = "#191970";
//                   e.currentTarget.style.borderColor = "#FFC107";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "transparent";
//                   e.currentTarget.style.color = "rgba(25,25,112,0.5)";
//                   e.currentTarget.style.borderColor = "rgba(25,25,112,0.15)";
//                 }}
//               >
//                 <Download size={13} />
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





















// "use client";

// import { useEffect, useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { useRouter } from "next/navigation";
// import {
//   Download, Eye, Edit3, Save, FileText,
//   Loader2, ArrowLeft, SplitSquareHorizontal,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { supabase } from "@/lib/supabase/client";
// import Link from "next/link";

// type Tab = "edit" | "preview";

// export default function NewInvoicePage() {
//   const [tab, setTab] = useState<Tab>("edit");
//   const [isSaving, setIsSaving] = useState(false);
//   const [showPreviewPanel, setShowPreviewPanel] = useState(true);
//   const router = useRouter();
//   const store = useInvoiceStore();

//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.taxRate, store.overallDiscount);

//   useEffect(() => {
//     const fetchInvoiceNumber = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (user) {
//         const { data, error } = await supabase.rpc("get_next_invoice_number", { target_user_id: user.id });
//         if (!error) store.setField("invoiceNumber", data);
//       }
//     };
//     fetchInvoiceNumber();
//   }, []);

//   const handleDownload = async () => { await generateInvoicePDF("invoice-preview"); };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       const result = await saveInvoiceToDb(store);
//       if (result) { store.resetInvoice(); router.push("/dashboard"); }
//     } finally { setIsSaving(false); }
//   };

//   return (
//     <div className="flex flex-col min-h-screen" style={{ background: "#ECEFF1" }}>

//       {/* ══ TOP ACTION BAR ════════════════════════════════════════════════
//           Layout strategy:
//           • ≥560px  → single row: [arrow+logo]  [tab-toggle]  [buttons]
//           • <560px  → two rows:
//               row1: [arrow + logo]
//               row2: [tab-toggle]  [download + save]
//           This prevents buttons from ever overlapping the logo.           */}
//       <div
//         className="sticky top-0 z-30 flex-shrink-0"
//         style={{ background: "#191970", boxShadow: "0 2px 16px rgba(25,25,112,0.2)" }}
//       >
//         {/* ── Row 1 (always visible): back arrow + page title ── */}
//         <div className="flex items-center justify-between px-4 pt-3 pb-0 min-[560px]:pb-3 min-[560px]:py-3">
//           {/* Left: arrow + logo + title */}
//           <div className="flex items-center gap-2.5 min-w-0">
//             <Link
//               href="/dashboard"
//               className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
//               style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
//               onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "#fff"; }}
//               onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
//             >
//               <ArrowLeft size={15} />
//             </Link>
//             <div
//               className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
//               style={{ background: "rgba(255,193,7,0.15)" }}
//             >
//               <FileText size={13} style={{ color: "#FFC107" }} />
//             </div>
//             <span className="font-black text-sm text-white truncate">New Invoice</span>
//           </div>

//           {/* Right side — only visible ≥560px in this row */}
//           <div className="hidden min-[560px]:flex items-center gap-2">
//             {/* Tab toggle — hidden on lg (lg has split panel instead) */}
//             <div
//               className="flex lg:hidden items-center rounded-xl p-0.5"
//               style={{ background: "rgba(255,255,255,0.08)" }}
//             >
//               {(["edit", "preview"] as Tab[]).map((t) => (
//                 <button
//                   key={t}
//                   onClick={() => setTab(t)}
//                   className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black capitalize transition-all"
//                   style={{ background: tab === t ? "#FFC107" : "transparent", color: tab === t ? "#191970" : "rgba(255,255,255,0.55)" }}
//                 >
//                   {t === "edit" ? <Edit3 size={11} /> : <Eye size={11} />}
//                   {t}
//                 </button>
//               ))}
//             </div>

//             {/* Split view — desktop only */}
//             <button
//               onClick={() => setShowPreviewPanel((p) => !p)}
//               className="hidden lg:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all"
//               style={{
//                 background: showPreviewPanel ? "rgba(255,193,7,0.12)" : "rgba(255,255,255,0.07)",
//                 borderColor: showPreviewPanel ? "rgba(255,193,7,0.3)" : "rgba(255,255,255,0.14)",
//                 color: showPreviewPanel ? "#FFC107" : "rgba(255,255,255,0.6)",
//               }}
//             >
//               <SplitSquareHorizontal size={13} />
//               <span className="hidden xl:inline">Split View</span>
//             </button>

//             {/* Download */}
//             <button
//               onClick={handleDownload}
//               className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all"
//               style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.75)" }}
//               onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#fff"; }}
//               onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
//             >
//               <Download size={13} />
//               <span className="hidden sm:inline">Download</span>
//             </button>

//             {/* Save */}
//             <button
//               onClick={handleSave}
//               disabled={isSaving}
//               className="flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-xl transition-all disabled:opacity-60"
//               style={{ background: "#FFC107", color: "#191970", boxShadow: "0 4px 14px rgba(255,193,7,0.3)" }}
//               onMouseEnter={(e) => { if (!isSaving) e.currentTarget.style.background = "#FFD54F"; }}
//               onMouseLeave={(e) => { e.currentTarget.style.background = "#FFC107"; }}
//             >
//               {isSaving ? <><Loader2 size={13} className="animate-spin" /> Saving...</> : <><Save size={13} /> Save</>}
//             </button>
//           </div>
//         </div>

//         {/* ── Row 2 (only on <560px): tab toggle + action buttons ── */}
//         <div
//           className="flex min-[560px]:hidden items-center justify-between gap-2 px-4 pb-3 pt-2"
//           style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
//         >
//           {/* Tab toggle */}
//           <div
//             className="flex items-center rounded-xl p-0.5"
//             style={{ background: "rgba(255,255,255,0.08)" }}
//           >
//             {(["edit", "preview"] as Tab[]).map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black capitalize transition-all"
//                 style={{ background: tab === t ? "#FFC107" : "transparent", color: tab === t ? "#191970" : "rgba(255,255,255,0.55)" }}
//               >
//                 {t === "edit" ? <Edit3 size={11} /> : <Eye size={11} />}
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="flex items-center gap-2">
//             {/* Download — icon only on tiny screens */}
//             <button
//               onClick={handleDownload}
//               className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-xl border transition-all"
//               style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.75)" }}
//             >
//               <Download size={13} />
//             </button>

//             {/* Save */}
//             <button
//               onClick={handleSave}
//               disabled={isSaving}
//               className="flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-xl transition-all disabled:opacity-60"
//               style={{ background: "#FFC107", color: "#191970", boxShadow: "0 4px 14px rgba(255,193,7,0.3)" }}
//               onMouseEnter={(e) => { if (!isSaving) e.currentTarget.style.background = "#FFD54F"; }}
//               onMouseLeave={(e) => { e.currentTarget.style.background = "#FFC107"; }}
//             >
//               {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
//               Save
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ══ MAIN SPLIT PANEL ══════════════════════════════════════════════ */}
//       <div className="flex flex-1 overflow-hidden">

//         {/* Left: Form */}
//         <div
//           className={cn(
//             "flex-1 overflow-y-auto p-4 sm:p-6",
//             tab === "edit" ? "block" : "hidden",
//             "lg:block",
//           )}
//           style={{ minWidth: 0 }}
//         >
//           <div className="max-w-3xl mx-auto">
//             <InvoiceForm />
//           </div>
//         </div>

//         {/* Right: Live Preview */}
//         {showPreviewPanel && (
//           <div
//             className={cn(
//               "overflow-y-auto",
//               tab === "preview" ? "block" : "hidden",
//               "lg:block lg:w-[460px] xl:w-[520px] flex-shrink-0",
//             )}
//             style={{ borderLeft: "1px solid rgba(25,25,112,0.08)", background: "#E3E8EF" }}
//           >
//             {/* Preview panel header */}
//             <div
//               className="sticky top-0 z-10 flex items-center justify-between px-5 py-3"
//               style={{ background: "rgba(25,25,112,0.04)", borderBottom: "1px solid rgba(25,25,112,0.07)" }}
//             >
//               <div className="flex items-center gap-2">
//                 <Eye size={13} style={{ color: "#FFC107" }} />
//                 <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "rgba(25,25,112,0.45)" }}>
//                   Live Preview
//                 </span>
//               </div>
//               <div
//                 className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black"
//                 style={{ background: "rgba(255,193,7,0.12)", color: "#191970", border: "1px solid rgba(255,193,7,0.2)" }}
//               >
//                 <span style={{ color: "rgba(25,25,112,0.45)" }}>Total</span>
//                 <span>{store.currency} {grandTotal.toLocaleString()}</span>
//               </div>
//             </div>

//             <div className="p-4 sm:p-6">
//               <div
//                 className="rounded-2xl overflow-hidden"
//                 style={{ boxShadow: "0 8px 40px rgba(25,25,112,0.12)", border: "1px solid rgba(25,25,112,0.06)" }}
//               >
//                 <InvoicePreview id="invoice-preview" className="rounded-2xl" />
//               </div>
//               <button
//                 onClick={handleDownload}
//                 className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all border"
//                 style={{ background: "transparent", borderColor: "rgba(25,25,112,0.15)", color: "rgba(25,25,112,0.5)" }}
//                 onMouseEnter={(e) => { e.currentTarget.style.background = "#FFC107"; e.currentTarget.style.color = "#191970"; e.currentTarget.style.borderColor = "#FFC107"; }}
//                 onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(25,25,112,0.5)"; e.currentTarget.style.borderColor = "rgba(25,25,112,0.15)"; }}
//               >
//                 <Download size={13} /> Download PDF
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



























// "use client";

// import { useEffect, useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { useRouter } from "next/navigation";
// import {
//   Download, Eye, Edit3, Save, FileText,
//   Loader2, ArrowLeft, SplitSquareHorizontal,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { supabase } from "@/lib/supabase/client";
// import Link from "next/link";

// type Tab = "edit" | "preview";

// export default function NewInvoicePage() {
//   const [tab, setTab] = useState<Tab>("edit");
//   const [isSaving, setIsSaving] = useState(false);
//   const [showPreviewPanel, setShowPreviewPanel] = useState(true);
//   const router = useRouter();
//   const store = useInvoiceStore();

//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.taxRate, store.overallDiscount);

//   useEffect(() => {
//     const fetch = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (user) {
//         const { data, error } = await supabase.rpc("get_next_invoice_number", {
//           target_user_id: user.id,
//         });
//         if (!error) store.setField("invoiceNumber", data);
//       }
//     };
//     fetch();
//   }, []);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview-new");
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       const result = await saveInvoiceToDb(store);
//       if (result) { store.resetInvoice(); router.push("/dashboard"); }
//     } finally { setIsSaving(false); }
//   };

//   return (
//     // Full height flex column — navbar + content fill viewport exactly
//     <div className="flex flex-col h-screen overflow-hidden" style={{ background: "#ECEFF1" }}>

//       {/* ══════════════════════════════════════════════════════════════════
//           STICKY NAVBAR  — z-[40] so it stays above ALL scroll content
//           Arrow button inside navbar is part of the sticky element,
//           so it can NEVER scroll behind anything.

//           Layout:
//           <560px  → 2 rows: [row1: back+logo] [row2: tabs+buttons]
//           ≥560px  → 1 row:  [back+logo]  ···  [tabs | buttons]
//       ══════════════════════════════════════════════════════════════════ */}
//       <nav
//         className="flex-shrink-0 z-[40]"
//         style={{
//           background: "#191970",
//           boxShadow: "0 2px 20px rgba(25,25,112,0.25)",
//           position: "sticky",
//           top: 0,
//         }}
//       >
//         {/* ── Row 1: back arrow + title (always) ── */}
//         <div className="flex items-center justify-between px-4 sm:px-5 pt-3 pb-0 min-[560px]:py-2.5">
//           {/* Left: arrow + icon + title */}
//           <div className="flex items-center gap-2.5 min-w-0">
//             {/* Back arrow — inside sticky nav, NEVER scrolls behind content */}
//             <Link
//               href="/dashboard"
//               className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
//               style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "rgba(255,255,255,0.18)";
//                 e.currentTarget.style.color = "#fff";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "rgba(255,255,255,0.1)";
//                 e.currentTarget.style.color = "rgba(255,255,255,0.7)";
//               }}
//             >
//               <ArrowLeft size={15} />
//             </Link>
//             <div
//               className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
//               style={{ background: "rgba(255,193,7,0.18)" }}
//             >
//               <FileText size={13} style={{ color: "#FFC107" }} />
//             </div>
//             <span className="font-black text-sm text-white truncate">New Invoice</span>
//           </div>

//           {/* Right side — only on ≥560px in row 1 */}
//           <div className="hidden min-[560px]:flex items-center gap-2">
//             {/* Tab toggle — visible on md but not lg (lg has split panel) */}
//             <div
//               className="flex lg:hidden items-center rounded-xl p-0.5"
//               style={{ background: "rgba(255,255,255,0.08)" }}
//             >
//               {(["edit", "preview"] as Tab[]).map((t) => (
//                 <button
//                   key={t}
//                   onClick={() => setTab(t)}
//                   className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black capitalize transition-all"
//                   style={{
//                     background: tab === t ? "#FFC107" : "transparent",
//                     color: tab === t ? "#191970" : "rgba(255,255,255,0.55)",
//                   }}
//                 >
//                   {t === "edit" ? <Edit3 size={11} /> : <Eye size={11} />}{t}
//                 </button>
//               ))}
//             </div>

//             {/* Split view toggle — lg+ only */}
//             <button
//               onClick={() => setShowPreviewPanel(p => !p)}
//               className="hidden lg:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all"
//               style={{
//                 background: showPreviewPanel ? "rgba(255,193,7,0.12)" : "rgba(255,255,255,0.07)",
//                 borderColor: showPreviewPanel ? "rgba(255,193,7,0.3)" : "rgba(255,255,255,0.14)",
//                 color: showPreviewPanel ? "#FFC107" : "rgba(255,255,255,0.6)",
//               }}
//             >
//               <SplitSquareHorizontal size={13} />
//               <span className="hidden xl:inline ml-1">Split View</span>
//             </button>

//             {/* Download */}
//             <button
//               onClick={handleDownload}
//               className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all"
//               style={{
//                 background: "rgba(255,255,255,0.07)",
//                 borderColor: "rgba(255,255,255,0.14)",
//                 color: "rgba(255,255,255,0.75)",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "rgba(255,255,255,0.13)";
//                 e.currentTarget.style.color = "#fff";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "rgba(255,255,255,0.07)";
//                 e.currentTarget.style.color = "rgba(255,255,255,0.75)";
//               }}
//             >
//               <Download size={13} />
//               <span className="hidden sm:inline ml-1">Download</span>
//             </button>

//             {/* Save — amber CTA */}
//             <button
//               onClick={handleSave}
//               disabled={isSaving}
//               className="flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-xl transition-all disabled:opacity-60"
//               style={{
//                 background: "#FFC107",
//                 color: "#191970",
//                 boxShadow: "0 4px 14px rgba(255,193,7,0.35)",
//               }}
//               onMouseEnter={(e) => { if (!isSaving) e.currentTarget.style.background = "#FFD54F"; }}
//               onMouseLeave={(e) => { e.currentTarget.style.background = "#FFC107"; }}
//             >
//               {isSaving
//                 ? <><Loader2 size={13} className="animate-spin" />Saving...</>
//                 : <><Save size={13} />Save</>
//               }
//             </button>
//           </div>
//         </div>

//         {/* ── Row 2: <560px only — tabs + buttons ── */}
//         <div
//           className="flex min-[560px]:hidden items-center justify-between gap-2 px-4 pb-2.5 pt-2"
//           style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
//         >
//           <div
//             className="flex items-center rounded-xl p-0.5"
//             style={{ background: "rgba(255,255,255,0.08)" }}
//           >
//             {(["edit", "preview"] as Tab[]).map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black capitalize transition-all"
//                 style={{
//                   background: tab === t ? "#FFC107" : "transparent",
//                   color: tab === t ? "#191970" : "rgba(255,255,255,0.55)",
//                 }}
//               >
//                 {t === "edit" ? <Edit3 size={11} /> : <Eye size={11} />}{t}
//               </button>
//             ))}
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={handleDownload}
//               className="flex items-center px-2.5 py-1.5 rounded-xl border transition-all"
//               style={{
//                 background: "rgba(255,255,255,0.07)",
//                 borderColor: "rgba(255,255,255,0.14)",
//                 color: "rgba(255,255,255,0.75)",
//               }}
//             >
//               <Download size={13} />
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={isSaving}
//               className="flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-xl transition-all disabled:opacity-60"
//               style={{ background: "#FFC107", color: "#191970" }}
//             >
//               {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
//               Save
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* ══════════════════════════════════════════════════════════════════
//           MAIN CONTENT — flex-1, each panel scrolls independently
          
//           Desktop (lg+):
//             showPreviewPanel=true  → LEFT flex-1 | RIGHT flex-1  (true 50/50)
//             showPreviewPanel=false → single column, form full width
          
//           Tablet (<lg):
//             Tab-controlled: edit OR preview, full width
//       ══════════════════════════════════════════════════════════════════ */}
//       <div className="flex flex-1 min-h-0   max-lg:block ">

//         {/* ── LEFT PANEL: Invoice Form ── */}
//         <div
//           className={cn(
//             "overflow-y-auto",
//             // Mobile/tablet: show only on edit tab
//             tab === "edit" ? "flex" : "hidden",
//             // Desktop: always show, take half the width
//             "lg:flex lg:flex-1",
//           )}
//           style={{ minWidth: 0, flexDirection: "column" }}
//         >
//           <div className="flex-1 p-4 sm:p-5 lg:p-6">
//             <div className="max-w-2xl mx-auto">
//               <InvoiceForm />
//             </div>
//           </div>
//         </div>

//         {/* ── RIGHT PANEL: Live Invoice Preview ── */}
//         {showPreviewPanel && (
//           <div
//             className={cn(
//               "overflow-y-auto flex flex-col",
//               // Mobile/tablet: show only on preview tab
//               tab === "preview" ? "flex" : "hidden",
//               // Desktop: always show, take half the width
//               "lg:flex lg:flex-1",
//             )}
//             style={{
//               minWidth: 0,
//               borderLeft: "1px solid rgba(25,25,112,0.1)",
//               background: "#DDE3EA",
//             }}
//           >
//             {/* Panel header — sticky within this scrollable column */}
//             <div
//               className="sticky top-0 z-10 flex items-center justify-between px-5 py-2.5 flex-shrink-0"
//               style={{
//                 background: "rgba(221,227,234,0.92)",
//                 backdropFilter: "blur(8px)",
//                 borderBottom: "1px solid rgba(25,25,112,0.09)",
//               }}
//             >
//               <div className="flex items-center gap-2">
//                 <span
//                   className="w-2 h-2 rounded-full"
//                   style={{
//                     background: "#FFC107",
//                     boxShadow: "0 0 6px rgba(255,193,7,0.8)",
//                   }}
//                 />
//                 <Eye size={12} style={{ color: "rgba(25,25,112,0.5)" }} />
//                 <span
//                   className="text-[9px] font-black uppercase tracking-widest"
//                   style={{ color: "rgba(25,25,112,0.45)" }}
//                 >
//                   Live Preview
//                 </span>
//               </div>
//               {/* Running total */}
//               <div
//                 className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black"
//                 style={{
//                   background: "rgba(255,193,7,0.15)",
//                   color: "#191970",
//                   border: "1px solid rgba(255,193,7,0.3)",
//                 }}
//               >
//                 <span style={{ fontWeight: 400, color: "rgba(25,25,112,0.5)" }}>Total</span>
//                 <span>{store.currency} {grandTotal.toLocaleString()}</span>
//               </div>
//             </div>

//             {/* The invoice "paper" — centered with shadow to look like a document */}
//             <div className="flex-1 p-5 xl:p-8">
//               <div
//                 style={{
//                   maxWidth: "640px",
//                   margin: "0 auto",
//                   borderRadius: "12px",
//                   overflow: "hidden",
//                   /* Paper-like shadow */
//                   boxShadow:
//                     "0 1px 3px rgba(25,25,112,0.06), " +
//                     "0 8px 24px rgba(25,25,112,0.1), " +
//                     "0 32px 64px rgba(25,25,112,0.08)",
//                 }}
//               >
//                 <InvoicePreview id="invoice-preview-new" />
//               </div>

//               {/* Download shortcut below preview */}
//               <div style={{ maxWidth: "640px", margin: "12px auto 0" }}>
//                 <button
//                   onClick={handleDownload}
//                   className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all"
//                   style={{
//                     background: "rgba(25,25,112,0.06)",
//                     color: "rgba(25,25,112,0.5)",
//                     border: "1px solid rgba(25,25,112,0.1)",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "#FFC107";
//                     e.currentTarget.style.color = "#191970";
//                     e.currentTarget.style.borderColor = "#FFC107";
//                     e.currentTarget.style.boxShadow = "0 4px 14px rgba(255,193,7,0.3)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "rgba(25,25,112,0.06)";
//                     e.currentTarget.style.color = "rgba(25,25,112,0.5)";
//                     e.currentTarget.style.borderColor = "rgba(25,25,112,0.1)";
//                     e.currentTarget.style.boxShadow = "none";
//                   }}
//                 >
//                   <Download size={13} />
//                   Download PDF
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






















// "use client";

// import { useEffect, useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { useRouter } from "next/navigation";
// import {
//   Download, Eye, Edit3, Save, FileText,
//   Loader2, ArrowLeft, SplitSquareHorizontal,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { supabase } from "@/lib/supabase/client";
// import Link from "next/link";

// type Tab = "edit" | "preview";

// export default function NewInvoicePage() {
//   const [tab, setTab] = useState<Tab>("edit");
//   const [isSaving, setIsSaving] = useState(false);
//   const [showPreviewPanel, setShowPreviewPanel] = useState(true);
//   const router = useRouter();
//   const store = useInvoiceStore();

//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.taxRate, store.overallDiscount);

//   useEffect(() => {
//     const fetch = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (user) {
//         const { data, error } = await supabase.rpc("get_next_invoice_number", {
//           target_user_id: user.id,
//         });
//         if (!error) store.setField("invoiceNumber", data);
//       }
//     };
//     fetch();
//   }, []);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview-new");
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       const result = await saveInvoiceToDb(store);
//       if (result) { store.resetInvoice(); router.push("/dashboard"); }
//     } finally { setIsSaving(false); }
//   };

//   return (
//     // FIX 1: h-[100dvh] for mobile browsers to avoid address bar issues
//     <div className="flex flex-col h-[100dvh] w-full overflow-hidden" style={{ background: "#ECEFF1" }}>

//       {/* STICKY NAVBAR */}
//       <nav
//         className="flex-shrink-0 z-[40]"
//         style={{
//           background: "#191970",
//           boxShadow: "0 2px 20px rgba(25,25,112,0.25)",
//         }}
//       >
//         {/* Row 1: back arrow + title */}
//         <div className="flex items-center justify-between px-4 sm:px-5 py-2.5">
//           <div className="flex items-center gap-2.5 min-w-0">
//             <Link
//               href="/dashboard"
//               className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:bg-white/20 text-white/70 hover:text-white"
//               style={{ background: "rgba(255,255,255,0.1)" }}
//             >
//               <ArrowLeft size={15} />
//             </Link>
//             <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-400/20">
//               <FileText size={13} className="text-amber-400" />
//             </div>
//             <span className="font-black text-sm text-white truncate">New Invoice</span>
//           </div>

//           {/* Buttons Group Desktop */}
//           <div className="hidden min-[560px]:flex items-center gap-2">
//             <button
//               onClick={() => setShowPreviewPanel(p => !p)}
//               className="hidden md:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 hover:border-amber-400/50 text-white/60 hover:text-amber-400 transition-all"
//             >
//               <SplitSquareHorizontal size={13} />
//               <span className=" ">Split View</span>
//             </button>

//             <button onClick={handleDownload} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/10 transition-all">
//               <Download size={13} /> <span>Download</span>
//             </button>

//             <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-xl bg-amber-400 text-[#191970] hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20">
//               {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />} Save
//             </button>
//           </div>
//         </div>

//         {/* Row 2: Mobile Tabs */}
//         <div className="flex min-[560px]:hidden items-center justify-between gap-2 px-4 pb-2.5 pt-1 border-t border-white/5">
//           <div className="flex bg-white/5 p-0.5 rounded-xl">
//             {(["edit", "preview"] as Tab[]).map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={cn(
//                   "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-black capitalize transition-all",
//                   tab === t ? "bg-amber-400 text-[#191970]" : "text-white/50"
//                 )}
//               >
//                 {t === "edit" ? <Edit3 size={11} /> : <Eye size={11} />}{t}
//               </button>
//             ))}
//           </div>
//           <div className="flex gap-2">
//             <button onClick={handleDownload} className="p-2 rounded-xl bg-white/10 text-white/70"><Download size={14} /></button>
//             <button onClick={handleSave} disabled={isSaving} className="px-4 py-1.5 rounded-xl bg-amber-400 text-[#191970] font-black text-xs">Save</button>
//           </div>
//         </div>
//       </nav>

//       {/* MAIN CONTENT AREA */}
//       {/* FIX 2: lg:flex-row aur flex-1 min-h-0 taake height control mein rahe */}
//       <main className="flex flex-1 flex-col lg:flex-row min-h-0 w-full overflow-hidden">
        
//         {/* LEFT PANEL: Form */}
//         <div
//           className={cn(
//             "flex-1 overflow-y-auto custom-scrollbar h-full",
//             tab === "edit" ? "block" : "hidden lg:block"
//           )}
//         >
//           <div className="p-4 sm:p-6 max-w-3xl mx-auto pb-20 lg:pb-10">
//             <InvoiceForm />
//           </div>
//         </div>

//         {/* RIGHT PANEL: Live Preview */}
//         {showPreviewPanel && (
//           <div
//             className={cn(
//               "flex-1 overflow-y-auto custom-scrollbar h-full bg-[#DDE3EA] border-l border-navy-900/5",
//               tab === "preview" ? "flex flex-col" : "hidden lg:flex lg:flex-col"
//             )}
//           >
//             {/* Live Preview Header */}
//             <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-[#DDE3EA]/90 backdrop-blur-md border-b border-navy-900/10">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
//                 <span className="text-[10px] font-black uppercase tracking-widest text-[#191970]/50">Live Preview</span>
//               </div>
//               <div className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-[#191970] text-[10px] font-black">
//                 {store.currency} {grandTotal.toLocaleString()}
//               </div>
//             </div>

//             {/* Paper Wrapper */}
//             <div className="p-4 sm:p-8 flex-1">
//               <div className="max-w-[700px] mx-auto shadow-2xl shadow-navy-900/20 rounded-xl overflow-hidden bg-white">
//                 <InvoicePreview id="invoice-preview-new" />
//               </div>
              
//               <div className="max-w-[700px] mx-auto mt-6 mb-10">
//                 <button
//                   onClick={handleDownload}
//                   className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#191970]/5 border border-[#191970]/10 text-[#191970]/60 font-black text-xs hover:bg-amber-400 hover:text-[#191970] transition-all"
//                 >
//                   <Download size={14} /> Download PDF
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       <style jsx global>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 5px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(25, 25, 112, 0.1); border-radius: 10px; }
//         .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(25, 25, 112, 0.2); }
//       `}</style>
//     </div>
//   );
// }





















"use client";

import { useEffect, useState } from "react";
import { InvoiceForm } from "@/components/invoice/invoice-form";
import { InvoicePreview } from "@/components/invoice/invoice-preview";
import { generateInvoicePDF } from "@/lib/pdf-generator";
import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
import { useInvoiceStore } from "@/lib/invoice-store";
import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
import { useRouter } from "next/navigation";
import {
  Download, Eye, Edit3, Save, FileText,
  Loader2, ArrowLeft, SplitSquareHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

type Tab = "edit" | "preview";

export default function NewInvoicePage() {
  const [tab, setTab] = useState<Tab>("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [showPreviewPanel, setShowPreviewPanel] = useState(true);
  const router = useRouter();
  const store = useInvoiceStore();

  const subtotal = calculateSubtotal(store.lineItems);
  const grandTotal = calculateGrandTotal(subtotal, store.taxRate, store.overallDiscount);

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.rpc("get_next_invoice_number", {
          target_user_id: user.id,
        });
        if (!error) store.setField("invoiceNumber", data);
      }
    };
    fetch();
  }, []);

  const handleDownload = async () => {
    await generateInvoicePDF("invoice-preview-new");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await saveInvoiceToDb(store);
      if (result) { store.resetInvoice(); router.push("/dashboard"); }
    } finally { setIsSaving(false); }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden" style={{ background: "#ECEFF1" }}>

      {/* ── NAVBAR ── */}
      <nav className="flex-shrink-0 z-[40]" style={{ background: "#191970", boxShadow: "0 2px 20px rgba(25,25,112,0.25)" }}>
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <Link href="/dashboard" className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all">
              <ArrowLeft size={15} />
            </Link>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-400/20">
              <FileText size={13} className="text-amber-400" />
            </div>
            <span className="font-black text-sm text-white truncate">New Invoice</span>
          </div>

          {/* Desktop Controls (≥1024px) */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setShowPreviewPanel(p => !p)}
              className={cn(
                "flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all",
                showPreviewPanel ? "bg-amber-400/10 border-amber-400/50 text-amber-400" : "border-white/10 text-white/60 hover:text-white"
              )}
            >
              <SplitSquareHorizontal size={13} /> Split View
            </button>
            <button onClick={handleDownload} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/10 transition-all">
              <Download size={13} /> Download
            </button>
            <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-xl bg-amber-400 text-[#191970] hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20">
              {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />} Save
            </button>
          </div>

          {/* Tablet/Mobile Controls (<1024px) - Only Save/Download icons to save space */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={handleDownload} className="p-2 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 transition-all">
              <Download size={16} />
            </button>
            <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-400 text-[#191970] font-black text-xs">
               {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
               <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>

        {/* ── Mobile/Tablet TABS (<1024px Only) ── */}
        <div className="lg:hidden flex items-center justify-center pb-2.5 px-4">
          <div className="flex bg-white/5 p-0.5 rounded-xl w-full max-w-[400px]">
            {(["edit", "preview"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-black capitalize transition-all",
                  tab === t ? "bg-amber-400 text-[#191970]" : "text-white/50 hover:text-white/80"
                )}
              >
                {t === "edit" ? <Edit3 size={12} /> : <Eye size={12} />} {t}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex flex-1 min-h-0 w-full overflow-hidden relative">
        
        {/* LEFT PANEL: Form */}
        <div
          className={cn(
            "flex-1 overflow-y-auto custom-scrollbar h-full bg-[#ECEFF1]",
            // Mobile: dikhao agar 'edit' tab ho. Desktop: hamesha dikhao.
            tab === "edit" ? "block" : "hidden lg:block"
          )}
        >
          <div className="p-4 sm:p-6 lg:p-10 max-w-3xl mx-auto pb-32">
            <InvoiceForm />
          </div>
        </div>

        {/* RIGHT PANEL: Live Preview */}
        <div
          className={cn(
            "flex-1 overflow-y-auto custom-scrollbar h-full bg-[#DDE3EA] border-l border-black/5",
            // Tablet/Mobile: dikhao agar 'preview' tab ho. 
            // Desktop: dikhao agar 'showPreviewPanel' true ho.
            tab === "preview" ? "block" : (showPreviewPanel ? "hidden lg:block" : "hidden")
          )}
        >
          {/* Preview Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-[#DDE3EA]/90 backdrop-blur-md border-b border-black/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#191970]/50">Live Preview</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-[#191970] text-[10px] font-black">
              {store.currency} {grandTotal.toLocaleString()}
            </div>
          </div>

          {/* Paper UI */}
          <div className="p-4 sm:p-8 lg:p-12">
            <div className="max-w-[800px] mx-auto shadow-2xl shadow-navy-900/10 rounded-xl overflow-hidden bg-white">
              <InvoicePreview id="invoice-preview-new" />
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(25, 25, 112, 0.1); border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(25, 25, 112, 0.2); }
      `}</style>
    </div>
  );
}
// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { saveInvoiceToDb, fetchInvoiceById } from "@/lib/supabase/invoices-client";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { useRouter } from "next/navigation";
// import { Download, Eye, Edit3 } from "lucide-react";
// import { cn } from "@/lib/utils";

// type Mode = "edit" | "preview";

// export default function EditInvoicePage() {
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const id = params.id as string;
//   const doDownload = searchParams.get("download") === "1";
//   const [mode, setMode] = useState<Mode>("edit");
//   const [loaded, setLoaded] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const router = useRouter();
//   const store = useInvoiceStore();

//   useEffect(() => {
//     fetchInvoiceById(id).then((inv) => {
//       if (inv) store.loadInvoice(inv);
//       setLoaded(true);
//     });
//   }, [id]);

//   useEffect(() => {
//     if (loaded && doDownload) generateInvoicePDF("invoice-preview");
//   }, [loaded, doDownload]);

//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.taxRate, store.overallDiscount);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     store.setField("id", id);
//     setIsSaving(true);
//     try {
//       await saveInvoiceToDb({ ...store, id }, );
//       localStorage.removeItem("invoice-generator-data"); // Local storage se data remove karein after save
//       router.push("/dashboard");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (!loaded) return <div className="p-8 text-center">Loading...</div>;

//   return (
//     <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h1 className="text-2xl font-semibold text-slate-900">Edit Invoice #{store.invoiceNumber}</h1>
//         <div className="flex flex-wrap gap-2">
//           <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
//             <button type="button" onClick={() => setMode("edit")} className={cn("flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === "edit" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50")}>
//               <Edit3 className="h-4 w-4" /> Edit
//             </button>
//             <button type="button" onClick={() => setMode("preview")} className={cn("flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === "preview" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50")}>
//               <Eye className="h-4 w-4" /> Preview
//             </button>
//           </div>
//           <Button onClick={handleDownload} variant="outline" size="sm" className="border-indigo-200 text-indigo-600">
//             <Download className="h-4 w-4 mr-2" /> Download PDF
//           </Button>
//           <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700">
//             {isSaving ? "Saving..." : "Save"}
//           </Button>
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-8 items-start">
//         <div className={cn("transition-opacity duration-200", mode === "edit" ? "block" : "hidden lg:block lg:opacity-50")}>
//           <InvoiceForm />
//         </div>
//         <div className={cn("transition-opacity duration-200", mode === "preview" ? "block" : "hidden lg:block lg:opacity-50")}>
//           <div className="lg:sticky lg:top-24">
//             <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Preview</h2>
//             <InvoicePreview id="invoice-preview" className="shadow-lg" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { saveInvoiceToDb, fetchInvoiceById } from "@/lib/supabase/invoices-client";
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
// import Link from "next/link";

// // ─────────────────────────────────────────────
// //  COLOR THEME  (60 · 30 · 10)
// //  60% → #ECEFF1  background
// //  30% → #191970  midnight blue
// //  10% → #FFC107  amber accent
// // ─────────────────────────────────────────────

// type Tab = "edit" | "preview";

// export default function EditInvoicePage() {
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const id = params.id as string;
//   const doDownload = searchParams.get("download") === "1";

//   const [tab, setTab] = useState<Tab>("edit");
//   const [showPreviewPanel, setShowPreviewPanel] = useState(true);
//   const [loaded, setLoaded] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   const router = useRouter();
//   const store = useInvoiceStore();

//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.taxRate, store.overallDiscount);

//   useEffect(() => {
//     fetchInvoiceById(id).then((inv) => {
//       if (inv) store.loadInvoice(inv);
//       setLoaded(true);
//     });
//   }, [id]);

//   useEffect(() => {
//     if (loaded && doDownload) generateInvoicePDF("invoice-preview");
//   }, [loaded, doDownload]);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     store.setField("id", id);
//     setIsSaving(true);
//     try {
//       await saveInvoiceToDb({ ...store, id });
//       localStorage.removeItem("invoice-generator-data");
//       router.push("/dashboard");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // ── Loading state ─────────────────────────────────────────────────────────
//   if (!loaded) {
//     return (
//       <div
//         className="flex flex-col items-center justify-center min-h-screen gap-3"
//         style={{ background: "#ECEFF1" }}
//       >
//         <div
//           className="w-12 h-12 rounded-2xl flex items-center justify-center"
//           style={{ background: "#191970" }}
//         >
//           <Loader2 size={20} className="animate-spin" style={{ color: "#FFC107" }} />
//         </div>
//         <p className="text-sm font-bold" style={{ color: "rgba(25,25,112,0.5)" }}>
//           Loading invoice...
//         </p>
//       </div>
//     );
//   }

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
//               Edit Invoice{" "}
//               <span style={{ color: "#FFC107" }}>#{store.invoiceNumber}</span>
//             </span>
//           </div>
//         </div>

//         {/* Center: mobile tab toggle */}
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
//           {/* Split view toggle — desktop only */}
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

//           {/* Save */}
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

//         {/* ── Left: Form ── */}
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

//         {/* ── Right: Live Preview ── */}
//         {showPreviewPanel && (
//           <div
//             className={cn(
//               "overflow-y-auto",
//               tab === "preview" ? "block" : "hidden",
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
//                 className="rounded-2xl "
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

// import { useState, useEffect } from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { saveInvoiceToDb, fetchInvoiceById } from "@/lib/supabase/invoices-client";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { useRouter } from "next/navigation";
// import {
//   Download, Eye, Edit3, Save, FileText,
//   Loader2, ArrowLeft, SplitSquareHorizontal,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import Link from "next/link";

// type Tab = "edit" | "preview";

// export default function EditInvoicePage() {
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const id = params.id as string;
//   const doDownload = searchParams.get("download") === "1";

//   const [tab, setTab] = useState<Tab>("edit");
//   const [showPreviewPanel, setShowPreviewPanel] = useState(true);
//   const [loaded, setLoaded] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   const router = useRouter();
//   const store = useInvoiceStore();

//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.taxRate, store.overallDiscount);

//   useEffect(() => {
//     fetchInvoiceById(id).then((inv) => {
//       if (inv) store.loadInvoice(inv);
//       setLoaded(true);
//     });
//   }, [id]);

//   useEffect(() => {
//     if (loaded && doDownload) generateInvoicePDF("invoice-preview-edit");
//   }, [loaded, doDownload]);

//   const handleDownload = async () => { await generateInvoicePDF("invoice-preview-edit"); };

//   const handleSave = async () => {
//     store.setField("id", id);
//     setIsSaving(true);
//     try {
//       await saveInvoiceToDb({ ...store, id });
//       localStorage.removeItem("invoice-generator-data");
//       router.push("/dashboard");
//     } finally { setIsSaving(false); }
//   };

//   if (!loaded) {
//     return (
//       <div
//         className="flex flex-col items-center justify-center h-screen gap-3"
//         style={{ background: "#ECEFF1" }}
//       >
//         <div
//           className="w-12 h-12 rounded-2xl flex items-center justify-center"
//           style={{ background: "#191970" }}
//         >
//           <Loader2 size={20} className="animate-spin" style={{ color: "#FFC107" }} />
//         </div>
//         <p className="text-sm font-bold" style={{ color: "rgba(25,25,112,0.5)" }}>
//           Loading invoice...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen overflow-hidden" style={{ background: "#ECEFF1" }}>

//       {/* ══ STICKY NAVBAR — z-[40], arrow always stays here ══ */}
//       <nav
//         className="flex-shrink-0 z-[40]"
//         style={{
//           background: "#191970",
//           boxShadow: "0 2px 20px rgba(25,25,112,0.25)",
//           position: "sticky",
//           top: 0,
//         }}
//       >
//         {/* Row 1: arrow + logo + title | controls (≥560px) */}
//         <div className="flex items-center justify-between px-4 sm:px-5 pt-3 pb-0 min-[560px]:py-2.5">
//           <div className="flex items-center gap-2.5 min-w-0">
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
//             <span className="font-black text-sm text-white truncate">
//               Edit <span style={{ color: "#FFC107" }}>#{store.invoiceNumber}</span>
//             </span>
//           </div>

//           {/* ≥560px controls */}
//           <div className="hidden min-[560px]:flex items-center gap-2">
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

//         {/* Row 2: <560px — tabs + buttons */}
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

//       {/* ══ SPLIT CONTENT ══ */}
//       <div className="flex flex-1 min-h-0 max-lg:block">

//         {/* Left: Form */}
//         <div
//           className={cn(
//             "overflow-y-auto flex flex-col",
//             tab === "edit" ? "flex" : "hidden",
//             "lg:flex lg:flex-1",
//           )}
//           style={{ minWidth: 0 }}
//         >
//           <div className="flex-1 p-4 sm:p-5 lg:p-6">
//             <div className="max-w-2xl mx-auto">
//               <InvoiceForm />
//             </div>
//           </div>
//         </div>

//         {/* Right: Preview */}
//         {showPreviewPanel && (
//           <div
//             className={cn(
//               "overflow-y-auto flex flex-col",
//               tab === "preview" ? "flex" : "hidden",
//               "lg:flex lg:flex-1",
//             )}
//             style={{
//               minWidth: 0,
//               borderLeft: "1px solid rgba(25,25,112,0.1)",
//               background: "#DDE3EA",
//             }}
//           >
//             {/* Panel header */}
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
//                   style={{ background: "#FFC107", boxShadow: "0 0 6px rgba(255,193,7,0.8)" }}
//                 />
//                 <Eye size={12} style={{ color: "rgba(25,25,112,0.5)" }} />
//                 <span
//                   className="text-[9px] font-black uppercase tracking-widest"
//                   style={{ color: "rgba(25,25,112,0.45)" }}
//                 >
//                   Live Preview
//                 </span>
//               </div>
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

//             <div className="flex-1 p-5 xl:p-8">
//               <div
//                 style={{
//                   maxWidth: "640px",
//                   margin: "0 auto",
//                   borderRadius: "12px",
//                   overflow: "hidden",
//                   boxShadow:
//                     "0 1px 3px rgba(25,25,112,0.06), " +
//                     "0 8px 24px rgba(25,25,112,0.1), " +
//                     "0 32px 64px rgba(25,25,112,0.08)",
//                 }}
//               >
//                 <InvoicePreview id="invoice-preview-edit" />
//               </div>

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








"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { InvoiceForm } from "@/components/invoice/invoice-form";
import { InvoicePreview } from "@/components/invoice/invoice-preview";
import { generateInvoicePDF } from "@/lib/pdf-generator";
import { saveInvoiceToDb, fetchInvoiceById } from "@/lib/supabase/invoices-client";
import { useInvoiceStore } from "@/lib/invoice-store";
import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
import { useRouter } from "next/navigation";
import {
  Download, Eye, Edit3, Save, FileText,
  Loader2, ArrowLeft, SplitSquareHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Tab = "edit" | "preview";

export default function EditInvoicePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const doDownload = searchParams.get("download") === "1";

  const [tab, setTab] = useState<Tab>("edit");
  const [showPreviewPanel, setShowPreviewPanel] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();
  const store = useInvoiceStore();

  const subtotal = calculateSubtotal(store.lineItems);
  const grandTotal = calculateGrandTotal(subtotal, store.taxRate, store.overallDiscount);

  useEffect(() => {
    fetchInvoiceById(id).then((inv) => {
      if (inv) store.loadInvoice(inv);
      setLoaded(true);
    });
  }, [id]);

  useEffect(() => {
    if (loaded && doDownload) generateInvoicePDF("invoice-preview-edit");
  }, [loaded, doDownload]);

  const handleDownload = async () => { await generateInvoicePDF("invoice-preview-edit"); };

  const handleSave = async () => {
    store.setField("id", id);
    setIsSaving(true);
    try {
      await saveInvoiceToDb({ ...store, id });
      localStorage.removeItem("invoice-generator-data");
      router.push("/dashboard");
    } finally { setIsSaving(false); }
  };

  if (!loaded) {
    return (
      <div className="flex flex-col items-center justify-center h-[100dvh] gap-3" style={{ background: "#ECEFF1" }}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#191970" }}>
          <Loader2 size={20} className="animate-spin text-amber-400" />
        </div>
        <p className="text-sm font-bold opacity-50" style={{ color: "#191970" }}>Loading invoice...</p>
      </div>
    );
  }

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
            <span className="font-black text-sm text-white truncate">
              Edit <span className="text-amber-400">#{store.invoiceNumber}</span>
            </span>
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

          {/* Tablet/Mobile Actions icon only (<1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={handleDownload} className="p-2 rounded-xl bg-white/10 text-white/70">
              <Download size={16} />
            </button>
            <button onClick={handleSave} disabled={isSaving} className="px-4 py-1.5 rounded-xl bg-amber-400 text-[#191970] font-black text-xs">
              {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            </button>
          </div>
        </div>

        {/* ── Tabs for Tablet/Mobile (<1024px) ── */}
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
            tab === "preview" ? "block" : (showPreviewPanel ? "hidden lg:block" : "hidden")
          )}
        >
          {/* Header for Preview */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-[#DDE3EA]/90 backdrop-blur-md border-b border-black/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#191970]/50">Live Preview</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-[#191970] text-[10px] font-black">
              {store.currency} {grandTotal.toLocaleString()}
            </div>
          </div>

          {/* Paper View */}
          <div className="p-4 sm:p-8 lg:p-12">
            <div className="max-w-[800px] mx-auto shadow-2xl shadow-navy-900/10 rounded-xl overflow-hidden bg-white">
              <InvoicePreview id="invoice-preview-edit" />
            </div>
            
            {/* Quick action button for mobile preview tab */}
            <div className="lg:hidden max-w-[800px] mx-auto mt-6">
               <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#191970]/5 border border-[#191970]/10 text-[#191970]/60 font-black text-xs"
                >
                  <Download size={14} /> Download PDF
                </button>
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
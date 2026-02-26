// // "use client";

// // import { useState } from "react";
// // import { InvoiceForm } from "@/components/invoice/invoice-form";
// // import { InvoicePreview } from "@/components/invoice/invoice-preview";
// // import { Button } from "@/components/ui/button";
// // import { generateInvoicePDF } from "@/lib/pdf-generator";
// // import { useInvoiceStore } from "@/lib/invoice-store";
// // import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// // import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// // import { Download, Eye, Edit3 } from "lucide-react";
// // import { cn } from "@/lib/utils";

// // type Mode = "edit" | "preview";

// // export function InvoiceLanding() {
// //   const [mode, setMode] = useState<Mode>("edit");
// //   const store = useInvoiceStore();
// //   const subtotal = calculateSubtotal(store.lineItems);
// //   const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

// //   const handleDownload = async () => {
// //     await generateInvoicePDF("invoice-preview");
// //   };

// //   const handleSave = async () => {
// //     const result = await saveInvoiceToDb(store, grandTotal);
// //     if (result) {
// //       window.location.href = "/dashboard";
// //     } else {
// //       window.location.href = "/auth/login?next=/dashboard";
// //     }
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //         <h2 className="text-xl font-semibold text-slate-900">Live Invoice Form</h2>
// //         <div className="flex flex-wrap gap-2">
// //           <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
// //             <button
// //               type="button"
// //               onClick={() => setMode("edit")}
// //               className={cn(
// //                 "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
// //                 mode === "edit" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
// //               )}
// //             >
// //               <Edit3 className="h-4 w-4" /> Edit
// //             </button>
// //             <button
// //               type="button"
// //               onClick={() => setMode("preview")}
// //               className={cn(
// //                 "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
// //                 mode === "preview" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
// //               )}
// //             >
// //               <Eye className="h-4 w-4" /> Preview
// //             </button>
// //           </div>
// //           <Button onClick={handleDownload} variant="outline" size="sm" className="border-indigo-200 text-indigo-600">
// //             <Download className="h-4 w-4 mr-2" /> Download PDF
// //           </Button>
// //           <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
// //             Save to Account
// //           </Button>
// //         </div>
// //       </div>

// //       <div className="grid lg:grid-cols-2 gap-8 items-start">
// //         <div className={cn("transition-opacity duration-200", mode === "edit" ? "block" : "hidden lg:block lg:opacity-50")}>
// //           <InvoiceForm />
// //         </div>
// //         <aside className={cn("transition-opacity duration-200", mode === "preview" ? "block" : "hidden lg:block lg:opacity-50")}>
// //           <div className="lg:sticky lg:top-24">
// //             <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Live Preview</h3>
// //             <InvoicePreview id="invoice-preview" className="shadow-lg rounded-xl border border-slate-200" />
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Edit3, Save } from "lucide-react";
// import { cn } from "@/lib/utils";

// type Mode = "edit" | "preview";

// export function InvoiceLanding() {
//   const [mode, setMode] = useState<Mode>("edit");
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     const result = await saveInvoiceToDb(store, grandTotal);
//     if (result) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/auth/login?next=/dashboard";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FFFFFF] pb-20">
//       {/* Top Navigation Bar */}
//       <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/80 backdrop-blur-md mb-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <h2 className="text-xl font-bold text-[#111827]">
//               Invoice <span className="text-[#007AFF]">Generator</span>
//             </h2>

//             <div className="flex flex-wrap items-center gap-3">
//               {/* Mode Switcher */}
//               <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
//                 <button
//                   type="button"
//                   onClick={() => setMode("edit")}
//                   className={cn(
//                     "flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-all",
//                     mode === "edit"
//                       ? "bg-white text-[#007AFF] shadow-sm"
//                       : "text-slate-500 hover:text-[#111827]",
//                   )}
//                 >
//                   <Edit3 className="h-4 w-4" /> Edit
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setMode("preview")}
//                   className={cn(
//                     "flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-all",
//                     mode === "preview"
//                       ? "bg-white text-[#007AFF] shadow-sm"
//                       : "text-slate-500 hover:text-[#111827]",
//                   )}
//                 >
//                   <Eye className="h-4 w-4" /> Preview
//                 </button>
//               </div>

//               {/* Action Buttons */}
//               <Button
//                 onClick={handleDownload}
//                 variant="outline"
//                 className="border-slate-200 text-[#111827] hover:bg-slate-50"
//               >
//                 <Download className="h-4 w-4 mr-2" /> Download
//               </Button>
//               <Button
//                 onClick={handleSave}
//                 className="bg-[#007AFF] hover:bg-[#0063CC] text-white shadow-md shadow-blue-100"
//               >
//                 <Save className="h-4 w-4 mr-2" /> Save Invoice
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-12 gap-10 items-start">
//           {/* Main Form Area */}
//           <div
//             className={cn(
//               "lg:col-span-8 transition-all duration-300",
//               mode === "edit" ? "opacity-100" : "hidden lg:block lg:opacity-40",
//             )}
//           >
//             <InvoiceForm />
//           </div>

//           {/* Right Side Preview/Info */}
//           <aside
//             className={cn(
//               "lg:col-span-4 transition-all duration-300",
//               mode === "preview"
//                 ? "opacity-100"
//                 : "hidden lg:block lg:opacity-60",
//             )}
//           >
//             <div className="lg:sticky lg:top-28 space-y-6">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-sm font-bold text-[#111827] uppercase tracking-widest">
//                   Live Preview
//                 </h3>
//                 <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
//               </div>

//               {/* Tips or Summary Card */}
//               <div className="bg-[#111827] rounded-xl p-6 text-white shadow-xl">
//                 <p className="text-slate-400 text-xs uppercase font-bold mb-2">
//                   Grand Total
//                 </p>
//                 <h4 className="text-3xl font-bold mb-4">
//                   {store.currency} {grandTotal.toLocaleString()}
//                 </h4>
//                 <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
//                   <div className="h-full bg-[#007AFF] w-2/3"></div>
//                 </div>
//                 <p className="mt-4 text-sm text-slate-400">
//                   Check all details before downloading your PDF.
//                 </p>
//               </div>
//             </div>
//           </aside>"use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     const result = await saveInvoiceToDb(store, grandTotal);
//     if (result) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/auth/login?next=/dashboard";
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Action Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
//         <div>
//           <h2 className="text-lg font-bold text-[#1B2A4A]">Invoice Details</h2>
//           <p className="text-sm text-slate-500">Fill in the information below</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Preview Toggle Button */}
//           <Button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             variant="outline"
//             className="border-[#3A7BD5] text-[#3A7BD5] hover:bg-[#3A7BD5] hover:text-white transition-all"
//           >
//             <Eye className="h-4 w-4 mr-2" /> Live Preview
//           </Button>

//           <Button
//             onClick={handleDownload}
//             variant="outline"
//             className="border-slate-200 text-[#1B2A4A] hover:bg-slate-50"
//           >
//             <Download className="h-4 w-4 mr-2" /> Download
//           </Button>

//           <Button
//             onClick={handleSave}
//             className="bg-[#3A7BD5] hover:bg-[#2C62B0] text-white shadow-md shadow-blue-100"
//           >
//             <Save className="h-4 w-4 mr-2" /> Save Invoice
//           </Button>
//         </div>
//       </div>

//       {/* Main Form Area - Now Full Width for better focus */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//           <InvoiceForm />
//         </div>
//       </div>

//       {/* MODAL / POP-UP PREVIEW */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//           {/* Backdrop Blur */}
//           <div
//             className="absolute inset-0 bg-[#1B2A4A]/60 backdrop-blur-sm"
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal Content */}
//           <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20">
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#3A7BD5]/10 p-2 rounded-lg text-[#3A7BD5]">
//                   <Eye className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold text-[#1B2A4A]">Invoice Preview</h3>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Preview Body */}
//             <div className="p-6 sm:p-10 bg-slate-50 flex justify-center">
//               <div className="w-full max-w-[800px]">
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="shadow-2xl rounded-sm border border-slate-200 bg-white"
//                 />
//               </div>
//             </div>

//             {/* Modal Footer Actions */}
//             <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-end gap-3 z-20">
//                <Button
//                 onClick={() => setIsPreviewOpen(false)}
//                 variant="ghost"
//                 className="text-slate-500"
//               >
//                 Close Preview
//               </Button>
//               <Button
//                 onClick={handleDownload}
//                 className="bg-[#3A7BD5] text-white px-8"
//               >
//                 <Download className="h-4 w-4 mr-2" /> Download PDF
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }"use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     const result = await saveInvoiceToDb(store, grandTotal);
//     if (result) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/auth/login?next=/dashboard";
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Action Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
//         <div>
//           <h2 className="text-lg font-bold text-[#1B2A4A]">Invoice Details</h2>
//           <p className="text-sm text-slate-500">Fill in the information below</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Preview Toggle Button */}
//           <Button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             variant="outline"
//             className="border-[#3A7BD5] text-[#3A7BD5] hover:bg-[#3A7BD5] hover:text-white transition-all"
//           >
//             <Eye className="h-4 w-4 mr-2" /> Live Preview
//           </Button>

//           <Button
//             onClick={handleDownload}
//             variant="outline"
//             className="border-slate-200 text-[#1B2A4A] hover:bg-slate-50"
//           >
//             <Download className="h-4 w-4 mr-2" /> Download
//           </Button>

//           <Button
//             onClick={handleSave}
//             className="bg-[#3A7BD5] hover:bg-[#2C62B0] text-white shadow-md shadow-blue-100"
//           >
//             <Save className="h-4 w-4 mr-2" /> Save Invoice
//           </Button>
//         </div>
//       </div>

//       {/* Main Form Area - Now Full Width for better focus */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//           <InvoiceForm />
//         </div>
//       </div>

//       {/* MODAL / POP-UP PREVIEW */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//           {/* Backdrop Blur */}
//           <div
//             className="absolute inset-0 bg-[#1B2A4A]/60 backdrop-blur-sm"
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal Content */}
//           <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20">
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#3A7BD5]/10 p-2 rounded-lg text-[#3A7BD5]">
//                   <Eye className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold text-[#1B2A4A]">Invoice Preview</h3>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Preview Body */}
//             <div className="p-6 sm:p-10 bg-slate-50 flex justify-center">
//               <div className="w-full max-w-[800px]">
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="shadow-2xl rounded-sm border border-slate-200 bg-white"
//                 />
//               </div>
//             </div>

//             {/* Modal Footer Actions */}
//             <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-end gap-3 z-20">
//                <Button
//                 onClick={() => setIsPreviewOpen(false)}
//                 variant="ghost"
//                 className="text-slate-500"
//               >
//                 Close Preview
//               </Button>
//               <Button
//                 onClick={handleDownload}
//                 className="bg-[#3A7BD5] text-white px-8"
//               >
//                 <Download className="h-4 w-4 mr-2" /> Download PDF
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }"use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     const result = await saveInvoiceToDb(store, grandTotal);
//     if (result) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/auth/login?next=/dashboard";
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Action Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
//         <div>
//           <h2 className="text-lg font-bold text-[#1B2A4A]">Invoice Details</h2>
//           <p className="text-sm text-slate-500">Fill in the information below</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Preview Toggle Button */}
//           <Button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             variant="outline"
//             className="border-[#3A7BD5] text-[#3A7BD5] hover:bg-[#3A7BD5] hover:text-white transition-all"
//           >
//             <Eye className="h-4 w-4 mr-2" /> Live Preview
//           </Button>

//           <Button
//             onClick={handleDownload}
//             variant="outline"
//             className="border-slate-200 text-[#1B2A4A] hover:bg-slate-50"
//           >
//             <Download className="h-4 w-4 mr-2" /> Download
//           </Button>

//           <Button
//             onClick={handleSave}
//             className="bg-[#3A7BD5] hover:bg-[#2C62B0] text-white shadow-md shadow-blue-100"
//           >
//             <Save className="h-4 w-4 mr-2" /> Save Invoice
//           </Button>
//         </div>
//       </div>

//       {/* Main Form Area - Now Full Width for better focus */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//           <InvoiceForm />
//         </div>
//       </div>

//       {/* MODAL / POP-UP PREVIEW */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//           {/* Backdrop Blur */}
//           <div
//             className="absolute inset-0 bg-[#1B2A4A]/60 backdrop-blur-sm"
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal Content */}
//           <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20">
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#3A7BD5]/10 p-2 rounded-lg text-[#3A7BD5]">
//                   <Eye className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold text-[#1B2A4A]">Invoice Preview</h3>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Preview Body */}
//             <div className="p-6 sm:p-10 bg-slate-50 flex justify-center">
//               <div className="w-full max-w-[800px]">
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="shadow-2xl rounded-sm border border-slate-200 bg-white"
//                 />
//               </div>
//             </div>

//             {/* Modal Footer Actions */}
//             <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-end gap-3 z-20">
//                <Button
//                 onClick={() => setIsPreviewOpen(false)}
//                 variant="ghost"
//                 className="text-slate-500"
//               >
//                 Close Preview
//               </Button>
//               <Button
//                 onClick={handleDownload}
//                 className="bg-[#3A7BD5] text-white px-8"
//               >
//                 <Download className="h-4 w-4 mr-2" /> Download PDF
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }"use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     const result = await saveInvoiceToDb(store, grandTotal);
//     if (result) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/auth/login?next=/dashboard";
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Action Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
//         <div>
//           <h2 className="text-lg font-bold text-[#1B2A4A]">Invoice Details</h2>
//           <p className="text-sm text-slate-500">Fill in the information below</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Preview Toggle Button */}
//           <Button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             variant="outline"
//             className="border-[#3A7BD5] text-[#3A7BD5] hover:bg-[#3A7BD5] hover:text-white transition-all"
//           >
//             <Eye className="h-4 w-4 mr-2" /> Live Preview
//           </Button>

//           <Button
//             onClick={handleDownload}
//             variant="outline"
//             className="border-slate-200 text-[#1B2A4A] hover:bg-slate-50"
//           >
//             <Download className="h-4 w-4 mr-2" /> Download
//           </Button>

//           <Button
//             onClick={handleSave}
//             className="bg-[#3A7BD5] hover:bg-[#2C62B0] text-white shadow-md shadow-blue-100"
//           >
//             <Save className="h-4 w-4 mr-2" /> Save Invoice
//           </Button>
//         </div>
//       </div>

//       {/* Main Form Area - Now Full Width for better focus */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//           <InvoiceForm />
//         </div>
//       </div>

//       {/* MODAL / POP-UP PREVIEW */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//           {/* Backdrop Blur */}
//           <div
//             className="absolute inset-0 bg-[#1B2A4A]/60 backdrop-blur-sm"
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal Content */}
//           <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20">
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#3A7BD5]/10 p-2 rounded-lg text-[#3A7BD5]">
//                   <Eye className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold text-[#1B2A4A]">Invoice Preview</h3>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Preview Body */}
//             <div className="p-6 sm:p-10 bg-slate-50 flex justify-center">
//               <div className="w-full max-w-[800px]">
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="shadow-2xl rounded-sm border border-slate-200 bg-white"
//                 />
//               </div>
//             </div>

//             {/* Modal Footer Actions */}
//             <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-end gap-3 z-20">
//                <Button
//                 onClick={() => setIsPreviewOpen(false)}
//                 variant="ghost"
//                 className="text-slate-500"
//               >
//                 Close Preview
//               </Button>
//               <Button
//                 onClick={handleDownload}
//                 className="bg-[#3A7BD5] text-white px-8"
//               >
//                 <Download className="h-4 w-4 mr-2" /> Download PDF
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }"use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     const result = await saveInvoiceToDb(store, grandTotal);
//     if (result) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/auth/login?next=/dashboard";
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Action Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
//         <div>
//           <h2 className="text-lg font-bold text-[#1B2A4A]">Invoice Details</h2>
//           <p className="text-sm text-slate-500">Fill in the information below</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Preview Toggle Button */}
//           <Button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             variant="outline"
//             className="border-[#3A7BD5] text-[#3A7BD5] hover:bg-[#3A7BD5] hover:text-white transition-all"
//           >
//             <Eye className="h-4 w-4 mr-2" /> Live Preview
//           </Button>

//           <Button
//             onClick={handleDownload}
//             variant="outline"
//             className="border-slate-200 text-[#1B2A4A] hover:bg-slate-50"
//           >
//             <Download className="h-4 w-4 mr-2" /> Download
//           </Button>

//           <Button
//             onClick={handleSave}
//             className="bg-[#3A7BD5] hover:bg-[#2C62B0] text-white shadow-md shadow-blue-100"
//           >
//             <Save className="h-4 w-4 mr-2" /> Save Invoice
//           </Button>
//         </div>
//       </div>

//       {/* Main Form Area - Now Full Width for better focus */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//           <InvoiceForm />
//         </div>
//       </div>

//       {/* MODAL / POP-UP PREVIEW */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//           {/* Backdrop Blur */}
//           <div
//             className="absolute inset-0 bg-[#1B2A4A]/60 backdrop-blur-sm"
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal Content */}
//           <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20">
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#3A7BD5]/10 p-2 rounded-lg text-[#3A7BD5]">
//                   <Eye className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold text-[#1B2A4A]">Invoice Preview</h3>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Preview Body */}
//             <div className="p-6 sm:p-10 bg-slate-50 flex justify-center">
//               <div className="w-full max-w-[800px]">
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="shadow-2xl rounded-sm border border-slate-200 bg-white"
//                 />
//               </div>
//             </div>

//             {/* Modal Footer Actions */}
//             <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-end gap-3 z-20">
//                <Button
//                 onClick={() => setIsPreviewOpen(false)}
//                 variant="ghost"
//                 className="text-slate-500"
//               >
//                 Close Preview
//               </Button>
//               <Button
//                 onClick={handleDownload}
//                 className="bg-[#3A7BD5] text-white px-8"
//               >
//                 <Download className="h-4 w-4 mr-2" /> Download PDF
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }"use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     const result = await saveInvoiceToDb(store, grandTotal);
//     if (result) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/auth/login?next=/dashboard";
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Action Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
//         <div>
//           <h2 className="text-lg font-bold text-[#1B2A4A]">Invoice Details</h2>
//           <p className="text-sm text-slate-500">Fill in the information below</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Preview Toggle Button */}
//           <Button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             variant="outline"
//             className="border-[#3A7BD5] text-[#3A7BD5] hover:bg-[#3A7BD5] hover:text-white transition-all"
//           >
//             <Eye className="h-4 w-4 mr-2" /> Live Preview
//           </Button>

//           <Button
//             onClick={handleDownload}
//             variant="outline"
//             className="border-slate-200 text-[#1B2A4A] hover:bg-slate-50"
//           >
//             <Download className="h-4 w-4 mr-2" /> Download
//           </Button>

//           <Button
//             onClick={handleSave}
//             className="bg-[#3A7BD5] hover:bg-[#2C62B0] text-white shadow-md shadow-blue-100"
//           >
//             <Save className="h-4 w-4 mr-2" /> Save Invoice
//           </Button>
//         </div>
//       </div>

//       {/* Main Form Area - Now Full Width for better focus */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//           <InvoiceForm />
//         </div>
//       </div>

//       {/* MODAL / POP-UP PREVIEW */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//           {/* Backdrop Blur */}
//           <div
//             className="absolute inset-0 bg-[#1B2A4A]/60 backdrop-blur-sm"
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal Content */}
//           <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20">
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#3A7BD5]/10 p-2 rounded-lg text-[#3A7BD5]">
//                   <Eye className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold text-[#1B2A4A]">Invoice Preview</h3>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Preview Body */}
//             <div className="p-6 sm:p-10 bg-slate-50 flex justify-center">
//               <div className="w-full max-w-[800px]">
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="shadow-2xl rounded-sm border border-slate-200 bg-white"
//                 />
//               </div>
//             </div>

//             {/* Modal Footer Actions */}
//             <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-end gap-3 z-20">
//                <Button
//                 onClick={() => setIsPreviewOpen(false)}
//                 variant="ghost"
//                 className="text-slate-500"
//               >
//                 Close Preview
//               </Button>
//               <Button
//                 onClick={handleDownload}
//                 className="bg-[#3A7BD5] text-white px-8"
//               >
//                 <Download className="h-4 w-4 mr-2" /> Download PDF
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }"use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     const result = await saveInvoiceToDb(store, grandTotal);
//     if (result) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/auth/login?next=/dashboard";
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Action Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
//         <div>
//           <h2 className="text-lg font-bold text-[#1B2A4A]">Invoice Details</h2>
//           <p className="text-sm text-slate-500">Fill in the information below</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Preview Toggle Button */}
//           <Button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             variant="outline"
//             className="border-[#3A7BD5] text-[#3A7BD5] hover:bg-[#3A7BD5] hover:text-white transition-all"
//           >
//             <Eye className="h-4 w-4 mr-2" /> Live Preview
//           </Button>

//           <Button
//             onClick={handleDownload}
//             variant="outline"
//             className="border-slate-200 text-[#1B2A4A] hover:bg-slate-50"
//           >
//             <Download className="h-4 w-4 mr-2" /> Download
//           </Button>

//           <Button
//             onClick={handleSave}
//             className="bg-[#3A7BD5] hover:bg-[#2C62B0] text-white shadow-md shadow-blue-100"
//           >
//             <Save className="h-4 w-4 mr-2" /> Save Invoice
//           </Button>
//         </div>
//       </div>

//       {/* Main Form Area - Now Full Width for better focus */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//           <InvoiceForm />
//         </div>
//       </div>

//       {/* MODAL / POP-UP PREVIEW */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//           {/* Backdrop Blur */}
//           <div
//             className="absolute inset-0 bg-[#1B2A4A]/60 backdrop-blur-sm"
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal Content */}
//           <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20">
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#3A7BD5]/10 p-2 rounded-lg text-[#3A7BD5]">
//                   <Eye className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold text-[#1B2A4A]">Invoice Preview</h3>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Preview Body */}
//             <div className="p-6 sm:p-10 bg-slate-50 flex justify-center">
//               <div className="w-full max-w-[800px]">
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="shadow-2xl rounded-sm border border-slate-200 bg-white"
//                 />
//               </div>
//             </div>

//             {/* Modal Footer Actions */}
//             <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-end gap-3 z-20">
//                <Button
//                 onClick={() => setIsPreviewOpen(false)}
//                 variant="ghost"
//                 className="text-slate-500"
//               >
//                 Close Preview
//               </Button>
//               <Button
//                 onClick={handleDownload}
//                 className="bg-[#3A7BD5] text-white px-8"
//               >
//                 <Download className="h-4 w-4 mr-2" /> Download PDF
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }"use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     const result = await saveInvoiceToDb(store, grandTotal);
//     if (result) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/auth/login?next=/dashboard";
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Action Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
//         <div>
//           <h2 className="text-lg font-bold text-[#1B2A4A]">Invoice Details</h2>
//           <p className="text-sm text-slate-500">Fill in the information below</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Preview Toggle Button */}
//           <Button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             variant="outline"
//             className="border-[#3A7BD5] text-[#3A7BD5] hover:bg-[#3A7BD5] hover:text-white transition-all"
//           >
//             <Eye className="h-4 w-4 mr-2" /> Live Preview
//           </Button>

//           <Button
//             onClick={handleDownload}
//             variant="outline"
//             className="border-slate-200 text-[#1B2A4A] hover:bg-slate-50"
//           >
//             <Download className="h-4 w-4 mr-2" /> Download
//           </Button>

//           <Button
//             onClick={handleSave}
//             className="bg-[#3A7BD5] hover:bg-[#2C62B0] text-white shadow-md shadow-blue-100"
//           >
//             <Save className="h-4 w-4 mr-2" /> Save Invoice
//           </Button>
//         </div>
//       </div>

//       {/* Main Form Area - Now Full Width for better focus */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//           <InvoiceForm />
//         </div>
//       </div>

//       {/* MODAL / POP-UP PREVIEW */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//           {/* Backdrop Blur */}
//           <div
//             className="absolute inset-0 bg-[#1B2A4A]/60 backdrop-blur-sm"
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal Content */}
//           <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20">
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#3A7BD5]/10 p-2 rounded-lg text-[#3A7BD5]">
//                   <Eye className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold text-[#1B2A4A]">Invoice Preview</h3>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Preview Body */}
//             <div className="p-6 sm:p-10 bg-slate-50 flex justify-center">
//               <div className="w-full max-w-[800px]">
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="shadow-2xl rounded-sm border border-slate-200 bg-white"
//                 />
//               </div>
//             </div>

//             {/* Modal Footer Actions */}
//             <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-end gap-3 z-20">
//                <Button
//                 onClick={() => setIsPreviewOpen(false)}
//                 variant="ghost"
//                 className="text-slate-500"
//               >
//                 Close Preview
//               </Button>
//               <Button
//                 onClick={handleDownload}
//                 className="bg-[#3A7BD5] text-white px-8"
//               >
//                 <Download className="h-4 w-4 mr-2" /> Download PDF
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }"use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     const result = await saveInvoiceToDb(store, grandTotal);
//     if (result) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/auth/login?next=/dashboard";
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Action Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
//         <div>
//           <h2 className="text-lg font-bold text-[#1B2A4A]">Invoice Details</h2>
//           <p className="text-sm text-slate-500">Fill in the information below</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Preview Toggle Button */}
//           <Button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             variant="outline"
//             className="border-[#3A7BD5] text-[#3A7BD5] hover:bg-[#3A7BD5] hover:text-white transition-all"
//           >
//             <Eye className="h-4 w-4 mr-2" /> Live Preview
//           </Button>

//           <Button
//             onClick={handleDownload}
//             variant="outline"
//             className="border-slate-200 text-[#1B2A4A] hover:bg-slate-50"
//           >
//             <Download className="h-4 w-4 mr-2" /> Download
//           </Button>

//           <Button
//             onClick={handleSave}
//             className="bg-[#3A7BD5] hover:bg-[#2C62B0] text-white shadow-md shadow-blue-100"
//           >
//             <Save className="h-4 w-4 mr-2" /> Save Invoice
//           </Button>
//         </div>
//       </div>

//       {/* Main Form Area - Now Full Width for better focus */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//           <InvoiceForm />
//         </div>
//       </div>

//       {/* MODAL / POP-UP PREVIEW */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//           {/* Backdrop Blur */}
//           <div
//             className="absolute inset-0 bg-[#1B2A4A]/60 backdrop-blur-sm"
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal Content */}
//           <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20">
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#3A7BD5]/10 p-2 rounded-lg text-[#3A7BD5]">
//                   <Eye className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold text-[#1B2A4A]">Invoice Preview</h3>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Preview Body */}
//             <div className="p-6 sm:p-10 bg-slate-50 flex justify-center">
//               <div className="w-full max-w-[800px]">
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="shadow-2xl rounded-sm border border-slate-200 bg-white"
//                 />
//               </div>
//             </div>

//             {/* Modal Footer Actions */}
//             <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-end gap-3 z-20">
//                <Button
//                 onClick={() => setIsPreviewOpen(false)}
//                 variant="ghost"
//                 className="text-slate-500"
//               >
//                 Close Preview
//               </Button>
//               <Button
//                 onClick={handleDownload}
//                 className="bg-[#3A7BD5] text-white px-8"
//               >
//                 <Download className="h-4 w-4 mr-2" /> Download PDF
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }"use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     const result = await saveInvoiceToDb(store, grandTotal);
//     if (result) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/auth/login?next=/dashboard";
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Action Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
//         <div>
//           <h2 className="text-lg font-bold text-[#1B2A4A]">Invoice Details</h2>
//           <p className="text-sm text-slate-500">Fill in the information below</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Preview Toggle Button */}
//           <Button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             variant="outline"
//             className="border-[#3A7BD5] text-[#3A7BD5] hover:bg-[#3A7BD5] hover:text-white transition-all"
//           >
//             <Eye className="h-4 w-4 mr-2" /> Live Preview
//           </Button>

//           <Button
//             onClick={handleDownload}
//             variant="outline"
//             className="border-slate-200 text-[#1B2A4A] hover:bg-slate-50"
//           >
//             <Download className="h-4 w-4 mr-2" /> Download
//           </Button>

//           <Button
//             onClick={handleSave}
//             className="bg-[#3A7BD5] hover:bg-[#2C62B0] text-white shadow-md shadow-blue-100"
//           >
//             <Save className="h-4 w-4 mr-2" /> Save Invoice
//           </Button>
//         </div>
//       </div>

//       {/* Main Form Area - Now Full Width for better focus */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//           <InvoiceForm />
//         </div>
//       </div>

//       {/* MODAL / POP-UP PREVIEW */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//           {/* Backdrop Blur */}
//           <div
//             className="absolute inset-0 bg-[#1B2A4A]/60 backdrop-blur-sm"
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal Content */}
//           <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20">
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#3A7BD5]/10 p-2 rounded-lg text-[#3A7BD5]">
//                   <Eye className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold text-[#1B2A4A]">Invoice Preview</h3>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Preview Body */}
//             <div className="p-6 sm:p-10 bg-slate-50 flex justify-center">
//               <div className="w-full max-w-[800px]">
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="shadow-2xl rounded-sm border border-slate-200 bg-white"
//                 />
//               </div>
//             </div>

//             {/* Modal Footer Actions */}
//             <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-end gap-3 z-20">
//                <Button
//                 onClick={() => setIsPreviewOpen(false)}
//                 variant="ghost"
//                 className="text-slate-500"
//               >
//                 Close Preview
//               </Button>
//               <Button
//                 onClick={handleDownload}
//                 className="bg-[#3A7BD5] text-white px-8"
//               >
//                 <Download className="h-4 w-4 mr-2" /> Download PDF
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }"use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Save, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function InvoiceLanding() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const store = useInvoiceStore();
//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview");
//   };

//   const handleSave = async () => {
//     const result = await saveInvoiceToDb(store, grandTotal);
//     if (result) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/auth/login?next=/dashboard";
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Action Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
//         <div>
//           <h2 className="text-lg font-bold text-[#1B2A4A]">Invoice Details</h2>
//           <p className="text-sm text-slate-500">Fill in the information below</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Preview Toggle Button */}
//           <Button
//             type="button"
//             onClick={() => setIsPreviewOpen(true)}
//             variant="outline"
//             className="border-[#3A7BD5] text-[#3A7BD5] hover:bg-[#3A7BD5] hover:text-white transition-all"
//           >
//             <Eye className="h-4 w-4 mr-2" /> Live Preview
//           </Button>

//           <Button
//             onClick={handleDownload}
//             variant="outline"
//             className="border-slate-200 text-[#1B2A4A] hover:bg-slate-50"
//           >
//             <Download className="h-4 w-4 mr-2" /> Download
//           </Button>

//           <Button
//             onClick={handleSave}
//             className="bg-[#3A7BD5] hover:bg-[#2C62B0] text-white shadow-md shadow-blue-100"
//           >
//             <Save className="h-4 w-4 mr-2" /> Save Invoice
//           </Button>
//         </div>
//       </div>

//       {/* Main Form Area - Now Full Width for better focus */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//           <InvoiceForm />
//         </div>
//       </div>

//       {/* MODAL / POP-UP PREVIEW */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//           {/* Backdrop Blur */}
//           <div
//             className="absolute inset-0 bg-[#1B2A4A]/60 backdrop-blur-sm"
//             onClick={() => setIsPreviewOpen(false)}
//           />

//           {/* Modal Content */}
//           <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20">
//               <div className="flex items-center gap-3">
//                 <div className="bg-[#3A7BD5]/10 p-2 rounded-lg text-[#3A7BD5]">
//                   <Eye className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-xl font-bold text-[#1B2A4A]">Invoice Preview</h3>
//               </div>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Preview Body */}
//             <div className="p-6 sm:p-10 bg-slate-50 flex justify-center">
//               <div className="w-full max-w-[800px]">
//                 <InvoicePreview
//                   id="invoice-preview"
//                   className="shadow-2xl rounded-sm border border-slate-200 bg-white"
//                 />
//               </div>
//             </div>

//             {/* Modal Footer Actions */}
//             <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-end gap-3 z-20">
//                <Button
//                 onClick={() => setIsPreviewOpen(false)}
//                 variant="ghost"
//                 className="text-slate-500"
//               >
//                 Close Preview
//               </Button>
//               <Button
//                 onClick={handleDownload}
//                 className="bg-[#3A7BD5] text-white px-8"
//               >
//                 <Download className="h-4 w-4 mr-2" /> Download PDF
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { InvoiceForm } from "@/components/invoice/invoice-form";
import { InvoicePreview } from "@/components/invoice/invoice-preview";
import { Button } from "@/components/ui/button";
import { generateInvoicePDF } from "@/lib/pdf-generator";
import { useInvoiceStore } from "@/lib/invoice-store";
import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
import { Download, Eye, Save, X, Hash, Percent } from "lucide-react";

// ─────────────────────────────────────────────
//  COLOR THEME — Corporate Navy  (60 · 30 · 10)
//  60% → #F5F7FA  background
//  30% → #1B2A4A  navy
//  10% → #3A7BD5  accent
// ─────────────────────────────────────────────

// These types come from InvoiceForm — pass them down or lift state up
// For now we read them from the shared invoice store where possible,
// and accept the new fields as props so InvoiceLanding stays the
// single source of truth for currency / tax / discount / signature.



export function InvoiceLanding() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const store = useInvoiceStore();
  const subtotal = calculateSubtotal(store.lineItems);
  const grandTotal = calculateGrandTotal(
    subtotal,
    store.taxRate,
    store.overallDiscount,
  );

  const handleDownload = async () => {
    await generateInvoicePDF("invoice-preview");
  };

  const handleSave = async () => {
    const result = await saveInvoiceToDb(store);
    if (result) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/auth/login?next=/dashboard";
    }
  };

  return (
    // 60% background
    <div className="min-h-screen space-y-6" style={{ background: "#F5F7FA" }}>
      {/* ══ ACTION BAR ════════════════════════════════════════════════════ */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 rounded-2xl shadow-sm border"
        style={{
          background: "#FFFFFF",
          borderColor: "#1B2A4A12",
        }}
      >
        {/* Title */}
        <div className="flex items-center gap-3">
          {/* 10% accent dot */}
          <div
            className="w-2 h-8 rounded-full"
            style={{ background: "#3A7BD5" }}
          />
          <div>
            <h2 className="text-base font-bold" style={{ color: "#1B2A4A" }}>
              Invoice Details
            </h2>
            <p className="text-xs" style={{ color: "#1B2A4A66" }}>
              Fill in the information below
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preview */}
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border transition-all"
            style={{
              borderColor: "#3A7BD5",
              color: "#3A7BD5",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#3A7BD5";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#3A7BD5";
            }}
          >
            <Eye size={15} />
            Live Preview
          </button>

          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border transition-all"
            style={{
              borderColor: "#1B2A4A20",
              color: "#1B2A4A",
              background: "#fff",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#F5F7FA";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#fff";
            }}
          >
            <Download size={15} />
            Download
          </button>

          {/* Save — 10% accent filled */}
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-xl text-white transition-all shadow-md"
            style={{ background: "#3A7BD5" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#2C62B0";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#3A7BD5";
            }}
          >
            <Save size={15} />
            Save Invoice
          </button>
        </div>
      </div>

      {/* ══ FORM ══════════════════════════════════════════════════════════ */}
      <InvoiceForm />

      {/* ══ PREVIEW MODAL ════════════════════════════════════════════════ */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Animated Backdrop */}
          <div
            className="absolute inset-0 bg-[#1B2A4A]/60 backdrop-blur-md transition-all duration-500"
            onClick={() => setIsPreviewOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
            {/* ── Modern Header ── */}
            <div className="px-8 py-5 flex items-center justify-between bg-white border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#3A7BD5]/10 flex items-center justify-center">
                  <Eye size={20} className="text-[#3A7BD5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1B2A4A]">
                    Invoice Preview
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Review before sending to client
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* ── Preview Body (The Paper Feel) ── */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-12 custom-scrollbar">
              <div className="max-w-[850px] mx-auto">
                <InvoicePreview
                  id="invoice-preview"
                  className="shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl border border-slate-200/60"
                />
              </div>
            </div>

            {/* ── Modern Footer Action Bar ── */}
            <div className="px-8 py-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Quick Stats Pill */}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-4 py-2 rounded-2xl">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Total Amount
                  </span>
                  <span className="text-sm font-bold text-[#1B2A4A]">
                    {store.currency} {grandTotal.toLocaleString()}
                  </span>
                </div>
                <div className="w-px h-8 bg-slate-200 mx-2" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Status
                  </span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                    Ready
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                >
                  Back to Edit
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#3A7BD5] hover:bg-[#2C62B0] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                >
                  <Download size={18} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

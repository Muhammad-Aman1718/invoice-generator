// "use client";

// import { useState } from "react";
// import { InvoiceForm } from "@/components/invoice/invoice-form";
// import { InvoicePreview } from "@/components/invoice/invoice-preview";
// import { Button } from "@/components/ui/button";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Download, Eye, Edit3 } from "lucide-react";
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
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h2 className="text-xl font-semibold text-slate-900">Live Invoice Form</h2>
//         <div className="flex flex-wrap gap-2">
//           <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
//             <button
//               type="button"
//               onClick={() => setMode("edit")}
//               className={cn(
//                 "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
//                 mode === "edit" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
//               )}
//             >
//               <Edit3 className="h-4 w-4" /> Edit
//             </button>
//             <button
//               type="button"
//               onClick={() => setMode("preview")}
//               className={cn(
//                 "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
//                 mode === "preview" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
//               )}
//             >
//               <Eye className="h-4 w-4" /> Preview
//             </button>
//           </div>
//           <Button onClick={handleDownload} variant="outline" size="sm" className="border-indigo-200 text-indigo-600">
//             <Download className="h-4 w-4 mr-2" /> Download PDF
//           </Button>
//           <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
//             Save to Account
//           </Button>
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-8 items-start">
//         <div className={cn("transition-opacity duration-200", mode === "edit" ? "block" : "hidden lg:block lg:opacity-50")}>
//           <InvoiceForm />
//         </div>
//         <aside className={cn("transition-opacity duration-200", mode === "preview" ? "block" : "hidden lg:block lg:opacity-50")}>
//           <div className="lg:sticky lg:top-24">
//             <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Live Preview</h3>
//             <InvoicePreview id="invoice-preview" className="shadow-lg rounded-xl border border-slate-200" />
//           </div>
//         </aside>
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
import { Download, Eye, Edit3, Save } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "edit" | "preview";

export function InvoiceLanding() {
  const [mode, setMode] = useState<Mode>("edit");
  const store = useInvoiceStore();
  const subtotal = calculateSubtotal(store.lineItems);
  const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

  const handleDownload = async () => {
    await generateInvoicePDF("invoice-preview");
  };

  const handleSave = async () => {
    const result = await saveInvoiceToDb(store, grandTotal);
    if (result) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/auth/login?next=/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] pb-20">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/80 backdrop-blur-md mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-bold text-[#111827]">
              Invoice <span className="text-[#007AFF]">Generator</span>
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              {/* Mode Switcher */}
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setMode("edit")}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-all",
                    mode === "edit"
                      ? "bg-white text-[#007AFF] shadow-sm"
                      : "text-slate-500 hover:text-[#111827]",
                  )}
                >
                  <Edit3 className="h-4 w-4" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setMode("preview")}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-all",
                    mode === "preview"
                      ? "bg-white text-[#007AFF] shadow-sm"
                      : "text-slate-500 hover:text-[#111827]",
                  )}
                >
                  <Eye className="h-4 w-4" /> Preview
                </button>
              </div>

              {/* Action Buttons */}
              <Button
                onClick={handleDownload}
                variant="outline"
                className="border-slate-200 text-[#111827] hover:bg-slate-50"
              >
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#007AFF] hover:bg-[#0063CC] text-white shadow-md shadow-blue-100"
              >
                <Save className="h-4 w-4 mr-2" /> Save Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Main Form Area */}
          <div
            className={cn(
              "lg:col-span-8 transition-all duration-300",
              mode === "edit" ? "opacity-100" : "hidden lg:block lg:opacity-40",
            )}
          >
            <InvoiceForm />
          </div>

          {/* Right Side Preview/Info */}
          <aside
            className={cn(
              "lg:col-span-4 transition-all duration-300",
              mode === "preview"
                ? "opacity-100"
                : "hidden lg:block lg:opacity-60",
            )}
          >
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-widest">
                  Live Preview
                </h3>
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>

              {/* Tips or Summary Card */}
              <div className="bg-[#111827] rounded-xl p-6 text-white shadow-xl">
                <p className="text-slate-400 text-xs uppercase font-bold mb-2">
                  Grand Total
                </p>
                <h4 className="text-3xl font-bold mb-4">
                  {store.currency} {grandTotal.toLocaleString()}
                </h4>
                <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#007AFF] w-2/3"></div>
                </div>
                <p className="mt-4 text-sm text-slate-400">
                  Check all details before downloading your PDF.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

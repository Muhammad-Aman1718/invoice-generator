"use client";

import { useState } from "react";
import { InvoiceForm } from "@/components/invoice/invoice-form";
import { InvoicePreview } from "@/components/invoice/invoice-preview";
import { Button } from "@/components/ui/button";
import { generateInvoicePDF } from "@/lib/pdf-generator";
import { useInvoiceStore } from "@/lib/invoice-store";
import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
import { Download, Eye, Edit3 } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900">Live Invoice Form</h2>
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setMode("edit")}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                mode === "edit" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <Edit3 className="h-4 w-4" /> Edit
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                mode === "preview" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <Eye className="h-4 w-4" /> Preview
            </button>
          </div>
          <Button onClick={handleDownload} variant="outline" size="sm" className="border-indigo-200 text-indigo-600">
            <Download className="h-4 w-4 mr-2" /> Download PDF
          </Button>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
            Save to Account
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className={cn("transition-opacity duration-200", mode === "edit" ? "block" : "hidden lg:block lg:opacity-50")}>
          <InvoiceForm />
        </div>
        <aside className={cn("transition-opacity duration-200", mode === "preview" ? "block" : "hidden lg:block lg:opacity-50")}>
          <div className="lg:sticky lg:top-24">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Live Preview</h3>
            <InvoicePreview id="invoice-preview" className="shadow-lg rounded-xl border border-slate-200" />
          </div>
        </aside>
      </div>
    </div>
  );
}

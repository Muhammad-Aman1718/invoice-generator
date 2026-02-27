"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { InvoiceForm } from "@/components/invoice/invoice-form";
import { InvoicePreview } from "@/components/invoice/invoice-preview";
import { Button } from "@/components/ui/button";
import { generateInvoicePDF } from "@/lib/pdf-generator";
import { saveInvoiceToDb, fetchInvoiceById } from "@/lib/supabase/invoices-client";
import { useInvoiceStore } from "@/lib/invoice-store";
import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
import { useRouter } from "next/navigation";
import { Download, Eye, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "edit" | "preview";

export default function EditInvoicePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const doDownload = searchParams.get("download") === "1";
  const [mode, setMode] = useState<Mode>("edit");
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const store = useInvoiceStore();

  useEffect(() => {
    fetchInvoiceById(id).then((inv) => {
      if (inv) store.loadInvoice(inv);
      setLoaded(true);
    });
  }, [id]);

  useEffect(() => {
    if (loaded && doDownload) generateInvoicePDF("invoice-preview");
  }, [loaded, doDownload]);

  const subtotal = calculateSubtotal(store.lineItems);
  const grandTotal = calculateGrandTotal(subtotal, store.tax, store.discount);

  const handleDownload = async () => {
    await generateInvoicePDF("invoice-preview");
  };

  const handleSave = async () => {
    store.setField("id", id);
    setIsSaving(true);
    try {
      await saveInvoiceToDb({ ...store, id }, );
      router.push("/dashboard");
    } finally {
      setIsSaving(false);
    }
  };

  if (!loaded) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">Edit Invoice #{store.invoiceNumber}</h1>
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
            <button type="button" onClick={() => setMode("edit")} className={cn("flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === "edit" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50")}>
              <Edit3 className="h-4 w-4" /> Edit
            </button>
            <button type="button" onClick={() => setMode("preview")} className={cn("flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === "preview" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50")}>
              <Eye className="h-4 w-4" /> Preview
            </button>
          </div>
          <Button onClick={handleDownload} variant="outline" size="sm" className="border-indigo-200 text-indigo-600">
            <Download className="h-4 w-4 mr-2" /> Download PDF
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700">
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className={cn("transition-opacity duration-200", mode === "edit" ? "block" : "hidden lg:block lg:opacity-50")}>
          <InvoiceForm />
        </div>
        <div className={cn("transition-opacity duration-200", mode === "preview" ? "block" : "hidden lg:block lg:opacity-50")}>
          <div className="lg:sticky lg:top-24">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Preview</h2>
            <InvoicePreview id="invoice-preview" className="shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

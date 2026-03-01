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
import { supabase } from "@/lib/supabase/client";

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
      // Save to LocalStorage
      localStorage.setItem("pending_invoice", JSON.stringify(store));
      console.log("Invoice saved to localStorage for later:", store);
      // Redirect to Login with encoded params
      const returnPath = "/dashboard/invoices/new";
      const loginUrl = new URL("/auth/login", window.location.origin);
      loginUrl.searchParams.set("next", returnPath);
      loginUrl.searchParams.set("action", "save_pending");

      window.location.href = loginUrl.toString();
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

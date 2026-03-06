"use client";

import { Suspense } from "react";
import { InvoiceForm } from "@/components/invoice/invoice-form";
import { InvoicePreview } from "@/components/invoice/invoice-preview";
import {
  Download,
  Eye,
  Edit3,
  Save,
  FileText,
  Loader2,
  ArrowLeft,
  SplitSquareHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tab } from "@/types/invoice-types";
import Link from "next/link";
import useNewInvoicePage from "@/hooks/useNewInvoicePage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Invoice | Invoice Gen",
  description:
    "Create professional invoices for USA and Europe. PDF Invoice Maker with VAT, GST support. Free to use.",
  keywords: [
    "Invoice Generator",
    "PDF Invoice Maker",
    "VAT Compliant",
    "Tax Compliant",
    "USA",
    "Europe",
  ],
  openGraph: {
    title: "Invoice SaaS | Professional PDF Invoice Maker",
    description:
      "Create VAT and tax compliant invoices. Export to PDF instantly.",
    url: "https://invoice-gen.vercel.app/dashboard/invoices/new",
    siteName: "Invoice SaaS",
    locale: "en_US",
    type: "website",
  },
};

// ── INNER CONTENT ──
function NewInvoiceContent() {
  const {
    tab,
    setTab,
    showPreviewPanel,
    setShowPreviewPanel,
    grandTotal,
    handleDownload,
    handleSave,
    isSaving,
    store,
  } = useNewInvoicePage();

  return (
    <div
      className="flex flex-col h-[100dvh] w-full overflow-hidden"
      style={{ background: "#ECEFF1" }}
    >
      {/* ── NAVBAR ── */}
      <nav
        className="flex-shrink-0 z-[40]"
        style={{
          background: "#191970",
          boxShadow: "0 2px 20px rgba(25,25,112,0.25)",
        }}
      >
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <Link
              href="/dashboard"
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
            >
              <ArrowLeft size={15} />
            </Link>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-400/20">
              <FileText size={13} className="text-amber-400" />
            </div>
            <span className="font-black text-sm text-white truncate">
              New Invoice
            </span>
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setShowPreviewPanel((p) => !p)}
              className={cn(
                "flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all",
                showPreviewPanel
                  ? "bg-amber-400/10 border-amber-400/50 text-amber-400"
                  : "border-white/10 text-white/60 hover:text-white",
              )}
            >
              <SplitSquareHorizontal size={13} /> Split View
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/10 transition-all"
            >
              <Download size={13} /> Download
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-xl bg-amber-400 text-[#191970] hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
            >
              {isSaving ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Save size={13} />
              )}{" "}
              Save
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 transition-all"
            >
              <Download size={16} />
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-400 text-[#191970] font-black text-xs"
            >
              {isSaving ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Save size={13} />
              )}
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden flex items-center justify-center pb-2.5 px-4">
          <div className="flex bg-white/5 p-0.5 rounded-xl w-full max-w-[400px]">
            {(["edit", "preview"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-black capitalize transition-all",
                  tab === t
                    ? "bg-amber-400 text-[#191970]"
                    : "text-white/50 hover:text-white/80",
                )}
              >
                {t === "edit" ? <Edit3 size={12} /> : <Eye size={12} />} {t}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex flex-1 min-h-0 w-full overflow-hidden relative">
        <div
          className={cn(
            "flex-1 overflow-y-auto custom-scrollbar h-full bg-[#ECEFF1]",
            tab === "edit" ? "block" : "hidden lg:block",
          )}
        >
          <div className="p-4 sm:p-6 lg:p-10 max-w-3xl mx-auto pb-32">
            <InvoiceForm />
          </div>
        </div>

        <div
          className={cn(
            "flex-1 overflow-y-auto custom-scrollbar h-full bg-[#DDE3EA] border-l border-black/5",
            tab === "preview"
              ? "block"
              : showPreviewPanel
                ? "hidden lg:block"
                : "hidden",
          )}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-[#DDE3EA]/90 backdrop-blur-md border-b border-black/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#191970]/50">
                Live Preview
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-[#191970] text-[10px] font-black">
              {store.currency} {grandTotal.toLocaleString()}
            </div>
          </div>
          <div className="p-4 sm:p-8 lg:p-12">
            <div className="max-w-[800px] mx-auto shadow-2xl shadow-navy-900/10 rounded-xl overflow-hidden bg-white">
              <InvoicePreview id="invoice-preview-new" />
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(25, 25, 112, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(25, 25, 112, 0.2);
        }
      `}</style>
    </div>
  );
}

// ── LOADING UI ──
function NewInvoiceLoading() {
  return (
    <div
      className="flex flex-col items-center justify-center h-[100dvh] gap-3"
      style={{ background: "#ECEFF1" }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ background: "#191970" }}
      >
        <Loader2 size={20} className="animate-spin text-amber-400" />
      </div>
      <p className="text-sm font-bold opacity-50" style={{ color: "#191970" }}>
        Preparing your invoice...
      </p>
    </div>
  );
}

// ── MAIN EXPORT ──
export default function NewInvoicePage() {
  return (
    <Suspense fallback={<NewInvoiceLoading />}>
      <NewInvoiceContent />
    </Suspense>
  );
}

"use client";

import useInvoiceForm from "@/hooks/useInvoiceForm";
import Field from "../ui/field";

import { ChevronDown, Upload, X, Percent, Hash } from "lucide-react";
import { CURRENCIES, SI, TAX_TYPES } from "@/constant/data";
import { LogoUpload } from "./logo-upload";
import { cn } from "@/lib/utils";
import { LineItemsTable } from "./line-items-table";

// ─────────────────────────────────────────────
//  COLOR THEME — Corporate Navy  (60 · 30 · 10)
//  60% → #F5F7FA  background
//  30% → #1B2A4A  navy (structure, headers)
//  10% → #3A7BD5  accent (CTAs, highlights)
// ─────────────────────────────────────────────

// ───────────────────────────────────────────────────────────────────────────
export function InvoiceForm() {
  const {
    showCurrencyDrop,
    taxType,
    showTaxDrop,
    signatureUrl,
    subtotal,
    overallDiscountVal,
    taxVal,
    dropdownRef,
    taxDropdownRef,
    selectedCurrency,
    sigRef,
    store,
    setShowCurrencyDrop,
    setShowTaxDrop,
    handleTaxChange,
    setSignatureUrl,
    handleSignature,
  } = useInvoiceForm();
  return (
    <form
      className="rounded-2xl shadow-lg border border-[#1B2A4A]/08  overflow-hidden"
      style={{ background: "#F5F7FA" }}
      onSubmit={(e) => e.preventDefault()}
    >
      {/* ══ HEADER BAR — 30% navy ══════════════════════════════════════ */}
      <div
        className="px-8 py-5 flex items-center justify-between"
        style={{ background: "#1B2A4A" }}
      >
        {/* Invoice number */}
        <div className="flex items-center gap-2">
          <Hash size={15} className="text-[#3A7BD5]" />
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter Invoie #"
            className="bg-transparent border-none outline-none text-white font-bold text-lg w-40 appearance-none"
            value={store.invoiceNumber}
            onChange={(e) =>
              store.setField("invoiceNumber", parseInt(e.target.value) || 1)
            }
          />
        </div>

        <span className="text-2xl font-bold tracking-[0.2em] text-white/90">
          INVOICE
        </span>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-all border border-white/15"
          >
            <span>{selectedCurrency.symbol}</span>
            <span>{selectedCurrency.code}</span>
            <ChevronDown
              size={12}
              className={cn(
                "transition-transform",
                showCurrencyDrop && "rotate-180",
              )}
            />
          </button>

          {showCurrencyDrop && (
            <div className="absolute right-0 top-10 bg-white rounded-xl shadow-2xl border border-[#1B2A4A]/10 z-50 w-64 overflow-hidden">
              {/* Scrollable Container */}
              <div className="max-h-60 overflow-y-auto custom-scrollbar overscroll-contain ">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      store.setField("currency", c.code); // Store update hoga
                      setShowCurrencyDrop(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-sm flex justify-between items-center hover:bg-[#F5F7FA] transition-all border-b border-gray-50 last:border-none",
                      c.code === store.currency
                        ? "text-[#3A7BD5] font-bold bg-[#3A7BD5]/5"
                        : "text-[#1B2A4A]",
                    )}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{c.label}</span>
                      <span className="text-[10px] opacity-50 uppercase">
                        {c.code}
                      </span>
                    </div>
                    <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded text-[#1B2A4A]/60">
                      {c.symbol}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ BODY ═══════════════════════════════════════════════════════ */}
      <div className="p-8 space-y-8">
        {/* Logo + From + Dates */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Field label="Logo">
              <LogoUpload value={store.logoDataUrl} onChange={store.setLogo} />
            </Field>
          </div>

          <div className="col-span-5 space-y-3">
            <Field label="From">
              <input
                className={SI}
                placeholder="Your business name"
                value={store.businessName}
                onChange={(e) => store.setField("businessName", e.target.value)}
              />
            </Field>
            <textarea
              className={cn(SI, "resize-none")}
              placeholder="Address, phone, email..."
              rows={3}
              value={store.bussinessInfo}
              onChange={(e) => store.setField("bussinessInfo", e.target.value)}
            />
          </div>

          <div className="col-span-4 space-y-3">
            <Field label="Issue Date">
              <input
                type="date"
                className={SI}
                value={store.issueDate}
                onChange={(e) => store.setField("issueDate", e.target.value)}
              />
            </Field>
            <Field label="Due Date">
              <input
                type="date"
                className={SI}
                value={store.dueDate}
                onChange={(e) => store.setField("dueDate", e.target.value)}
              />
            </Field>
            <Field label="PO Number">
              <input
                className={SI}
                placeholder="Optional"
                onChange={(e) => store.setField("poNumber", e.target.value)}
              />
            </Field>
          </div>
        </div>

        <div className="border-t border-[#1B2A4A]/08" />

        {/* Bill To / Ship To */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div
              className="w-6 h-0.5 rounded-full"
              style={{ background: "#3A7BD5" }}
            />
            <Field label="Bill To">
              <input
                className={SI}
                placeholder="Client name"
                value={store.clientName}
                onChange={(e) => store.setField("clientName", e.target.value)}
              />
            </Field>
            <textarea
              className={cn(SI, "resize-none")}
              placeholder="Client address..."
              rows={2}
              value={store.clientAddress}
              onChange={(e) => store.setField("clientAddress", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="w-6 h-0.5 rounded-full bg-[#1B2A4A]/15" />
            <Field label="Ship To (Optional)">
              <input
                className={SI}
                placeholder="Shipping address..."
                onChange={(e) => store.setField("shipTo", e.target.value)}
              />
            </Field>
          </div>
        </div>

        <div className="border-t border-[#1B2A4A]/08" />

        {/* Line Items Table */}

        <LineItemsTable currency={selectedCurrency.symbol} showDiscount />

        {/* // ── Left: Notes, Terms, Signature ── */}
        {/* Notes + Totals */}
        <div className="grid grid-cols-2 gap-10">
          {/* ── Left: Notes, Terms, Signature ── */}
          <div className="space-y-5">
            <Field label="Notes">
              <textarea
                className={cn(SI, "resize-none min-h-[80px]")}
                placeholder="Payment instructions, thank you note..."
                value={store.notes}
                onChange={(e) => store.setField("notes", e.target.value)}
              />
            </Field>

            <Field label="Terms">
              <textarea
                className={cn(SI, "resize-none min-h-[60px]")}
                placeholder="Terms & conditions..."
                value={store.terms}
                onChange={(e) => store.setField("terms", e.target.value)}
              />
            </Field>

            {/* Signature / Stamp upload */}
            <Field label="Signature / Stamp">
              {signatureUrl ? (
                <div className="relative inline-block">
                  <img
                    src={signatureUrl}
                    alt="Signature"
                    className="h-16 object-contain rounded-lg border border-[#1B2A4A]/10 bg-white p-2"
                  />
                  <button
                    type="button"
                    onClick={() => setSignatureUrl(null)}
                    className="absolute -top-2 -right-2 bg-[#1B2A4A] text-white rounded-full p-0.5 hover:bg-red-500 transition-all"
                  >
                    <X size={11} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => sigRef.current?.click()}
                  className="flex items-center gap-2 border-2 border-dashed border-[#1B2A4A]/20 hover:border-[#3A7BD5] rounded-xl px-4 py-3 text-sm text-[#1B2A4A]/40 hover:text-[#3A7BD5] transition-all w-full justify-center"
                >
                  <Upload size={14} />
                  Upload signature or stamp
                </button>
              )}
              <input
                ref={sigRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSignature}
              />
            </Field>
          </div>

          {/* ── Right: Totals ── */}
          <div className="space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between text-sm text-[#1B2A4A]/60">
              <span>Subtotal</span>
              <span className="font-mono">
                {selectedCurrency.symbol} {subtotal.toFixed(2)}
              </span>
            </div>

            {/* Overall discount */}
            <div className="flex justify-between items-center gap-3">
              <span className="text-sm text-[#1B2A4A]/60">
                Overall Discount
              </span>
              <div className="flex items-center gap-1.5 bg-white border border-[#1B2A4A]/15 rounded-lg px-2 py-1">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={0}
                  max={100}
                  className="w-14 text-right text-sm text-[#1B2A4A] font-mono outline-none bg-transparent"
                  value={store.overallDiscount}
                  onChange={(e) =>
                    store.setField(
                      "overallDiscount",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                />
                <Percent size={12} className="text-[#1B2A4A]/40" />
              </div>
            </div>

            {overallDiscountVal > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount ({store.overallDiscount}%)</span>
                <span className="font-mono">
                  − {selectedCurrency.symbol} {overallDiscountVal.toFixed(2)}
                </span>
              </div>
            )}

            {/* Tax selector */}
            <div className="flex justify-between items-center gap-3">
              {/* Ref ko yahan lagana hai takay poora tax area cover ho */}
              <div className="relative" ref={taxDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowTaxDrop(!showTaxDrop)}
                  className="flex items-center gap-1.5 text-sm text-[#1B2A4A]/60 hover:text-[#3A7BD5] transition-all"
                >
                  <span>{taxType}</span>
                  {taxType !== "None" && (
                    <span className="text-xs font-mono bg-[#3A7BD5]/10 text-[#3A7BD5] px-1.5 py-0.5 rounded">
                      {store.taxRate}%
                    </span>
                  )}
                  <ChevronDown
                    size={12}
                    className={cn(
                      "transition-transform",
                      showTaxDrop && "rotate-180",
                    )}
                  />
                </button>

                {showTaxDrop && (
                  <div className="absolute left-0 bottom-full mb-2 bg-white rounded-xl shadow-2xl border border-[#1B2A4A]/10 z-50 w-44 max-h-60 overflow-y-auto custom-scrollbar overscroll-contain">
                    {TAX_TYPES.map((t) => (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => {
                          handleTaxChange(t.rate, t.label);
                          setShowTaxDrop(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-sm flex justify-between hover:bg-[#F5F7FA] transition-all",
                          t.label === taxType
                            ? "text-[#3A7BD5] font-bold"
                            : "text-[#1B2A4A]",
                        )}
                      >
                        <span>{t.label}</span>
                        {t.label !== "None" && t.label !== "Custom" && (
                          <span className="text-xs text-[#1B2A4A]/40">
                            {t.rate}%
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Input Section */}
              <span className="text-sm font-mono text-[#1B2A4A]/60">
                {selectedCurrency.symbol} {taxVal.toFixed(2)}
              </span>
            </div>

            <div className="border-t-2 border-[#1B2A4A]/08 pt-3 mt-1" />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span
                className="font-bold text-base"
                style={{ color: "#1B2A4A" }}
              >
                Total
              </span>
              <span
                className="font-bold text-base font-mono"
                style={{ color: "#1B2A4A" }}
              >
                {selectedCurrency.symbol} {store.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ FOOTER BAR ═════════════════════════════════════════════════ */}
      <div
        className="px-6 py-4 flex items-center justify-between backdrop-blur-sm"
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
            Pricing Details
          </span>
          <p className="text-[11px] font-medium text-slate-600">
            {store.currency} &middot;{" "}
            {store.overallDiscount > 0 ? (
              <span className="text-emerald-600">
                {store.overallDiscount}% Off (-{overallDiscountVal.toFixed(2)})
              </span>
            ) : (
              "No Discount Applied"
            )}
          </p>
        </div>

        <div className="px-3 py-1 bg-slate-100 rounded-full flex items-center gap-2 text-[10px] font-mono font-semibold text-slate-500 border border-slate-200">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          #{store.invoiceNumber}
        </div>
      </div>
    </form>
  );
}

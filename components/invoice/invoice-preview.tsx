"use client";

import { useInvoiceStore } from "@/lib/invoice-store";
import { formatCurrency } from "@/lib/invoice-utils";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CURRENCIES } from "@/constant/data";
import { InvoicePreviewProps } from "@/types/invoice-types";
import useInvoicePreview from "@/hooks/useInvoicePreview";

// ─────────────────────────────────────────────────────────────────────────────
//  PRINT-FRIENDLY THEME  —  Corporate Navy  (60 · 30 · 10)
//
//  Strategy: NO heavy filled backgrounds — use borders, thin accent lines,
//  and subtle tints so the page prints cleanly with minimal ink.
//
//  60% → #FFFFFF  pure white (page body)
//  30% → #1B2A4A  navy — only for text, borders, thin lines  (NO filled bg)
//  10% → #3A7BD5  accent — only for key highlights & left border stripe
// ─────────────────────────────────────────────────────────────────────────────

export function InvoicePreview({
  className,
  id = "invoice-preview",
  style,
}: InvoicePreviewProps) {
  const {
    currencyInfo,
    subtotal,
    overallDiscountAmount,
    store,
    fmt,
  } = useInvoicePreview();

  return (
    <article
      id={id}
      style={style}
      className={cn("bg-white max-w-[210mm] text-sm font-sans", className)}
    >
      {/* ══ HEADER — white bg, navy text, accent left border ════════════ */}
      <header
        className="px-8 pt-8 pb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6"
        style={{ borderBottom: "2px solid #1B2A4A" }}
      >
        {/* Left: Logo + Business */}
        <div className="flex items-start gap-4">
          {store.logoDataUrl && (
            <img
              src={store.logoDataUrl}
              alt="Logo"
              className="h-14 object-contain max-w-[110px]"
            />
          )}
          <div>
            {store.businessName && (
              <p
                className="font-black text-lg leading-tight"
                style={{ color: "#1B2A4A" }}
              >
                {store.businessName}
              </p>
            )}
            {store.bussinessInfo && (
              <p
                className="text-xs mt-1 whitespace-pre-line leading-relaxed"
                style={{ color: "#1B2A4A80" }}
              >
                {store.bussinessInfo}
              </p>
            )}
          </div>
        </div>

        {/* Right: INVOICE title + meta */}
        <div className="text-right">
          {/* Big INVOICE title — navy text only, no fill */}
          <h1
            className="text-4xl font-black tracking-[0.15em]"
            style={{ color: "#1B2A4A" }}
          >
            INVOICE
          </h1>

          {/* 10% accent underline — thin, not a filled block */}
          <div
            className="ml-auto mt-1 mb-2 h-[3px] rounded-full w-24"
            style={{ background: "#3A7BD5" }}
          />

          <p
            className="text-sm font-bold font-mono"
            style={{ color: "#3A7BD5" }}
          >
            #{store.invoiceNumber}
          </p>
          {store.issueDate && (
            <p className="text-xs mt-1" style={{ color: "#1B2A4A80" }}>
              Issued: {format(new Date(store.issueDate), "MMM d, yyyy")}
            </p>
          )}
          {store.dueDate && (
            <p className="text-xs" style={{ color: "#1B2A4A80" }}>
              Due: {format(new Date(store.dueDate), "MMM d, yyyy")}
            </p>
          )}
        </div>
      </header>

      {/* ══ BILL TO / SHIP TO / META ═════════════════════════════════════ */}
      {/* No bg fill — just a very light top border to separate sections   */}
      <div
        className="px-8 py-5 grid grid-cols-2 sm:grid-cols-3 gap-6"
        style={{ borderBottom: "1px solid #1B2A4A15" }}
      >
        {/* Bill To */}
        <div>
          {/* 10% accent micro-stripe — replaces the filled bg label */}
          <div
            className="w-6 h-[3px] rounded-full mb-2"
            style={{ background: "#3A7BD5" }}
          />
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-1"
            style={{ color: "#1B2A4A60" }}
          >
            Bill To
          </p>
          {store.clientName && (
            <p className="font-bold" style={{ color: "#1B2A4A" }}>
              {store.clientName}
            </p>
          )}
          {store.clientAddress && (
            <p
              className="text-xs mt-0.5 whitespace-pre-line leading-relaxed"
              style={{ color: "#1B2A4A70" }}
            >
              {store.clientAddress}
            </p>
          )}
        </div>

        {/* Ship To */}
        {store.shipTo && (
          <div>
            <div
              className="w-6 h-[3px] rounded-full mb-2"
              style={{ background: "#1B2A4A30" }}
            />
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: "#1B2A4A60" }}
            >
              Ship To
            </p>
            <p
              className="text-xs whitespace-pre-line leading-relaxed"
              style={{ color: "#1B2A4A70" }}
            >
              {store.shipTo}
            </p>
          </div>
        )}

        {/* Meta — PO, Currency, Tax */}
        <div className="sm:text-right">
          <div
            className="w-6 h-[3px] rounded-full mb-2 sm:ml-auto"
            style={{ background: "#1B2A4A20" }}
          />
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-1"
            style={{ color: "#1B2A4A60" }}
          >
            Details
          </p>
          {store.poNumber && (
            <p className="text-xs" style={{ color: "#1B2A4A" }}>
              PO: <span className="font-semibold">{store.poNumber}</span>
            </p>
          )}
          <p className="text-xs" style={{ color: "#1B2A4A" }}>
            Currency:{" "}
            <span className="font-semibold font-mono">{store.currency}</span> (
            {currencyInfo.symbol})
          </p>
          {store.taxRate > 0 && (
            <p className="text-xs" style={{ color: "#1B2A4A" }}>
              Tax:{" "}
              <span className="font-semibold">
                {/* {store.taxType}  */}
                {store.taxRate}%
              </span>
            </p>
          )}
        </div>
      </div>

      {/* ══ LINE ITEMS TABLE ══════════════════════════════════════════════ */}
      <div className="px-8 pt-6 pb-2">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ borderBottom: "2px solid #1B2A4A" }}>
              {/* Column headers — navy text, NO filled background */}
              {["Description", "Qty", "Rate", "Disc %", "Amount"].map(
                (h, i) => (
                  <th
                    key={h}
                    className={cn(
                      "py-2.5 text-[10px] font-bold uppercase tracking-widest",
                      i === 0
                        ? "text-left"
                        : i === 4
                          ? "text-right"
                          : "text-center",
                    )}
                    style={{ color: "#1B2A4A" }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {store.lineItems.map((item, idx) => (
              <tr
                key={item.id}
                style={{
                  borderBottom: "1px solid #1B2A4A10",
                  // Very light alternating tint — almost invisible on print
                  background: idx % 2 !== 0 ? "#1B2A4A04" : "#ffffff",
                }}
              >
                <td className="py-3 text-left" style={{ color: "#1B2A4A" }}>
                  {item.description || "—"}
                </td>
                <td
                  className="py-3 text-center tabular-nums"
                  style={{ color: "#1B2A4A80" }}
                >
                  {item.quantity}
                </td>
                <td
                  className="py-3 text-center tabular-nums"
                  style={{ color: "#1B2A4A80" }}
                >
                  {fmt(item.rate)}
                </td>
                <td
                  className="py-3 text-center tabular-nums"
                  style={{ color: "#1B2A4A80" }}
                >
                  {item.discount ? `${item.discount}%` : "—"}
                </td>
                <td
                  className="py-3 text-right tabular-nums font-semibold"
                  style={{ color: "#1B2A4A" }}
                >
                  {fmt(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ══ TOTALS + NOTES ════════════════════════════════════════════════ */}
      <div className="px-8 py-6 grid grid-cols-2 gap-10 items-start">
        {/* Left — Notes, Terms, Signature */}
        <div className="space-y-4 text-xs" style={{ color: "#1B2A4A70" }}>
          {store.notes && (
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-1"
                style={{ color: "#1B2A4A" }}
              >
                Notes
              </p>
              <p className="whitespace-pre-line leading-relaxed">
                {store.notes}
              </p>
            </div>
          )}
          {store.terms && (
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-1"
                style={{ color: "#1B2A4A" }}
              >
                Terms
              </p>
              <p className="whitespace-pre-line leading-relaxed">
                {store.terms}
              </p>
            </div>
          )}

          {/* Signature */}
          {store.stampUrl && (
            <div className="pt-2">
              <img
                src={store.stampUrl}
                alt="Signature"
                className="h-12 object-contain mb-1"
              />
              <div
                className="w-36 border-t"
                style={{ borderColor: "#1B2A4A40" }}
              />
              <p
                className="text-[10px] mt-1 uppercase tracking-widest"
                style={{ color: "#1B2A4A50" }}
              >
                Authorized Signature
              </p>
            </div>
          )}
        </div>

        {/* Right — Totals */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between" style={{ color: "#1B2A4A80" }}>
            <span>Subtotal</span>
            <span className="tabular-nums">{fmt(subtotal)}</span>
          </div>

          {store.overallDiscount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount ({store.overallDiscount}%)</span>
              <span className="tabular-nums">
                − {fmt(overallDiscountAmount)}
              </span>
            </div>
          )}

          {store.taxRate > 0 && (
            <div
              className="flex justify-between"
              style={{ color: "#1B2A4A80" }}
            >
              <span>({store.taxRate}%)</span>
              <span className="tabular-nums">{fmt(store.taxRate)}</span>
            </div>
          )}

          {/* Total row — navy top border, NO filled bg */}
          <div
            className="flex justify-between font-bold text-base pt-2 border-t-2"
            style={{ borderColor: "#1B2A4A", color: "#1B2A4A" }}
          >
            <span>Total</span>
            <span className="tabular-nums">{fmt(store.totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* ══ FOOTER — thin top border, no bg fill ═════════════════════════ */}
      <div
        className="px-8 py-3 flex items-center justify-between"
        style={{ borderTop: "1px solid #1B2A4A15" }}
      >
        <p className="text-[10px] font-mono" style={{ color: "#1B2A4A40" }}>
          {store.currency} &middot;{" "}
          {store.overallDiscount > 0
            ? `${store.overallDiscount}% Discount (${overallDiscountAmount.toFixed(2)})`
            : "No Discount"}
        </p>
        <p className="text-[10px] font-mono" style={{ color: "#1B2A4A40" }}>
          Invoice #{store.invoiceNumber}
        </p>
      </div>
    </article>
  );
}

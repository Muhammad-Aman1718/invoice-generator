"use client";

import { cn } from "@/src/lib/utils";
import { format, isValid, parseISO } from "date-fns";
import { InvoicePreviewProps } from "@/src/types/invoice-types";
import useInvoicePreview from "@/src/hooks/useInvoicePreview";

// ─────────────────────────────────────────────────────────────────────────────
//  INVOICE PREVIEW — Printer Optimized & Ink-Saving
//
//  Rules:
//  • Pure white background everywhere — zero ink on bg
//  • Color blocks removed — only thin borders (0.5-2px)
//  • #191970 text/borders only — no solid navy fills
//  • #FFC107 only for tiny 2px accent lines — almost zero ink
//  • Compact line-height & padding — more content per page
//  • 100+ items: table spans pages naturally with thead repeating
//  • @media print: correct page breaks, no shadows/radius
// ─────────────────────────────────────────────────────────────────────────────

function fmtDate(value: string) {
  const d = parseISO(value);
  return isValid(d) ? format(d, "MMM d, yyyy") : value;
}

export function InvoicePreview({
  className,
  id = "invoice-preview",
  style,
}: InvoicePreviewProps) {
  const { currencyInfo, subtotal, overallDiscountAmount, taxAmount, store, fmt } =
    useInvoicePreview();

  if (!store) return null;


  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #${id}, #${id} * { visibility: visible !important; }
          #${id} {
            position: fixed !important;
            inset: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            font-size: 10pt !important;
          }
          .inv-thead { display: table-header-group; }
          .inv-tbody { display: table-row-group; }
          .inv-no-break { page-break-inside: avoid; }
          .inv-row { page-break-inside: avoid; }
        }
      `}</style>

      <article
        id={id}
        style={{
          ...style,
          background: "#ffffff",
          width: "100%",
          maxWidth: "794px", /* A4 px width */
          fontFamily: "'Georgia', 'Times New Roman', serif",
          color: "#191970",
          fontSize: "11px",
          lineHeight: "1.5",
        }}
        className={cn(className)}
      >

        {/* ══ HEADER ════════════════════════════════════════════════════════ */}
        <header
          style={{
            padding: "28px 36px 18px 36px",
            borderBottom: "2px solid #191970",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "24px",
          }}
        >
          {/* Left: Logo + Business */}
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", flex: 1 }}>
            {store.logoDataUrl && (
              <img
                src={store.logoDataUrl}
                alt="Logo"
                style={{ height: "48px", maxWidth: "80px", objectFit: "contain", flexShrink: 0 }}
              />
            )}
            <div>
              {store.businessName && (
                <p style={{ fontWeight: 700, fontSize: "13px", color: "#191970", margin: 0, lineHeight: 1.3 }}>
                  {store.businessName}
                </p>
              )}
              {store.bussinessInfo && (
                <p style={{ fontSize: "9px", color: "rgba(25,25,112,0.55)", marginTop: "4px", whiteSpace: "pre-line", lineHeight: 1.5 }}>
                  {store.bussinessInfo}
                </p>
              )}
            </div>
          </div>

          {/* Right: Title + meta */}
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "0.12em", color: "#191970", margin: 0, lineHeight: 1 }}>
              INVOICE
            </p>
            {/* Amber accent — minimal ink */}
            <div style={{ height: "2px", width: "64px", background: "#FFC107", marginLeft: "auto", marginTop: "6px", marginBottom: "6px" }} />
            <p style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "11px", color: "#191970", margin: 0 }}>
              #{store.invoiceNumber}
            </p>
            {store.issueDate && (
              <p style={{ fontSize: "9px", color: "rgba(25,25,112,0.55)", marginTop: "2px" }}>
                Issued: {fmtDate(store.issueDate)}
              </p>
            )}
            {store.dueDate && (
              <p style={{ fontSize: "9px", color: "rgba(25,25,112,0.55)" }}>
                Due: {fmtDate(store.dueDate)}
              </p>
            )}
          </div>
        </header>

        {/* ══ BILL TO / SHIP TO / DETAILS ═══════════════════════════════════ */}
        <div
          className="inv-no-break"
          style={{
            padding: "14px 36px",
            borderBottom: "1px solid rgba(25,25,112,0.1)",
            display: "grid",
            gridTemplateColumns: store.shipTo ? "1fr 1fr 1fr" : "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Bill To */}
          <div>
            <p style={{ fontSize: "7.5px", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(25,25,112,0.4)", margin: "0 0 4px 0", paddingBottom: "2px", borderBottom: "1.5px solid #FFC107", display: "inline-block" }}>
              Bill To
            </p>
            {store.clientName && (
              <p style={{ fontWeight: 700, fontSize: "11px", color: "#191970", margin: "0 0 2px 0" }}>
                {store.clientName}
              </p>
            )}
            {store.clientAddress && (
              <p style={{ fontSize: "9.5px", color: "rgba(25,25,112,0.6)", margin: 0, whiteSpace: "pre-line", lineHeight: 1.5 }}>
                {store.clientAddress}
              </p>
            )}
          </div>

          {/* Ship To */}
          {store.shipTo && (
            <div>
              <p style={{ fontSize: "7.5px", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(25,25,112,0.4)", margin: "0 0 4px 0", paddingBottom: "2px", borderBottom: "1.5px solid rgba(25,25,112,0.2)", display: "inline-block" }}>
                Ship To
              </p>
              <p style={{ fontSize: "9.5px", color: "rgba(25,25,112,0.6)", margin: 0, whiteSpace: "pre-line", lineHeight: 1.5 }}>
                {store.shipTo}
              </p>
            </div>
          )}

          {/* Details */}
          <div style={{ textAlign: store.shipTo ? "left" : "right" }}>
            <p style={{ fontSize: "7.5px", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(25,25,112,0.4)", margin: "0 0 4px 0", paddingBottom: "2px", borderBottom: "1.5px solid rgba(25,25,112,0.12)", display: "inline-block" }}>
              Details
            </p>
            {store.poNumber && (
              <p style={{ fontSize: "9.5px", color: "#191970", margin: "0 0 1px 0" }}>
                PO: <strong>{store.poNumber}</strong>
              </p>
            )}
            <p style={{ fontSize: "9.5px", color: "#191970", margin: "0 0 1px 0" }}>
              Currency: <strong style={{ fontFamily: "monospace" }}>{store.currency}</strong> ({currencyInfo.symbol})
            </p>
            {store.taxRate > 0 && (
              <p style={{ fontSize: "9.5px", color: "#191970", margin: 0 }}>
                Tax: <strong>{store.taxRate}%</strong>
              </p>
            )}
          </div>
        </div>

        {/* ══ LINE ITEMS ════════════════════════════════════════════════════
            No background fills. Handles any number of rows.
            thead repeats on print page breaks automatically.                */}
        <div style={{ padding: "16px 36px 0 36px" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: "10.5px" }}
          >
            <thead className="inv-thead">
              <tr style={{ borderBottom: "1.5px solid #191970" }}>
                {[
                  { l: "Description", a: "left", w: "40%" },
                  { l: "Qty", a: "center", w: "8%" },
                  { l: "Unit Rate", a: "right", w: "15%" },
                  { l: "Disc %", a: "center", w: "9%" },
                  { l: "Amount", a: "right", w: "16%" },
                ].map((c) => (
                  <th
                    key={c.l}
                    style={{
                      textAlign: c.a as React.CSSProperties["textAlign"],
                      width: c.w,
                      padding: "3px 4px 5px",
                      fontSize: "7.5px",
                      fontWeight: 900,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(25,25,112,0.45)",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {c.l}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="inv-tbody">
              {store.lineItems.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  className="inv-row"
                  style={{
                    borderBottom: "0.5px solid rgba(25,25,112,0.08)",
                    background: idx % 2 !== 0 ? "rgba(25,25,112,0.018)" : "#ffffff",
                  }}
                >
                  <td style={{ padding: "5px 4px 5px 0", color: "#191970", fontWeight: 500, verticalAlign: "top" }}>
                    {item.description || "—"}
                  </td>
                  <td style={{ padding: "5px 4px", textAlign: "center", color: "rgba(25,25,112,0.6)", fontFamily: "monospace", verticalAlign: "top" }}>
                    {item.quantity}
                  </td>
                  <td style={{ padding: "5px 4px", textAlign: "right", color: "rgba(25,25,112,0.6)", fontFamily: "monospace", verticalAlign: "top" }}>
                    {fmt(item.rate)}
                  </td>
                  <td style={{ padding: "5px 4px", textAlign: "center", color: "rgba(25,25,112,0.5)", fontFamily: "monospace", verticalAlign: "top" }}>
                    {item.discount ? `${item.discount}%` : "—"}
                  </td>
                  <td style={{ padding: "5px 0 5px 4px", textAlign: "right", color: "#191970", fontWeight: 700, fontFamily: "monospace", verticalAlign: "top" }}>
                    {fmt(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ══ TOTALS + NOTES ════════════════════════════════════════════════
            Placed after all items — spans into next page if needed          */}
        <div
          className="inv-no-break"
          style={{
            padding: "12px 36px 20px 36px",
            borderTop: "1px solid rgba(25,25,112,0.1)",
            marginTop: "8px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Left: Notes + Terms + Signature */}
          <div style={{ fontSize: "9.5px", color: "rgba(25,25,112,0.6)" }}>
            {store.notes && (
              <div style={{ marginBottom: "10px" }}>
                <p style={{ fontSize: "7.5px", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#191970", marginBottom: "3px" }}>
                  Notes
                </p>
                <p style={{ whiteSpace: "pre-line", lineHeight: 1.55 }}>{store.notes}</p>
              </div>
            )}
            {store.terms && (
              <div style={{ marginBottom: "10px" }}>
                <p style={{ fontSize: "7.5px", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#191970", marginBottom: "3px" }}>
                  Terms & Conditions
                </p>
                <p style={{ whiteSpace: "pre-line", lineHeight: 1.55 }}>{store.terms}</p>
              </div>
            )}
            {store.stampUrl && (
              <div style={{ marginTop: "12px" }}>
                <img src={store.stampUrl} alt="Signature" style={{ height: "40px", objectFit: "contain", marginBottom: "4px" }} />
                <div style={{ width: "110px", borderTop: "1px solid rgba(25,25,112,0.25)" }} />
                <p style={{ fontSize: "7.5px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(25,25,112,0.4)", marginTop: "3px" }}>
                  Authorized Signature
                </p>
              </div>
            )}
            {/* Placeholder if nothing */}
            {!store.notes && !store.terms && !store.stampUrl && (
              <span />
            )}
          </div>

          {/* Right: Totals */}
          <div style={{ fontSize: "10.5px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", color: "rgba(25,25,112,0.6)" }}>
              <span>Subtotal</span>
              <span style={{ fontFamily: "monospace" }}>{fmt(subtotal)}</span>
            </div>

            {store.overallDiscount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", color: "#059669" }}>
                <span>Discount ({store.overallDiscount}%)</span>
                <span style={{ fontFamily: "monospace" }}>− {fmt(overallDiscountAmount)}</span>
              </div>
            )}

            {store.taxRate > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", color: "rgba(25,25,112,0.6)" }}>
                <span>Tax ({store.taxRate}%)</span>
                <span style={{ fontFamily: "monospace" }}>{fmt(taxAmount)}</span>
              </div>
            )}

            {/* Grand total — only element with real visual weight */}
            <div style={{ borderTop: "2px solid #191970", paddingTop: "6px", marginTop: "4px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: 700, fontSize: "13px", color: "#191970", letterSpacing: "0.04em" }}>
                TOTAL DUE
              </span>
              <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "14px", color: "#191970" }}>
                {fmt(store.totalAmount)}
              </span>
            </div>

            <p style={{ fontSize: "8px", color: "rgba(25,25,112,0.35)", textAlign: "right", marginTop: "3px" }}>
              All amounts in {store.currency}
            </p>
          </div>
        </div>

        {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
        <div
          style={{
            padding: "8px 36px",
            borderTop: "0.5px solid rgba(25,25,112,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "8px", color: "rgba(25,25,112,0.3)", fontFamily: "monospace", margin: 0 }}>
            {store.businessName ? `${store.businessName} · ` : ""}
            {store.currency}
            {store.overallDiscount > 0 ? ` · ${store.overallDiscount}% Discount` : ""}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FFC107", display: "inline-block" }} />
            <p style={{ fontSize: "8px", color: "rgba(25,25,112,0.3)", fontFamily: "monospace", margin: 0 }}>
              Invoice #{store.invoiceNumber}
            </p>
          </div>
        </div>

      </article>
    </>
  );
}
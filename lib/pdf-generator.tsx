// npm install @react-pdf/renderer

import { InvoiceData } from "@/types/invoice-types";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { CURRENCIES } from "./invoice-utils";

import { Font } from "@react-pdf/renderer";

// Roboto font register kar rahe hain kyunki ye symbols ko behtar handle karta hai
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 700,
    },
  ],
});

// ─────────────────────────────────────────────────────────────────────────────
//  Colors
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  navy: "#191970",
  amber: "#FFC107",
  white: "#ffffff",
  muted: "#7F7FB8", // rgba(25,25,112,0.55) approx
  muted2: "#9999C0", // rgba(25,25,112,0.4)
  muted3: "#BCBCDA", // rgba(25,25,112,0.25)
  divider: "#D8D8EB", // rgba(25,25,112,0.1)
  rowAlt: "#F7F7FC", // rgba(25,25,112,0.018)
  green: "#059669",
};

// ─────────────────────────────────────────────────────────────────────────────
//  Styles
// ─────────────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    backgroundColor: C.white,
    fontFamily: "Times-Roman",
    color: C.navy,
    fontSize: 10,
    paddingBottom: 32,
  },

  // ── Header ──────────────────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "22 30 14 30",
    borderBottomWidth: 2,
    borderBottomColor: C.navy,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    alignItems: "flex-start",
  },
  logo: { height: 40, maxWidth: 70, objectFit: "contain" },
  bizName: {
    fontFamily: "Times-Bold",
    fontSize: 12,
    color: C.navy,
    marginBottom: 2,
  },
  bizInfo: { fontSize: 8, color: C.muted, lineHeight: 1.5 },
  headerRight: { alignItems: "flex-end", flexShrink: 0 },
  invoiceTitle: {
    fontFamily: "Times-Bold",
    fontSize: 22,
    letterSpacing: 3,
    color: C.navy,
  },
  amberLine: {
    height: 2,
    width: 52,
    backgroundColor: C.amber,
    marginTop: 5,
    marginBottom: 5,
  },
  invoiceNum: { fontFamily: "Courier-Bold", fontSize: 10, color: C.navy },
  metaText: { fontSize: 8, color: C.muted, marginTop: 1 },

  // ── Info row ────────────────────────────────────────────────────────────
  infoRow: {
    flexDirection: "row",
    padding: "10 30",
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
    gap: 16,
  },
  infoCol: { flex: 1 },
  infoColRight: { flex: 1, alignItems: "flex-end" },
  sectionLabelAmber: {
    fontSize: 7,
    fontFamily: "Times-Bold",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: C.muted2,
    marginBottom: 3,
    paddingBottom: 2,
    borderBottomWidth: 1.5,
    borderBottomColor: C.amber,
    alignSelf: "flex-start",
  },
  sectionLabelGrey: {
    fontSize: 7,
    fontFamily: "Times-Bold",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: C.muted2,
    marginBottom: 3,
    paddingBottom: 2,
    borderBottomWidth: 1.5,
    borderBottomColor: C.muted3,
    alignSelf: "flex-start",
  },
  clientName: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    color: C.navy,
    marginBottom: 2,
  },
  infoText: { fontSize: 8.5, color: C.muted, lineHeight: 1.5 },

  // ── Table ───────────────────────────────────────────────────────────────
  tableWrap: { paddingHorizontal: 30, paddingTop: 12 },
  tableHead: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderBottomColor: C.navy,
    paddingBottom: 4,
    marginBottom: 1,
  },
  th: {
    fontSize: 7,
    fontFamily: "Times-Bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: C.muted2,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#EAEAF5",
    paddingVertical: 4,
    minHeight: 18,
  },
  tableRowAlt: { backgroundColor: C.rowAlt },
  td: { fontSize: 9, color: C.navy },
  tdMuted: { fontSize: 9, color: C.muted, fontFamily: "Courier" },
  tdBold: { fontSize: 9, color: C.navy, fontFamily: "Courier-Bold" },

  // Column widths — must sum ≤ 100%
  cDesc: { width: "42%", paddingRight: 6 },
  cQty: { width: "9%", textAlign: "center" },
  cRate: { width: "17%", textAlign: "right" },
  cDisc: { width: "10%", textAlign: "center" },
  cAmt: { width: "22%", textAlign: "right" },

  // ── Totals block (right-aligned, no wrap issues) ─────────────────────────
  totalsWrap: {
    paddingHorizontal: 30,
    paddingTop: 10,
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: C.divider,
    alignItems: "flex-end", // push totals to right side
  },
  totalsInner: { width: "46%" },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  totalsLabel: { fontSize: 9.5, color: C.muted },
  totalsValue: { fontSize: 9.5, color: C.muted, fontFamily: "Courier" },
  discLabel: { fontSize: 9.5, color: C.green },
  discValue: { fontSize: 9.5, color: C.green, fontFamily: "Courier" },
  grandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 2,
    borderTopColor: C.navy,
    paddingTop: 5,
    marginTop: 4,
  },
  grandLabel: {
    fontFamily: "Times-Bold",
    fontSize: 12,
    color: C.navy,
    letterSpacing: 1,
  },
  grandValue: { fontFamily: "Courier-Bold", fontSize: 13, color: C.navy },
  currNote: {
    fontSize: 7.5,
    color: C.muted3,
    textAlign: "right",
    marginTop: 2,
  },

  // ── Notes / Terms / Stamp ────────────────────────────────────────────────
  // These are SEPARATE blocks — each wraps independently across pages
  notesWrap: {
    paddingHorizontal: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: C.divider,
    marginTop: 6,
  },
  notesSectionLabel: {
    fontSize: 7,
    fontFamily: "Times-Bold",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: C.navy,
    marginBottom: 3,
  },
  notesText: { fontSize: 8.5, color: C.muted, lineHeight: 1.55 },

  stampWrap: { paddingHorizontal: 30, paddingTop: 12 },
  stamp: { height: 36, objectFit: "contain", marginBottom: 4 },
  stampLine: {
    width: 90,
    borderTopWidth: 1,
    borderTopColor: C.muted3,
    marginBottom: 2,
  },
  stampLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: C.muted2,
  },

  // ── Footer (fixed — shows on every page) ─────────────────────────────────
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6 30",
    borderTopWidth: 0.5,
    borderTopColor: C.divider,
    backgroundColor: C.white,
  },
  footerText: { fontSize: 7, color: C.muted3, fontFamily: "Courier" },
  footerRight: { flexDirection: "row", alignItems: "center", gap: 4 },
  footerDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.amber },
});

// ─────────────────────────────────────────────────────────────────────────────
//  Document
// ─────────────────────────────────────────────────────────────────────────────


function InvoicePDF({ d }: { d: InvoiceData }) {
  const getSafeSymbol = () => {
    const supportedSymbols = ["$", "€", "£", "¥"]; // Times-Roman inko support karta hai
    if (supportedSymbols.includes(d?.currencySymbol!)) {
      return d.currencySymbol;
    }
    // Agar koi aur currency hai (AED, PKR, etc.), toh uska Code dikhao (e.g., "AED")
    return d.currency;
  };

  const displaySymbol = getSafeSymbol();

  const fmt = (n: number) => {
    const value = (n || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Space maintain rahegi taake readability achi ho
    return `${displaySymbol} ${value}`;
  };

  const fmtDate = (v: string) => {
    try {
      if (!v) return "—";
      return format(new Date(v), "MMM d, yyyy");
    } catch {
      return v;
    }
  };

  // Logic to calculate actual discount amount for the display
  // Kyunki interface mein overallDiscount sirf percentage hai
  const calculatedDiscountAmt = (d.subtotal * d.overallDiscount) / 100;
  const calculatedTaxAmt =
    (d.subtotal - calculatedDiscountAmt) * (d.taxRate / 100);

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header - Fixed */}
        <View style={s.header} fixed>
          <View style={s.headerLeft}>
            {d.logoDataUrl && <Image src={d.logoDataUrl} style={s.logo} />}
            <View>
              <Text style={s.bizName}>{d.businessName || "Your Business"}</Text>
              <Text style={s.bizInfo}>{d.bussinessInfo}</Text>
            </View>
          </View>
          <View style={s.headerRight}>
            <Text style={s.invoiceTitle}>INVOICE</Text>
            <View style={s.amberLine} />
            <Text style={s.invoiceNum}>#{d.invoiceNumber}</Text>
            <Text style={s.metaText}>Issued: {fmtDate(d.issueDate)}</Text>
            <Text style={s.metaText}>Due: {fmtDate(d.dueDate)}</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={s.infoRow}>
          <View style={s.infoCol}>
            <Text style={s.sectionLabelAmber}>Bill To</Text>
            <Text style={s.clientName}>{d.clientName || "Client Name"}</Text>
            <Text style={s.infoText}>{d.clientAddress}</Text>
          </View>
          {d.shipTo && (
            <View style={s.infoCol}>
              <Text style={s.sectionLabelGrey}>Ship To</Text>
              <Text style={s.infoText}>{d.shipTo}</Text>
            </View>
          )}
          <View style={d.shipTo ? s.infoCol : s.infoColRight}>
            <Text style={s.sectionLabelGrey}>Details</Text>
            {d.poNumber && <Text style={s.infoText}>PO: {d.poNumber}</Text>}
            <Text style={s.infoText}>Currency: {d.currency}</Text>
            {d.taxRate > 0 && (
              <Text style={s.infoText}>Tax Rate: {d.taxRate}%</Text>
            )}
          </View>
        </View>

        {/* Table Body */}
        <View style={s.tableWrap}>
          <View style={s.tableHead} fixed>
            <Text style={[s.th, s.cDesc]}>Description</Text>
            <Text style={[s.th, s.cQty]}>Qty</Text>
            <Text style={[s.th, s.cRate]}>Rate</Text>
            <Text style={[s.th, s.cDisc]}>Disc%</Text>
            <Text style={[s.th, s.cAmt]}>Amount</Text>
          </View>

          {d.lineItems.map((item, i) => (
            <View
              key={item.id || i}
              style={[s.tableRow, i % 2 !== 0 ? s.tableRowAlt : {}]}
              wrap={false}
            >
              <Text style={[s.td, s.cDesc]}>{item.description || "—"}</Text>
              <Text style={[s.tdMuted, s.cQty]}>{item.quantity}</Text>
              <Text style={[s.tdMuted, s.cRate]}>{fmt(item.rate)}</Text>
              <Text style={[s.tdMuted, s.cDisc]}>
                {item.discount ? `${item.discount}%` : "—"}
              </Text>
              <Text style={[s.tdBold, s.cAmt]}>{fmt(item.amount)}</Text>
            </View>
          ))}
        </View>

        {/* Totals Section */}
        <View style={s.totalsWrap} wrap={false}>
          <View style={s.totalsInner}>
            <View style={s.totalsRow}>
              <Text style={s.totalsLabel}>Subtotal</Text>
              <Text style={s.totalsValue}>{fmt(d.subtotal)}</Text>
            </View>

            {d.overallDiscount > 0 && (
              <View style={s.totalsRow}>
                <Text style={s.discLabel}>Discount ({d.overallDiscount}%)</Text>
                <Text style={s.discValue}>− {fmt(calculatedDiscountAmt)}</Text>
              </View>
            )}

            {d.taxRate > 0 && (
              <View style={s.totalsRow}>
                <Text style={s.totalsLabel}>Tax ({d.taxRate}%)</Text>
                <Text style={s.totalsValue}>{fmt(calculatedTaxAmt)}</Text>
              </View>
            )}

            <View style={s.grandRow}>
              <Text style={s.grandLabel}>TOTAL DUE</Text>
              <Text style={s.grandValue}>{fmt(d.totalAmount)}</Text>
            </View>
          </View>
        </View>

        {/* Footer Notes & Terms */}
        <View wrap>
          {d.notes ? (
            <View style={s.notesWrap}>
              <Text style={s.notesSectionLabel}>Notes</Text>
              <Text style={s.notesText}>{d.notes}</Text>
            </View>
          ) : null}
          {d.terms ? (
            <View style={s.notesWrap}>
              <Text style={s.notesSectionLabel}>Terms</Text>
              <Text style={s.notesText}>{d.terms}</Text>
            </View>
          ) : null}
        </View>

        {/* Signature */}
        {d.stampUrl && (
          <View style={s.stampWrap} wrap={false}>
            <Image src={d.stampUrl} style={s.stamp} />
            <View style={s.stampLine} />
            <Text style={s.stampLabel}>Authorized Signature</Text>
          </View>
        )}

        <View style={s.footer} fixed>
          <Text style={s.footerText}>
            {d.businessName} · {d.currency}
          </Text>
          <View style={s.footerRight}>
            <View style={s.footerDot} />
            <Text style={s.footerText}>Page Invoice #{d.invoiceNumber}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  generateInvoicePDF  — call with buildInvoiceData(store, ...) result
// ─────────────────────────────────────────────────────────────────────────────
export async function generateInvoicePDF(data: InvoiceData): Promise<void> {
  const blob = await pdf(<InvoicePDF d={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `invoice-${data.invoiceNumber || Date.now()}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────────────────────────
//  buildInvoiceData  — convert store → InvoiceData
//
//  Usage in your hook:
//    const data = buildInvoiceData(store, subtotal, discountAmt, taxAmt, currencySymbol)
//    await generateInvoicePDF(data)
// ─────────────────────────────────────────────────────────────────────────────
export function buildInvoiceData(
  store: any,
  subtotal: number,
  discountAmount: number, // Ye calculation bahar se aa rahi hai
  taxAmount: number, // Ye calculation bahar se aa rahi hai
  // currencyCode: any       // Interface ke mutabiq CurrencyCode
): InvoiceData {
  const currencyData = CURRENCIES[store.currency] || {
    symbol: store.currency,
    locale: "en-US",
  };

  // Agar symbol galti se koi character ban raha hai toh usay normalize karein
  let cleanSymbol = currencyData.symbol;
  if (cleanSymbol.length > 3) cleanSymbol = store.currency;

  return {
    userId: store.userId,
    logoDataUrl: store.logoDataUrl ?? null,
    stampUrl: store.stampUrl ?? null,
    // Ensure invoiceNumber is a number as per interface
    invoiceNumber: parseInt(store.invoiceNumber) || 0,
    currency: store.currency, // e.g., "USD"
    businessName: store.businessName ?? "",
    bussinessInfo: store.bussinessInfo ?? "",
    issueDate: store.issueDate ?? "",
    dueDate: store.dueDate ?? "",
    poNumber: store.poNumber ?? "",
    clientName: store.clientName ?? "",
    clientAddress: store.clientAddress ?? "",
    shipTo: store.shipTo ?? "",
    lineItems: store.lineItems ?? [],
    notes: store.notes ?? "",
    terms: store.terms ?? "",
    subtotal: subtotal,
    overallDiscount: store.overallDiscount ?? 0,
    taxRate: store.taxRate ?? 0,
    totalAmount: store.totalAmount ?? 0,
    status: store.status ?? "draft",
    currencySymbol: cleanSymbol,
  };
}

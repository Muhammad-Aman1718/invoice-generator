import { InvoiceData } from "@/src/types/invoice-types";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { format, isValid, parseISO } from "date-fns";
import { CURRENCIES } from "./invoice-utils";
import { calculateTotals, getTotalsBreakdown } from "./invoice-store";


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
  paidStamp: {
    marginTop: 6,
    fontFamily: "Times-Bold",
    fontSize: 11,
    letterSpacing: 2,
    color: C.green,
    borderWidth: 1.5,
    borderColor: C.green,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  footerRight: { flexDirection: "row", alignItems: "center", gap: 4 },
  footerDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.amber },
});

// ─────────────────────────────────────────────────────────────────────────────
//  Document
// ─────────────────────────────────────────────────────────────────────────────


function InvoicePDF({ d, branding }: { d: InvoiceData; branding: boolean }) {
  const getSafeSymbol = () => {
    // The built-in PDF fonts only include these symbols; others fall back to the ISO code.
    const supportedSymbols = ["$", "€", "£", "¥"];
    if (d.currencySymbol && supportedSymbols.includes(d.currencySymbol)) {
      return d.currencySymbol;
    }
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
    if (!v) return "—";
    const parsed = parseISO(v);
    return isValid(parsed) ? format(parsed, "MMM d, yyyy") : v;
  };

  const { discountAmount: calculatedDiscountAmt, taxAmount: calculatedTaxAmt } =
    getTotalsBreakdown(d);

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header - Fixed */}
        <View style={s.header} fixed>
          <View style={s.headerLeft}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt */}
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
            {d.status === "paid" && <Text style={s.paidStamp}>PAID</Text>}
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
            {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt */}
            <Image src={d.stampUrl} style={s.stamp} />
            <View style={s.stampLine} />
            <Text style={s.stampLabel}>Authorized Signature</Text>
          </View>
        )}

        <View style={s.footer} fixed>
          <Text style={s.footerText}>
            {branding
              ? "Made with InvoiceGen"
              : [d.businessName, d.currency].filter(Boolean).join(" · ")}
          </Text>
          <View style={s.footerRight}>
            <View style={s.footerDot} />
            <Text
              style={s.footerText}
              render={({ pageNumber, totalPages }) =>
                `Invoice #${d.invoiceNumber} · Page ${pageNumber}/${totalPages}`
              }
            />
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  generateInvoicePDF — renders and downloads the invoice.
//  `branding` adds a small "Made with InvoiceGen" footer (Free plan / guests).
// ─────────────────────────────────────────────────────────────────────────────
export async function generateInvoicePDF(
  data: InvoiceData,
  options: { branding?: boolean } = {},
): Promise<void> {
  const blob = await pdf(<InvoicePDF d={data} branding={options.branding ?? true} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const client = data.clientName ? `-${data.clientName.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}` : "";
  a.download = `invoice-${data.invoiceNumber || Date.now()}${client}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Normalise any invoice-like object (store state or API data) for the PDF. */
export function buildInvoiceData(source: Partial<InvoiceData>): InvoiceData {
  const totals = calculateTotals(source);
  const currencyData = CURRENCIES[source.currency ?? "USD"] || {
    symbol: source.currency ?? "",
  };
  const symbol = currencyData.symbol.length > 3 ? source.currency : currencyData.symbol;

  return {
    logoDataUrl: source.logoDataUrl ?? null,
    stampUrl: source.stampUrl ?? null,
    invoiceNumber: Number(source.invoiceNumber) || 0,
    currency: source.currency ?? "USD",
    businessName: source.businessName ?? "",
    bussinessInfo: source.bussinessInfo ?? "",
    issueDate: source.issueDate ?? "",
    dueDate: source.dueDate ?? "",
    poNumber: source.poNumber ?? "",
    clientName: source.clientName ?? "",
    clientAddress: source.clientAddress ?? "",
    shipTo: source.shipTo ?? "",
    lineItems: totals.lineItems,
    notes: source.notes ?? "",
    terms: source.terms ?? "",
    subtotal: totals.subtotal,
    overallDiscount: Number(source.overallDiscount) || 0,
    taxRate: Number(source.taxRate) || 0,
    totalAmount: totals.totalAmount,
    status: source.status ?? "pending",
    currencySymbol: symbol,
  };
}


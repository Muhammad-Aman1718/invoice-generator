import { StyleSheet } from "@react-pdf/renderer";
import { PDF_COLORS } from "@/src/constant/theme";

export const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: PDF_COLORS.white,
    fontFamily: "Times-Roman",
    color: PDF_COLORS.navy,
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
    borderBottomColor: PDF_COLORS.navy,
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
    color: PDF_COLORS.navy,
    marginBottom: 2,
  },
  bizInfo: { fontSize: 8, color: PDF_COLORS.muted, lineHeight: 1.5 },
  headerRight: { alignItems: "flex-end", flexShrink: 0 },
  invoiceTitle: {
    fontFamily: "Times-Bold",
    fontSize: 22,
    letterSpacing: 3,
    color: PDF_COLORS.navy,
  },
  amberLine: {
    height: 2,
    width: 52,
    backgroundColor: PDF_COLORS.amber,
    marginTop: 5,
    marginBottom: 5,
  },
  invoiceNum: { fontFamily: "Courier-Bold", fontSize: 10, color: PDF_COLORS.navy },
  metaText: { fontSize: 8, color: PDF_COLORS.muted, marginTop: 1 },

  // ── Info row ────────────────────────────────────────────────────────────
  infoRow: {
    flexDirection: "row",
    padding: "10 30",
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLORS.divider,
    gap: 16,
  },
  infoCol: { flex: 1 },
  infoColRight: { flex: 1, alignItems: "flex-end" },
  sectionLabelAmber: {
    fontSize: 7,
    fontFamily: "Times-Bold",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: PDF_COLORS.muted2,
    marginBottom: 3,
    paddingBottom: 2,
    borderBottomWidth: 1.5,
    borderBottomColor: PDF_COLORS.amber,
    alignSelf: "flex-start",
  },
  sectionLabelGrey: {
    fontSize: 7,
    fontFamily: "Times-Bold",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: PDF_COLORS.muted2,
    marginBottom: 3,
    paddingBottom: 2,
    borderBottomWidth: 1.5,
    borderBottomColor: PDF_COLORS.muted3,
    alignSelf: "flex-start",
  },
  clientName: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    color: PDF_COLORS.navy,
    marginBottom: 2,
  },
  infoText: { fontSize: 8.5, color: PDF_COLORS.muted, lineHeight: 1.5 },

  // ── Table ───────────────────────────────────────────────────────────────
  tableWrap: { paddingHorizontal: 30, paddingTop: 12 },
  tableHead: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderBottomColor: PDF_COLORS.navy,
    paddingBottom: 4,
    marginBottom: 1,
  },
  th: {
    fontSize: 7,
    fontFamily: "Times-Bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: PDF_COLORS.muted2,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#EAEAF5",
    paddingVertical: 4,
    minHeight: 18,
  },
  tableRowAlt: { backgroundColor: PDF_COLORS.rowAlt },
  td: { fontSize: 9, color: PDF_COLORS.navy },
  tdMuted: { fontSize: 9, color: PDF_COLORS.muted, fontFamily: "Courier" },
  tdBold: { fontSize: 9, color: PDF_COLORS.navy, fontFamily: "Courier-Bold" },

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
    borderTopColor: PDF_COLORS.divider,
    alignItems: "flex-end", // push totals to right side
  },
  totalsInner: { width: "46%" },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  totalsLabel: { fontSize: 9.5, color: PDF_COLORS.muted },
  totalsValue: { fontSize: 9.5, color: PDF_COLORS.muted, fontFamily: "Courier" },
  discLabel: { fontSize: 9.5, color: PDF_COLORS.green },
  discValue: { fontSize: 9.5, color: PDF_COLORS.green, fontFamily: "Courier" },
  grandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 2,
    borderTopColor: PDF_COLORS.navy,
    paddingTop: 5,
    marginTop: 4,
  },
  grandLabel: {
    fontFamily: "Times-Bold",
    fontSize: 12,
    color: PDF_COLORS.navy,
    letterSpacing: 1,
  },
  grandValue: { fontFamily: "Courier-Bold", fontSize: 13, color: PDF_COLORS.navy },
  currNote: {
    fontSize: 7.5,
    color: PDF_COLORS.muted3,
    textAlign: "right",
    marginTop: 2,
  },

  // ── Notes / Terms / Stamp ────────────────────────────────────────────────
  // These are SEPARATE blocks — each wraps independently across pages
  notesWrap: {
    paddingHorizontal: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: PDF_COLORS.divider,
    marginTop: 6,
  },
  notesSectionLabel: {
    fontSize: 7,
    fontFamily: "Times-Bold",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: PDF_COLORS.navy,
    marginBottom: 3,
  },
  notesText: { fontSize: 8.5, color: PDF_COLORS.muted, lineHeight: 1.55 },

  stampWrap: { paddingHorizontal: 30, paddingTop: 12 },
  stamp: { height: 36, objectFit: "contain", marginBottom: 4 },
  stampLine: {
    width: 90,
    borderTopWidth: 1,
    borderTopColor: PDF_COLORS.muted3,
    marginBottom: 2,
  },
  stampLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: PDF_COLORS.muted2,
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
    borderTopColor: PDF_COLORS.divider,
    backgroundColor: PDF_COLORS.white,
  },
  footerText: { fontSize: 7, color: PDF_COLORS.muted3, fontFamily: "Courier" },
  paidStamp: {
    marginTop: 6,
    fontFamily: "Times-Bold",
    fontSize: 11,
    letterSpacing: 2,
    color: PDF_COLORS.green,
    borderWidth: 1.5,
    borderColor: PDF_COLORS.green,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  footerRight: { flexDirection: "row", alignItems: "center", gap: 4 },
  footerDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: PDF_COLORS.amber },
});

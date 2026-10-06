import { StyleSheet } from "@react-pdf/renderer";
import { PDF_COLORS } from "@/src/constant/theme";

const PAGE_PADDING_X = 34;
const label = {
  fontFamily: "Helvetica-Bold",
  fontSize: 7,
  letterSpacing: 1,
  textTransform: "uppercase" as const,
  color: PDF_COLORS.muted2,
  marginBottom: 3,
};

// Mirrors the HTML preview (src/components/invoice/preview) so the PDF matches what users see.
export const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: PDF_COLORS.white,
    fontFamily: "Helvetica",
    color: PDF_COLORS.navy,
    fontSize: 9,
    paddingBottom: 48,
  },
  accentBar: { flexDirection: "row", height: 5 },
  accentNavy: { flex: 1, backgroundColor: PDF_COLORS.navy },
  accentGold: { width: 80, backgroundColor: PDF_COLORS.amber },
  label,
  labelInverse: { ...label, color: PDF_COLORS.onNavyMuted },

  // ── Header ──
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: PAGE_PADDING_X,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerLeft: { flexDirection: "row", gap: 12, flex: 1, alignItems: "flex-start" },
  logo: { height: 42, maxWidth: 84, objectFit: "contain" },
  bizName: { fontFamily: "Helvetica-Bold", fontSize: 13 },
  bizInfo: { fontSize: 8, color: PDF_COLORS.muted, lineHeight: 1.5, marginTop: 3 },
  headerRight: { alignItems: "flex-end" },
  invoiceTitle: { fontFamily: "Helvetica-Bold", fontSize: 22, letterSpacing: 1.5 },
  invoiceNum: { fontFamily: "Helvetica-Bold", fontSize: 10, color: PDF_COLORS.muted, marginTop: 5 },
  paidStamp: {
    marginTop: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: PDF_COLORS.greenBg,
    color: PDF_COLORS.green,
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    letterSpacing: 1,
  },

  // ── Meta cards ──
  metaRow: { flexDirection: "row", gap: 8, paddingHorizontal: PAGE_PADDING_X },
  metaCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: PDF_COLORS.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  metaValue: { fontFamily: "Helvetica-Bold", fontSize: 9.5 },
  amountCard: {
    flex: 1,
    backgroundColor: PDF_COLORS.navy,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  amountValue: { fontFamily: "Helvetica-Bold", fontSize: 11, color: PDF_COLORS.amber },

  // ── Parties ──
  partiesRow: { flexDirection: "row", gap: 8, paddingHorizontal: PAGE_PADDING_X, marginTop: 12 },
  partyCard: {
    flex: 1,
    backgroundColor: PDF_COLORS.mist,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  partyName: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  partyText: { fontSize: 8.5, color: PDF_COLORS.muted, lineHeight: 1.5, marginTop: 2 },

  // ── Line items ──
  tableWrap: { paddingHorizontal: PAGE_PADDING_X, paddingTop: 16 },
  tableHead: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLORS.border,
    paddingBottom: 5,
  },
  th: { ...label, marginBottom: 0 },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLORS.border,
    paddingVertical: 7,
  },
  td: { fontSize: 9 },
  tdMuted: { fontSize: 9, color: PDF_COLORS.muted },
  tdBold: { fontSize: 9, fontFamily: "Helvetica-Bold" },
  cDesc: { width: "42%", paddingRight: 6 },
  cQty: { width: "9%", textAlign: "center" },
  cRate: { width: "17%", textAlign: "right" },
  cDisc: { width: "10%", textAlign: "center" },
  cAmt: { width: "22%", textAlign: "right" },

  // ── Notes + totals ──
  bottomRow: { flexDirection: "row", gap: 24, paddingHorizontal: PAGE_PADDING_X, paddingTop: 16 },
  notesCol: { flex: 1 },
  notesBlock: { marginBottom: 10 },
  notesText: { fontSize: 8.5, color: PDF_COLORS.muted, lineHeight: 1.55 },
  stamp: { height: 36, objectFit: "contain", marginBottom: 4, marginTop: 4 },
  stampLine: { width: 110, borderTopWidth: 1, borderTopColor: PDF_COLORS.border, marginBottom: 3 },
  totalsCol: { width: 210 },
  totalsRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3 },
  totalsLabel: { fontSize: 9, color: PDF_COLORS.muted },
  totalsValue: { fontSize: 9, color: PDF_COLORS.muted },
  discText: { fontSize: 9, color: PDF_COLORS.green },
  grandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    backgroundColor: PDF_COLORS.navy,
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  grandLabel: { ...label, color: PDF_COLORS.onNavyMuted, marginBottom: 0 },
  grandValue: { fontFamily: "Helvetica-Bold", fontSize: 13, color: PDF_COLORS.amber },
  currNote: { fontSize: 7.5, color: PDF_COLORS.muted2, textAlign: "right", marginTop: 4 },

  // ── Footer ──
  footer: {
    position: "absolute",
    bottom: 18,
    left: PAGE_PADDING_X,
    right: PAGE_PADDING_X,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: PDF_COLORS.border,
    paddingTop: 8,
  },
  footerLeft: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: PDF_COLORS.muted },
  footerText: { fontSize: 7.5, color: PDF_COLORS.muted2 },
  footerRight: { flexDirection: "row", alignItems: "center", gap: 4 },
  footerDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: PDF_COLORS.amber },
});

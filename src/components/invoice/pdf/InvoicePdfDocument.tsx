import { Document, Page, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import { createPdfMoneyFormatter } from "@/src/lib/pdfFormat";
import PdfHeader from "./PdfHeader";
import PdfMeta from "./PdfMeta";
import PdfParties from "./PdfParties";
import PdfLineItems from "./PdfLineItems";
import PdfTotals from "./PdfTotals";
import PdfNotes from "./PdfNotes";
import PdfFooter from "./PdfFooter";
import type { InvoicePdfDocumentProps } from "@/src/types/types";

export default function InvoicePdfDocument({ invoice, branding }: InvoicePdfDocumentProps) {
  const formatMoney = createPdfMoneyFormatter(invoice);
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.accentBar} fixed>
          <View style={s.accentNavy} />
          <View style={s.accentGold} />
        </View>
        <PdfHeader invoice={invoice} />
        <PdfMeta invoice={invoice} formatMoney={formatMoney} />
        <PdfParties invoice={invoice} />
        <PdfLineItems invoice={invoice} formatMoney={formatMoney} />
        <View style={s.bottomRow} wrap={false}>
          <PdfNotes invoice={invoice} />
          <PdfTotals invoice={invoice} formatMoney={formatMoney} />
        </View>
        <PdfFooter invoice={invoice} branding={branding} />
      </Page>
    </Document>
  );
}

import { Document, Page } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import { createPdfMoneyFormatter } from "@/src/lib/pdfFormat";
import PdfHeader from "./PdfHeader";
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
        <PdfHeader invoice={invoice} />
        <PdfParties invoice={invoice} />
        <PdfLineItems invoice={invoice} formatMoney={formatMoney} />
        <PdfTotals invoice={invoice} formatMoney={formatMoney} />
        <PdfNotes invoice={invoice} />
        <PdfFooter invoice={invoice} branding={branding} />
      </Page>
    </Document>
  );
}

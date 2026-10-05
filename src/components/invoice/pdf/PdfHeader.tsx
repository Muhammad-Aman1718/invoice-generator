import { Image, Text, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import { formatInvoiceDate } from "@/src/lib/format";
import type { PdfHeaderProps } from "@/src/types/types";

export default function PdfHeader({ invoice }: PdfHeaderProps) {
  return (
    <View style={s.header} fixed>
      <View style={s.headerLeft}>
        {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt prop */}
        {invoice.logoDataUrl && <Image src={invoice.logoDataUrl} style={s.logo} />}
        <View>
          <Text style={s.bizName}>{invoice.businessName || "Your Business"}</Text>
          <Text style={s.bizInfo}>{invoice.bussinessInfo}</Text>
        </View>
      </View>
      <View style={s.headerRight}>
        <Text style={s.invoiceTitle}>INVOICE</Text>
        <View style={s.amberLine} />
        <Text style={s.invoiceNum}>#{invoice.invoiceNumber}</Text>
        <Text style={s.metaText}>Issued: {formatInvoiceDate(invoice.issueDate)}</Text>
        <Text style={s.metaText}>Due: {formatInvoiceDate(invoice.dueDate)}</Text>
        {invoice.status === "paid" && <Text style={s.paidStamp}>PAID</Text>}
      </View>
    </View>
  );
}

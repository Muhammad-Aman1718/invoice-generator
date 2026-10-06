import { Text, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import { formatInvoiceDate } from "@/src/lib/format";
import type { PdfMetaProps } from "@/src/types/types";

export default function PdfMeta({ invoice, formatMoney }: PdfMetaProps) {
  const details = [
    { label: "Issue date", value: invoice.issueDate ? formatInvoiceDate(invoice.issueDate) : "-" },
    { label: "Due date", value: invoice.dueDate ? formatInvoiceDate(invoice.dueDate) : "-" },
    ...(invoice.poNumber ? [{ label: "PO number", value: invoice.poNumber }] : []),
  ];
  return (
    <View style={s.metaRow}>
      {details.map((detail) => (
        <View key={detail.label} style={s.metaCard}>
          <Text style={s.label}>{detail.label}</Text>
          <Text style={s.metaValue}>{detail.value}</Text>
        </View>
      ))}
      <View style={s.amountCard}>
        <Text style={s.labelInverse}>Amount due</Text>
        <Text style={s.amountValue}>{formatMoney(invoice.totalAmount)}</Text>
      </View>
    </View>
  );
}

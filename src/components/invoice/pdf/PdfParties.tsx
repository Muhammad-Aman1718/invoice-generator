import { Text, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import type { PdfPartiesProps } from "@/src/types/types";

export default function PdfParties({ invoice }: PdfPartiesProps) {
  return (
    <View style={s.infoRow}>
      <View style={s.infoCol}>
        <Text style={s.sectionLabelAmber}>Bill To</Text>
        <Text style={s.clientName}>{invoice.clientName || "Client Name"}</Text>
        <Text style={s.infoText}>{invoice.clientAddress}</Text>
      </View>
      {invoice.shipTo && (
        <View style={s.infoCol}>
          <Text style={s.sectionLabelGrey}>Ship To</Text>
          <Text style={s.infoText}>{invoice.shipTo}</Text>
        </View>
      )}
      <View style={invoice.shipTo ? s.infoCol : s.infoColRight}>
        <Text style={s.sectionLabelGrey}>Details</Text>
        {invoice.poNumber && <Text style={s.infoText}>PO: {invoice.poNumber}</Text>}
        <Text style={s.infoText}>Currency: {invoice.currency}</Text>
        {invoice.taxRate > 0 && <Text style={s.infoText}>Tax Rate: {invoice.taxRate}%</Text>}
      </View>
    </View>
  );
}

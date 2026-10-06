import { Text, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import type { PdfLineItemsProps } from "@/src/types/types";

export default function PdfLineItems({ invoice, formatMoney }: PdfLineItemsProps) {
  return (
    <View style={s.tableWrap}>
      <View style={s.tableHead} fixed>
        <Text style={[s.th, s.cDesc]}>Description</Text>
        <Text style={[s.th, s.cQty]}>Qty</Text>
        <Text style={[s.th, s.cRate]}>Unit rate</Text>
        <Text style={[s.th, s.cDisc]}>Disc %</Text>
        <Text style={[s.th, s.cAmt]}>Amount</Text>
      </View>
      {invoice.lineItems.map((item, index) => (
        <View key={item.id || index} style={s.tableRow} wrap={false}>
          <Text style={[s.td, s.cDesc]}>{item.description || "—"}</Text>
          <Text style={[s.tdMuted, s.cQty]}>{item.quantity}</Text>
          <Text style={[s.tdMuted, s.cRate]}>{formatMoney(item.rate)}</Text>
          <Text style={[s.tdMuted, s.cDisc]}>{item.discount ? `${item.discount}%` : "—"}</Text>
          <Text style={[s.tdBold, s.cAmt]}>{formatMoney(item.amount)}</Text>
        </View>
      ))}
    </View>
  );
}

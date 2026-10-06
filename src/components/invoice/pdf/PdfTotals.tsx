import { Text, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import { getTotalsBreakdown } from "@/src/lib/invoiceCalculations";
import type { PdfTotalsProps } from "@/src/types/types";

export default function PdfTotals({ invoice, formatMoney }: PdfTotalsProps) {
  const { discountAmount, taxAmount } = getTotalsBreakdown(invoice);
  return (
    <View style={s.totalsCol}>
      <View style={s.totalsRow}>
        <Text style={s.totalsLabel}>Subtotal</Text>
        <Text style={s.totalsValue}>{formatMoney(invoice.subtotal)}</Text>
      </View>
      {invoice.overallDiscount > 0 && (
        <View style={s.totalsRow}>
          <Text style={s.discText}>Discount ({invoice.overallDiscount}%)</Text>
          <Text style={s.discText}>− {formatMoney(discountAmount)}</Text>
        </View>
      )}
      {invoice.taxRate > 0 && (
        <View style={s.totalsRow}>
          <Text style={s.totalsLabel}>Tax ({invoice.taxRate}%)</Text>
          <Text style={s.totalsValue}>{formatMoney(taxAmount)}</Text>
        </View>
      )}
      <View style={s.grandRow}>
        <Text style={s.grandLabel}>Total due</Text>
        <Text style={s.grandValue}>{formatMoney(invoice.totalAmount)}</Text>
      </View>
      <Text style={s.currNote}>All amounts in {invoice.currency}</Text>
    </View>
  );
}

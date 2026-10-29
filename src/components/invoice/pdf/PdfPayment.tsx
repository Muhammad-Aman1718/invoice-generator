import { Text, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import type { PdfNotesProps } from "@/src/types/types";

export default function PdfPayment({ invoice }: PdfNotesProps) {
  const details = invoice.paymentDetails.trim();
  if (!details) return <View style={s.paymentCol} />;
  return (
    <View style={s.paymentCol}>
      <View style={s.paymentCard}>
        <Text style={s.label}>Payment details</Text>
        <Text style={s.paymentText}>{details}</Text>
      </View>
    </View>
  );
}

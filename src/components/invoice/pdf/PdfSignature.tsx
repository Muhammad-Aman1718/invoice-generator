import { Image, Text, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import type { PdfNotesProps } from "@/src/types/types";

export default function PdfSignature({ invoice }: PdfNotesProps) {
  if (!invoice.stampUrl) return null;
  return (
    <View style={s.signatureRow} wrap={false}>
      <View style={s.signatureBox}>
        {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt prop */}
        <Image src={invoice.stampUrl} style={s.stamp} />
        <View style={s.stampLine} />
        <Text style={s.label}>Authorized signature</Text>
      </View>
    </View>
  );
}

import { Text, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import type { PdfPartiesProps } from "@/src/types/types";

export default function PdfParties({ invoice }: PdfPartiesProps) {
  return (
    <View style={s.partiesRow}>
      <View style={s.partyCard}>
        <Text style={s.label}>Bill to</Text>
        <Text style={s.partyName}>{invoice.clientName || "Client name"}</Text>
        {invoice.clientAddress ? <Text style={s.partyText}>{invoice.clientAddress}</Text> : null}
      </View>
      {invoice.shipTo ? (
        <View style={s.partyCard}>
          <Text style={s.label}>Ship to</Text>
          <Text style={s.partyText}>{invoice.shipTo}</Text>
        </View>
      ) : null}
    </View>
  );
}

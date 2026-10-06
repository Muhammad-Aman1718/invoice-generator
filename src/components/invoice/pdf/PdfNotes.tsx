import { Image, Text, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import type { PdfNotesProps } from "@/src/types/types";

export default function PdfNotes({ invoice }: PdfNotesProps) {
  const blocks = [
    { label: "Notes", text: invoice.notes },
    { label: "Terms & conditions", text: invoice.terms },
  ].filter((block) => block.text);

  return (
    <View style={s.notesCol}>
      {blocks.map((block) => (
        <View key={block.label} style={s.notesBlock}>
          <Text style={s.label}>{block.label}</Text>
          <Text style={s.notesText}>{block.text}</Text>
        </View>
      ))}
      {invoice.stampUrl ? (
        <View>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt prop */}
          <Image src={invoice.stampUrl} style={s.stamp} />
          <View style={s.stampLine} />
          <Text style={s.label}>Authorized signature</Text>
        </View>
      ) : null}
    </View>
  );
}

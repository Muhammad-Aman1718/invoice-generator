import { Image, Text, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import type { PdfNotesProps } from "@/src/types/types";

export default function PdfNotes({ invoice }: PdfNotesProps) {
  const blocks = [
    { label: "Notes", text: invoice.notes },
    { label: "Terms", text: invoice.terms },
  ].filter((block) => block.text);

  return (
    <>
      <View wrap>
        {blocks.map((block) => (
          <View key={block.label} style={s.notesWrap}>
            <Text style={s.notesSectionLabel}>{block.label}</Text>
            <Text style={s.notesText}>{block.text}</Text>
          </View>
        ))}
      </View>
      {invoice.stampUrl && (
        <View style={s.stampWrap} wrap={false}>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt prop */}
          <Image src={invoice.stampUrl} style={s.stamp} />
          <View style={s.stampLine} />
          <Text style={s.stampLabel}>Authorized Signature</Text>
        </View>
      )}
    </>
  );
}

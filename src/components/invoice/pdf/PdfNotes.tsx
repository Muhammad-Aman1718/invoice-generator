import { Text, View } from "@react-pdf/renderer";
import PdfTextBlocks from "./PdfTextBlocks";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import { getNoteSections } from "@/src/lib/invoiceText";
import type { PdfNotesProps } from "@/src/types/types";

/** Full-width notes and terms; long text flows onto the next page instead of being cut. */
export default function PdfNotes({ invoice }: PdfNotesProps) {
  const sections = getNoteSections(invoice);
  if (!sections.length) return null;
  return (
    <View style={s.notesSection}>
      {sections.map((section) => (
        <View key={section.label} style={s.notesBlock}>
          <Text style={s.label} minPresenceAhead={24}>
            {section.label}
          </Text>
          <PdfTextBlocks text={section.text} />
        </View>
      ))}
    </View>
  );
}

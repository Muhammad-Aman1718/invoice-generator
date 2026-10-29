import { Text, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import { parseTextBlocks } from "@/src/lib/textBlocks";
import type { PreviewTextBlocksProps } from "@/src/types/types";

/** PDF twin of PreviewTextBlocks: paragraphs plus bullet / numbered lists. */
export default function PdfTextBlocks({ text }: PreviewTextBlocksProps) {
  return (
    <View>
      {parseTextBlocks(text).map((block, index) =>
        block.type === "paragraph" ? (
          <Text key={index} style={s.notesText}>
            {block.lines.join("\n")}
          </Text>
        ) : (
          <View key={index} style={s.notesList}>
            {block.items.map((item, itemIndex) => (
              <View key={itemIndex} style={s.notesListItem}>
                <Text style={s.notesMarker}>{block.ordered ? `${itemIndex + 1}.` : "•"}</Text>
                <Text style={s.notesListText}>{item}</Text>
              </View>
            ))}
          </View>
        ),
      )}
    </View>
  );
}

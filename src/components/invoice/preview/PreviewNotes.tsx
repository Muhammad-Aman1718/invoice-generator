import PreviewLabel from "./PreviewLabel";
import PreviewTextBlocks from "./PreviewTextBlocks";
import { getNoteSections } from "@/src/lib/invoiceText";
import type { PreviewNotesProps } from "@/src/types/types";

/** Notes and terms run across the full page width so long text stays readable. */
export default function PreviewNotes({ invoice }: PreviewNotesProps) {
  const sections = getNoteSections(invoice);
  if (!sections.length) return null;

  return (
    <div className="mx-10 mt-7 space-y-4 border-t border-navy/[0.08] pt-5 text-[11px] text-navy/70">
      {sections.map((section) => (
        <section key={section.label} className="avoid-break">
          <PreviewLabel>{section.label}</PreviewLabel>
          <PreviewTextBlocks text={section.text} />
        </section>
      ))}
    </div>
  );
}

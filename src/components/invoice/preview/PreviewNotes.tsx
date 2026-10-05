import type { PreviewNotesProps } from "@/src/types/types";

export default function PreviewNotes({ invoice }: PreviewNotesProps) {
  const blocks = [
    { label: "Notes", text: invoice.notes },
    { label: "Terms & Conditions", text: invoice.terms },
  ].filter((block) => block.text);

  return (
    <div className="text-[9.5px] text-navy/60">
      {blocks.map((block) => (
        <div key={block.label} className="mb-2.5">
          <p className="mb-[3px] text-[7.5px] font-black uppercase tracking-[0.12em] text-navy">
            {block.label}
          </p>
          <p className="whitespace-pre-line leading-relaxed">{block.text}</p>
        </div>
      ))}
      {invoice.stampUrl && (
        <div className="mt-3">
          <img src={invoice.stampUrl} alt="Signature" className="mb-1 h-10 object-contain" />
          <div className="w-[110px] border-t border-navy/25" />
          <p className="mt-[3px] text-[7.5px] uppercase tracking-[0.1em] text-navy/40">
            Authorized Signature
          </p>
        </div>
      )}
    </div>
  );
}

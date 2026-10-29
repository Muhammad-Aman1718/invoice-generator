import { parseTextBlocks } from "@/src/lib/textBlocks";
import type { PreviewTextBlocksProps } from "@/src/types/types";

/** Notes / terms text with paragraphs, line breaks and "- " or "1. " lists kept. */
export default function PreviewTextBlocks({ text }: PreviewTextBlocksProps) {
  return (
    <div className="wrap-anywhere space-y-1.5 leading-relaxed">
      {parseTextBlocks(text).map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index} className="whitespace-pre-line">
              {block.lines.join("\n")}
            </p>
          );
        }
        const ListTag = block.ordered ? "ol" : "ul";
        return (
          <ListTag
            key={index}
            className={`space-y-0.5 pl-4 marker:text-navy/65 ${block.ordered ? "list-decimal" : "list-disc"}`}
          >
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="pl-0.5">
                {item}
              </li>
            ))}
          </ListTag>
        );
      })}
    </div>
  );
}

import type { TextBlock } from "@/src/types/types";

const BULLET = /^\s*[-*•]\s+/;
const NUMBERED = /^\s*\d{1,3}[.)]\s+/;

function getListKind(line: string): "bullet" | "numbered" | null {
  if (BULLET.test(line)) return "bullet";
  if (NUMBERED.test(line)) return "numbered";
  return null;
}

/**
 * Split free text (notes, terms) into paragraphs and lists so the preview and PDF
 * can format it: blank lines start a new paragraph, "- " / "• " / "1. " lines become lists.
 */
export function parseTextBlocks(text: string): TextBlock[] {
  const blocks: TextBlock[] = [];
  let current: TextBlock | null = null;

  for (const rawLine of text.replace(/\r\n?/g, "\n").split("\n")) {
    const line = rawLine.trim();
    if (!line) {
      current = null;
      continue;
    }
    const kind = getListKind(line);
    if (kind) {
      const ordered = kind === "numbered";
      const item = line.replace(ordered ? NUMBERED : BULLET, "");
      if (current?.type === "list" && current.ordered === ordered) current.items.push(item);
      else blocks.push((current = { type: "list", ordered, items: [item] }));
    } else if (current?.type === "paragraph") {
      current.lines.push(line);
    } else {
      blocks.push((current = { type: "paragraph", lines: [line] }));
    }
  }
  return blocks;
}

import { describe, expect, it } from "vitest";
import { parseTextBlocks } from "@/src/lib/textBlocks";

describe("parseTextBlocks", () => {
  it("returns nothing for blank text", () => {
    expect(parseTextBlocks("  \n\n ")).toEqual([]);
  });

  it("keeps line breaks inside a paragraph and splits on blank lines", () => {
    expect(parseTextBlocks("Line one\nLine two\n\nNext")).toEqual([
      { type: "paragraph", lines: ["Line one", "Line two"] },
      { type: "paragraph", lines: ["Next"] },
    ]);
  });

  it("turns dashes, bullets and numbers into lists", () => {
    expect(parseTextBlocks("Terms:\n- Pay in 14 days\n• 2% late fee\n1. First\n2) Second")).toEqual([
      { type: "paragraph", lines: ["Terms:"] },
      { type: "list", ordered: false, items: ["Pay in 14 days", "2% late fee"] },
      { type: "list", ordered: true, items: ["First", "Second"] },
    ]);
  });

  it("does not treat negative numbers or hyphenated words as bullets", () => {
    expect(parseTextBlocks("-5% discount\nwell-known")).toEqual([
      { type: "paragraph", lines: ["-5% discount", "well-known"] },
    ]);
  });
});

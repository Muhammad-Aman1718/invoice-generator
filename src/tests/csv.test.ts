import { describe, expect, it } from "vitest";
import { toCsv, toCsvCell } from "@/src/lib/csv";

describe("toCsvCell", () => {
  it("quotes values and escapes embedded quotes", () => {
    expect(toCsvCell('Say "hi"')).toBe('"Say ""hi"""');
  });

  it("renders null and undefined as empty cells", () => {
    expect(toCsvCell(null)).toBe('""');
    expect(toCsvCell(undefined)).toBe('""');
  });

  it("neutralises spreadsheet formulas", () => {
    expect(toCsvCell("=SUM(A1:A2)")).toBe('"\'=SUM(A1:A2)"');
    expect(toCsvCell("-10")).toBe('"\'-10"');
  });
});

describe("toCsv", () => {
  it("joins cells with commas and rows with CRLF", () => {
    expect(
      toCsv([
        ["a", 1],
        ["b", 2],
      ]),
    ).toBe('"a","1"\r\n"b","2"');
  });
});

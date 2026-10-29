import { describe, expect, it } from "vitest";
import { getDocumentHeading, getNoteSections, getTaxLineLabel } from "@/src/lib/invoiceText";
import { getTaxDisplayName, getTaxLabelForRate } from "@/src/lib/taxUtils";

describe("invoice text helpers", () => {
  it("prints the document heading and tax line", () => {
    expect(getDocumentHeading({ documentTitle: "tax_invoice" })).toBe("TAX INVOICE");
    expect(getTaxLineLabel({ taxLabel: "VAT", taxRate: 20 })).toBe("VAT (20%)");
    expect(getTaxLineLabel({ taxLabel: " ", taxRate: 5 })).toBe("Tax (5%)");
  });

  it("skips empty notes and terms", () => {
    expect(getNoteSections({ notes: "  ", terms: "Pay in 14 days" })).toEqual([
      { label: "Terms & conditions", text: "Pay in 14 days" },
    ]);
  });

  it("maps tax presets to printed names and back", () => {
    expect(getTaxDisplayName("VAT (Standard)")).toBe("VAT");
    expect(getTaxDisplayName("Custom Tax")).toBe("Tax");
    expect(getTaxLabelForRate(20, "TVA")).toBe("TVA");
    expect(getTaxLabelForRate(20)).toBe("VAT (Standard)");
    expect(getTaxLabelForRate(17, "Sales Tax")).toBe("Custom Tax");
    expect(getTaxLabelForRate(10, "Tax")).toBe("Custom Tax");
    expect(getTaxLabelForRate(0)).toBe("None");
  });
});

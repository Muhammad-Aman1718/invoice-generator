import { describe, expect, it } from "vitest";
import { getTooLongMessage, validateInvoiceDraft } from "@/src/lib/invoiceValidation";
import { calculateTotals, createEmptyInvoice } from "@/src/lib/invoiceCalculations";
import { FIELD_LIMITS, MAX_MONEY_AMOUNT } from "@/src/constant/limits";
import { VALIDATION_MESSAGES } from "@/src/constant/validation";
import type { InvoiceData } from "@/src/types/types";

function makeInvoice(overrides: Partial<InvoiceData> = {}): InvoiceData {
  const invoice: InvoiceData = {
    ...createEmptyInvoice(),
    invoiceNumber: 12,
    businessName: "Harborlane Studio",
    clientName: "Meridian Freight",
    issueDate: "2026-10-01",
    dueDate: "2026-10-15",
    lineItems: [{ id: "a", description: "Design", quantity: 2, rate: 100, discount: 0, amount: 0 }],
    ...overrides,
  };
  return { ...invoice, ...calculateTotals(invoice) };
}

describe("validateInvoiceDraft", () => {
  it("accepts a complete invoice", () => {
    expect(validateInvoiceDraft(makeInvoice())).toEqual({});
  });

  it("requires business and client names", () => {
    const errors = validateInvoiceDraft(makeInvoice({ businessName: " ", clientName: "" }));
    expect(errors.businessName).toBe("Business name is required.");
    expect(errors.clientName).toBe("Client name is required.");
  });

  it("rejects text longer than the shared field limits", () => {
    const tooLong = "x".repeat(FIELD_LIMITS.notes + 1);
    const errors = validateInvoiceDraft(makeInvoice({ notes: tooLong }));
    expect(errors.notes).toBe(getTooLongMessage("Notes", FIELD_LIMITS.notes, tooLong.length));
  });

  it("checks the invoice number and dates", () => {
    const errors = validateInvoiceDraft(makeInvoice({ invoiceNumber: 0, dueDate: "2026-09-01" }));
    expect(errors.invoiceNumber).toBe(VALIDATION_MESSAGES.invoiceNumber);
    expect(errors.dueDate).toBe(VALIDATION_MESSAGES.dueBeforeIssue);
    expect(validateInvoiceDraft(makeInvoice({ issueDate: "" })).issueDate).toBe(
      VALIDATION_MESSAGES.issueDate,
    );
  });

  it("needs at least one described item and a description for priced rows", () => {
    const empty = makeInvoice({
      lineItems: [{ id: "a", description: "", quantity: 1, rate: 0, discount: 0, amount: 0 }],
    });
    expect(validateInvoiceDraft(empty).itemDescription0).toBe(VALIDATION_MESSAGES.noItems);

    const unnamed = makeInvoice({
      lineItems: [
        { id: "a", description: "Design", quantity: 1, rate: 10, discount: 0, amount: 0 },
        { id: "b", description: "", quantity: 1, rate: 50, discount: 0, amount: 0 },
      ],
    });
    expect(validateInvoiceDraft(unnamed).itemDescription1).toBe(VALIDATION_MESSAGES.itemDescription);
  });

  it("flags quantities, rates and totals that are too large", () => {
    const errors = validateInvoiceDraft(
      makeInvoice({
        lineItems: [
          { id: "a", description: "Big", quantity: 2e9, rate: MAX_MONEY_AMOUNT + 1, discount: 0, amount: 0 },
        ],
      }),
    );
    expect(errors.itemQuantity0).toBe(VALIDATION_MESSAGES.itemQuantity);
    expect(errors.itemRate0).toBe(VALIDATION_MESSAGES.itemRate);
    expect(errors.itemDescription0).toBe(VALIDATION_MESSAGES.total);
  });

  it("lists errors in form order", () => {
    const errors = validateInvoiceDraft(makeInvoice({ businessName: "", clientName: "", issueDate: "" }));
    expect(Object.keys(errors)).toEqual(["businessName", "clientName", "issueDate"]);
  });
});

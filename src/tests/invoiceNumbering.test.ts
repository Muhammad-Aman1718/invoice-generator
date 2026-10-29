import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildNextInvoice,
  getNextInvoiceNumber,
  readLastIssuedNumber,
  recordIssuedNumber,
} from "@/src/lib/invoiceNumbering";
import { createEmptyInvoice } from "@/src/lib/invoiceCalculations";

function stubBrowserStorage() {
  const store = new Map<string, string>();
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
    },
    dispatchEvent: vi.fn(),
  });
}

describe("guest invoice numbering", () => {
  beforeEach(stubBrowserStorage);
  afterEach(() => vi.unstubAllGlobals());

  it("starts at 0 and only moves forward", () => {
    expect(readLastIssuedNumber()).toBe(0);
    recordIssuedNumber(5);
    recordIssuedNumber(3);
    expect(readLastIssuedNumber()).toBe(5);
    expect(getNextInvoiceNumber(readLastIssuedNumber())).toBe(6);
  });

  it("keeps business details but clears client and items for the next invoice", () => {
    const current = {
      ...createEmptyInvoice(),
      businessName: "Acme",
      notes: "Thanks",
      paymentDetails: "IBAN 123",
      clientName: "Globex",
      poNumber: "PO-1",
    };
    const next = buildNextInvoice(current, 6);
    expect(next).toMatchObject({
      invoiceNumber: 6,
      businessName: "Acme",
      notes: "Thanks",
      paymentDetails: "IBAN 123",
    });
    expect(next.clientName).toBe("");
    expect(next.poNumber).toBe("");
  });

  it("survives storage being unavailable", () => {
    vi.stubGlobal("window", {});
    expect(readLastIssuedNumber()).toBe(0);
    expect(() => recordIssuedNumber(4)).not.toThrow();
  });
});

import { describe, expect, it } from "vitest";
import { buildPaymentReminder } from "@/src/lib/paymentReminder";
import { PLANS } from "@/src/constant/plans";

const invoice = {
  invoiceNumber: 1003,
  clientName: "Umbrella Health",
  totalAmount: 1518,
  currency: "USD",
  dueDate: "2026-09-16",
};

describe("buildPaymentReminder", () => {
  it("mentions the number, amount and how overdue the invoice is", () => {
    const text = buildPaymentReminder({ invoice, senderName: "Acme Studio", today: "2026-10-06" });
    expect(text).toContain("Subject: Payment reminder for invoice #1003 ($1,518.00)");
    expect(text).toContain("Hi Umbrella Health,");
    expect(text).toContain("was due on Sep 16, 2026 (20 days ago)");
    expect(text.trim().endsWith("Acme Studio")).toBe(true);
  });

  it("uses singular days and upcoming due dates correctly", () => {
    expect(buildPaymentReminder({ invoice, senderName: "A", today: "2026-09-17" })).toContain("(1 day ago)");
    expect(buildPaymentReminder({ invoice, senderName: "A", today: "2026-09-10" })).toContain(
      "is due on Sep 16, 2026",
    );
  });

  it("falls back gracefully without a client name, due date or sender", () => {
    const text = buildPaymentReminder({
      invoice: { ...invoice, clientName: "", dueDate: "" },
      senderName: "",
      today: "2026-10-06",
    });
    expect(text).toContain("Hello,");
    expect(text).toContain("is awaiting payment");
    expect(text).toContain("Thanks");
  });
});

describe("plan perks", () => {
  it("gives priority support, early access and onboarding only to Business", () => {
    for (const perk of ["prioritySupport", "earlyAccess", "onboardingCall"] as const) {
      expect(PLANS.business.perks[perk]).toBe(true);
      expect(PLANS.pro.perks[perk]).toBe(false);
      expect(PLANS.free.perks[perk]).toBe(false);
    }
  });

  it("removes branding and enables CSV on paid plans only", () => {
    expect(PLANS.free.perks.removeBranding).toBe(false);
    expect(PLANS.pro.perks.removeBranding && PLANS.pro.perks.csvExport).toBe(true);
  });
});

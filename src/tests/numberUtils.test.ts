import { describe, expect, it } from "vitest";
import { clampPercent, toPositiveNumber } from "@/src/lib/numberUtils";

describe("clampPercent", () => {
  it("keeps values between 0 and 100", () => {
    expect(clampPercent(-5)).toBe(0);
    expect(clampPercent(42.5)).toBe(42.5);
    expect(clampPercent(150)).toBe(100);
    expect(clampPercent(Number.NaN)).toBe(0);
  });
});

describe("toPositiveNumber", () => {
  it("parses input and never goes below zero", () => {
    expect(toPositiveNumber("12.5")).toBe(12.5);
    expect(toPositiveNumber("-3")).toBe(0);
    expect(toPositiveNumber("")).toBe(0);
    expect(toPositiveNumber("abc")).toBe(0);
  });
});

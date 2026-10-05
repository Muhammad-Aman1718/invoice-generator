import { MAX_PERCENT } from "@/src/constant/limits";

/** Keep a percentage between 0 and 100 (invalid → 0). */
export function clampPercent(value: number): number {
  return Math.min(MAX_PERCENT, Math.max(0, Number.isFinite(value) ? value : 0));
}

/** Parse user input into a non-negative number (blank or invalid → 0). */
export function toPositiveNumber(value: string): number {
  return Math.max(0, parseFloat(value) || 0);
}

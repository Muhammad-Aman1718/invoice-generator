import { format, isValid, parseISO } from "date-fns";
import { CURRENCIES, DEFAULT_CURRENCY, MONEY_FRACTION_DIGITS } from "@/src/constant/currencies";
import type { Currency, CurrencyCode } from "@/src/types/types";

export function getCurrency(code: CurrencyCode): Currency {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES.find((c) => c.code === DEFAULT_CURRENCY)!;
}

/** e.g. formatCurrency(1200, "USD") → "$1,200.00" */
export function formatCurrency(amount: number, code: CurrencyCode): string {
  const { symbol, locale } = getCurrency(code);
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: MONEY_FRACTION_DIGITS,
    maximumFractionDigits: MONEY_FRACTION_DIGITS,
  }).format(amount || 0);
  return `${symbol}${formatted}`;
}

/** Plain two-decimal number, e.g. 1234.5 → "1,234.50". */
export function formatAmount(amount: number): string {
  return (amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: MONEY_FRACTION_DIGITS,
    maximumFractionDigits: MONEY_FRACTION_DIGITS,
  });
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/** "2026-10-05" (or an ISO timestamp) → "Oct 5, 2026"; "—" when empty. */
export function formatShortDate(value?: string | null): string {
  if (!value) return "-";
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatLongDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", { dateStyle: "long" });
}

/** "2026-10-05" → "Oct 5, 2026" (or "—" when empty). */
export function formatInvoiceDate(value: string): string {
  if (!value) return "-";
  const parsed = parseISO(value);
  return isValid(parsed) ? format(parsed, "MMM d, yyyy") : value;
}

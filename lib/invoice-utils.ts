import type {
  CurrencyCode,
  LineItem,
  TaxConfig,
  DiscountConfig,
} from "./invoice-types";

export const CURRENCIES: Record<
  CurrencyCode,
  { symbol: string; name: string; locale: string }
> = {
  USD: { symbol: "$", name: "US Dollar", locale: "en-US" },
  EUR: { symbol: "€", name: "Euro", locale: "de-DE" },
  GBP: { symbol: "£", name: "British Pound", locale: "en-GB" },
  CAD: { symbol: "C$", name: "Canadian Dollar", locale: "en-CA" },
};

export function formatCurrency(
  amount: number,
  currency: CurrencyCode,
  options?: { showSymbol?: boolean }
): string {
  const { symbol, locale } = CURRENCIES[currency];
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return options?.showSymbol !== false ? `${symbol}${formatted}` : formatted;
}

export function calculateLineItemAmount(quantity: number, rate: number): number {
  return Math.round(quantity * rate * 100) / 100;
}

export function calculateSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

export function calculateTaxAmount(subtotal: number, tax: TaxConfig): number {
  if (tax.type === "percentage") {
    return Math.round(subtotal * (tax.value / 100) * 100) / 100;
  }
  return tax.value;
}

export function calculateDiscountAmount(
  subtotal: number,
  discount: DiscountConfig
): number {
  if (discount.type === "percentage") {
    return Math.round(subtotal * (discount.value / 100) * 100) / 100;
  }
  return discount.value;
}

export function calculateGrandTotal(
  subtotal: number,
  tax: TaxConfig,
  discount: DiscountConfig
): number {
  const taxAmount = calculateTaxAmount(subtotal, tax);
  const discountAmount = calculateDiscountAmount(subtotal, discount);
  return Math.round((subtotal + taxAmount - discountAmount) * 100) / 100;
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

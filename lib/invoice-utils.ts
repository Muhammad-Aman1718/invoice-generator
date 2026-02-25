import type {
  CurrencyCode,
  LineItem,
  TaxConfig,
  DiscountConfig,
} from "../types/invoice-types";

export const CURRENCIES: Record<
  CurrencyCode,
  { symbol: string; name: string; locale: string }
> = {
  // Major Western Markets
  USD: { symbol: "$", name: "US Dollar", locale: "en-US" },
  EUR: { symbol: "€", name: "Euro", locale: "de-DE" },
  GBP: { symbol: "£", name: "British Pound", locale: "en-GB" },
  CAD: { symbol: "C$", name: "Canadian Dollar", locale: "en-CA" },
  AUD: { symbol: "A$", name: "Australian Dollar", locale: "en-AU" },
  NZD: { symbol: "NZ$", name: "New Zealand Dollar", locale: "en-NZ" },

  // Asia & Middle East
  PKR: { symbol: "Rs", name: "Pakistani Rupee", locale: "en-PK" },
  INR: { symbol: "₹", name: "Indian Rupee", locale: "en-IN" },
  AED: { symbol: "د.إ", name: "UAE Dirham", locale: "ar-AE" },
  SAR: { symbol: "﷼", name: "Saudi Riyal", locale: "ar-SA" },
  QAR: { symbol: "﷼", name: "Qatari Riyal", locale: "ar-QA" },
  JPY: { symbol: "¥", name: "Japanese Yen", locale: "ja-JP" },
  CNY: { symbol: "¥", name: "Chinese Yuan", locale: "zh-CN" },
  SGD: { symbol: "S$", name: "Singapore Dollar", locale: "en-SG" },
  HKD: { symbol: "HK$", name: "Hong Kong Dollar", locale: "zh-HK" },
  TRY: { symbol: "₺", name: "Turkish Lira", locale: "tr-TR" },

  // Other Global Markets
  CHF: { symbol: "CHF", name: "Swiss Franc", locale: "de-CH" },
  SEK: { symbol: "kr", name: "Swedish Krona", locale: "sv-SE" },
  NOK: { symbol: "kr", name: "Norwegian Krone", locale: "no-NO" },
  DKK: { symbol: "kr", name: "Danish Krone", locale: "da-DK" },
  ZAR: { symbol: "R", name: "South African Rand", locale: "en-ZA" },
  BRL: { symbol: "R$", name: "Brazilian Real", locale: "pt-BR" },
  MXN: { symbol: "$", name: "Mexican Peso", locale: "es-MX" },
  RUB: { symbol: "₽", name: "Russian Ruble", locale: "ru-RU" },
  EGP: { symbol: "E£", name: "Egyptian Pound", locale: "ar-EG" },
  BDT: { symbol: "৳", name: "Bangladeshi Taka", locale: "bn-BD" },
  VND: { symbol: "₫", name: "Vietnamese Dong", locale: "vi-VN" },
  LKR: { symbol: "Rs", name: "Sri Lankan Rupee", locale: "si-LK" },
  NGN: { symbol: "₦", name: "Nigerian Naira", locale: "en-NG" },
  KES: { symbol: "KSh", name: "Kenyan Shilling", locale: "sw-KE" },
  GHS: { symbol: "GH₵", name: "Ghanaian Cedi", locale: "ak-GH" },
  ARS: { symbol: "$", name: "Argentine Peso", locale: "es-AR" },
  CLP: { symbol: "$", name: "Chilean Peso", locale: "es-CL" },
  COP: { symbol: "$", name: "Colombian Peso", locale: "es-CO" },
  ILS: { symbol: "₪", name: "Israeli Shekel", locale: "he-IL" },
  PLN: { symbol: "zł", name: "Polish Zloty", locale: "pl-PL" },
  HUF: { symbol: "Ft", name: "Hungarian Forint", locale: "hu-HU" },
  CZK: { symbol: "Kč", name: "Czech Koruna", locale: "cs-CZ" },
  KRW: { symbol: "₩", name: "South Korean Won", locale: "ko-KR" },
  MYR: { symbol: "RM", name: "Malaysian Ringgit", locale: "ms-MY" },
  IDR: { symbol: "Rp", name: "Indonesian Rupiah", locale: "id-ID" },
  PHP: { symbol: "₱", name: "Philippine Peso", locale: "en-PH" },
  THB: { symbol: "฿", name: "Thai Baht", locale: "th-TH" },
  KWD: { symbol: "KD", name: "Kuwaiti Dinar", locale: "ar-KW" },
  OMR: { symbol: "RO", name: "Omani Rial", locale: "ar-OM" },
  BHD: { symbol: "BD", name: "Bahraini Dinar", locale: "ar-BH" },
};

export function formatCurrency(
  amount: number,
  currency: CurrencyCode,
  options?: { showSymbol?: boolean },
): string {
  const currencyData = CURRENCIES[currency] || CURRENCIES["USD"];
  const { symbol, locale } = currencyData;
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return options?.showSymbol !== false ? `${symbol}${formatted}` : formatted;
}

export function calculateLineItemAmount(
  quantity: number,
  rate: number,
): number {
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
  discount: DiscountConfig,
): number {
  if (discount.type === "percentage") {
    return Math.round(subtotal * (discount.value / 100) * 100) / 100;
  }
  return discount.value;
}

export function calculateGrandTotal(
  subtotal: number,
  tax: TaxConfig,
  discount: DiscountConfig,
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

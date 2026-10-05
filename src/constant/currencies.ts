import type { Currency } from "@/src/types/types";

export const DEFAULT_CURRENCY = "USD";

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", label: "US Dollar", locale: "en-US" },
  { code: "EUR", symbol: "€", label: "Euro", locale: "de-DE" },
  { code: "GBP", symbol: "£", label: "British Pound", locale: "en-GB" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar", locale: "en-CA" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar", locale: "en-AU" },
  { code: "NZD", symbol: "NZ$", label: "New Zealand Dollar", locale: "en-NZ" },
  { code: "PKR", symbol: "Rs", label: "Pakistani Rupee", locale: "en-PK" },
  { code: "INR", symbol: "₹", label: "Indian Rupee", locale: "en-IN" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham", locale: "ar-AE" },
  { code: "SAR", symbol: "﷼", label: "Saudi Riyal", locale: "ar-SA" },
  { code: "QAR", symbol: "﷼", label: "Qatari Riyal", locale: "ar-QA" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen", locale: "ja-JP" },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan", locale: "zh-CN" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar", locale: "en-SG" },
  { code: "HKD", symbol: "HK$", label: "Hong Kong Dollar", locale: "zh-HK" },
  { code: "TRY", symbol: "₺", label: "Turkish Lira", locale: "tr-TR" },
  { code: "CHF", symbol: "CHF", label: "Swiss Franc", locale: "de-CH" },
  { code: "SEK", symbol: "kr", label: "Swedish Krona", locale: "sv-SE" },
  { code: "NOK", symbol: "kr", label: "Norwegian Krone", locale: "no-NO" },
  { code: "DKK", symbol: "kr", label: "Danish Krone", locale: "da-DK" },
  { code: "ZAR", symbol: "R", label: "South African Rand", locale: "en-ZA" },
  { code: "BRL", symbol: "R$", label: "Brazilian Real", locale: "pt-BR" },
  { code: "MXN", symbol: "$", label: "Mexican Peso", locale: "es-MX" },
  { code: "RUB", symbol: "₽", label: "Russian Ruble", locale: "ru-RU" },
  { code: "EGP", symbol: "E£", label: "Egyptian Pound", locale: "ar-EG" },
  { code: "BDT", symbol: "৳", label: "Bangladeshi Taka", locale: "bn-BD" },
  { code: "VND", symbol: "₫", label: "Vietnamese Dong", locale: "vi-VN" },
  { code: "LKR", symbol: "Rs", label: "Sri Lankan Rupee", locale: "si-LK" },
  { code: "NGN", symbol: "₦", label: "Nigerian Naira", locale: "en-NG" },
  { code: "KES", symbol: "KSh", label: "Kenyan Shilling", locale: "sw-KE" },
  { code: "GHS", symbol: "GH₵", label: "Ghanaian Cedi", locale: "ak-GH" },
  { code: "ARS", symbol: "$", label: "Argentine Peso", locale: "es-AR" },
  { code: "CLP", symbol: "$", label: "Chilean Peso", locale: "es-CL" },
  { code: "COP", symbol: "$", label: "Colombian Peso", locale: "es-CO" },
  { code: "ILS", symbol: "₪", label: "Israeli Shekel", locale: "he-IL" },
  { code: "PLN", symbol: "zł", label: "Polish Zloty", locale: "pl-PL" },
  { code: "HUF", symbol: "Ft", label: "Hungarian Forint", locale: "hu-HU" },
  { code: "CZK", symbol: "Kč", label: "Czech Koruna", locale: "cs-CZ" },
  { code: "KRW", symbol: "₩", label: "South Korean Won", locale: "ko-KR" },
  { code: "MYR", symbol: "RM", label: "Malaysian Ringgit", locale: "ms-MY" },
  { code: "IDR", symbol: "Rp", label: "Indonesian Rupiah", locale: "id-ID" },
  { code: "PHP", symbol: "₱", label: "Philippine Peso", locale: "en-PH" },
  { code: "THB", symbol: "฿", label: "Thai Baht", locale: "th-TH" },
  { code: "KWD", symbol: "KD", label: "Kuwaiti Dinar", locale: "ar-KW" },
  { code: "OMR", symbol: "RO", label: "Omani Rial", locale: "ar-OM" },
  { code: "BHD", symbol: "BD", label: "Bahraini Dinar", locale: "ar-BH" },
];

/** Symbols the built-in PDF fonts can draw; others fall back to the ISO code. */
export const PDF_SAFE_SYMBOLS = ["$", "€", "£", "¥"];

export const MONEY_FRACTION_DIGITS = 2;

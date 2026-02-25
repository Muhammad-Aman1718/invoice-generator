export const CURRENCIES = [
  // Top Global
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen" },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan" },

  // Asia & Middle East
  { code: "PKR", symbol: "Rs", label: "Pakistani Rupee" },
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham" },
  { code: "SAR", symbol: "﷼", label: "Saudi Riyal" },
  { code: "QAR", symbol: "﷼", label: "Qatari Riyal" },
  { code: "BDT", symbol: "৳", label: "Bangladeshi Taka" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar" },
  { code: "TRY", symbol: "₺", label: "Turkish Lira" },

  // Americas & Oceania
  { code: "CAD", symbol: "C$", label: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar" },
  { code: "NZD", symbol: "NZ$", label: "New Zealand Dollar" },
  { code: "BRL", symbol: "R$", label: "Brazilian Real" },
  { code: "MXN", symbol: "$", label: "Mexican Peso" },

  // Europe (Non-Euro)
  { code: "CHF", symbol: "CHF", label: "Swiss Franc" },
  { code: "SEK", symbol: "kr", label: "Swedish Krona" },
  { code: "NOK", symbol: "kr", label: "Norwegian Krone" },

  // Africa
  { code: "ZAR", symbol: "R", label: "South African Rand" },
  { code: "EGP", symbol: "E£", label: "Egyptian Pound" },
  { code: "NGN", symbol: "₦", label: "Nigerian Naira" },
];

export const TAX_TYPES = [
  // European & Global Standard
  { label: "VAT (Standard)", rate: 20 }, // UK/EU common
  { label: "VAT (Reduced)", rate: 5 }, // Essentials
  { label: "TVA", rate: 20 }, // France/Europe
  { label: "IVA", rate: 22 }, // Italy/Spain/Latin America
  { label: "MwSt", rate: 19 }, // Germany

  // North America
  { label: "Sales Tax", rate: 8.875 }, // USA (Average NY style)
  { label: "HST", rate: 13 }, // Canada (Harmonized)
  { label: "GST (Canada)", rate: 5 }, // Canada Federal

  // Asia & Oceania
  { label: "GST (India)", rate: 18 }, // India Standard
  { label: "GST (Australia)", rate: 10 }, // Australia Standard
  { label: "GST (NZ)", rate: 15 }, // New Zealand
  { label: "SST", rate: 6 }, // Malaysia

  // Middle East
  { label: "VAT (GCC)", rate: 5 }, // UAE/Saudi (Standard 5% or 15%)
  { label: "VAT (KSA)", rate: 15 }, // Saudi current rate

  // General
  { label: "Custom Tax", rate: 0 },
  { label: "None", rate: 0 },
];

// ── Shared input className ──────────────────────────────────────────────────
export const SI =
  "bg-white border border-[#1B2A4A]/15 rounded-lg px-3 py-2 text-sm text-[#1B2A4A] " +
  "placeholder:text-[#1B2A4A]/25 focus:outline-none focus:border-[#3A7BD5] " +
  "focus:ring-1 focus:ring-[#3A7BD5]/20 transition-all w-full";


export const INVOICE_KEYS = [
  "logoDataUrl",
  "businessName",
  "businessAddress",
  "businessEmail",
  "businessPhone",
  "clientName",
  "clientAddress",
  "clientEmail",
  "invoiceNumber",
  "issueDate",
  "dueDate",
  "currency",
  "lineItems",
  "tax",
  "discount",
  "paymentInstructions",
  "notes",
] as const;

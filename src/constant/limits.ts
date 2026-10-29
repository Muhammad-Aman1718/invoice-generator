/**
 * Maximum length of every text field. The same numbers drive the zod schemas
 * (server) and the inputs' maxLength / inline errors (browser), so they never drift.
 */
export const FIELD_LIMITS = {
  id: 64,
  personName: 80,
  businessName: 120,
  email: 254,
  phone: 30,
  taxId: 40,
  poNumber: 40,
  subject: 150,
  address: 500,
  shipTo: 300,
  lineDescription: 300,
  notes: 1000,
  paymentDetails: 500,
  taxLabel: 24,
  message: 2000,
  /** Supabase Auth (bcrypt) ignores bytes beyond 72. */
  password: 72,
} as const;

/** Show "n / max" once a field reaches this share of its limit. */
export const COUNTER_VISIBLE_RATIO = 0.8;
export const MAX_INVOICE_NUMBER_DIGITS = 9;

export const MAX_MONEY_AMOUNT = 1e12;
export const MAX_QUANTITY = 1e9;
export const MAX_INVOICE_NUMBER = 1e9;
export const MAX_PERCENT = 100;
export const CURRENCY_CODE_LENGTH = 3;
export const CONTACT_MESSAGE_MIN_LENGTH = 10;

export const DIGITS_ONLY = /^\d*$/;

/** Characters that make spreadsheets treat a CSV cell as a formula. */
export const CSV_FORMULA_PREFIX = /^[=+\-@]/;

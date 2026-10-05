/** Maximum text lengths accepted by the API. */
export const TEXT_LIMITS = {
  id: 64,
  short: 100,
  name: 200,
  long: 2000,
  notes: 5000,
} as const;

export const MAX_MONEY_AMOUNT = 1e12;
export const MAX_QUANTITY = 1e9;
export const MAX_INVOICE_NUMBER = 1e9;
export const MAX_PERCENT = 100;
export const CURRENCY_CODE_LENGTH = 3;
export const CONTACT_MESSAGE_MIN_LENGTH = 10;
export const MAX_NAME_LENGTH = 120;

export const DIGITS_ONLY = /^\d*$/;

/** Characters that make spreadsheets treat a CSV cell as a formula. */
export const CSV_FORMULA_PREFIX = /^[=+\-@]/;

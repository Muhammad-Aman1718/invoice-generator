export const HTTP_STATUS = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  notImplemented: 501,
  serviceUnavailable: 503,
  serverError: 500,
} as const;

export const API_ERROR_CODES = {
  planLimit: "PLAN_LIMIT",
  paymentsDisabled: "PAYMENTS_DISABLED",
  suspended: "SUSPENDED",
} as const;

/** Prefix raised by the enforce_plan_limits() Postgres trigger. */
export const PLAN_LIMIT_DB_PREFIX = /^.*PLAN_LIMIT:\s*/;

export const UUID_PATTERN = /^[0-9a-f-]{36}$/i;

/** Entity names used in "not found" API errors. */
export const ENTITY_NAMES = { invoice: "Invoice", client: "Client", user: "User" } as const;

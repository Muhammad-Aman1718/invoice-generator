export const MS_PER_DAY = 86_400_000;
export const MONTHS_PER_YEAR = 12;
export const FULL_PERCENT = 100;

export const DEFAULT_PAYMENT_TERMS_DAYS = 14;
export const MAX_PAYMENT_TERMS_DAYS = 365;

export const INVOICE_PAGE_SIZE = 10;
export const MAX_LINE_ITEMS = 500;
export const MAX_API_PAGE_SIZE = 500;
export const DEFAULT_API_PAGE_SIZE = 200;

export const OVERVIEW_CHART_MONTHS = 6;
export const REPORT_CHART_MONTHS = 12;
export const TOP_CLIENTS_LIMIT = 10;
export const OVERVIEW_TOP_CLIENTS = 5;
export const RECENT_INVOICES_LIMIT = 6;
export const RECENT_SIGNUPS_LIMIT = 8;
export const NEW_USER_WINDOW_DAYS = 30;

export const PASSWORD_MIN_LENGTH = 8;
export const DELETE_CONFIRMATION_TEXT = "DELETE";

/** Usage bar turns red at this percentage. */
export const USAGE_WARNING_PERCENT = 90;

export const LOGO_MAX_SIZE = { maxWidth: 240, maxHeight: 100 };
/** Resized logos/stamps are stored as data URLs; cap them to keep rows small. */
export const MAX_IMAGE_DATA_URL_LENGTH = 1_500_000;

export const STRIPE_SIGNATURE_TOLERANCE_SECONDS = 300;
export const HEALTH_CHECK_TIMEOUT_MS = 4000;
export const OBJECT_URL_REVOKE_DELAY_MS = 1000;

export const ADMIN_QUERY_LIMITS = { users: 1000, invoices: 20_000 };

export const STORAGE_KEYS = {
  invoiceDraft: "invoice-generator-data",
  draftBackup: "invoice-generator-draft-backup",
  cookieNotice: "invoicegen-cookie-notice",
} as const;

/** Placeholder keys for the four KPI cards in loading skeletons. */
export const SKELETON_STAT_KEYS = [0, 1, 2, 3];

/** Characters shown in avatar badges (e.g. "GL" for Globex). */
export const INITIALS_LENGTH = 2;

export const MS_PER_SECOND = 1000;
export const JSON_INDENT = 2;
/** Sorts invoices without a due date last. */
export const FAR_FUTURE_DATE = "9999-12-31";
export const LOCAL_DEV_URL = "http://localhost:3000";

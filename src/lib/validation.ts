import { z } from "zod";
import {
  DEFAULT_DOCUMENT_TITLE,
  DEFAULT_TAX_LABEL,
  DOCUMENT_TITLE_VALUES,
  INVOICE_STATUSES,
} from "@/src/constant/invoice";
import { MAX_IMAGE_DATA_URL_LENGTH, MAX_LINE_ITEMS, MAX_PAYMENT_TERMS_DAYS } from "@/src/constant/app";
import {
  CONTACT_MESSAGE_MIN_LENGTH,
  CURRENCY_CODE_LENGTH,
  MAX_INVOICE_NUMBER,
  MAX_MONEY_AMOUNT,
  MAX_PERCENT,
  MAX_QUANTITY,
  FIELD_LIMITS,
} from "@/src/constant/limits";

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
  .or(z.literal(""));

const imageDataUrl = z
  .string()
  .max(MAX_IMAGE_DATA_URL_LENGTH, "Image is too large")
  .refine((v) => v.startsWith("data:image/") || /^https?:\/\//.test(v), "Invalid image")
  .nullable();

const money = z.coerce.number().finite().min(0).max(MAX_MONEY_AMOUNT);
const percent = z.coerce.number().finite().min(0).max(MAX_PERCENT);
const currencyCode = z.string().length(CURRENCY_CODE_LENGTH).toUpperCase();
const text = (max: number) => z.string().max(max);

export const lineItemSchema = z.object({
  id: text(FIELD_LIMITS.id).optional(),
  description: text(FIELD_LIMITS.lineDescription).default(""),
  quantity: z.coerce.number().finite().min(0).max(MAX_QUANTITY),
  rate: money,
  discount: percent.default(0),
  amount: money,
});

export const invoiceSchema = z.object({
  clientId: z.string().uuid().nullable().optional(),
  invoiceNumber: z.coerce.number().int().min(0).max(MAX_INVOICE_NUMBER),
  logoDataUrl: imageDataUrl.optional(),
  stampUrl: imageDataUrl.optional(),
  currency: currencyCode,
  businessName: text(FIELD_LIMITS.businessName).default(""),
  bussinessInfo: text(FIELD_LIMITS.address).default(""),
  issueDate: dateString.default(""),
  dueDate: dateString.default(""),
  poNumber: text(FIELD_LIMITS.poNumber).optional().default(""),
  clientName: text(FIELD_LIMITS.businessName).default(""),
  clientAddress: text(FIELD_LIMITS.address).default(""),
  shipTo: text(FIELD_LIMITS.shipTo).optional().default(""),
  lineItems: z.array(lineItemSchema).max(MAX_LINE_ITEMS),
  notes: text(FIELD_LIMITS.notes).default(""),
  terms: text(FIELD_LIMITS.notes).default(""),
  paymentDetails: text(FIELD_LIMITS.paymentDetails).optional().default(""),
  documentTitle: z.enum(DOCUMENT_TITLE_VALUES).optional().default(DEFAULT_DOCUMENT_TITLE),
  taxLabel: text(FIELD_LIMITS.taxLabel).optional().default(DEFAULT_TAX_LABEL),
  subtotal: money,
  overallDiscount: percent.default(0),
  taxRate: percent.default(0),
  totalAmount: money,
  status: z.enum(INVOICE_STATUSES).default("pending"),
});

export const invoicePatchSchema = invoiceSchema.partial();

export const clientSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(FIELD_LIMITS.businessName),
  email: z.string().trim().email("Invalid email").max(FIELD_LIMITS.email).or(z.literal("")).optional(),
  phone: z.string().trim().max(FIELD_LIMITS.phone).optional(),
  address: z.string().trim().max(FIELD_LIMITS.address).optional(),
  taxId: z.string().trim().max(FIELD_LIMITS.taxId).optional(),
  notes: z.string().trim().max(FIELD_LIMITS.notes).optional(),
});

export const profileSchema = z.object({
  fullName: z.string().trim().max(FIELD_LIMITS.personName).optional(),
  companyName: z.string().trim().max(FIELD_LIMITS.businessName).optional(),
  businessInfo: z.string().trim().max(FIELD_LIMITS.address).optional(),
  logoDataUrl: imageDataUrl.optional(),
  defaultCurrency: currencyCode.optional(),
  defaultTaxRate: percent.optional(),
  defaultNotes: text(FIELD_LIMITS.notes).optional(),
  defaultTerms: text(FIELD_LIMITS.notes).optional(),
  defaultPaymentDetails: text(FIELD_LIMITS.paymentDetails).optional(),
  paymentTermsDays: z.coerce.number().int().min(0).max(MAX_PAYMENT_TERMS_DAYS).optional(),
});

export const adminUserPatchSchema = z.object({
  role: z.enum(["user", "admin"]).optional(),
  isSuspended: z.boolean().optional(),
  plan: z.enum(["free", "pro", "business"]).optional(),
  billingInterval: z.enum(["month", "year"]).optional(),
  currentPeriodEnd: z.string().datetime().nullable().optional(),
});

export const checkoutSchema = z.object({
  plan: z.enum(["pro", "business"]),
  interval: z.enum(["month", "year"]).default("month"),
});

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(FIELD_LIMITS.personName),
  email: z.string().trim().email().max(FIELD_LIMITS.email),
  subject: z.string().trim().min(1).max(FIELD_LIMITS.subject),
  message: z.string().trim().min(CONTACT_MESSAGE_MIN_LENGTH).max(FIELD_LIMITS.message),
});

/** A short, user-facing message for the first validation problem. */
export function getFirstIssueMessage(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "Invalid request";
  const path = issue.path.join(".");
  // Zod's built-in wording ("Required", "Expected number, received nan") reads badly
  // after a field path; custom messages such as "Name is required" are kept as-is.
  const isMissingValue = issue.message === "Required" || /received nan/i.test(issue.message);
  const message = isMissingValue ? "is required" : issue.message;
  return path ? `${path}: ${message}` : message;
}

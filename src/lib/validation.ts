import { z } from "zod";
import { INVOICE_STATUSES } from "@/src/constant/invoice";
import { MAX_IMAGE_DATA_URL_LENGTH, MAX_LINE_ITEMS, MAX_PAYMENT_TERMS_DAYS } from "@/src/constant/app";
import {
  CONTACT_MESSAGE_MIN_LENGTH,
  CURRENCY_CODE_LENGTH,
  MAX_INVOICE_NUMBER,
  MAX_MONEY_AMOUNT,
  MAX_NAME_LENGTH,
  MAX_PERCENT,
  MAX_QUANTITY,
  TEXT_LIMITS,
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
  id: text(TEXT_LIMITS.id).optional(),
  description: text(TEXT_LIMITS.long).default(""),
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
  businessName: text(TEXT_LIMITS.name).default(""),
  bussinessInfo: text(TEXT_LIMITS.long).default(""),
  issueDate: dateString.default(""),
  dueDate: dateString.default(""),
  poNumber: text(TEXT_LIMITS.short).optional().default(""),
  clientName: text(TEXT_LIMITS.name).default(""),
  clientAddress: text(TEXT_LIMITS.long).default(""),
  shipTo: text(TEXT_LIMITS.long).optional().default(""),
  lineItems: z.array(lineItemSchema).max(MAX_LINE_ITEMS),
  notes: text(TEXT_LIMITS.notes).default(""),
  terms: text(TEXT_LIMITS.notes).default(""),
  subtotal: money,
  overallDiscount: percent.default(0),
  taxRate: percent.default(0),
  totalAmount: money,
  status: z.enum(INVOICE_STATUSES).default("pending"),
});

export const invoicePatchSchema = invoiceSchema.partial();

export const clientSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(TEXT_LIMITS.name),
  email: z.string().trim().email("Invalid email").max(TEXT_LIMITS.name).or(z.literal("")).optional(),
  phone: z.string().trim().max(TEXT_LIMITS.short).optional(),
  address: z.string().trim().max(TEXT_LIMITS.long).optional(),
  taxId: z.string().trim().max(TEXT_LIMITS.short).optional(),
  notes: z.string().trim().max(TEXT_LIMITS.long).optional(),
});

export const profileSchema = z.object({
  fullName: z.string().trim().max(MAX_NAME_LENGTH).optional(),
  companyName: z.string().trim().max(TEXT_LIMITS.name).optional(),
  businessInfo: z.string().trim().max(TEXT_LIMITS.long).optional(),
  logoDataUrl: imageDataUrl.optional(),
  defaultCurrency: currencyCode.optional(),
  defaultTaxRate: percent.optional(),
  defaultNotes: text(TEXT_LIMITS.notes).optional(),
  defaultTerms: text(TEXT_LIMITS.notes).optional(),
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
  name: z.string().trim().min(1).max(MAX_NAME_LENGTH),
  email: z.string().trim().email(),
  subject: z.string().trim().min(1).max(TEXT_LIMITS.name),
  message: z.string().trim().min(CONTACT_MESSAGE_MIN_LENGTH).max(TEXT_LIMITS.notes),
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

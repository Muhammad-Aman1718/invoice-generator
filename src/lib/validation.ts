import { z } from "zod";
import { INVOICE_STATUSES } from "@/src/types/invoice-types";

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
  .or(z.literal(""));

// Data URLs for logo/stamp are resized client-side; cap them to keep rows small.
const imageDataUrl = z
  .string()
  .max(1_500_000, "Image is too large")
  .refine((v) => v.startsWith("data:image/") || /^https?:\/\//.test(v), "Invalid image")
  .nullable();

const money = z.coerce.number().finite().min(0).max(1e12);
const percent = z.coerce.number().finite().min(0).max(100);

export const lineItemSchema = z.object({
  id: z.string().max(64).optional(),
  description: z.string().max(2000).default(""),
  quantity: z.coerce.number().finite().min(0).max(1e9),
  rate: money,
  discount: percent.default(0),
  amount: money,
});

export const invoiceSchema = z.object({
  clientId: z.string().uuid().nullable().optional(),
  invoiceNumber: z.coerce.number().int().min(0).max(1e9),
  logoDataUrl: imageDataUrl.optional(),
  stampUrl: imageDataUrl.optional(),
  currency: z.string().min(3).max(3).toUpperCase(),
  businessName: z.string().max(200).default(""),
  bussinessInfo: z.string().max(2000).default(""),
  issueDate: dateString.default(""),
  dueDate: dateString.default(""),
  poNumber: z.string().max(100).optional().default(""),
  clientName: z.string().max(200).default(""),
  clientAddress: z.string().max(2000).default(""),
  shipTo: z.string().max(2000).optional().default(""),
  lineItems: z.array(lineItemSchema).max(500),
  notes: z.string().max(5000).default(""),
  terms: z.string().max(5000).default(""),
  subtotal: money,
  overallDiscount: percent.default(0),
  taxRate: percent.default(0),
  totalAmount: money,
  status: z.enum(INVOICE_STATUSES).default("pending"),
});

export const invoicePatchSchema = invoiceSchema.partial();

export const clientSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Invalid email").max(200).or(z.literal("")).optional(),
  phone: z.string().trim().max(50).optional(),
  address: z.string().trim().max(2000).optional(),
  taxId: z.string().trim().max(100).optional(),
  notes: z.string().trim().max(2000).optional(),
});

export const profileSchema = z.object({
  fullName: z.string().trim().max(120).optional(),
  companyName: z.string().trim().max(200).optional(),
  businessInfo: z.string().trim().max(2000).optional(),
  logoDataUrl: imageDataUrl.optional(),
  defaultCurrency: z.string().length(3).toUpperCase().optional(),
  defaultTaxRate: percent.optional(),
  defaultNotes: z.string().max(5000).optional(),
  defaultTerms: z.string().max(5000).optional(),
  paymentTermsDays: z.coerce.number().int().min(0).max(365).optional(),
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
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email(),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(10).max(5000),
});

export function firstIssue(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "Invalid request";
  const path = issue.path.join(".");
  const message = /received nan|Required/i.test(issue.message) ? "is required" : issue.message;
  return path ? `${path}: ${message}` : message;
}

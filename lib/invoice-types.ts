/**
 * Invoice data types. Modular for Guest vs Registered user logic.
 */

export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface TaxConfig {
  label: string;
  type: "percentage" | "fixed";
  value: number;
}

export interface DiscountConfig {
  label: string;
  type: "percentage" | "fixed";
  value: number;
}

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

export interface InvoiceData {
  id?: string;
  // Branding / Sender
  logoDataUrl: string | null;
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  // Client
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  // Metadata
  invoiceNumber: number;
  issueDate: string;
  dueDate: string;
  currency: CurrencyCode;
  status?: InvoiceStatus;
  // Line items
  lineItems: LineItem[];
  // Tax & Discount
  tax: TaxConfig;
  discount: DiscountConfig;
  // Footer
  paymentInstructions: string;
  notes: string;
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

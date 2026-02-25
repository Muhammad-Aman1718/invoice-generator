/**
 * Invoice data types. Modular for Guest vs Registered user logic.
 */

export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "CAD"
  | "AUD"
  | "JPY"
  | "CNY"
  | "INR"
  | "PKR"
  | "AED"
  | "SAR"
  | "CHF"
  | "SGD"
  | "NZD"
  | "HKD"
  | "BRL"
  | "ZAR"
  | "TRY"
  | "RUB"
  | "MXN"
  | "NOK"
  | "SEK"
  | "DKK"
  | "MYR"
  | "IDR"
  | "PHP"
  | "THB"
  | "KWD"
  | "QAR"
  | "OMR"
  | "BHD"
  | "EGP"
  | "BDT"
  | "VND"
  | "LKR"
  | "NGN"
  | "KES"
  | "GHS"
  | "ARS"
  | "CLP"
  | "COP"
  | "ILS"
  | "PLN"
  | "HUF"
  | "CZK"
  | "KRW";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  discount: number;
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
  shipTo?: string;
  poNumber?: string;
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

export interface InvoiceStore extends InvoiceData {
  setField: <K extends keyof InvoiceData>(
    field: K,
    value: InvoiceData[K],
  ) => void;
  setLogo: (dataUrl: string | null) => void;
  addLineItem: () => void;
  removeLineItem: (id: string) => void;
  updateLineItem: (
    id: string,
    field: keyof LineItem,
    value: string | number,
  ) => void;
  incrementInvoiceNumber: () => void;
  resetInvoice: () => void;
  loadInvoice: (data: Partial<InvoiceData> & { id?: string }) => void;
}

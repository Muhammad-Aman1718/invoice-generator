import type { BillingInterval, PlanId } from "@/src/config/plans";

export type CurrencyCode = string;

export type Tab = "edit" | "preview";

export interface LineItemsTableProps {
  currency?: string;
  showDiscount?: boolean;
}

export interface LineItem {
  id?: string;
  description: string;
  quantity: number;
  rate: number;
  discount: number; // percentage on item level
  amount: number; // total for this item
}

export const INVOICE_STATUSES = [
  "draft",
  "pending",
  "paid",
  "overdue",
  "cancelled",
] as const;

export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export interface InvoiceData {
  id?: string | undefined;
  userId?: string;
  clientId?: string | null;
  logoDataUrl: string | null;
  stampUrl: string | null;
  invoiceNumber: number;
  currency: CurrencyCode;
  businessName: string;
  bussinessInfo: string;
  issueDate: string;
  dueDate: string;
  poNumber?: string;
  clientName: string;
  clientAddress: string;
  shipTo?: string;
  lineItems: LineItem[];
  notes: string;
  terms: string;
  subtotal: number;
  overallDiscount: number; // percentage
  taxRate: number; // percentage
  totalAmount: number;
  status: InvoiceStatus;
  currencySymbol?: string;
  createdAt?: string;
  updatedAt?: string;
  paidAt?: string | null;
}

/** Lightweight row used by lists, dashboards and reports. */
export type InvoiceSummary = Pick<
  InvoiceData,
  | "id"
  | "clientId"
  | "invoiceNumber"
  | "clientName"
  | "issueDate"
  | "dueDate"
  | "currency"
  | "totalAmount"
  | "status"
  | "createdAt"
>;

export interface DBInvoiceRow {
  id?: string;
  user_id: string;
  client_id?: string | null;
  logo_data_url: string | null;
  stamp_url: string | null;
  invoice_number: number;
  currency: string;
  business_name: string | null;
  bussiness_info: string | null;
  issue_date: string | null;
  due_date: string | null;
  po_number: string | null;
  client_name: string | null;
  client_address: string | null;
  ship_to: string | null;
  line_items: LineItem[] | null;
  notes: string | null;
  terms: string | null;
  subtotal: number | string;
  overall_discount: number | string;
  tax_rate: number | string;
  total_amount: number | string;
  status: string;
  paid_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  taxId: string | null;
  notes: string | null;
  createdAt: string;
}

export type UserRole = "user" | "admin";

export interface Profile {
  id: string;
  email: string | null;
  fullName: string | null;
  role: UserRole;
  companyName: string | null;
  businessInfo: string | null;
  logoDataUrl: string | null;
  defaultCurrency: string;
  defaultTaxRate: number;
  defaultNotes: string | null;
  defaultTerms: string | null;
  paymentTermsDays: number;
  isSuspended: boolean;
  createdAt: string;
}

export type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled";

export interface Subscription {
  plan: PlanId;
  status: SubscriptionStatus;
  billingInterval: BillingInterval;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  provider: string;
  hasBillingPortal: boolean;
}

export interface InvoiceStore extends InvoiceData {
  setField: <K extends keyof InvoiceData>(
    field: K,
    value: InvoiceData[K],
  ) => void;
  setLogo: (dataUrl: string | null) => void;
  setStampUrl: (dataUrl: string | null) => void;
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

export interface InvoicePreviewProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

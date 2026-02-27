export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "PKR"
  | "INR"
  | "AED"
  | string; // Added string for flexibility

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  discount: number; // percentage on item level
  amount: number; // total for this item
}

export interface InvoiceData {
  id: string;
  userId?: string;
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
}

export interface RawInvoiceRow {
  id: string;
  user_id: string | null;
  logo_data_url: string | null;
  stamp_url: string | null;
  invoice_number: number | null;
  currency: string | null;
  business_name: string | null;
  bussiness_info: string | null; // Note: Double 's' as per your DB
  issue_date: string | null;
  due_date: string | null;
  po_number: string | null;
  client_name: string | null;
  client_address: string | null;
  ship_to: string | null;
  line_items: any; // JSONB
  notes: string | null;
  terms: string | null;
  subtotal: number | string | null;
  overall_discount: number | string | null;
  tax_rate: number | string | null;
  total_amount: number | string | null;
  created_at: string | null;
  updated_at: string | null;
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


export interface InvoicePreviewProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}
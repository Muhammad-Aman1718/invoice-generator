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
  id?: string;
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
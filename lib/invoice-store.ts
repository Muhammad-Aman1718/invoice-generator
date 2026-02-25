"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  InvoiceData,
  LineItem,
  CurrencyCode,
  TaxConfig,
  DiscountConfig,
  InvoiceStore,
} from "../types/invoice-types";

const STORAGE_KEY = "invoice-generator-data";

const createLineItem = (): LineItem => ({
  id: crypto.randomUUID(),
  description: "",
  quantity: 1,
  rate: 0,
  amount: 0,
  discount: 0,   // New field for line item discount
});

const defaultInvoiceData: InvoiceData = {
  logoDataUrl: null,
  businessName: "",
  businessAddress: "",
  businessEmail: "",
  businessPhone: "",
  clientName: "",
  clientAddress: "",
  clientEmail: "",
  invoiceNumber: 1,
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: addDays(new Date().toISOString().split("T")[0], 30),
  currency: "USD",
  lineItems: [createLineItem()],
  tax: { label: "Tax", type: "percentage", value: 0 },
  discount: { label: "Discount", type: "percentage", value: 0 },
  paymentInstructions: "",
  notes: "",
};

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      ...defaultInvoiceData,

      setField: (field, value) =>
        set((state) => ({ ...state, [field]: value })),

      setLogo: (logoDataUrl) => set({ logoDataUrl }),

      addLineItem: () =>
        set((state) => ({
          lineItems: [...state.lineItems, createLineItem()],
        })),

      removeLineItem: (id) =>
        set((state) => ({
          lineItems: state.lineItems.filter((item) => item.id !== id),
        })),

      updateLineItem: (id, field, value) =>
        set((state) => ({
          lineItems: state.lineItems.map((item) =>
            item.id === id ? { ...item, [field]: value } : item,
          ),
        })),

      incrementInvoiceNumber: () =>
        set((state) => ({ invoiceNumber: state.invoiceNumber + 1 })),

      resetInvoice: () => set(defaultInvoiceData),

      loadInvoice: (data) =>
        set((state) => ({
          ...state,
          ...data,
          lineItems: data.lineItems ?? state.lineItems,
        })),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        logoDataUrl: state.logoDataUrl,
        businessName: state.businessName,
        businessAddress: state.businessAddress,
        businessEmail: state.businessEmail,
        businessPhone: state.businessPhone,
      }),
    },
  ),
);

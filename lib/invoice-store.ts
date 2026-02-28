"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  InvoiceData,
  LineItem,
  InvoiceStore,
} from "../types/invoice-types";

const STORAGE_KEY = "invoice-generator-data";

// Helper function to calculate amounts
// Helper function to calculate amounts based on your logic
const calculateTotals = (state: Partial<InvoiceStore>) => {
  const lineItems = state.lineItems || [];

  // 1. Calculate each item's amount (Item Level Discount)
  const updatedItems = lineItems.map((item) => {
    const qty = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    const discPercent = Number(item.discount) || 0;

    // Formula: (Qty * Rate) - Discount %
    const amount = qty * rate * (1 - discPercent / 100);
    return { ...item, amount };
  });

  // 2. Subtotal (Sum of all discounted line items)
  const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);

  // 3. Overall Discount Calculation (Amount to subtract)
  const overallDiscountRate = Number(state.overallDiscount) || 0;
  const overallDiscountAmount = subtotal * (overallDiscountRate / 100);

  // Amount after overall discount
  const amountAfterOverallDiscount = subtotal - overallDiscountAmount;

  // 4. Tax Calculation (GST/Sales Tax on the discounted subtotal)
  const taxRate = Number(state.taxRate) || 0;
  const taxAmount = amountAfterOverallDiscount * (taxRate / 100);

  // 5. Final Grand Total
  const totalAmount = amountAfterOverallDiscount + taxAmount;

  return {
    lineItems: updatedItems,
    subtotal,
    // Hum sirf totals return kar rahe hain, UI inko store se direct read karega
    totalAmount,
    // Note: Aap store interface mein taxAmount save kar sakte hain display ke liye
  };
};
const createLineItem = (): LineItem => ({
  id: crypto.randomUUID(),
  description: "",
  quantity: 1,
  rate: 0,
  discount: 0,
  amount: 0,
});

const defaultInvoiceData: InvoiceData = {
  id: undefined, // ID generate karne ka logic aapke DB mein hoga
  logoDataUrl: null,
  invoiceNumber: 1,
  currency: "USD",
  businessName: "",
  bussinessInfo: "",
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date().toISOString().split("T")[0],
  poNumber: "",
  clientName: "",
  clientAddress: "",
  shipTo: "",
  lineItems: [createLineItem()],
  notes: "",
  terms: "",
  stampUrl: null,
  subtotal: 0,
  overallDiscount: 0,
  taxRate: 0,
  totalAmount: 0,
  status: "pending",
};

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      ...defaultInvoiceData,

      setField: (field, value) =>
        set((state) => {
          const newState = { ...state, [field]: value };
          // Agar tax ya discount change ho toh recalculate karein
          if (
            field === "overallDiscount" ||
            field === "taxRate" ||
            field === "currency"
          ) {
            return { ...newState, ...calculateTotals(newState) };
          }
          return newState;
        }),

      setLogo: (logoDataUrl) => set({ logoDataUrl }),

      addLineItem: () =>
        set((state) => {
          const newState = {
            ...state,
            lineItems: [...state.lineItems, createLineItem()],
          };
          return { ...newState, ...calculateTotals(newState) };
        }),

      removeLineItem: (id) =>
        set((state) => {
          const newState = {
            ...state,
            lineItems: state.lineItems.filter((item) => item.id !== id),
          };
          return { ...newState, ...calculateTotals(newState) };
        }),

      updateLineItem: (id, field, value) =>
        set((state) => {
          const updatedLineItems = state.lineItems.map((item) =>
            item.id === id ? { ...item, [field]: value } : item,
          );
          const newState = { ...state, lineItems: updatedLineItems };
          return { ...newState, ...calculateTotals(newState) };
        }),

      incrementInvoiceNumber: () =>
        set((state) => ({ invoiceNumber: state.invoiceNumber + 1 })),

      resetInvoice: () => {
        set(defaultInvoiceData);
        localStorage.removeItem("invoice-generator-data");
      },

      loadInvoice: (data) =>
        set((state) => {
          const newState = { ...state, ...data };
          return { ...newState, ...calculateTotals(newState) };
        }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        logoDataUrl: state.logoDataUrl,
        businessName: state.businessName,
        bussinessInfo: state.bussinessInfo,
        currency: state.currency,
        clientName: state.clientName,
        stampUrl: state.stampUrl,
        clientAddress: state.clientAddress,
        shipTo: state.shipTo,
        notes: state.notes,
        terms: state.terms,
        overallDiscount: state.overallDiscount,
        taxRate: state.taxRate,
        lineItems: state.lineItems,
        subtotal: state.subtotal,
        totalAmount: state.totalAmount,
        invoiceNumber: state.invoiceNumber,
        issueDate: state.issueDate,
        dueDate: state.dueDate,
        poNumber: state.poNumber,
      }),
    },
  ),
);

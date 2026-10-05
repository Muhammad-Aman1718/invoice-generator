"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InvoiceData, LineItem, InvoiceStore } from "../types/invoice-types";

export const STORAGE_KEY = "invoice-generator-data";

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Recompute line amounts, subtotal and total (discount first, then tax). */
export const calculateTotals = (state: Partial<InvoiceData>) => {
  const lineItems = (state.lineItems || []).map((item) => {
    const qty = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    const discPercent = Number(item.discount) || 0;
    return { ...item, amount: round2(qty * rate * (1 - discPercent / 100)) };
  });

  const subtotal = round2(lineItems.reduce((sum, item) => sum + item.amount, 0));
  const discountAmount = subtotal * ((Number(state.overallDiscount) || 0) / 100);
  const taxable = subtotal - discountAmount;
  const taxAmount = taxable * ((Number(state.taxRate) || 0) / 100);

  return { lineItems, subtotal, totalAmount: round2(taxable + taxAmount) };
};

export function getTotalsBreakdown(state: Pick<InvoiceData, "subtotal" | "overallDiscount" | "taxRate">) {
  const discountAmount = round2(state.subtotal * ((state.overallDiscount || 0) / 100));
  const taxable = state.subtotal - discountAmount;
  const taxAmount = round2(taxable * ((state.taxRate || 0) / 100));
  return { discountAmount, taxAmount };
}

export const createLineItem = (): LineItem => ({
  id:
    typeof window !== "undefined" && window.crypto?.randomUUID
      ? window.crypto.randomUUID()
      : Math.random().toString(36).substring(2, 11),
  description: "",
  quantity: 1,
  rate: 0,
  discount: 0,
  amount: 0,
});

export function localISODate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().split("T")[0];
}

const defaultInvoiceData = (): InvoiceData => ({
  id: undefined,
  clientId: null,
  logoDataUrl: null,
  invoiceNumber: 1,
  currency: "USD",
  businessName: "",
  bussinessInfo: "",
  issueDate: localISODate(),
  dueDate: localISODate(14),
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
});

/** True when the user hasn't typed anything worth keeping yet. */
export function isPristine(s: InvoiceData) {
  return (
    !s.clientName &&
    !s.clientAddress &&
    !s.notes &&
    s.lineItems.every((i) => !i.description && !Number(i.rate))
  );
}

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      ...defaultInvoiceData(),

      setField: (field, value) =>
        set((state) => {
          const newState = { ...state, [field]: value };
          if (field === "overallDiscount" || field === "taxRate" || field === "lineItems") {
            return { ...newState, ...calculateTotals(newState) };
          }
          return newState;
        }),

      setLogo: (logoDataUrl) => set({ logoDataUrl }),
      setStampUrl: (stampUrl) => set({ stampUrl }),

      addLineItem: () =>
        set((state) => {
          const newState = { ...state, lineItems: [...state.lineItems, createLineItem()] };
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
          const lineItems = state.lineItems.map((item) =>
            item.id === id ? { ...item, [field]: value } : item,
          );
          const newState = { ...state, lineItems };
          return { ...newState, ...calculateTotals(newState) };
        }),

      incrementInvoiceNumber: () =>
        set((state) => ({ invoiceNumber: state.invoiceNumber + 1 })),

      resetInvoice: () => set(defaultInvoiceData()),

      loadInvoice: (data) =>
        set(() => {
          const newState = { ...defaultInvoiceData(), ...data };
          if (!newState.lineItems?.length) newState.lineItems = [createLineItem()];
          newState.lineItems = newState.lineItems.map((i) => ({
            ...i,
            id: i.id || createLineItem().id,
          }));
          return { ...newState, ...calculateTotals(newState) };
        }),
    }),
    {
      name: STORAGE_KEY,
      // Only the draft content is persisted; `id` is never persisted so a
      // reload can't silently turn "new invoice" into "edit existing".
      partialize: (state) => ({
        logoDataUrl: state.logoDataUrl,
        businessName: state.businessName,
        bussinessInfo: state.bussinessInfo,
        currency: state.currency,
        clientId: state.clientId,
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
        status: state.status,
      }),
    },
  ),
);

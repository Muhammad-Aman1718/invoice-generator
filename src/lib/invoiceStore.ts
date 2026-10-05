"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InvoiceData, InvoiceStore } from "@/src/types/types";
import { STORAGE_KEYS } from "@/src/constant/app";
import { FIELDS_AFFECTING_TOTALS } from "@/src/constant/invoice";
import { calculateTotals, createEmptyInvoice, createLineItem } from "@/src/lib/invoiceCalculations";

function withTotals<T extends Partial<InvoiceData>>(state: T): T {
  return { ...state, ...calculateTotals(state) };
}

/** Only draft content is persisted; `id` never is, so a reload can't turn "new" into "edit". */
function selectPersistedDraft(state: InvoiceStore): Partial<InvoiceData> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, userId, createdAt, updatedAt, paidAt, ...draft } = state;
  return Object.fromEntries(
    Object.entries(draft).filter(([, value]) => typeof value !== "function"),
  ) as Partial<InvoiceData>;
}

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      ...createEmptyInvoice(),

      setField: (field, value) =>
        set((state) => {
          const next = { ...state, [field]: value };
          return FIELDS_AFFECTING_TOTALS.includes(field) ? withTotals(next) : next;
        }),

      setLogo: (logoDataUrl) => set({ logoDataUrl }),
      setStampUrl: (stampUrl) => set({ stampUrl }),

      addLineItem: () =>
        set((state) => withTotals({ ...state, lineItems: [...state.lineItems, createLineItem()] })),

      removeLineItem: (id) =>
        set((state) => withTotals({ ...state, lineItems: state.lineItems.filter((item) => item.id !== id) })),

      updateLineItem: (id, field, value) =>
        set((state) =>
          withTotals({
            ...state,
            lineItems: state.lineItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
          }),
        ),

      resetInvoice: () => set(createEmptyInvoice()),

      loadInvoice: (data) =>
        set(() => {
          const next = { ...createEmptyInvoice(), ...data };
          const items = next.lineItems?.length ? next.lineItems : [createLineItem()];
          next.lineItems = items.map((item) => ({ ...item, id: item.id || createLineItem().id }));
          return withTotals(next);
        }),
    }),
    { name: STORAGE_KEYS.invoiceDraft, partialize: selectPersistedDraft },
  ),
);

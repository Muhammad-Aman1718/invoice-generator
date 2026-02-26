import { CURRENCIES } from "@/constant/data";
import { useInvoiceStore } from "@/lib/invoice-store";
import { formatCurrency } from "@/lib/invoice-utils";
import React from "react";

const useInvoicePreview = () => {
  const store = useInvoiceStore();

  const currencyInfo =
    CURRENCIES.find((c) => c.code === store.currency) || CURRENCIES[0];

  const subtotal = store.subtotal;
  const overallDiscountAmount = subtotal * (store.overallDiscount / 100);
  const taxableAmount = subtotal - overallDiscountAmount;
  const taxAmount = taxableAmount * (store.taxRate / 100);

  const fmt = (amount: number) => formatCurrency(amount, store.currency);
  return {
    store,
    currencyInfo,
    subtotal,
    overallDiscountAmount,
    taxableAmount,
    taxAmount,
    fmt,
  };
};

export default useInvoicePreview;

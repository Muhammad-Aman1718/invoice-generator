import { useInvoiceStore } from "@/lib/invoice-store";
import { calculateLineItemAmount } from "@/lib/invoice-utils";
import React from "react";

const useLineItemsTable = () => {
  const { lineItems, addLineItem, removeLineItem, updateLineItem } =
    useInvoiceStore();

  const handleQtyChange = (id: string, v: string) => {
    const q = parseFloat(v) || 0;
    const item = lineItems.find((i) => i.id === id);
    updateLineItem(id, "quantity", q);
    if (item) {
      const base = calculateLineItemAmount(q, item.rate);
      const disc = item.discount || 0;
      updateLineItem(id, "amount", base - (base * disc) / 100);
    }
  };

  const handleRateChange = (id: string, v: string) => {
    const r = parseFloat(v) || 0;
    const item = lineItems.find((i) => i.id === id);
    updateLineItem(id, "rate", r);
    if (item) {
      const base = calculateLineItemAmount(item.quantity, r);
      const disc = item.discount || 0;
      updateLineItem(id, "amount", base - (base * disc) / 100);
    }
  };

  const handleDiscountChange = (id: string, v: string) => {
    const d = Math.min(100, Math.max(0, parseFloat(v) || 0));
    const item = lineItems.find((i) => i.id === id);
    updateLineItem(id, "discount", d);
    if (item) {
      const base = calculateLineItemAmount(item.quantity, item.rate);
      updateLineItem(id, "amount", base - (base * d) / 100);
    }
  };

  const fmt = (n: number) =>
    (n || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const canRemove = lineItems.length > 1;

  // Base input style
  const inp =
    "w-full bg-white border border-transparent rounded-lg px-2.5 py-2 text-sm " +
    "text-[#191970] font-medium placeholder:text-[#191970]/25 outline-none transition-all " +
    "hover:border-[#191970]/15 focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20";

  return {
    lineItems,
    handleQtyChange,
    canRemove,
    inp,
    addLineItem,
    removeLineItem,
    updateLineItem,
    fmt,
    calculateLineItemAmount,
    handleRateChange,
    handleDiscountChange,
    
  };
};

export default useLineItemsTable;

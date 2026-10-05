import { useInvoiceStore } from "@/src/lib/invoice-store";

// Line amounts are recomputed by the store on every update.
const useLineItemsTable = () => {
  const { lineItems, addLineItem, removeLineItem, updateLineItem } = useInvoiceStore();

  const handleQtyChange = (id: string, v: string) =>
    updateLineItem(id, "quantity", Math.max(0, parseFloat(v) || 0));

  const handleRateChange = (id: string, v: string) =>
    updateLineItem(id, "rate", Math.max(0, parseFloat(v) || 0));

  const handleDiscountChange = (id: string, v: string) =>
    updateLineItem(id, "discount", Math.min(100, Math.max(0, parseFloat(v) || 0)));

  const fmt = (n: number) =>
    (n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const inp =
    "w-full bg-white border border-transparent rounded-lg px-2.5 py-2 text-sm " +
    "text-[#191970] font-medium placeholder:text-[#191970]/25 outline-none transition-all " +
    "hover:border-[#191970]/15 focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20";

  return {
    lineItems,
    handleQtyChange,
    handleRateChange,
    handleDiscountChange,
    canRemove: lineItems.length > 1,
    inp,
    addLineItem,
    removeLineItem,
    updateLineItem,
    fmt,
  };
};

export default useLineItemsTable;

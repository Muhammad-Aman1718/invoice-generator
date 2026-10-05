import { CURRENCIES } from "@/src/constant/data";
import { getTotalsBreakdown, useInvoiceStore } from "@/src/lib/invoice-store";
import { formatCurrency } from "@/src/lib/invoice-utils";

const useInvoicePreview = () => {
  const store = useInvoiceStore();
  const currencyInfo = CURRENCIES.find((c) => c.code === store.currency) || CURRENCIES[0];
  const { discountAmount, taxAmount } = getTotalsBreakdown(store);
  const fmt = (amount: number) => formatCurrency(amount, store.currency);

  return {
    store,
    currencyInfo,
    subtotal: store.subtotal,
    overallDiscountAmount: discountAmount,
    taxAmount,
    fmt,
  };
};

export default useInvoicePreview;

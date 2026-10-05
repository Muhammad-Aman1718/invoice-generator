import { useEffect, useRef, useState } from "react";
import { useInvoiceStore, getTotalsBreakdown } from "@/src/lib/invoice-store";
import { CURRENCIES, TAX_TYPES } from "@/src/constant/data";

function labelForRate(rate: number) {
  if (!rate) return "None";
  return TAX_TYPES.find((t) => t.rate === rate && t.label !== "Custom Tax")?.label ?? "Custom Tax";
}

const useInvoiceForm = () => {
  const store = useInvoiceStore();

  const [showCurrencyDrop, setShowCurrencyDrop] = useState(false);
  const [showTaxDrop, setShowTaxDrop] = useState(false);
  const [taxType, setTaxType] = useState(() => labelForRate(store.taxRate));

  // Keep the label in sync when an invoice is loaded from the server.
  useEffect(() => {
    setTaxType((current) =>
      TAX_TYPES.some((t) => t.label === current && t.rate === store.taxRate) ||
      current === "Custom Tax"
        ? current
        : labelForRate(store.taxRate),
    );
  }, [store.taxRate]);

  const selectedCurrency =
    CURRENCIES.find((c) => c.code === store.currency) ?? CURRENCIES[0];

  const subtotal = store.subtotal;
  const { discountAmount: overallDiscountVal, taxAmount: taxVal } = getTotalsBreakdown(store);

  const handleTaxChange = (rate: number, type: string) => {
    setTaxType(type);
    if (type !== "Custom Tax") store.setField("taxRate", rate);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const taxDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showCurrencyDrop && !showTaxDrop) return;
    const close = (event: Event) => {
      const target = event.target as Node;
      if (showCurrencyDrop && dropdownRef.current && !dropdownRef.current.contains(target)) {
        setShowCurrencyDrop(false);
      }
      if (showTaxDrop && taxDropdownRef.current && !taxDropdownRef.current.contains(target)) {
        setShowTaxDrop(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowCurrencyDrop(false);
        setShowTaxDrop(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [showCurrencyDrop, showTaxDrop]);

  return {
    showCurrencyDrop,
    setShowCurrencyDrop,
    taxType,
    showTaxDrop,
    setShowTaxDrop,
    handleTaxChange,
    subtotal,
    overallDiscountVal,
    taxVal,
    dropdownRef,
    taxDropdownRef,
    selectedCurrency,
    store,
  };
};

export default useInvoiceForm;

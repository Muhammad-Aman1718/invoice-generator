import { useInvoiceStore } from "@/lib/invoice-store";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Upload, X, Percent, Hash } from "lucide-react";
import { CURRENCIES, TAX_TYPES } from "@/constant/data";

const useInvoiceForm = () => {
  const store = useInvoiceStore();

  const [currency, setCurrency] = useState("USD");
  const [showCurrencyDrop, setShowCurrencyDrop] = useState(false);
  const [taxType, setTaxType] = useState("GST");
  const [taxRate, setTaxRate] = useState(10);
  const [showTaxDrop, setShowTaxDrop] = useState(false);
  const [customTaxRate, setCustomTaxRate] = useState(0);
  const [overallDiscount, setOverallDiscount] = useState(0);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const sigRef = useRef<HTMLInputElement>(null);

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency)!;
  const effectiveTaxRate =
    taxType === "None" ? 0 : taxType === "Custom" ? customTaxRate : taxRate;

  // Placeholder totals — replace with real computed values from your store
  const subtotal = 0;
  const discountAmt = (subtotal * overallDiscount) / 100;
  const taxAmt = ((subtotal - discountAmt) * effectiveTaxRate) / 100;
  const total = subtotal - discountAmt + taxAmt;

  function handleSignature(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSignatureUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  const dropdownRef = useRef<HTMLDivElement>(null);
  const taxDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEvents = (event: MouseEvent | Event) => {
      const target = event.target as Node;

      // Currency Dropdown logic
      if (
        showCurrencyDrop &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setShowCurrencyDrop(false);
      }

      // Tax Dropdown logic (Naya ref use karein)
      if (
        showTaxDrop &&
        taxDropdownRef.current &&
        !taxDropdownRef.current.contains(target)
      ) {
        setShowTaxDrop(false);
      }
    };

    if (showCurrencyDrop || showTaxDrop) {
      document.addEventListener("mousedown", handleEvents);
      window.addEventListener("scroll", handleEvents, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleEvents);
      window.removeEventListener("scroll", handleEvents, true);
    };
  }, [showCurrencyDrop, showTaxDrop]);

  return {
    currency,
    setCurrency,
    showCurrencyDrop,
    taxType,
    setTaxType,
    taxRate,
    setTaxRate,
    showTaxDrop,
    setShowTaxDrop,
    customTaxRate,
    setCustomTaxRate,
    overallDiscount,
    setOverallDiscount,
    signatureUrl,
    setSignatureUrl,
    setShowCurrencyDrop,
    subtotal,
    discountAmt,
    taxAmt,
    total,
    handleSignature,
    dropdownRef,
    taxDropdownRef,
    selectedCurrency,
    effectiveTaxRate,
    sigRef,
    store,
  };
};

export default useInvoiceForm;

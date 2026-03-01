import { useInvoiceStore } from "@/lib/invoice-store";
import { useState, useRef, useEffect } from "react";
import { CURRENCIES } from "@/constant/data";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const useInvoiceForm = () => {
  const store = useInvoiceStore();

  const [showCurrencyDrop, setShowCurrencyDrop] = useState(false);
  const [taxType, setTaxType] = useState("GST");
  const [taxRate, setTaxRate] = useState(10);
  const [showTaxDrop, setShowTaxDrop] = useState(false);
  const [customTaxRate, setCustomTaxRate] = useState(0);
  const [overallDiscount, setOverallDiscount] = useState(0);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const sigRef = useRef<HTMLInputElement>(null);

  const selectedCurrency = CURRENCIES.find((c) => c.code === store.currency)!;
  const effectiveTaxRate =
    taxType === "None" ? 0 : taxType === "Custom" ? customTaxRate : taxRate;

  const subtotal = store.subtotal;
  const overallDiscountVal = subtotal * (store.overallDiscount / 100);
  const taxableAmount = subtotal - overallDiscountVal;
  const taxVal = taxableAmount * (store.taxRate / 100);

  const handleTaxChange = (rate: number, type: string) => {
    setTaxType(type);
    store.setField("taxRate", rate);
  };

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


    const pathname = usePathname();
    const isNewInvoice = pathname.endsWith("/new");
  
    useEffect(() => {
      const fetchAndSetNumber = async () => {
        if (!isNewInvoice) return;
  
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("invoices")
            .select("invoice_number")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();
  
          console.log(
            "Latest Invoice Number Fetched:",
            data?.invoice_number,
            "Error:",
            error,
          );
  
          // 2. Agar DB mein data hai toh +1, warna pehli invoice ke liye 1
          const nextNo =
            !error && data ? (parseInt(data.invoice_number) || 0) + 1 : 1;
          store.setField("invoiceNumber", nextNo);
        }
      };
  
      fetchAndSetNumber();
    }, [isNewInvoice, supabase]);



  return {
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
    handleTaxChange,
    subtotal,
    overallDiscountVal,
    taxableAmount,
    taxVal,
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

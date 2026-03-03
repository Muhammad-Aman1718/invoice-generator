import { useInvoiceStore } from "@/lib/invoice-store";
import { useState, useRef, useEffect } from "react";
import { CURRENCIES } from "@/constant/data";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { resizeImage } from "@/components/invoice/logo-upload";

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

  async function handleSignature(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const img = new Image();

      img.onload = async () => {
        // Yahan hum Signature ke liye alag MAX size de sakte hain
        // Signature ke liye 250x100 ka size kafi hota hai
        const resizedDataUrl = await resizeImage(img, 250, 100);

        // 1. UI Preview ke liye (Local State)
        setSignatureUrl(resizedDataUrl);

        // 2. DB mein save karne ke liye (Store/Global State)
        store.setField("stampUrl", resizedDataUrl);
      };

      img.src = dataUrl;
    };
    reader.readAsDataURL(file);

    // Input reset karein taake same file dobara select ho sake
    e.target.value = "";
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

      
        // 2. Agar DB mein data hai toh +1, warna pehli invoice ke liye 1
        const nextNo =
          !error && data ? (parseInt(data.invoice_number) || 0) + 1 : 1;
        store.setField("invoiceNumber", nextNo);
      }
    };

    fetchAndSetNumber();
  }, [isNewInvoice, supabase]);

 useEffect(() => {
  if (isNewInvoice) {
    // 1. Aaj ki local date nikalne ka sahi tareeka
    const now = new Date();
    
    // offset ko minutes se milliseconds mein convert karke local time nikalna
    const offset = now.getTimezoneOffset() * 60000; 
    const localISODate = new Date(now.getTime() - offset).toISOString().split("T")[0];

    // 2. Ab store mein set karein
    if (store.issueDate !== localISODate) {
      store.setField("issueDate", localISODate);
    }
    if (store.dueDate !== localISODate) {
      store.setField("dueDate", localISODate);
    }
  }
}, [isNewInvoice]);

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

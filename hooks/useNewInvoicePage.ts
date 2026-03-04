// import { useEffect, useState } from "react";
// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateGrandTotal, calculateSubtotal } from "@/lib/invoice-utils";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import { supabase } from "@/lib/supabase/client";
// import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
// import { Tab } from "@/types/invoice-types";
// import { useRouter } from "next/router";

// const useNewInvoicePage = () => {
//   const [tab, setTab] = useState<Tab>("edit");
//   const [isSaving, setIsSaving] = useState(false);
//   const [showPreviewPanel, setShowPreviewPanel] = useState(true);
//   const router = useRouter();
//   const store = useInvoiceStore();

//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(
//     subtotal,
//     store.taxRate,
//     store.overallDiscount,
//   );

//   useEffect(() => {
//     const fetch = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (user) {
//         const { data, error } = await supabase.rpc("get_next_invoice_number", {
//           target_user_id: user.id,
//         });
//         if (!error) store.setField("invoiceNumber", data);
//       }
//     };
//     fetch();
//   }, []);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview-new");
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       const result = await saveInvoiceToDb(store);
//       if (result) {
//         store.resetInvoice();
//         router.push("/dashboard");
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   };
//   return {
//     tab,
//     setTab,
//     showPreviewPanel,
//     setShowPreviewPanel,
//     subtotal,
//     grandTotal,
//     isSaving,
//     store,
//     handleDownload,
//     handleSave,
//   };
// };

// export default useNewInvoicePage;

import { useEffect, useState } from "react";
import { useInvoiceStore } from "@/lib/invoice-store";
import { calculateGrandTotal, calculateSubtotal } from "@/lib/invoice-utils";
import { buildInvoiceData, generateInvoicePDF } from "@/lib/pdf-generator";
import { supabase } from "@/lib/supabase/client";
import { saveInvoiceToDb } from "@/lib/supabase/invoices-client";
import { Tab } from "@/types/invoice-types";
import { useRouter } from "next/navigation"; // Fixed: next/navigation use karein

const useNewInvoicePage = () => {
  const [tab, setTab] = useState<Tab>("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [showPreviewPanel, setShowPreviewPanel] = useState(true);
  const router = useRouter();
  const store = useInvoiceStore();

  const subtotal = calculateSubtotal(store.lineItems);
  const grandTotal = calculateGrandTotal(
    subtotal,
    store.taxRate,
    store.overallDiscount,
  );

  useEffect(() => {
    const fetchNumber = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.rpc("get_next_invoice_number", {
          target_user_id: user.id,
        });
        if (!error) store.setField("invoiceNumber", data);
      }
    };
    fetchNumber();
  }, []);

  const subtotalAmount = store.subtotal;
  const overallDiscountAmount = subtotalAmount * (store.overallDiscount / 100);
  const taxableAmount = subtotalAmount - overallDiscountAmount;
  const taxAmount = taxableAmount * (store.taxRate / 100);

  const handleDownload = async () => {
    try {
      const invoiceData = buildInvoiceData(
        store,
        subtotalAmount,
        overallDiscountAmount,
        taxAmount,
      );

      await generateInvoicePDF(invoiceData);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await saveInvoiceToDb(store);
      if (result) {
        store.resetInvoice();
        router.push("/dashboard");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return {
    tab,
    setTab,
    showPreviewPanel,
    setShowPreviewPanel,
    subtotal,
    grandTotal,
    isSaving,
    store,
    handleDownload,
    handleSave,
  };
};

export default useNewInvoicePage;

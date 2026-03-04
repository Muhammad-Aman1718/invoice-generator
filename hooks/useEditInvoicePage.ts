// import { useInvoiceStore } from "@/lib/invoice-store";
// import { calculateGrandTotal, calculateSubtotal } from "@/lib/invoice-utils";
// import { generateInvoicePDF } from "@/lib/pdf-generator";
// import {
//   fetchInvoiceById,
//   saveInvoiceToDb,
// } from "@/lib/supabase/invoices-client";
// import { Tab } from "@/types/invoice-types";
// import { useParams, useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// const useEditInvoicePage = () => {
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const id = params.id as string;
//   const doDownload = searchParams.get("download") === "1";

//   const [tab, setTab] = useState<Tab>("edit");
//   const [showPreviewPanel, setShowPreviewPanel] = useState(true);
//   const [loaded, setLoaded] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   const router = useRouter();
//   const store = useInvoiceStore();

//   const subtotal = calculateSubtotal(store.lineItems);
//   const grandTotal = calculateGrandTotal(
//     subtotal,
//     store.taxRate,
//     store.overallDiscount,
//   );

//   useEffect(() => {
//     fetchInvoiceById(id).then((inv) => {
//       if (inv) store.loadInvoice(inv);
//       setLoaded(true);
//     });
//   }, [id]);

//   useEffect(() => {
//     if (loaded && doDownload) generateInvoicePDF("invoice-preview-edit");
//   }, [loaded, doDownload]);

//   const handleDownload = async () => {
//     await generateInvoicePDF("invoice-preview-edit");
//   };

//   const handleSave = async () => {
//     store.setField("id", id);
//     setIsSaving(true);
//     try {
//       await saveInvoiceToDb({ ...store, id });
//       localStorage.removeItem("invoice-generator-data");
//       router.push("/dashboard");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return {
//     tab,
//     setTab,
//     showPreviewPanel,
//     setShowPreviewPanel,
//     loaded,
//     isSaving,
//     handleDownload,
//     handleSave,
//     subtotal,
//     grandTotal,
//     store,
//   };
// };

// export default useEditInvoicePage;






import { useInvoiceStore } from "@/lib/invoice-store";
import { calculateGrandTotal, calculateSubtotal } from "@/lib/invoice-utils";
import { generateInvoicePDF } from "@/lib/pdf-generator";
import {
  fetchInvoiceById,
  saveInvoiceToDb,
} from "@/lib/supabase/invoices-client";
import { Tab } from "@/types/invoice-types";
import { useParams, useSearchParams, useRouter } from "next/navigation"; // Fixed: next/navigation use karein
import { useEffect, useState } from "react";

const useEditInvoicePage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const doDownload = searchParams.get("download") === "1";

  const [tab, setTab] = useState<Tab>("edit");
  const [showPreviewPanel, setShowPreviewPanel] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter(); // Ab ye sahi chale ga
  const store = useInvoiceStore();

  const subtotal = calculateSubtotal(store.lineItems);
  const grandTotal = calculateGrandTotal(
    subtotal,
    store.taxRate,
    store.overallDiscount,
  );

  useEffect(() => {
    if (id) {
      fetchInvoiceById(id).then((inv) => {
        if (inv) store.loadInvoice(inv);
        setLoaded(true);
      });
    }
  }, [id]);

  useEffect(() => {
    if (loaded && doDownload) generateInvoicePDF("invoice-preview-edit");
  }, [loaded, doDownload]);

  const handleDownload = async () => {
    await generateInvoicePDF("invoice-preview-edit");
  };

  const handleSave = async () => {
    store.setField("id", id);
    setIsSaving(true);
    try {
      await saveInvoiceToDb({ ...store, id });
      localStorage.removeItem("invoice-generator-data");
      router.push("/dashboard");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    tab,
    setTab,
    showPreviewPanel,
    setShowPreviewPanel,
    loaded,
    isSaving,
    handleDownload,
    handleSave,
    subtotal,
    grandTotal,
    store,
  };
};

export default useEditInvoicePage;
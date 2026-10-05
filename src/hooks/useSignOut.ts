"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { showToast } from "@/src/utils/showToast";
import { ROUTES } from "@/src/constant/routes";

export default function useSignOut() {
  const router = useRouter();
  const resetInvoice = useInvoiceStore((state) => state.resetInvoice);

  return async function signOut() {
    const { error } = await createClient().auth.signOut();
    if (error) return showToast.error("Sign-out failed", error.message);
    resetInvoice();
    router.push(ROUTES.home);
    router.refresh();
  };
}

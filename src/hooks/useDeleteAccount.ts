"use client";

import { useState } from "react";
import { api } from "@/src/lib/apiClient";
import { createClient } from "@/src/lib/supabase/client";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { getErrorMessage } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import { DELETE_CONFIRMATION_TEXT } from "@/src/constant/app";

export default function useDeleteAccount() {
  const [confirmation, setConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const resetInvoice = useInvoiceStore((state) => state.resetInvoice);

  const deleteAccount = async () => {
    setIsDeleting(true);
    try {
      await api.account.remove();
      resetInvoice();
      await createClient().auth.signOut();
      window.location.href = "/?deleted=1";
    } catch (error) {
      showToast.error("Could not delete account", getErrorMessage(error));
      setIsDeleting(false);
    }
  };

  return {
    confirmation,
    setConfirmation,
    isDeleting,
    canDelete: confirmation === DELETE_CONFIRMATION_TEXT,
    deleteAccount,
  };
}

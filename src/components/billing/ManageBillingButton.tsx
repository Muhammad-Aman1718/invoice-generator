"use client";

import { useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { api } from "@/src/lib/apiClient";
import { getErrorMessage } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";

export default function ManageBillingButton() {
  const [isLoading, setIsLoading] = useState(false);

  const openPortal = async () => {
    setIsLoading(true);
    try {
      const { url } = await api.billing.openPortal();
      window.location.href = url;
    } catch (error) {
      showToast.error("Billing portal unavailable", getErrorMessage(error));
      setIsLoading(false);
    }
  };

  return (
    <button className="btn-outline" disabled={isLoading} onClick={openPortal}>
      {isLoading ? <Loader2 size={15} className="animate-spin" /> : <ExternalLink size={15} />}
      Manage billing
    </button>
  );
}

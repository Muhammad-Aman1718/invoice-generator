"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/src/utils/showToast";

/** Re-run the page's server data loaders without a full reload (keeps filters and scroll). */
export default function useDataRefresh() {
  const router = useRouter();
  const [isRefreshing, startTransition] = useTransition();

  const refresh = () => {
    startTransition(() => router.refresh());
    showToast.success("Data refreshed");
  };

  return { isRefreshing, refresh };
}

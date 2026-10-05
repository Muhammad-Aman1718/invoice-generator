"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/src/lib/apiClient";
import { filterAdminUsers } from "@/src/lib/adminUsers";
import { getErrorMessage } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import type { AdminUser, AdminUserUpdate } from "@/src/types/types";

export default function useAdminUsers(users: AdminUser[]) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [busyUserId, setBusyUserId] = useState<string | null>(null);

  const filtered = useMemo(() => filterAdminUsers(users, planFilter, query), [users, planFilter, query]);

  const updateUser = async (user: AdminUser, data: AdminUserUpdate, successMessage: string) => {
    setBusyUserId(user.id);
    try {
      await api.admin.updateUser(user.id, data);
      showToast.success(successMessage, user.email ?? undefined);
      router.refresh();
    } catch (error) {
      showToast.error("Update failed", getErrorMessage(error));
    } finally {
      setBusyUserId(null);
    }
  };

  return { query, setQuery, planFilter, setPlanFilter, filtered, busyUserId, updateUser };
}

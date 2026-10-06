"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { getPasswordProblem } from "@/src/lib/authValidation";
import { getAuthErrorMessage } from "@/src/lib/authErrors";
import { showToast } from "@/src/utils/showToast";
import type { UpdatePasswordOptions } from "@/src/types/types";

export default function useUpdatePassword(options: UpdatePasswordOptions = {}) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const problem = getPasswordProblem(password, confirmation);
    if (problem) return showToast.warning("Check your password", problem);

    setIsLoading(true);
    try {
      const { error } = await createClient().auth.updateUser({ password });
      if (error) throw error;
      setPassword("");
      setConfirmation("");
      showToast.success("Password updated");
      if (options.redirectTo) router.push(options.redirectTo);
    } catch (error) {
      showToast.error("Could not update password", getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return { password, setPassword, confirmation, setConfirmation, isLoading, handleSubmit };
}

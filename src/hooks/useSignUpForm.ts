"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/src/lib/supabase/client";
import { buildAuthCallbackUrl, getSafeRedirectPath } from "@/src/lib/redirects";
import { getAuthErrorMessage } from "@/src/lib/authErrors";
import { getSignUpProblem } from "@/src/lib/authValidation";
import { showToast } from "@/src/utils/showToast";
import { ROUTES } from "@/src/constant/routes";
import type { SignUpValues } from "@/src/types/types";

/** Supabase returns a user with no identities when the email is already registered. */
function isExistingAccount(user: User | null): boolean {
  return Boolean(user && Array.isArray(user.identities) && user.identities.length === 0);
}

export default function useSignUpForm() {
  const [values, setValues] = useState<SignUpValues>({
    email: "",
    password: "",
    repeatPassword: "",
    acceptedTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const setValue = <K extends keyof SignUpValues>(key: K, value: SignUpValues[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    const problem = getSignUpProblem(values);
    if (problem) return showToast.warning("Check the form", problem);

    setIsLoading(true);
    try {
      const { data, error } = await createClient().auth.signUp({
        email: values.email.trim(),
        password: values.password,
        options: { emailRedirectTo: buildAuthCallbackUrl(searchParams, window.location.origin) },
      });
      if (error) throw error;
      if (isExistingAccount(data.user)) {
        showToast.info("Account already exists", "Please sign in with your existing account.");
        return router.push(`${ROUTES.login}${queryString ? `?${queryString}` : ""}`);
      }
      if (!data.session) {
        showToast.success("Check your inbox!", "We've sent you a verification link.");
        return router.push(ROUTES.signUpSuccess);
      }
      router.replace(getSafeRedirectPath(searchParams.get("next")));
      router.refresh();
    } catch (error) {
      showToast.error("Sign-up failed", getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const passwordsMatch = values.repeatPassword.length > 0 && values.password === values.repeatPassword;
  const passwordsMismatch = values.repeatPassword.length > 0 && !passwordsMatch;

  return { values, setValue, isLoading, handleSignUp, passwordsMatch, passwordsMismatch, queryString };
}

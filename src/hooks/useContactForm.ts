"use client";

import { useState, type FormEvent } from "react";
import { api } from "@/src/lib/apiClient";
import { getErrorMessage } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import { EMPTY_CONTACT_MESSAGE } from "@/src/constant/site";
import type { ContactMessage } from "@/src/types/types";

export default function useContactForm() {
  const [values, setValues] = useState<ContactMessage>(EMPTY_CONTACT_MESSAGE);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const setValue = (key: keyof ContactMessage, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSending(true);
    try {
      const { mailto } = await api.sendContactMessage(values);
      if (mailto) window.location.href = mailto;
      setIsSent(true);
    } catch (error) {
      showToast.error("Message not sent", getErrorMessage(error));
    } finally {
      setIsSending(false);
    }
  };

  return { values, setValue, isSending, isSent, handleSubmit };
}

"use client";

import { useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/src/lib/browserStorage";
import { STORAGE_KEYS } from "@/src/constant/app";

export default function useCookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!readStorage(localStorage, STORAGE_KEYS.cookieNotice));
  }, []);

  const dismiss = () => {
    writeStorage(localStorage, STORAGE_KEYS.cookieNotice, new Date().toISOString());
    setVisible(false);
  };

  return { visible, dismiss };
}

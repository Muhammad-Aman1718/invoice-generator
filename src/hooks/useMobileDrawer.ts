"use client";

import { useEffect, useState } from "react";

/** Drawer state that closes on navigation and locks page scroll while open. */
export default function useMobileDrawer(pathname: string) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return { open, setOpen };
}

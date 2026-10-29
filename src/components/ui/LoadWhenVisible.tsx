"use client";

import { useEffect, useRef, useState } from "react";
import type { LoadWhenVisibleProps } from "@/src/types/types";

/** Render heavy client UI only once it scrolls near the viewport (or the URL hash targets it). */
export default function LoadWhenVisible({
  id,
  children,
  fallback,
  rootMargin = "600px",
}: LoadWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const targeted = id !== undefined && window.location.hash === `#${id}`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: targeted ? "100000px" : rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [id, rootMargin]);

  return <div ref={ref}>{visible ? children : fallback}</div>;
}

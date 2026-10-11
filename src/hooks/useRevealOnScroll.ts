"use client";

import { useEffect, useRef, useState } from "react";

const REVEAL_THRESHOLD = 0.15;

/**
 * "hidden" until the element scrolls into view, then "shown". Content rendered on the
 * server stays visible, so nothing disappears without JavaScript.
 */
export default function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("shown");
        observer.disconnect();
      },
      { threshold: REVEAL_THRESHOLD },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, state };
}

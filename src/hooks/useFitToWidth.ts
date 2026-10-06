"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scale fixed-width content (e.g. an A4 invoice) down to fit its container,
 * keeping the layout identical on every screen size.
 */
export default function useFitToWidth(designWidth: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const update = () => {
      const nextScale = Math.min(1, container.clientWidth / designWidth);
      setScale(nextScale);
      setHeight(content.offsetHeight * nextScale);
    };
    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(content);
    update();
    return () => observer.disconnect();
  }, [designWidth]);

  return { containerRef, contentRef, scale, height };
}

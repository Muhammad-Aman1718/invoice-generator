"use client";

import useFitToWidth from "@/src/hooks/useFitToWidth";
import type { FitToWidthProps } from "@/src/types/types";

export default function FitToWidth({ designWidth, children }: FitToWidthProps) {
  const { containerRef, contentRef, scale, height } = useFitToWidth(designWidth);

  return (
    <div ref={containerRef} className="fit-to-width w-full overflow-hidden" style={{ height }}>
      <div
        ref={contentRef}
        className="fit-to-width-content origin-top-left"
        style={{ width: designWidth, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

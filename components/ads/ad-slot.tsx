"use client";

import { cn } from "@/lib/utils";

export type AdSlotVariant = "header" | "sidebar" | "success-modal";

interface AdSlotProps {
  variant: AdSlotVariant;
  className?: string;
}

const VARIANTS: Record<
  AdSlotVariant,
  { label: string; slotId?: string; classes: string }
> = {
  header: {
    label: "Header Ad",
    slotId: "header-ad",
    classes: "w-full h-[90px] max-h-[90px] md:h-[100px]",
  },
  sidebar: {
    label: "Sidebar Ad",
    slotId: "sidebar-ad",
    classes: "w-[160px] min-w-[160px] h-[600px] hidden lg:flex",
  },
  "success-modal": {
    label: "Success Modal Ad",
    slotId: "success-modal-ad",
    classes: "w-full h-[120px] max-h-[120px]",
  },
};

/**
 * AdSlot components for Header, Sidebar, and Success modal.
 * Replace placeholder divs with AdSense code when ready.
 */
export function AdSlot({ variant, className }: AdSlotProps) {
  const config = VARIANTS[variant];
  return (
    <div
      id={config.slotId}
      role="complementary"
      aria-label={`Ad slot: ${config.label}`}
      className={cn(
        "flex items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50",
        "text-slate-500 text-xs font-medium",
        config.classes,
        className
      )}
    >
      <span className="text-center px-2">
        {config.label}
        <br />
        <span className="text-[10px] opacity-70">AdSlot</span>
      </span>
    </div>
  );
}

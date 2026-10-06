import Link from "next/link";
import { FileText } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { BrandLogoProps } from "@/src/types/types";

export default function BrandLogo({ href = "/", size = "md", tone = "onDark" }: BrandLogoProps) {
  const isSmall = size === "sm";
  return (
    <Link href={href} className="group flex items-center gap-2.5" aria-label="InvoiceGen home">
      <span
        className={cn(
          "flex items-center justify-center rounded-xl bg-gold transition group-hover:scale-105",
          isSmall ? "h-7 w-7" : "h-8 w-8",
        )}
      >
        <FileText size={isSmall ? 13 : 15} className="text-navy" aria-hidden="true" />
      </span>
      <span
        className={cn(
          "font-display font-bold tracking-tight",
          tone === "onDark" ? "text-white" : "text-navy",
          isSmall ? "text-base" : "text-lg",
        )}
      >
        Invoice<span className={tone === "onDark" ? "text-gold" : "text-gold-dark"}>Gen</span>
      </span>
    </Link>
  );
}

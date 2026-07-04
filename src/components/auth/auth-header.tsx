"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

export function AuthHeader() {
  return (
    <header style={{ background: "#191970" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center">
        <Link href="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
            style={{ background: "#FFC107" }}
            aria-hidden="true"
          >
            <FileText size={13} style={{ color: "#191970" }} />
          </div>
          <span className="text-white font-black text-sm sm:text-base tracking-tight">
            Invoice<span style={{ color: "#FFC107" }}>Gen</span>
          </span>
        </Link>
      </div>
    </header>
  );
}

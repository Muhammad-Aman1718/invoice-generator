// import React from "react";
// import { cn } from "@/lib/utils";

// // ── Tiny field wrapper ──────────────────────────────────────────────────────
// export default function Field({
//   label,
//   children,
//   className,
//   htmlFor,
// }: {
//   label: string;
//   children: React.ReactNode;
//   className?: string;
//   htmlFor?: string;
// }) {
//   return (
//     <div className={cn("space-y-1.5", className)}>
//       <label

//         htmlFor={htmlFor}
//         className="text-[10px] font-bold uppercase tracking-widest text-[#1B2A4A]"
//       >
//         {label}
//       </label>
//       {children}
//     </div>
//   );
// }

"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ── Tiny field wrapper ──────────────────────────────────────────────────────
export default function Field({
  label,
  children,
  className,
  htmlFor,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}) {
  // htmlFor na ho to label se auto-generate karo
  const fieldId = htmlFor ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={fieldId}
        className="text-[10px] font-bold uppercase tracking-widest text-[#1B2A4A]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

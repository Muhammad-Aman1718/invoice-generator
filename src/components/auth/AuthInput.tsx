"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { AuthInputProps } from "@/src/types/types";

function getBorderClass(hasError: boolean, isValidMatch: boolean): string {
  if (hasError) return "border-red-500 focus:border-red-600 focus:ring-red-100";
  if (isValidMatch) return "border-emerald-500 focus:border-emerald-600 focus:ring-emerald-100";
  return "border-slate-300 focus:border-navy focus:ring-navy/10";
}

export default function AuthInput({
  label,
  id,
  isPassword = false,
  forgotLink,
  hasError = false,
  isValidMatch = false,
  type = "text",
  className,
  ...inputProps
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-end justify-between">
        <label htmlFor={id} className="block text-[12px] font-bold uppercase tracking-wider text-navy">
          {label}
        </label>
        {isPassword && forgotLink && (
          <Link href={forgotLink} className="text-[12px] font-bold text-navy hover:underline">
            Forgot?
          </Link>
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={cn(
            "h-11 w-full rounded-xl border bg-white px-4 text-sm font-medium text-navy outline-none transition-all placeholder:text-slate-400 focus:ring-2",
            getBorderClass(hasError, isValidMatch),
            isPassword && "pr-12",
            className,
          )}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-navy"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AuthFormWrapper({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: "#191970" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm" style={{ color: "rgb(25,25,112,0.6)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

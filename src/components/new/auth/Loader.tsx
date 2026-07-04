import React from "react";

interface LoaderProps {
  className?: string; // Pure flexibility ke liye Tailwind classes string
  text?: string; // Optional overlay text description
}

const Loader: React.FC<LoaderProps> = ({ className = "", text }) => {
  // Base structural classes (layout framework setup)
  const baseSpinnerClass =
    "animate-spin rounded-full border-solid border-t-transparent";

  const defaultStyles =
    "w-8 h-8 border-4 border-slate-300 border-r-[#191970] border-b-[#191970] border-left-[#191970]";

  const finalSpinnerClass = className
    ? `${baseSpinnerClass} ${className}`
    : `${baseSpinnerClass} ${defaultStyles}`;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className={finalSpinnerClass} role="status" aria-label="loading" />
      {text && (
        <p className="text-xs font-bold tracking-wide uppercase text-slate-500">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;

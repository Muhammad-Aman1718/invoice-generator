// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react";

// interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   id: string;
//   isPassword?: boolean;
//   forgotLink?: string; // Naya optional prop forgot password url ke liye
// }

// const AuthInput: React.FC<AuthInputProps> = ({
//   label,
//   id,
//   isPassword = false,
//   forgotLink,
//   type = "text",
//   className = "",
//   ...props
// }) => {
//   const [showPass, setShowPass] = useState(false);

//   const LABEL_CLASS =
//     "block text-[12px] font-bold uppercase tracking-wider text-[#191970]";

//   // Base input styles completely matching your custom layout
//   const baseInputClass =
//     "w-full h-11 px-4 rounded-xl border text-sm outline-none transition-all bg-white " +
//     "border-slate-300 text-[#191970] font-medium placeholder:text-slate-400 " +
//     "focus:border-[#191970] focus:ring-2 focus:ring-[#191970]/10";

//   // Password type field setup logic
//   const inputType = isPassword ? (showPass ? "text" : "password") : type;
//   const paddingRightClass = isPassword ? " pr-12" : "";

//   return (
//     <div className="space-y-1.5 w-full">
//       {/* Label aur Forgot Password Link dono ko ek line mein flexbox se handle kiya */}
//       <div className="flex justify-between items-end">
//         <label htmlFor={id} className={LABEL_CLASS}>
//           {label}
//         </label>

//         {/* Agar forgotLink pass kiya jaye aur field password ho, tabhi link dikhao */}
//         {isPassword && forgotLink && (
//           <Link
//             href={forgotLink}
//             className="text-[12px] font-bold text-[#191970] hover:underline"
//           >
//             Forgot?
//           </Link>
//         )}
//       </div>

//       <div className="relative">
//         <input
//           id={id}
//           type={inputType}
//           className={`${baseInputClass}${paddingRightClass} ${className}`}
//           {...props}
//         />

//         {/* Render toggle icon button only if it's marked as password field */}
//         {isPassword && (
//           <button
//             type="button"
//             onClick={() => setShowPass(!showPass)}
//             aria-label={showPass ? "Hide password" : "Show password"}
//             className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-[#191970]"
//           >
//             {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthInput;



"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  isPassword?: boolean;
  forgotLink?: string;
  hasError?: boolean;      // Error indicator dynamic ring control
  isValidMatch?: boolean;  // Password match hone par status indicators color override
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  id,
  isPassword = false,
  forgotLink,
  hasError = false,
  isValidMatch = false,
  type = "text",
  className = "",
  ...props
}) => {
  const [showPass, setShowPass] = useState(false);

  const LABEL_CLASS = "block text-[12px] font-bold uppercase tracking-wider text-[#191970]";

  // Dynamic Border Color & Ring styling sets according to hook states
  let borderStateClass = "border-slate-300 focus:border-[#191970] focus:ring-[#191970]/10";
  if (hasError) {
    borderStateClass = "border-red-500 focus:border-red-600 focus:ring-red-100";
  } else if (isValidMatch) {
    borderStateClass = "border-emerald-500 focus:border-emerald-600 focus:ring-emerald-100";
  }

  const baseInputClass =
    "w-full h-11 px-4 rounded-xl border text-sm outline-none transition-all bg-white " +
    "text-[#191970] font-medium placeholder:text-slate-400 focus:ring-2 ";

  const inputType = isPassword ? (showPass ? "text" : "password") : type;
  const paddingRightClass = isPassword ? " pr-12" : "";

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-end">
        <label htmlFor={id} className={LABEL_CLASS}>
          {label}
        </label>
        
        {isPassword && forgotLink && (
          <Link
            href={forgotLink}
            className="text-[12px] font-bold text-[#191970] hover:underline"
          >
            Forgot?
          </Link>
        )}
      </div>

      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={`${baseInputClass}${borderStateClass}${paddingRightClass} ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            aria-label={showPass ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-[#191970]"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInput;
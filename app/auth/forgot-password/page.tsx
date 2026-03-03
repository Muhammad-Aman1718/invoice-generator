// import { ForgotPasswordForm } from "@/components/forgot-password-form";

// export default function Page() {
//   return (
//     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
//       <div className="w-full max-w-sm">
//         <ForgotPasswordForm />
//       </div>
//     </div>
//   );
// }





import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div
      className="flex min-h-svh w-full flex-col items-center justify-center p-4 sm:p-6"
      style={{ background: "#ECEFF1" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "#191970" }}
        >
          <FileText size={16} style={{ color: "#FFC107" }} />
        </div>
        <span className="font-black text-xl" style={{ color: "#191970" }}>
          Invoice<span style={{ color: "#FFC107" }}>Gen</span>
        </span>
      </Link>

      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
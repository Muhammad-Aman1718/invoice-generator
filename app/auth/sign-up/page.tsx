// import { SignUpForm } from "@/components/auth/sign-up-form";
// import { Suspense } from "react";

// export default function Page() {
//   return (
//     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-slate-50">
//       <div className="w-full max-w-sm">
//         <Suspense
//           fallback={
//             <div className="text-center text-slate-700">
//               Loading sign-up form...
//             </div>
//           }
//         >
//           <SignUpForm />
//         </Suspense>
//       </div>
//     </div>
//   );
// }





import Link from "next/link";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Suspense } from "react";
import { FileText } from "lucide-react";

export default function Page() {
  return (
    <div
      className="flex min-h-svh w-full flex-col"
      style={{ background: "#ECEFF1" }}
    >
      {/* ── Minimal Nav ── */}
      <header style={{ background: "#191970" }}>
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "#FFC107" }}
            >
              <FileText size={13} style={{ color: "#191970" }} />
            </div>
            <span className="text-white font-black text-base tracking-tight">
              Invoice<span style={{ color: "#FFC107" }}>Gen</span>
            </span>
          </Link>
        </div>
      </header>

      {/* ── Form Center ── */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-sm">
          <Suspense
            fallback={
              <div className="text-center text-sm font-medium" style={{ color: "rgba(25,25,112,0.45)" }}>
                <div
                  className="w-7 h-7 rounded-full border-2 border-t-transparent mx-auto mb-2 animate-spin"
                  style={{ borderColor: "#FFC107", borderTopColor: "transparent" }}
                />
                Loading...
              </div>
            }
          >
            <SignUpForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
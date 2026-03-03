// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { FileText, LayoutDashboard, Plus, LogOut } from "lucide-react";
// import { createClient } from "@/lib/supabase/client";
// import { useRouter } from "next/navigation";

// const navItems = [
//   { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { href: "/dashboard/invoices/new", label: "New Invoice", icon: Plus },
// ];

// export function AppSidebar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const handleLogout = async () => {
//     const supabase = createClient();
//     await supabase.auth.signOut();
//     router.push("/");
//     router.refresh();
//   };

//   return (
//     <aside className="sticky top-0 flex h-screen w-56 flex-col border-r border-slate-200 bg-white shadow-sm">
//       <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6">
//         <FileText className="h-6 w-6 text-indigo-600" />
//         <span className="font-semibold text-slate-900">Invoice SaaS</span>
//       </div>
//       <nav className="flex-1 space-y-1 p-4">
//         {navItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
//           return (
//             <Link key={item.href} href={item.href}
//               className={cn(
//                 "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                 isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//               )}
//             >
//               <Icon className="h-4 w-4" />
//               {item.label}
//             </Link>
//           );
//         })}
//       </nav>
//       <div className="border-t border-slate-200 p-4">
//         <button onClick={handleLogout}
//           className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
//           <LogOut className="h-4 w-4" />
//           Sign out
//         </button>
//       </div>
//     </aside>
//   );
// }







// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { FileText, LayoutDashboard, Plus, LogOut } from "lucide-react";
// import { createClient } from "@/lib/supabase/client";
// import { useRouter } from "next/navigation";

// // ─────────────────────────────────────────────
// //  COLOR THEME  (60 · 30 · 10)
// //  60% → #ECEFF1  background
// //  30% → #191970  midnight blue
// //  10% → #FFC107  amber accent
// // ─────────────────────────────────────────────

// const navItems = [
//   { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
//   { href: "/dashboard/invoices/new", label: "New Invoice", icon: Plus, exact: false },
// ];

// export function AppSidebar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const handleLogout = async () => {
//     const supabase = createClient();
//     await supabase.auth.signOut();
//     router.push("/");
//     router.refresh();
//   };

//   return (
//     <aside
//       className="sticky top-0 flex h-screen flex-col"
//       style={{
//         width: "220px",
//         minWidth: "220px",
//         background: "#191970",
//         borderRight: "1px solid rgba(255,255,255,0.06)",
//       }}
//     >
//       {/* ── Logo ──────────────────────────────────────────────────────── */}
//       <div
//         className="flex h-15 items-center gap-2.5 px-5 py-4 flex-shrink-0"
//         style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
//       >
//         <div
//           className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
//           style={{ background: "#FFC107" }}
//         >
//           <FileText size={15} style={{ color: "#191970" }} />
//         </div>
//         <span className="font-black text-base text-white tracking-tight">
//           Invoice<span style={{ color: "#FFC107" }}>Gen</span>
//         </span>
//       </div>

//       {/* ── Nav ───────────────────────────────────────────────────────── */}
//       <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
//         {/* Section label */}
//         <p
//           className="text-[9px] font-black uppercase tracking-widest px-3 mb-3"
//           style={{ color: "rgba(255,255,255,0.25)" }}
//         >
//           Navigation
//         </p>

//         {navItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = item.exact
//             ? pathname === item.href
//             : pathname === item.href || pathname?.startsWith(item.href + "/");

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
//               style={{
//                 background: isActive ? "rgba(255,193,7,0.12)" : "transparent",
//                 color: isActive ? "#FFC107" : "rgba(255,255,255,0.55)",
//                 borderLeft: isActive ? "2px solid #FFC107" : "2px solid transparent",
//               }}
//               onMouseEnter={(e) => {
//                 if (!isActive) {
//                   e.currentTarget.style.background = "rgba(255,255,255,0.05)";
//                   e.currentTarget.style.color = "rgba(255,255,255,0.85)";
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (!isActive) {
//                   e.currentTarget.style.background = "transparent";
//                   e.currentTarget.style.color = "rgba(255,255,255,0.55)";
//                 }
//               }}
//             >
//               <Icon size={15} />
//               {item.label}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* ── Footer: Sign out ──────────────────────────────────────────── */}
//       <div
//         className="px-3 py-4 flex-shrink-0"
//         style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
//       >
//         <button
//           onClick={handleLogout}
//           className="flex w-full items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
//           style={{ color: "rgba(255,255,255,0.4)" }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = "rgba(239,68,68,0.1)";
//             e.currentTarget.style.color = "#F87171";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = "transparent";
//             e.currentTarget.style.color = "rgba(255,255,255,0.4)";
//           }}
//         >
//           <LogOut size={15} />
//           Sign out
//         </button>
//       </div>
//     </aside>
//   );
// }


























// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { FileText, LayoutDashboard, Plus, LogOut, Menu, X } from "lucide-react";
// import { createClient } from "@/lib/supabase/client";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// const navItems = [
//   { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
//   { href: "/dashboard/invoices/new", label: "New Invoice", icon: Plus, exact: false },
// ];

// function NavContent({
//   pathname,
//   onClose,
//   onLogout,
// }: {
//   pathname: string;
//   onClose?: () => void;
//   onLogout: () => void;
// }) {
//   return (
//     <div className="flex flex-col h-full" style={{ background: "#191970" }}>
//       {/* Logo */}
//       <div
//         className="flex items-center justify-between px-5 flex-shrink-0"
//         style={{ height: "60px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
//       >
//         <Link href="/dashboard" className="flex items-center gap-2.5">
//           <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#FFC107" }}>
//             <FileText size={15} style={{ color: "#191970" }} />
//           </div>
//           <span className="font-black text-base text-white tracking-tight">
//             Invoice<span style={{ color: "#FFC107" }}>Gen</span>
//           </span>
//         </Link>
//         {onClose && (
//           <button
//             onClick={onClose}
//             className="w-7 h-7 rounded-lg flex items-center justify-center"
//             style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
//           >
//             <X size={14} />
//           </button>
//         )}
//       </div>

//       {/* Nav items */}
//       <nav className="flex-1 px-3 py-4 space-y-1">
//         <p className="text-[9px] font-black uppercase tracking-widest px-3 mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>
//           Menu
//         </p>
//         {navItems.map(({ href, label, icon: Icon, exact }) => {
//           const isActive = exact ? pathname === href : pathname === href || pathname?.startsWith(href + "/");
//           return (
//             <Link
//               key={href}
//               href={href}
//               className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
//               style={{
//                 background: isActive ? "rgba(255,193,7,0.12)" : "transparent",
//                 color: isActive ? "#FFC107" : "rgba(255,255,255,0.55)",
//                 borderLeft: isActive ? "2px solid #FFC107" : "2px solid transparent",
//               }}
//               onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; } }}
//               onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; } }}
//             >
//               <Icon size={15} />
//               {label}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Logout */}
//       <div className="px-3 py-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
//         <button
//           onClick={onLogout}
//           className="flex w-full items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
//           style={{ color: "rgba(255,255,255,0.4)" }}
//           onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#F87171"; }}
//           onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
//         >
//           <LogOut size={15} />
//           Sign out
//         </button>
//       </div>
//     </div>
//   );
// }

// export function AppSidebar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [open, setOpen] = useState(false);

//   useEffect(() => { setOpen(false); }, [pathname]);
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [open]);

//   const handleLogout = async () => {
//     const supabase = createClient();
//     await supabase.auth.signOut();
//     router.push("/");
//     router.refresh();
//   };

//   return (
//     <>
//       {/* Desktop sidebar */}
//       <aside className="hidden lg:block sticky top-0 h-screen flex-shrink-0" style={{ width: "220px" }}>
//         <NavContent pathname={pathname} onLogout={handleLogout} />
//       </aside>

//       {/* Mobile hamburger */}
//       <button
//         className="lg:hidden fixed top-3 left-3 z-50 w-9 h-9 rounded-xl flex items-center justify-center"
//         style={{ background: "#191970", color: "#FFC107", boxShadow: "0 4px 14px rgba(25,25,112,0.3)" }}
//         onClick={() => setOpen(true)}
//         aria-label="Open sidebar"
//       >
//         <Menu size={18} />
//       </button>

//       {/* Backdrop */}
//       {open && (
//         <div
//           className="lg:hidden fixed inset-0 z-40"
//           style={{ background: "rgba(25,25,112,0.5)", backdropFilter: "blur(3px)" }}
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Mobile drawer */}
//       <aside
//         className="lg:hidden fixed top-0 left-0 z-50 h-full flex-shrink-0 transition-transform duration-300 ease-out"
//         style={{
//           width: "240px",
//           transform: open ? "translateX(0)" : "translateX(-100%)",
//           boxShadow: open ? "6px 0 32px rgba(25,25,112,0.25)" : "none",
//         }}
//       >
//         <NavContent pathname={pathname} onClose={() => setOpen(false)} onLogout={handleLogout} />
//       </aside>
//     </>
//   );
// }





































"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Plus, LogOut, Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/invoices/new", label: "New Invoice", icon: Plus, exact: false },
];

function NavContent({
  pathname,
  onClose,
  onLogout,
}: {
  pathname: string;
  onClose?: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex flex-col h-full" style={{ background: "#191970" }}>
      {/* Logo */}
      <div
        className="flex items-center justify-between px-5 flex-shrink-0"
        style={{ height: "60px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#FFC107" }}
          >
            <FileText size={15} style={{ color: "#191970" }} />
          </div>
          <span className="font-black text-base text-white tracking-tight">
            Invoice<span style={{ color: "#FFC107" }}>Gen</span>
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p
          className="text-[9px] font-black uppercase tracking-widest px-3 mb-3"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Menu
        </p>
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: isActive ? "rgba(255,193,7,0.12)" : "transparent",
                color: isActive ? "#FFC107" : "rgba(255,255,255,0.55)",
                borderLeft: isActive ? "2px solid #FFC107" : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                }
              }}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div
        className="px-3 py-4 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{ color: "rgba(255,255,255,0.4)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.1)";
            e.currentTarget.style.color = "#F87171";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </div>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:block sticky top-0 h-screen flex-shrink-0"
        style={{ width: "220px" }}
      >
        <NavContent pathname={pathname} onLogout={handleLogout} />
      </aside>

      {/* ── Mobile hamburger button ──────────────────────────────────────
          z-[70]: highest z-index — always above navbar (z-30) and
          above any sticky content that might scroll over it.
          Solid #191970 background with amber icon — clearly visible
          on white, grey (#ECEFF1), or any light background.               */}
      <button
        className="lg:hidden fixed z-[70] flex items-center justify-center rounded-xl transition-all"
        style={{
          top: "12px",
          left: "12px",
          width: "36px",
          height: "36px",
          background: "#191970",
          color: "#FFC107",
          /* Double shadow: depth + amber glow ring */
          boxShadow:
            "0 2px 8px rgba(25,25,112,0.4), 0 0 0 2px rgba(255,193,7,0.3)",
        }}
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <Menu size={17} />
      </button>

      {/* Backdrop — z-[65] between hamburger and drawer */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[65]"
          style={{
            background: "rgba(25,25,112,0.55)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer — z-[70] same as hamburger so it replaces it */}
      <aside
        className="lg:hidden fixed top-0 left-0 h-full z-[70] flex-shrink-0 transition-transform duration-300 ease-out"
        style={{
          width: "240px",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          boxShadow: open ? "8px 0 40px rgba(25,25,112,0.3)" : "none",
        }}
      >
        <NavContent
          pathname={pathname}
          onClose={() => setOpen(false)}
          onLogout={handleLogout}
        />
      </aside>
    </>
  );
}
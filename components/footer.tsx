// "use client";
// import React, { useEffect, useState } from "react";

// const Footer = () => {
//   // const [year, setYear] = useState(new Date().getFullYear());

//   // useEffect(() => {
//   //   setYear(new Date().getFullYear());
//   // }, []);

//   return (
//     <footer
//       className="py-16 mt-20 border-t border-slate-800"
//       style={{ backgroundColor: "#1B2A4A" }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Upper Section: Grid Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
//           {/* Brand Column */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 text-white">
//               <div className="bg-[#3A7BD5] p-1.5 rounded">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//               </div>
//               <span className="text-xl font-bold tracking-tight">
//                 InvoiceGen Pro
//               </span>
//             </div>
//             <p className="text-slate-400 text-sm leading-relaxed">
//               Professional invoice generator for businesses worldwide. Create
//               beautiful, tax-compliant invoices in seconds.
//             </p>
//           </div>

//           {/* Product Column */}
//           <div>
//             <h3 className="text-white font-semibold mb-4">Product</h3>
//             <ul className="space-y-3 text-sm text-slate-400">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Features
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Pricing
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Templates
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Resources Column */}
//           <div>
//             <h3 className="text-white font-semibold mb-4">Resources</h3>
//             <ul className="space-y-3 text-sm text-slate-400">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Help Center
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Blog
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   API Docs
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Legal Column */}
//           <div>
//             <h3 className="text-white font-semibold mb-4">Legal</h3>
//             <ul className="space-y-3 text-sm text-slate-400">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Privacy Policy
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Terms of Service
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   GDPR Compliance
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Section: Copyright */}
//         <div className="pt-8 border-t border-white text-center">
//           <p className="text-slate-500 text-sm">
//             {/* © {year} InvoiceGen Pro. All rights reserved. */}
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;






"use client";
import React from "react";
import Link from "next/link";
import { FileText, Twitter, Github, Linkedin } from "lucide-react";

// ─────────────────────────────────────────────
//  COLOR THEME  (60 · 30 · 10)
//  60% → #ECEFF1  background
//  30% → #191970  midnight blue
//  10% → #FFC107  amber accent
// ─────────────────────────────────────────────

const Footer = () => {
  // const year = new Date().getFullYear();

  const cols = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Templates", "Changelog"],
    },
    {
      title: "Resources",
      links: ["Help Center", "Blog", "API Docs", "Status"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "GDPR Compliance", "Cookie Policy"],
    },
  ];

  return (
    <footer style={{ background: "#191970" }}>

      {/* ── Amber top stripe ── */}
      <div className="h-[3px] w-full" style={{ background: "#FFC107" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">

        {/* ── Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#FFC107" }}
              >
                <FileText size={16} style={{ color: "#191970" }} />
              </div>
              <span className="text-white font-black text-lg tracking-tight">
                Invoice<span style={{ color: "#FFC107" }}>Gen</span>
              </span>
            </div>

            <p
              className="text-xs leading-relaxed max-w-[200px]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Professional invoice generator for businesses worldwide. Beautiful,
              tax-compliant invoices in seconds.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Github, label: "GitHub" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,193,7,0.15)";
                    e.currentTarget.style.color = "#FFC107";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h3
                className="text-xs font-black uppercase tracking-widest mb-4"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs font-medium transition-all"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#FFC107";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p
            className="text-[11px] font-medium"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {/* © {year} InvoiceGen. All rights reserved. */}
          </p>
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#FFC107", boxShadow: "0 0 6px #FFC107" }}
            />
            <span
              className="text-[11px] font-bold"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
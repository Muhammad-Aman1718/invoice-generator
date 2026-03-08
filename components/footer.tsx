// "use client";

// import { FileText, Twitter, Github, Linkedin } from "lucide-react";

// // ─────────────────────────────────────────────
// //  COLOR THEME  (60 · 30 · 10)
// //  60% → #ECEFF1  background
// //  30% → #191970  midnight blue
// //  10% → #FFC107  amber accent
// // ─────────────────────────────────────────────

// const Footer = () => {
//   // const year = new Date().getFullYear();

//   const cols = [
//     {
//       title: "Product",
//       links: ["Features", "Pricing", "Templates", "Changelog"],
//     },
//     {
//       title: "Resources",
//       links: ["Help Center", "Blog", "API Docs", "Status"],
//     },
//     {
//       title: "Legal",
//       links: [
//         "Privacy Policy",
//         "Terms of Service",
//         "GDPR Compliance",
//         "Cookie Policy",
//       ],
//     },
//   ];

//   return (
//     <footer style={{ background: "#191970" }}>
//       {/* ── Amber top stripe ── */}
//       <div className="h-[3px] w-full" style={{ background: "#FFC107" }} />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
//         {/* ── Grid ── */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
//           {/* Brand */}
//           <div className="col-span-2 sm:col-span-1 space-y-4">
//             {/* Logo */}
//             <div className="flex items-center gap-2.5">
//               <div
//                 className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
//                 style={{ background: "#FFC107" }}
//               >
//                 <FileText size={16} style={{ color: "#191970" }} />
//               </div>
//               <span className="text-white font-black text-lg tracking-tight">
//                 Invoice<span style={{ color: "#FFC107" }}>Gen</span>
//               </span>
//             </div>

//             <p
//               className="text-xs leading-relaxed max-w-[200px]"
//               style={{ color: "rgba(255,255,255,0.45)" }}
//             >
//               Professional invoice generator for businesses worldwide.
//               Beautiful, tax-compliant invoices in seconds.
//             </p>

//             {/* Social icons */}
//             <div className="flex items-center gap-2 pt-1">
//               {[
//                 { Icon: Twitter, label: "Twitter" },
//                 { Icon: Github, label: "GitHub" },
//                 { Icon: Linkedin, label: "LinkedIn" },
//               ].map(({ Icon, label }) => (
//                 <a
//                   key={label}
//                   href="#"
//                   aria-label={label}
//                   className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
//                   style={{
//                     background: "rgba(255,255,255,0.07)",
//                     color: "rgba(255,255,255,0.45)",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "rgba(255,193,7,0.15)";
//                     e.currentTarget.style.color = "#FFC107";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "rgba(255,255,255,0.07)";
//                     e.currentTarget.style.color = "rgba(255,255,255,0.45)";
//                   }}
//                 >
//                   <Icon size={14} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Link Columns */}
//           {cols.map((col) => (
//             <div key={col.title}>
//               <h3
//                 className="text-xs font-black uppercase tracking-widest mb-4"
//                 style={{ color: "rgba(255,255,255,0.35)" }}
//               >
//                 {col.title}
//               </h3>
//               <ul className="space-y-2.5">
//                 {col.links.map((link) => (
//                   <li key={link}>
//                     <a
//                       href="#"
//                       className="text-xs font-medium transition-all"
//                       style={{ color: "rgba(255,255,255,0.5)" }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.color = "#FFC107";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.color = "rgba(255,255,255,0.5)";
//                       }}
//                     >
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* ── Divider ── */}
//         <div
//           className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
//           style={{ borderColor: "rgba(255,255,255,0.08)" }}
//         >
//           <p
//             className="text-[11px] font-medium"
//             style={{ color: "rgba(255,255,255,0.25)" }}
//           >
//             {/* © {year} InvoiceGen. All rights reserved. */}
//           </p>
//           <div className="flex items-center gap-1.5">
//             <span
//               className="w-1.5 h-1.5 rounded-full"
//               style={{ background: "#FFC107", boxShadow: "0 0 6px #FFC107" }}
//             />
//             <span
//               className="text-[11px] font-bold"
//               style={{ color: "rgba(255,255,255,0.3)" }}
//             >
//               All systems operational
//             </span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";

import { FileText, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  // const currentYear = new Date().getFullYear();

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
      links: [
        "Privacy Policy",
        "Terms of Service",
        "GDPR Compliance",
        "Cookie Policy",
      ],
    },
  ];

  return (
    <footer
      className="w-full"
      style={{ background: "#191970" }}
      aria-label="Site Footer"
    >
      {/* ── Amber top stripe ── */}
      <div className="h-[3px] w-full" style={{ background: "#FFC107" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* ── Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-1 space-y-5">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#FFC107" }}
              >
                <FileText
                  size={18}
                  strokeWidth={2.5}
                  style={{ color: "#191970" }}
                />
              </div>
              <span className="text-white font-black text-xl tracking-tight">
                Invoice<span style={{ color: "#FFC107" }}>Gen</span>
              </span>
            </div>

            <p
              className="text-sm leading-relaxed max-w-[220px]"
              style={{ color: "#B0B0D1" }} // Contrast improved (Light Blue-Grey)
            >
              Professional invoice generator for businesses worldwide. Create
              tax-compliant invoices in seconds.
            </p>

            {/* Social icons */}
            <nav
              className="flex items-center gap-3 pt-1"
              aria-label="Social Media"
            >
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Github, label: "GitHub" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all border"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "#D1D1F0", // High contrast icon color
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#FFC107";
                    e.currentTarget.style.color = "#191970";
                    e.currentTarget.style.borderColor = "#FFC107";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.color = "#D1D1F0";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </nav>
          </div>

          {/* Link Columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h3
                className="text-[11px] font-black uppercase tracking-[0.15em] mb-5"
                style={{ color: "#FFC107" }} // Use accent for headers (Best visibility)
              >
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm font-medium transition-colors hover:underline decoration-[#FFC107] underline-offset-4"
                      style={{ color: "#D1D1F0" }} // Soft but readable grey-white
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#FFFFFF")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#D1D1F0")
                      }
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
          className="border-t pt-8 flex flex-col sm:row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="text-xs font-medium" style={{ color: "#8E8EB2" }}>
            {/* © {currentYear} InvoiceGen. All rights reserved. Built with */}
            precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

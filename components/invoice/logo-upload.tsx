// "use client";

// import { useCallback, useRef } from "react";
// import { Upload, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// const MAX_W = 200;
// const MAX_H = 120;

// export async function resizeImage(img: HTMLImageElement, maxW: number, maxH: number): Promise<string> {
//   return new Promise((resolve) => {
//     let { width, height } = img;
//     if (width <= maxW && height <= maxH) {
//       const canvas = document.createElement("canvas");
//       canvas.width = width;
//       canvas.height = height;
//       const ctx = canvas.getContext("2d")!;
//       ctx.drawImage(img, 0, 0);
//       resolve(canvas.toDataURL("image/png"));
//       return;
//     }
//     const ratio = Math.min(maxW / width, maxH / height);
//     width = Math.round(width * ratio);
//     height = Math.round(height * ratio);
//     const canvas = document.createElement("canvas");
//     canvas.width = width;
//     canvas.height = height;
//     const ctx = canvas.getContext("2d")!;
//     ctx.drawImage(img, 0, 0, width, height);
//     resolve(canvas.toDataURL("image/png"));
//   });
// }

// interface LogoUploadProps {
//   value: string | null;
//   onChange: (dataUrl: string | null) => void;
//   className?: string;
// }

// export function LogoUpload({ value, onChange, className }: LogoUploadProps) {
//   const inputRef = useRef<HTMLInputElement>(null);

//   const processFile = useCallback(
//     (file: File) => {
//       if (!file?.type.startsWith("image/")) return;
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const dataUrl = e.target?.result as string;
//         const img = new Image();
//         img.onload = () => resizeImage(img, MAX_W, MAX_H).then(onChange);
//         img.src = dataUrl;
//       };
//       reader.readAsDataURL(file);
//     },
//     [onChange]
//   );

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     processFile(e.dataTransfer.files[0]);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) processFile(file);
//     e.target.value = "";
//   };

//   return (
//     <div
//       className={cn(
//         "border-2 border-dashed rounded-lg border-slate-200 hover:border-indigo-300 min-h-[120px] flex items-center justify-center transition-colors",
//         className
//       )}
//       onDrop={handleDrop}
//       onDragOver={(e) => e.preventDefault()}
//     >
//       <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
//       {value ? (
//         <div className="relative p-4">
//           <img src={value} alt="Logo" className="max-h-[100px] max-w-[180px] object-contain" />
//           <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={() => onChange(null)} aria-label="Remove logo">
//             <X className="h-3 w-3" />
//           </Button>
//         </div>
//       ) : (
//         <button
//           type="button"
//           onClick={() => inputRef.current?.click()}
//           className="flex flex-col items-center gap-2 p-6 text-slate-500 hover:text-indigo-600 transition-colors"
//         >
//           <Upload className="h-10 w-10" />
//           <span className="text-sm font-medium">Drag & drop logo or click</span>
//         </button>
//       )}
//     </div>
//   );
// }







"use client";

import { useCallback, useRef } from "react";
import { Upload, X, ImageIcon, Stamp } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
//  Pixel constraints
//  Logo : max 240×100px  (wide letterhead format)
//  Stamp: max 160×160px  (square signature/stamp)
// ─────────────────────────────────────────────
const LOGO_MAX_W  = 240;
const LOGO_MAX_H  = 100;
const STAMP_MAX_W = 160;
const STAMP_MAX_H = 160;

export async function resizeImage(
  img: HTMLImageElement,
  maxW: number,
  maxH: number
): Promise<string> {
  let { width, height } = img;
  const ratio = Math.min(maxW / width, maxH / height, 1); // never upscale
  width  = Math.round(width  * ratio);
  height = Math.round(height * ratio);
  const canvas = document.createElement("canvas");
  canvas.width  = width;
  canvas.height = height;
  canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/png");
}

function processFile(
  file: File,
  maxW: number,
  maxH: number,
  onChange: (url: string | null) => void
) {
  if (!file?.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => resizeImage(img, maxW, maxH).then(onChange);
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

// ─────────────────────────────────────────────────────────────────────────────
//  LogoUpload
//  Displays as a wide horizontal zone (letterhead proportion)
// ─────────────────────────────────────────────────────────────────────────────
interface UploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  className?: string;
}

export function LogoUpload({ value, onChange, className }: UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    processFile(e.dataTransfer.files[0], LOGO_MAX_W, LOGO_MAX_H, onChange);
  };

  return (
    <div
      className={cn("relative transition-all", className)}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) processFile(f, LOGO_MAX_W, LOGO_MAX_H, onChange);
          e.target.value = "";
        }}
      />

      {value ? (
        /* ── Preview state ── */
        <div
          className="rounded-xl overflow-hidden flex items-center justify-center"
          style={{
            height: "80px",
            background: "#fff",
            border: "1.5px solid rgba(25,25,112,0.1)",
            position: "relative",
          }}
        >
          <img
            src={value}
            alt="Logo"
            style={{
              maxHeight: "64px",
              maxWidth: "220px",
              objectFit: "contain",
            }}
          />
          {/* Remove */}
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove logo"
            className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center transition-all"
            style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#EF4444"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; e.currentTarget.style.color = "#EF4444"; }}
          >
            <X size={10} />
          </button>
          {/* Replace hint */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-0 inset-x-0 flex items-center justify-center gap-1 py-1 text-[9px] font-black uppercase tracking-widest opacity-0 hover:opacity-100 transition-opacity"
            style={{ background: "rgba(25,25,112,0.75)", color: "#FFC107", backdropFilter: "blur(4px)" }}
          >
            <Upload size={8} /> Replace
          </button>
        </div>
      ) : (
        /* ── Empty state ── */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full rounded-xl flex flex-col items-center justify-center gap-2 transition-all group"
          style={{
            height: "80px",
            border: "1.5px dashed rgba(25,25,112,0.15)",
            background: "rgba(25,25,112,0.02)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FFC107";
            e.currentTarget.style.background = "rgba(255,193,7,0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(25,25,112,0.15)";
            e.currentTarget.style.background = "rgba(25,25,112,0.02)";
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{ background: "rgba(25,25,112,0.06)" }}
          >
            <ImageIcon size={14} style={{ color: "rgba(25,25,112,0.35)" }} />
          </div>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(25,25,112,0.4)" }}>
            Upload logo · max {LOGO_MAX_W}×{LOGO_MAX_H}px
          </span>
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  StampUpload
//  Displays as a square zone (signature/stamp proportion)
// ─────────────────────────────────────────────────────────────────────────────
export function StampUpload({ value, onChange, className }: UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    processFile(e.dataTransfer.files[0], STAMP_MAX_W, STAMP_MAX_H, onChange);
  };

  return (
    <div
      className={cn("relative transition-all", className)}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) processFile(f, STAMP_MAX_W, STAMP_MAX_H, onChange);
          e.target.value = "";
        }}
      />

      {value ? (
        <div
          className="rounded-xl overflow-hidden flex items-center justify-center"
          style={{
            height: "88px",
            width: "88px",
            background: "#fff",
            border: "1.5px solid rgba(25,25,112,0.1)",
            position: "relative",
          }}
        >
          <img
            src={value}
            alt="Stamp / Signature"
            style={{
              maxHeight: "72px",
              maxWidth: "72px",
              objectFit: "contain",
            }}
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove stamp"
            className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center transition-all"
            style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#EF4444"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; e.currentTarget.style.color = "#EF4444"; }}
          >
            <X size={9} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-xl flex flex-col items-center justify-center gap-2 transition-all"
          style={{
            height: "88px",
            width: "88px",
            border: "1.5px dashed rgba(25,25,112,0.15)",
            background: "rgba(25,25,112,0.02)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FFC107";
            e.currentTarget.style.background = "rgba(255,193,7,0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(25,25,112,0.15)";
            e.currentTarget.style.background = "rgba(25,25,112,0.02)";
          }}
        >
          <Stamp size={16} style={{ color: "rgba(25,25,112,0.3)" }} />
          <span style={{ fontSize: "9px", fontWeight: 700, color: "rgba(25,25,112,0.35)", textAlign: "center", lineHeight: 1.3, padding: "0 4px" }}>
            Signature<br />/ Stamp
          </span>
        </button>
      )}
    </div>
  );
}
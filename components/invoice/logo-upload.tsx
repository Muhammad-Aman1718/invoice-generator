"use client";

import { useCallback, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_W = 200;
const MAX_H = 120;

function resizeImage(img: HTMLImageElement, maxW: number, maxH: number): Promise<string> {
  return new Promise((resolve) => {
    let { width, height } = img;
    if (width <= maxW && height <= maxH) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
      return;
    }
    const ratio = Math.min(maxW / width, maxH / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, width, height);
    resolve(canvas.toDataURL("image/png"));
  });
}

interface LogoUploadProps {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  className?: string;
}

export function LogoUpload({ value, onChange, className }: LogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      if (!file?.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => resizeImage(img, MAX_W, MAX_H).then(onChange);
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    processFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg border-slate-200 hover:border-indigo-300 min-h-[120px] flex items-center justify-center transition-colors",
        className
      )}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      {value ? (
        <div className="relative p-4">
          <img src={value} alt="Logo" className="max-h-[100px] max-w-[180px] object-contain" />
          <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={() => onChange(null)} aria-label="Remove logo">
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center gap-2 p-6 text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <Upload className="h-10 w-10" />
          <span className="text-sm font-medium">Drag & drop logo or click</span>
        </button>
      )}
    </div>
  );
}

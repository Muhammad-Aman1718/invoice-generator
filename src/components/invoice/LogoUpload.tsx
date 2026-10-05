"use client";

import UploadedImage from "./UploadedImage";
import UploadDropzone from "./UploadDropzone";
import useImageUpload from "@/src/hooks/useImageUpload";
import { LOGO_MAX_SIZE } from "@/src/constant/app";
import { cn } from "@/src/lib/utils";
import type { LogoUploadProps } from "@/src/types/types";

/** Image picker for logos and signatures (resized to fit a letterhead box). */
export default function LogoUpload({ value, onChange, className, id }: LogoUploadProps) {
  const { inputRef, openPicker, handleInputChange, handleDrop } = useImageUpload(LOGO_MAX_SIZE, onChange);

  return (
    <div
      className={cn("relative", className)}
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <input
        id={id}
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />
      {value ? (
        <UploadedImage src={value} onReplace={openPicker} onRemove={() => onChange(null)} />
      ) : (
        <UploadDropzone onBrowse={openPicker} />
      )}
    </div>
  );
}

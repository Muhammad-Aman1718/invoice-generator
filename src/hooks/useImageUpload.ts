"use client";

import { useRef, type ChangeEvent, type DragEvent } from "react";
import { fileToResizedDataUrl } from "@/src/lib/imageUtils";
import { getErrorMessage } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import type { ImageSize } from "@/src/types/types";

/** File-picker + drag-and-drop that resizes images and returns a data URL. */
export default function useImageUpload(size: ImageSize, onChange: (url: string | null) => void) {
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      onChange(await fileToResizedDataUrl(file, size));
    } catch (error) {
      showToast.error("Upload failed", getErrorMessage(error));
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    void processFile(event.target.files?.[0]);
    // Reset so selecting the same file again still triggers onChange.
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    void processFile(event.dataTransfer.files[0]);
  };

  return { inputRef, openPicker: () => inputRef.current?.click(), handleInputChange, handleDrop };
}

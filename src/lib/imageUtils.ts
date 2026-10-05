import type { ImageSize } from "@/src/types/types";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not read this image file."));
    image.src = src;
  });
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read this file."));
    reader.readAsDataURL(file);
  });
}

/** Shrink an image to fit the box (never upscales) and return a PNG data URL. */
export function resizeImage(image: HTMLImageElement, { maxWidth, maxHeight }: ImageSize): string {
  const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * ratio);
  canvas.height = Math.round(image.height * ratio);
  canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

export async function fileToResizedDataUrl(file: File, size: ImageSize): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  const image = await loadImage(await readAsDataUrl(file));
  return resizeImage(image, size);
}

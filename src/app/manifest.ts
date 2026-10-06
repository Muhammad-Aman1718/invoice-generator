import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/src/constant/site";
import { BRAND_COLORS } from "@/src/constant/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: BRAND_COLORS.mist,
    theme_color: BRAND_COLORS.navy,
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

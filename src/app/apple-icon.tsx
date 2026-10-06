import { ImageResponse } from "next/og";
import { BRAND_COLORS } from "@/src/constant/theme";
import { APPLE_ICON_SIZE } from "@/src/constant/seo";

export const size = APPLE_ICON_SIZE;
export const contentType = "image/png";

// Home-screen icon for iOS; also used as the organisation logo in structured data.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND_COLORS.navy,
        color: BRAND_COLORS.amber,
        fontSize: 84,
        fontWeight: 800,
      }}
    >
      IG
    </div>,
    size,
  );
}

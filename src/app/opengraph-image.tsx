import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/src/constant/site";
import { BRAND_COLORS } from "@/src/constant/theme";
import { OG_IMAGE_ALT, OG_IMAGE_SIZE, SEO_DEFAULT_TITLE, SEO_TAGLINE } from "@/src/constant/seo";

export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

// Link-preview image shared by every page (Facebook, WhatsApp, X, LinkedIn, Slack…).
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: BRAND_COLORS.navy,
        color: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 44, fontWeight: 800 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: BRAND_COLORS.amber,
            color: BRAND_COLORS.navy,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
          }}
        >
          IG
        </div>
        <div style={{ display: "flex" }}>
          Invoice<span style={{ color: BRAND_COLORS.amber }}>Gen</span>
        </div>
        <div style={{ display: "flex", marginLeft: "auto", fontSize: 24, color: BRAND_COLORS.mist }}>
          {SITE_CONFIG.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}>
          {SEO_DEFAULT_TITLE}
        </div>
        <div style={{ fontSize: 32, color: BRAND_COLORS.mist, opacity: 0.85 }}>{SEO_TAGLINE}</div>
      </div>
      <div style={{ display: "flex", gap: 16, fontSize: 28, color: BRAND_COLORS.navy }}>
        {["PDF export", "40+ currencies", "VAT / GST", "Free plan"].map((label) => (
          <div
            key={label}
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              background: BRAND_COLORS.amber,
              borderRadius: 999,
              padding: "12px 28px",
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}

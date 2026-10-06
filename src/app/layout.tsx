import type { Metadata, Viewport } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SITE_CONFIG } from "@/src/constant/site";
import { SEO_DEFAULT_TITLE, SEO_KEYWORDS, SEO_LOCALE } from "@/src/constant/seo";
import { BRAND_COLORS } from "@/src/constant/theme";
import { buildSiteJsonLd } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SEO_DEFAULT_TITLE} | ${SITE_CONFIG.name}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  keywords: SEO_KEYWORDS,
  authors: [{ name: `${SITE_CONFIG.name} Team`, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.company,
  category: "business",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.name,
    locale: SEO_LOCALE,
    url: "/",
    title: `${SEO_DEFAULT_TITLE} | ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SEO_DEFAULT_TITLE} | ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: BRAND_COLORS.navy,
  width: "device-width",
  initialScale: 1,
};

// Geist for body text and figures; Plus Jakarta Sans gives headings character.
const bodyFont = Geist({ variable: "--font-sans", display: "swap", subsets: ["latin"] });
const displayFont = Plus_Jakarta_Sans({
  variable: "--font-display",
  display: "swap",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} font-sans antialiased`}>
        <JsonLd data={buildSiteJsonLd()} />
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}

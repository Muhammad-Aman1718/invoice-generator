import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
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
    default: `${SITE_CONFIG.name} — ${SEO_DEFAULT_TITLE}`,
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
    title: `${SITE_CONFIG.name} — ${SEO_DEFAULT_TITLE}`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SEO_DEFAULT_TITLE}`,
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

const geistSans = Geist({ variable: "--font-geist-sans", display: "swap", subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <JsonLd data={buildSiteJsonLd()} />
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { siteConfig } from "@/src/config/site";
import { PLANS } from "@/src/config/plans";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Professional PDF Invoice Maker`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "invoice generator",
    "PDF invoice maker",
    "free invoice template",
    "VAT invoice",
    "GST invoice",
    "invoice software",
    "freelancer invoice",
    "small business invoicing",
  ],
  authors: [{ name: `${siteConfig.name} Team` }],
  creator: siteConfig.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: `${siteConfig.name} — Professional PDF Invoice Maker`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Professional PDF Invoice Maker`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  }),
};

export const viewport: Viewport = {
  themeColor: "#191970",
  width: "device-width",
  initialScale: 1,
};

const geistSans = Geist({ variable: "--font-geist-sans", display: "swap", subsets: ["latin"] });

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  offers: Object.values(PLANS).map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: String(p.price.month),
    priceCurrency: "USD",
  })),
  featureList: [
    "PDF invoice generation",
    "VAT/GST tax presets",
    "Multi-currency support",
    "Client management",
    "Revenue reports",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Invoice Gen - Professional PDF Invoice Maker",
    template: "%s | Invoice Gen"
  },
  description:
    "Create professional invoices for USA and Europe. PDF Invoice Maker with VAT, GST support. Free to use. Generate tax-compliant invoices instantly.",
  keywords: [
    "Invoice Generator",
    "PDF Invoice Maker",
    "VAT Compliant",
    "Tax Compliant",
    "GST Support",
    "USA Invoices",
    "Europe Invoices",
    "Free Invoice Software",
    "Business Invoicing",
    "Professional Invoices"
  ],
  authors: [{ name: "Invoice Gen Team" }],
  creator: "Invoice Gen",
  publisher: "Invoice Gen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Invoice Gen - Professional PDF Invoice Maker",
    description:
      "Create VAT and tax compliant invoices. Export to PDF instantly. Free invoice generator for businesses.",
    url: defaultUrl,
    siteName: "Invoice Gen",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${defaultUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Invoice Gen - Professional Invoice Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice Gen - Professional PDF Invoice Maker",
    description: "Create VAT and tax compliant invoices. Export to PDF instantly.",
    images: [`${defaultUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Invoice Gen",
    "description": "Professional PDF invoice generator with VAT and GST support for USA and Europe businesses.",
    "url": defaultUrl,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Invoice Gen Team"
    },
    "featureList": [
      "PDF Invoice Generation",
      "VAT/GST Compliance",
      "Multi-currency Support",
      "Professional Templates",
      "Real-time Preview",
      "Secure Authentication"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.className} antialiased`}
        cz-shortcut-listen="true"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

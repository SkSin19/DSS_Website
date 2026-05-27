import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

// Load Inter font with font-display swap for performance
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Robust SEO metadata
export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} — Advanced Digital Security Solutions`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "CCTV cameras",
    "Digital security",
    "Surveillance systems",
    "Access control",
    "Hikvision India",
    "CP Plus",
    "Godrej security",
    "Intrusion alarms",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/hero/cctv-cameras-surveillance-systems-slide-1.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Advanced Security Solutions`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/images/hero/cctv-cameras-surveillance-systems-slide-1.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) for Local Business/Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": SITE_NAME,
    "image": `${SITE_URL}/images/logo/dss_logo.png`,
    "@id": SITE_URL,
    "url": SITE_URL,
    "telephone": "+919876543210",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "description": SITE_DESCRIPTION
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-white text-gray-900 overflow-x-hidden selection:bg-sky-200 selection:text-sky-900"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1 flex flex-col relative w-full" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

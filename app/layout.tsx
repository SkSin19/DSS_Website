import { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_LINKEDIN_URL,
  SITE_PHONE,
  SITE_EMAIL,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

// Robust SEO metadata
export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} - Advanced Digital Security Solutions`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "CCTV cameras",
    "CCTV installation Delhi",
    "surveillance systems",
    "access control systems",
    "biometric attendance",
    "intrusion alarm systems",
    "video door phone",
    "security solutions India",
    "Hikvision",
    "CP Plus",
    "Godrej security",
    "home security",
    "business security",
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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
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
    "@id": SITE_URL,
    name: SITE_NAME,
    legalName: SITE_NAME,
    slogan: "Surety of Security",
    image: `${SITE_URL}/images/logo/dss_logo.png`,
    logo: `${SITE_URL}/images/logo/dss_logo.png`,
    url: SITE_URL,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressRegion: "Delhi",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    description: SITE_DESCRIPTION,
    sameAs: [SITE_LINKEDIN_URL],
  };

  return (
    <html
      lang="en"
      className={cn(
        "scroll-smooth",
        "antialiased",
        "font-sans",
        geist.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen flex flex-col bg-white text-gray-900 overflow-x-hidden selection:bg-red-100 selection:text-gray-900",
          geist.variable,
          playfair.variable,
          inter.variable,
        )}
        suppressHydrationWarning
      >
        <Navbar />
        <main
          className="flex-1 flex flex-col relative w-full overflow-x-clip"
          id="main-content"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

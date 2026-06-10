import { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
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
    "Bose",
    "JBL",
    "jbl",
    "bose",
    "security solutions",
    "home security",
    "business security",
    "security services",
    "security installation",
    "security maintenance",
    "security consultation",
    "security products",
    "security systems",
    "security cameras",
    "security alarms",
    "security access control",
    "security monitoring",
    "security upgrades",
    "security audits",
    "security assessments",
    "security training",
    "security support",
    "security integration",
    "security automation",
    "security analytics",
    "security reporting",
    "security compliance",
    "security best practices",
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
    name: SITE_NAME,
    image: `${SITE_URL}/images/logo/dss_logo.png`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: "+919876543210",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    description: SITE_DESCRIPTION,
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

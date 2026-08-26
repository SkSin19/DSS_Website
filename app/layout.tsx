import { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryPopup from "@/components/sections/EnquiryPopup";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_LINKEDIN_URL,
  SITE_JUSTDIAL_URL,
  SITE_GEO,
  SITE_MAP_URL,
  SITE_PHONE,
  SITE_EMAIL,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Playfair_Display, Inter, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
    default: `${SITE_NAME} — CCTV, Access Control & Alarm Systems in Delhi`,
  },
  applicationName: SITE_NAME,
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
  // Structured Data (JSON-LD). A @graph binds the WebSite node (which drives
  // the site name Google shows in search results) to the LocalBusiness so
  // both share one canonical identity.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        // Primary signal for the Google search-result "site name".
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: ["DSS", "Digital Security India"],
        url: SITE_URL,
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: SITE_NAME,
        alternateName: "DSS",
        slogan: "Surety of Security",
        image: `${SITE_URL}/images/logo/dss_logo.png`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/logo/dss_logo.png`,
        },
        url: SITE_URL,
        telephone: SITE_PHONE,
        email: SITE_EMAIL,
        priceRange: "$$",
        foundingDate: "2008",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "10:30",
            closes: "19:30",
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Shop Number 34 & 35, Near Nirman Vihar Metro Station, Vikas Marg, Shakarpur",
          addressLocality: "Delhi",
          addressRegion: "Delhi",
          postalCode: "110092",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE_GEO.latitude,
          longitude: SITE_GEO.longitude,
        },
        hasMap: SITE_MAP_URL,
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "State", name: "Delhi" },
          { "@type": "City", name: "New Delhi" },
        ],
        description: SITE_DESCRIPTION,
        knowsAbout: [
          "CCTV cameras",
          "Video surveillance systems",
          "Access control systems",
          "Biometric attendance systems",
          "Intrusion alarm systems",
          "Fire alarm systems",
          "Video door phones",
          "Smart locks",
          "Gate automation",
          "Home automation",
          "PA systems and professional audio-visual",
          "Hikvision",
          "CP Plus",
          "Dahua",
          "Godrej security",
          "Honeywell",
        ],
        makesOffer: [
          "CCTV Installation & Surveillance",
          "Access Control Systems",
          "Biometric Attendance Systems",
          "Intrusion & Burglar Alarm Systems",
          "Fire Alarm Systems",
          "Video Door Phones & Intercoms",
          "Home & Gate Automation",
          "PA System & AV Solutions",
          "Security System Support & Maintenance",
        ].map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service,
          },
        })),
        sameAs: [SITE_LINKEDIN_URL, SITE_JUSTDIAL_URL],
      },
    ],
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
          poppins.variable,
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
        <EnquiryPopup />
      </body>
    </html>
  );
}

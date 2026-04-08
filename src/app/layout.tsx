import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, DM_Mono } from "next/font/google";
import "./globals.css";
import { Spotlight } from "@/components/Spotlight";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const SITE_URL = "https://dumb-charades-movies.vercel.app";
const SITE_NAME = "The Dumb Charades Marquee";
const SITE_DESCRIPTION =
  "A hand-curated list of 250+ Bollywood and Hollywood movies for your next dumb charades night. Filter by difficulty, language, or genre — or raise the curtain and let a random pick decide. Heavy on pre-1990 Hindi cinema classics.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Bollywood & Hollywood Movies for Dumb Charades`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "dumb charades",
    "dumb charades movies",
    "movie names for dumb charades",
    "bollywood charades",
    "hollywood charades",
    "hindi movies for charades",
    "movie list for charades",
    "party games",
    "charades movie generator",
    "random movie picker",
    "old bollywood movies",
    "classic hindi movies",
  ],
  authors: [{ name: "Yash Suhagiya" }],
  creator: "Yash Suhagiya",
  publisher: "Yash Suhagiya",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Movies for Dumb Charades`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Movies for Dumb Charades`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "entertainment",
  formatDetection: { telephone: false, email: false, address: false },
  verification: {
    google: "Cn1-KMRBEx5uanBTUEFscYVpWYwNLJmfSY31J9YoQVw",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    inLanguage: "en",
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="ld-json-site"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
        <Spotlight />
        <div className="relative z-10 flex flex-col min-h-dvh">{children}</div>
      </body>
    </html>
  );
}

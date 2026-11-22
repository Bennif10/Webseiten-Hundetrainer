import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { siteConfig } from "@/config/site";
import "./globals.css";

// next/font lädt die Schriften beim Build herunter und liefert sie selbst aus –
// es entstehen keine Anfragen an Google-Server (DSGVO-freundlich).
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} ${siteConfig.subtitle} – ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name} ${siteConfig.subtitle}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: `${siteConfig.name} ${siteConfig.subtitle}`,
    images: [
      {
        url: "/images/trainerin-mit-hund.jpg",
        width: 615,
        height: 436,
        alt: "Stefanie Rathmer von Fairpfoten umarmt lachend ihren Border Collie",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#faf6ee",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#inhalt"
          className="sr-only z-50 rounded-full bg-sage-800 px-5 py-3 text-cream-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Footer />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}

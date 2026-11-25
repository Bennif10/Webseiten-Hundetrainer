import type { NextConfig } from "next";

/**
 * Statischer Export für GitHub Pages.
 *
 * `next build` erzeugt den Ordner `out/` mit reinen HTML-/CSS-/JS-Dateien,
 * die ohne Node.js-Server auf jedem Webspace laufen.
 *
 * Hinweise:
 * - Die Bildoptimierung von Next.js braucht einen Server und ist deshalb
 *   abgeschaltet. Bilder in public/images bitte vorab in sinnvoller Größe
 *   ablegen (ca. 1600–2400 px lange Kante, JPG-Qualität ~80).
 * - Eigene HTTP-Header (Sicherheits-Header) lassen sich bei GitHub Pages
 *   nicht setzen.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

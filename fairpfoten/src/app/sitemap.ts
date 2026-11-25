import type { MetadataRoute } from "next";
import { legalNav, mainNav, siteConfig } from "@/config/site";
import { withTrailingSlash } from "@/lib/metadata";

// Für den statischen Export (GitHub Pages) einmalig beim Build erzeugen
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...mainNav, ...legalNav];
  return pages.map(({ href }) => ({
    url: new URL(withTrailingSlash(href), siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : legalNav.some((l) => l.href === href) ? 0.3 : 0.8,
  }));
}

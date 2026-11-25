import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Für den statischen Export (GitHub Pages) einmalig beim Build erzeugen
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}

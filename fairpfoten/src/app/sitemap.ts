import type { MetadataRoute } from "next";
import { legalNav, mainNav, siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...mainNav, ...legalNav];
  return pages.map(({ href }) => ({
    url: new URL(href, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : legalNav.some((l) => l.href === href) ? 0.3 : 0.8,
  }));
}

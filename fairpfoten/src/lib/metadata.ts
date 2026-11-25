import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Pfad der Seite, z. B. "/ueber-mich" */
  path: string;
}

/** "/ueber-mich" → "/ueber-mich/" (passend zu trailingSlash: true in next.config.ts). */
export const withTrailingSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** Einheitliche Metadaten (Title, Description, Canonical, Open Graph) pro Seite. */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: withTrailingSlash(path) },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: withTrailingSlash(path),
    },
  };
}

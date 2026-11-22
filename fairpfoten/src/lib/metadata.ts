import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Pfad der Seite, z. B. "/ueber-mich" */
  path: string;
}

/** Einheitliche Metadaten (Title, Description, Canonical, Open Graph) pro Seite. */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
    },
  };
}

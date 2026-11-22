import { isContactEmailPlaceholder, siteConfig } from "@/config/site";
import { isPlaceholder } from "@/lib/placeholder";

/**
 * Strukturierte Daten für lokale Suchergebnisse (schema.org).
 * Es werden nur Angaben ausgegeben, die tatsächlich bekannt sind –
 * Platzhalter werden automatisch weggelassen.
 *
 * Sobald Adresse/Ort bekannt sind, hier `address` (PostalAddress) und
 * ggf. `areaServed`/`geo` ergänzen.
 */
export function LocalBusinessJsonLd() {
  const { contact } = siteConfig;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${siteConfig.name} ${siteConfig.subtitle}`,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/trainerin-mit-hund.jpg`,
  };
  if (!isContactEmailPlaceholder) data.email = contact.email;
  if (contact.phone) data.telephone = contact.phone;
  if (contact.area && !isPlaceholder(contact.area)) data.areaServed = contact.area;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

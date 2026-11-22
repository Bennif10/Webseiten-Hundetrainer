import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Impressum",
  description: "Impressum von Fairpfoten Hundetraining.",
  path: "/impressum",
});

export default function ImprintPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        [Platzhalter: Vor- und Nachname]
        <br />
        Fairpfoten Hundetraining
        <br />
        [Platzhalter: Straße und Hausnummer]
        <br />
        [Platzhalter: PLZ und Ort]
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: [Platzhalter: Telefonnummer]
        <br />
        E-Mail: [Platzhalter: E-Mail-Adresse]
      </p>

      <h2>Umsatzsteuer</h2>
      <p>
        [Platzhalter: Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG – oder Hinweis auf Kleinunternehmerregelung, falls
        zutreffend]
      </p>

      <h2>Berufsbezogene Angaben</h2>
      <p>
        [Platzhalter: Erlaubnis nach § 11 Abs. 1 Satz 1 Nr. 8 f TierSchG – zuständige Behörde und Aktenzeichen, falls
        vorhanden; ggf. weitere Qualifikationen]
      </p>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>[Platzhalter: Name und Anschrift der verantwortlichen Person]</p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        [Platzhalter: Angabe, ob Bereitschaft oder Verpflichtung zur Teilnahme an einem Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle besteht]
      </p>

      <h2>Bildnachweise</h2>
      <p>[Platzhalter: Fotografin/Fotograf bzw. Bildquellen]</p>
    </LegalPage>
  );
}

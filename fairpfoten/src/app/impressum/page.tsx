import { LegalPage } from "@/components/sections/LegalPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Impressum",
  description: "Impressum von Fairpfoten Hundetraining – Stefanie Rathmer.",
  path: "/impressum",
});

export default function ImprintPage() {
  const { trainer, contact } = siteConfig;

  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {trainer.name}
        <br />
        Fairpfoten Hundetraining
        <br />
        [Platzhalter: Straße und Hausnummer]
        <br />
        [Platzhalter: PLZ und Ort]
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: {contact.phone}
        <br />
        E-Mail: {contact.email}
      </p>

      <h2>Umsatzsteuer</h2>
      <p>Kleinunternehmerin gemäß § 19 UStG – es wird keine Umsatzsteuer berechnet.</p>

      <h2>Berufsbezogene Angaben</h2>
      <p>
        Erlaubnis nach § 11 Abs. 1 Satz 1 Nr. 8 Buchstabe f Tierschutzgesetz (gewerbsmäßiges Ausbilden von Hunden bzw.
        Anleitung der Ausbildung durch den Tierhalter), erteilt am [Platzhalter: 15.12.2025 oder 15.12.2026 – bitte
        prüfen].
        <br />
        Zuständige Behörde: Veterinäramt Göppingen
      </p>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>
        {trainer.name}, Anschrift wie oben
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        [Platzhalter: Angabe, ob Bereitschaft oder Verpflichtung zur Teilnahme an einem Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle besteht]
      </p>

      <h2>Bildnachweise</h2>
      <p>Fotos: {trainer.name}</p>
    </LegalPage>
  );
}

import { LegalPage } from "@/components/sections/LegalPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Fairpfoten Hundetraining.",
  path: "/datenschutz",
});

/**
 * Gliederung einer Datenschutzerklärung für diese Website.
 * Die technischen Fakten (keine Cookies, kein Tracking, selbst gehostete
 * Schriften, mailto-Formulare) beschreiben den aktuellen Stand des Codes.
 * Alles in eckigen Klammern muss ergänzt und rechtlich geprüft werden.
 */
export default function PrivacyPage() {
  const { trainer, contact, address } = siteConfig;

  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>1. Verantwortliche Stelle</h2>
      <p>
        {trainer.name}
        <br />
        {address.street}
        <br />
        {address.postalCode} {address.city}
        <br />
        Telefon: {contact.phone}
        <br />
        E-Mail: {contact.email}
      </p>

      <h2>2. Hosting und Server-Logfiles</h2>
      <p>
        [Platzhalter: Name und Anschrift des Hosting-Anbieters, Art der verarbeiteten Daten (z. B. IP-Adresse, Datum und
        Uhrzeit des Abrufs, Browsertyp), Rechtsgrundlage (Art. 6 Abs. 1 lit. f DSGVO), Speicherdauer, ggf.
        Auftragsverarbeitungsvertrag und Drittlandübermittlung]
      </p>

      <h2>3. Cookies und Tracking</h2>
      <p>
        Diese Website verwendet in ihrer aktuellen Fassung keine Cookies zu Analyse- oder Marketingzwecken und bindet
        keine Tracking-Dienste ein.
      </p>
      <p>[Platzhalter: Bei späterer Einbindung solcher Dienste ergänzen und ggf. Einwilligungsbanner einrichten]</p>

      <h2>4. Schriftarten</h2>
      <p>
        Die verwendeten Schriftarten werden lokal von unserem Server ausgeliefert. Es findet keine Verbindung zu Servern
        von Google oder anderen Schriftanbietern statt.
      </p>

      <h2>5. Kontakt- und Anfrageformular</h2>
      <p>
        Kontakt- und Anfrageformular übermitteln keine Daten an unseren Server. Beim Absenden wird stattdessen dein
        eigenes E-Mail-Programm mit einer vorbereiteten Nachricht geöffnet. Die Daten erreichen uns erst, wenn du diese
        E-Mail selbst abschickst.
      </p>
      <p>
        [Platzhalter: Zweck der Verarbeitung (Bearbeitung der Anfrage), Rechtsgrundlage (z. B. Art. 6 Abs. 1 lit. b
        DSGVO bei vorvertraglichen Anfragen), Speicherdauer, eingesetzter E-Mail-Anbieter]
      </p>

      <h2>6. Kontakt per E-Mail oder Telefon</h2>
      <p>[Platzhalter: Beschreibung der Verarbeitung, Rechtsgrundlage, Speicherdauer]</p>

      <h2>7. Deine Rechte</h2>
      <p>Du hast im Rahmen der gesetzlichen Bestimmungen insbesondere das Recht auf:</p>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch (Art. 21 DSGVO)</li>
        <li>Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>
      <p>Zuständige Aufsichtsbehörde: Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg.</p>

      <h2>8. Stand</h2>
      <p>[Platzhalter: Datum der letzten Aktualisierung]</p>
    </LegalPage>
  );
}

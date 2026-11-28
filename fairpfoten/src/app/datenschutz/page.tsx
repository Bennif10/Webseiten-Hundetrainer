import { LegalPage } from "@/components/sections/LegalPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Fairpfoten Hundetraining.",
  path: "/datenschutz",
});

/** Datum der letzten inhaltlichen Änderung – bei Anpassungen aktualisieren. */
const LAST_UPDATED = "November 2026";

/**
 * Datenschutzerklärung.
 * Die technischen Angaben (Hosting über GitHub Pages, keine Cookies, kein Tracking,
 * selbst gehostete Schriften, mailto-Formulare) beschreiben den aktuellen Stand des Codes.
 * Werden Dienste ergänzt (z. B. Karten, Videos, Analyse), muss dieser Text angepasst werden.
 */
export default function PrivacyPage() {
  const { trainer, contact, address } = siteConfig;

  return (
    <LegalPage title="Datenschutzerklärung">
      <p>
        Der Schutz deiner persönlichen Daten ist mir wichtig. Hier erfährst du, welche Daten beim Besuch dieser Website
        verarbeitet werden und welche Rechte du hast.
      </p>

      <h2>1. Verantwortliche</h2>
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

      <h2>2. Hosting über GitHub Pages</h2>
      <p>
        Diese Website wird über GitHub Pages bereitgestellt, einen Dienst der GitHub Inc., 88 Colin P. Kelly Jr. Street,
        San Francisco, CA 94107, USA.
      </p>
      <p>
        Beim Aufruf der Website verarbeitet GitHub technisch notwendige Daten, insbesondere deine IP-Adresse, Datum und
        Uhrzeit des Abrufs, die aufgerufene Seite sowie Informationen zu Browser und Betriebssystem. GitHub speichert die
        IP-Adresse nach eigenen Angaben zu Sicherheitszwecken. Ohne diese Verarbeitung kann die Website nicht ausgeliefert
        werden.
      </p>
      <p>
        Rechtsgrundlage ist mein berechtigtes Interesse an einer sicheren und zuverlässigen Bereitstellung der Website
        (Art. 6 Abs. 1 lit. f DSGVO). Dabei können Daten in die USA übermittelt werden. GitHub ist nach dem EU-U.S. Data
        Privacy Framework zertifiziert; die Übermittlung stützt sich auf den Angemessenheitsbeschluss der EU-Kommission
        (Art. 45 DSGVO). Weitere Informationen findest du in der{" "}
        <a
          href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sage-800 underline"
        >
          Datenschutzerklärung von GitHub
        </a>
        .
      </p>

      <h2>3. Cookies und Tracking</h2>
      <p>
        Diese Website setzt keine Cookies und verwendet keine Analyse-, Tracking- oder Marketingdienste. Es werden keine
        Inhalte von Drittanbietern (z. B. Karten, Videos oder Social-Media-Plugins) eingebunden.
      </p>

      <h2>4. Schriftarten</h2>
      <p>
        Die verwendeten Schriftarten sind Teil dieser Website und werden zusammen mit ihr ausgeliefert. Es findet keine
        Verbindung zu Servern von Google oder anderen Schriftanbietern statt.
      </p>

      <h2>5. Kontakt-, Anfrage- und Feedbackformular</h2>
      <p>
        Kontakt-, Anfrage- und Feedbackformular übermitteln keine Daten an einen Server. Deine Eingaben werden ausschließlich in
        deinem Browser zu einer E-Mail zusammengestellt; beim Absenden öffnet sich dein eigenes E-Mail-Programm. Die Daten
        erreichen mich erst, wenn du diese E-Mail selbst abschickst. Für die weitere Verarbeitung gilt Abschnitt 6.
      </p>

      <h2>6. Kontakt per E-Mail oder Telefon</h2>
      <p>
        Wenn du mich per E-Mail oder Telefon kontaktierst, verarbeite ich deine Angaben (z. B. Name, E-Mail-Adresse,
        Telefonnummer, Angaben zu deinem Hund und den Inhalt deiner Nachricht), um deine Anfrage zu beantworten und ggf.
        einen Termin zu vereinbaren.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit deine Anfrage auf ein Training bzw. einen Vertrag abzielt,
        im Übrigen mein berechtigtes Interesse an der Beantwortung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO). Deine Daten
        lösche ich, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen
        Aufbewahrungspflichten (z. B. für Rechnungen) entgegenstehen.
      </p>

      <h2>7. Feedback und Veröffentlichung von Bewertungen</h2>
      <p>
        Über das Feedbackformular kannst du dein Training bewerten (Sterne in drei Kategorien, optional ein Kommentar
        und ein Anzeigename). Ich nutze dein Feedback, um mein Angebot zu verbessern (Art. 6 Abs. 1 lit. f DSGVO).
      </p>
      <p>
        Nur wenn du ausdrücklich zustimmst, veröffentliche ich deine Bewertung auf dieser Website – mit dem von dir
        gewählten Anzeigenamen oder anonym (Art. 6 Abs. 1 lit. a DSGVO). Deine E-Mail-Adresse wird nie veröffentlicht. Du
        kannst deine Einwilligung jederzeit per E-Mail widerrufen; die Bewertung entferne ich dann von der Website.
      </p>

      <h2>8. Deine Rechte</h2>
      <p>Du hast im Rahmen der gesetzlichen Bestimmungen jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen eine Verarbeitung auf Grundlage berechtigter Interessen (Art. 21 DSGVO)</li>
        <li>Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>
      <p>Für Anfragen genügt eine formlose E-Mail an {contact.email}.</p>
      <p>
        Zuständige Aufsichtsbehörde: Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
        Baden-Württemberg.
      </p>

      <h2>9. Stand</h2>
      <p>{LAST_UPDATED}</p>
    </LegalPage>
  );
}

# Fairpfoten – Website

Website für **Fairpfoten Hundetraining – mit Herz und Haltung.**
Moderner, ruhiger Auftritt als Personal Brand mit Anfrageformular, das eine fertige E-Mail vorbereitet.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lucide React · ESLint 9
- **Seiten:** Start, Über mich, Trainingsangebote, Anfrage, FAQ, Kontakt, Impressum, Datenschutz
- **Datenschutz:** keine Cookies, kein Tracking, Schriften selbst gehostet, keine externen Requests zur Laufzeit

> **Inhaltliche Grundlage** ist das Plakat „Was Hunde für ein gutes Leben brauchen“
> (`docs/referenz-plakat.jpg`). Alle darüber hinausgehenden Informationen fehlen noch
> und sind als **Platzhalter** gekennzeichnet (siehe [Offene Informationen](#offene-informationen)).

---

## Voraussetzungen

- [Node.js](https://nodejs.org) **20.9 oder neuer** (getestet mit Node 26)
- npm (wird mit Node.js installiert)
- optional: Git

## Installation & Start

```bash
npm install
```

```bash
npm run dev
```

Danach im Browser <http://localhost:3000> öffnen.

| Befehl              | Zweck                                         |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Entwicklungsserver mit Hot Reload             |
| `npm run build`     | Produktions-Build erstellen                   |
| `npm run start`     | Produktions-Build lokal starten               |
| `npm run lint`      | ESLint                                        |
| `npm run typecheck` | TypeScript-Prüfung                            |
| `npm run check`     | Typecheck + Lint + Build in einem Durchgang   |

> **Hinweis OneDrive:** Das Projekt liegt in einem OneDrive-Ordner. `node_modules` und `.next`
> enthalten zehntausende Dateien. Solange OneDrive diese synchronisiert, kann `npm run dev` hängen
> (die Seite lädt, reagiert aber nicht auf Eingaben). Abhilfe: diese Ordner von der Synchronisierung
> ausschließen, das Projekt außerhalb von OneDrive ablegen oder mit `npm run build && npm run start` testen.

## Umgebungsvariablen

`.env.example` nach `.env.local` kopieren und anpassen (`.env.local` wird nicht eingecheckt):

| Variable                    | Bedeutung                                                             |
| --------------------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Öffentliche Domain (Sitemap, Open Graph, kanonische Links)            |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Empfängeradresse für Trainings- und Kontaktanfragen                      |

Ohne `.env.local` gelten `http://localhost:3000` und die Platzhalter-Adresse `kontakt@fairpfoten.example`.

---

## Projektstruktur

```
docs/                     Referenzmaterial (Plakat)
public/images/            Bilder (Hero, Portrait)
src/
├─ app/                   Seiten (App Router) + sitemap.ts, robots.ts, icon.svg
│  ├─ page.tsx            Startseite
│  ├─ ueber-mich/         Über mich
│  ├─ trainingsangebote/  Angebote
│  ├─ anfrage/            Anfrageformular
│  ├─ faq/, kontakt/, impressum/, datenschutz/
│  ├─ layout.tsx          Grundlayout, Schriften, globale Metadaten
│  └─ globals.css         Designsystem (Farben, Schriften, Animationen)
├─ components/
│  ├─ layout/             Header (inkl. Mobilmenü), Footer, Logo
│  ├─ sections/           Seitenbausteine (Hero, Bedürfnisse, Angebote, FAQ …)
│  ├─ inquiry/            Anfrageformular, Auswahl-Chips, E-Mail-Vorschau
│  ├─ forms/              Formularfelder, Kontaktformular, mailto-Hinweis
│  ├─ seo/                Strukturierte Daten (schema.org)
│  └─ ui/                 Button, Container, SectionHeading, Platzhalter
├─ config/
│  ├─ site.ts             Stammdaten: Name, Kontakt, Navigation, Social Media
│  └─ inquiry.ts          ✉️ Anfrage: Auswahloptionen, Zusatzfragen, E-Mail-Vorlage
├─ data/
│  ├─ services.ts         Trainingsangebote
│  ├─ needs.ts            Die sechs Grundbedürfnisse (vom Plakat)
│  ├─ faq.ts              Häufige Fragen
│  └─ people.ts           Kundenstimmen, eigene Hunde, Qualifikationen
├─ lib/                   Logik ohne UI: E-Mail-Aufbau, Validierung, Metadaten
└─ types/                 Gemeinsame TypeScript-Typen
```

**Prinzip:** Inhalte liegen in `config/` und `data/`, Logik in `lib/`, Darstellung in `components/`.
Für Textänderungen muss in der Regel keine Komponente angefasst werden.

---

## Inhalte pflegen

### Platzhalter finden

Fehlende Inhalte werden im Code mit `placeholder("…")` erzeugt und erscheinen auf der Website
gestrichelt umrandet mit dem Präfix **„[Platzhalter: …]“**. Alle Stellen findest du über die Suche nach
`placeholder(` bzw. `[Platzhalter` im Ordner `src/`.

Einen Platzhalter ersetzen – Beispiel in `src/config/site.ts`:

```ts
// vorher
name: placeholder("Name der Hundetrainerin"),
// nachher
name: "Vorname Nachname",
```

### Trainingsangebote ändern – `src/data/services.ts`

```ts
{
  id: "einzeltraining",            // kurz, ohne Leerzeichen – wird in Links verwendet
  title: "Einzeltraining",
  summary: "Was passiert im Training, was ist das Ziel?",
  audience: "Für wen ist das Angebot gedacht?",
  durationMinutes: 60,             // optional – nur wenn bekannt
  price: "XX € pro Einheit",       // optional – nur wenn tatsächlich festgelegt
  isPlaceholder: false,
}
```

Angebote erscheinen automatisch auf der Startseite (die ersten drei), der Angebotsseite und in der
Anfrageformular. Jede Karte verlinkt auf `/anfrage?angebot=<id>` und wählt das Paket dort vor.

### Weitere Texte

| Was                               | Wo                          |
| --------------------------------- | --------------------------- |
| Name, Kurzbio, Kontakt, Gebiet    | `src/config/site.ts`        |
| Social-Media-Links                | `src/config/site.ts` → `social` |
| FAQ (Antworten ergänzen)          | `src/data/faq.ts`           |
| Kundenstimmen, Hunde, Qualifikationen | `src/data/people.ts`    |
| Grundbedürfnisse & Leitsatz       | `src/data/needs.ts`         |
| Texte der Über-mich-Seite         | `src/app/ueber-mich/page.tsx` |
| Impressum / Datenschutz           | `src/app/impressum/page.tsx`, `src/app/datenschutz/page.tsx` |

Kundenstimmen bitte nur mit Einverständnis der Personen veröffentlichen.

---

## Anfrage & E-Mail-Vorlage – `src/config/inquiry.ts`

Es gibt bewusst **keinen Kalender**, der gepflegt werden muss. Interessierte wählen auf `/anfrage`:

1. **ein Paket** (aus `src/data/services.ts`),
2. **wann sie grob Zeit haben** – Wochentage, Tageszeiten, „Ab wann?“ und ein freier Hinweis,
3. **Angaben zu sich und ihrem Hund**.

Daraus entsteht eine fertige E-Mail, die rechts (mobil: aufklappbar) live als Vorschau angezeigt wird.
Die Trainerin antwortet dann einfach mit einem Terminvorschlag.

```ts
export const inquiryConfig = {
  weekdays: ["Montag", …, "Sonntag"],   // Tage ohne Training einfach entfernen
  dayparts: ["Vormittags", "Mittags", "Nachmittags", "Abends"],
  startOptions: ["So bald wie möglich", "In den nächsten Wochen", "Später / ich bin flexibel"],
  defaultQuestions: [                   // erscheinen bei jedem Paket (optional auszufüllen)
    { id: "dog-name", label: "Name des Hundes", placeholder: "z. B. Balu" },
    …
  ],
  email: {                              // Textbausteine der E-Mail
    subject: (paket, name) => `Anfrage: ${paket} – ${name}`,
    greeting: "Hallo,",
    intro: (paket) => `ich interessiere mich für „${paket}“ …`,
    closing: "Ich freue mich auf deine Rückmeldung!",
    signOff: "Viele Grüße",
  },
};
```

**Zusatzfragen nur für ein bestimmtes Paket** werden direkt beim Paket in `src/data/services.ts` eingetragen:

```ts
{
  id: "welpenkurs",
  title: "Welpenkurs",
  …
  inquiryQuestions: [
    { id: "welpe-alter", label: "Wie alt ist dein Welpe?", placeholder: "z. B. 12 Wochen" },
  ],
}
```

Sie erscheinen im Formular nur, wenn dieses Paket gewählt ist, und werden unter „Zu meinem Hund“ in die
E-Mail übernommen.

### Wie wird die Anfrage verschickt?

Beim Absenden wird per `mailto:` das E-Mail-Programm des Besuchers mit der vorbereiteten Nachricht
geöffnet. ⚠️ Es gibt **keine garantierte Übermittlung**: Die Anfrage kommt erst an, wenn der Besucher die
E-Mail tatsächlich abschickt. Hat jemand kein E-Mail-Programm eingerichtet, kann die Anfrage auf der
Bestätigungsseite kopiert werden. Das wird auf der Website transparent kommuniziert.

---

## Bilder austauschen

Bilder liegen in `public/images/`:

| Datei                     | Verwendung                         | Format          |
| ------------------------- | ---------------------------------- | --------------- |
| `trainerin-mit-hund.jpg`  | Hero Startseite, Open-Graph-Bild   | quer, ca. 4:3   |
| `trainerin-portrait.jpg`  | Über-mich-Teaser und -Seite        | hoch, ca. 4:5   |

Die aktuellen Bilder wurden aus dem Referenzplakat ausgeschnitten und haben daher nur eine geringe
Auflösung (~600 px). **Für den Livegang bitte Originalfotos in hoher Auflösung verwenden** (mind. 1600 px
Breite) – einfach unter gleichem Dateinamen ersetzen. Next.js erzeugt automatisch optimierte AVIF/WebP-
Varianten in passenden Größen.

Neue Bilder einbinden: Datei in `public/images/` ablegen, per `import bild from "…/public/images/datei.jpg"`
importieren und mit `<Image src={bild} alt="Aussagekräftige Beschreibung" />` aus `next/image` verwenden.

Logo: Aktuell wird eine Wortmarke in Schrift gesetzt (`src/components/layout/Logo.tsx`). Liegt das
Original-Logo als SVG vor, kann es dort eingesetzt werden.

---

## Designsystem

Definiert in `src/app/globals.css` (Tailwind `@theme`):

| Token        | Verwendung                     |
| ------------ | ------------------------------ |
| `cream-*`    | Hintergründe (warmes Cremeweiß) |
| `sage-*`     | Primärfarbe (Salbeigrün)       |
| `bark-*`     | Akzent (warmes Braun)          |
| `ink`        | Text (Anthrazit)               |

Schriften: **Cormorant Garamond** (Überschriften) und **Inter** (Fließtext), eingebunden über
`next/font` und damit selbst gehostet. Animationen sind dezent, rein CSS-basiert und respektieren
`prefers-reduced-motion`.

## SEO & Barrierefreiheit

- Eigene Titel, Descriptions, Canonical-URLs und Open-Graph-Daten pro Seite (`src/lib/metadata.ts`)
- `sitemap.xml` und `robots.txt` werden automatisch erzeugt
- Strukturierte Daten `LocalBusiness` (nur bekannte Angaben) und `FAQPage` (nur beantwortete Fragen)
  → Adresse/Gebiet in `src/components/seo/LocalBusinessJsonLd.tsx` ergänzen, sobald bekannt
- Semantisches HTML, Skip-Link, sichtbare Fokuszustände, beschriftete Formulare, native Radio-Buttons
  und Checkboxen für Paket- und Zeitwahl

---

## Spätere Erweiterungen

Die Architektur ist so angelegt, dass diese Punkte ohne Umbau der Oberfläche ergänzt werden können:

**Serverseitiger E-Mail-Versand**
1. Route Handler anlegen, z. B. `src/app/api/anfrage/route.ts` (POST).
2. Dort `buildBookingEmail()` / `buildContactEmail()` aus `src/lib/mail.ts` wiederverwenden und über
   einen Mail-Dienst (SMTP, Resend, Postmark …) verschicken. Zugangsdaten nur als Umgebungsvariablen.
3. In `BookingWidget.tsx` / `ContactForm.tsx` statt `window.location.href = toMailtoUrl(…)` per `fetch`
   an den Route Handler senden. Spam-Schutz (z. B. Honeypot, Rate-Limit) ergänzen.
4. Datenschutzerklärung anpassen.

**Online-Terminbuchung (falls später doch gewünscht)**
Statt eines eigenen Kalenders lieber einen fertigen Dienst (z. B. Cal.com oder Calendly) verlinken oder
einbetten – das pflegt die Trainerin dann direkt in ihrem Kalender. Datenschutzerklärung anpassen.

**Verbindliche Buchung**
Erfordert serverseitige Speicherung (Datenbank), Reservierungslogik gegen Doppelbuchungen,
Bestätigungs-/Absage-Mails und eine Anpassung der Texte („Anfrage“ → „Buchung“) sowie der
Datenschutzerklärung.

**Analyse/Tracking**
Nur mit Datenschutzkonzept und ggf. Einwilligungsbanner. Aktuell bewusst nicht enthalten.

---

## Getroffene Entscheidungen

- **Ansprache „du“:** passend zum persönlichen, warmen Markenauftritt. Bei Wunsch nach „Sie“ müssen
  die Texte in `src/` angepasst werden.
- **Statische Seiten:** Alle Seiten werden beim Build vorgerendert (schnell, günstig zu hosten).
- **Anfrage statt Kalender:** Die Trainerinnen arbeiten nebenberuflich – ein Kalender mit freien Slots
  wäre zu aufwendig zu pflegen. Stattdessen geben Interessierte grob an, wann sie Zeit haben, und
  bekommen einen persönlichen Terminvorschlag.
- **Keine zusätzlichen UI-Bibliotheken:** Formulare sind schlank selbst umgesetzt (native Checkboxen/
  Radio-Buttons, `<details>` für die FAQ).
- **Platzhalter statt erfundener Inhalte:** Angebote, Preise, Kundenstimmen, Qualifikationen, Kontaktdaten
  und Rechtstexte sind sichtbar markiert.

## Offene Informationen

- Name der Trainerin, Kurzbiografie, ausführliche Vorstellung
- Qualifikationen, Zertifikate, Erfahrung (inkl. ggf. Erlaubnis nach § 11 TierSchG)
- Eigene Hunde (Namen, Beschreibungen, Fotos)
- Konkrete Trainingsangebote (Name, Beschreibung, Zielgruppe, Dauer, ggf. Preise)
- Trainingstage/-zeiten (um die Auswahl im Anfrageformular ggf. einzuschränken)
- E-Mail-Adresse, Telefonnummer (optional), Trainingsgebiet/Ort
- Social-Media-Profile
- Antworten für die FAQ
- Echte Kundenstimmen (mit Einverständnis)
- Impressumsangaben und vollständige Datenschutzerklärung (inkl. Hosting-Anbieter)
- Hochauflösende Fotos und Logo als SVG
- Ziel-Domain

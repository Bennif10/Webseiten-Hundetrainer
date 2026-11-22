# Fairpfoten – Website

Website für **Fairpfoten Hundetraining – mit Herz und Haltung.**
Moderner, ruhiger Auftritt als Personal Brand mit interaktiver Terminanfrage.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lucide React · ESLint 9
- **Seiten:** Start, Über mich, Trainingsangebote, Termine, FAQ, Kontakt, Impressum, Datenschutz
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
> enthalten zehntausende Dateien – es empfiehlt sich, diese Ordner in OneDrive von der
> Synchronisierung auszuschließen oder das Projekt außerhalb von OneDrive abzulegen.

## Umgebungsvariablen

`.env.example` nach `.env.local` kopieren und anpassen (`.env.local` wird nicht eingecheckt):

| Variable                    | Bedeutung                                                             |
| --------------------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Öffentliche Domain (Sitemap, Open Graph, kanonische Links)            |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Empfängeradresse für Termin- und Kontaktanfragen                      |

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
│  ├─ termine/            Terminübersicht
│  ├─ faq/, kontakt/, impressum/, datenschutz/
│  ├─ layout.tsx          Grundlayout, Schriften, globale Metadaten
│  └─ globals.css         Designsystem (Farben, Schriften, Animationen)
├─ components/
│  ├─ layout/             Header (inkl. Mobilmenü), Footer, Logo
│  ├─ sections/           Seitenbausteine (Hero, Bedürfnisse, Angebote, FAQ …)
│  ├─ booking/            Kalender, Zeitfenster, Angebotswahl, Zusammenfassung
│  ├─ forms/              Formularfelder, Kontaktformular, mailto-Hinweis
│  ├─ seo/                Strukturierte Daten (schema.org)
│  └─ ui/                 Button, Container, SectionHeading, Platzhalter
├─ config/
│  ├─ site.ts             Stammdaten: Name, Kontakt, Navigation, Social Media
│  └─ availability.ts     ⏰ Verfügbare Zeitfenster
├─ data/
│  ├─ services.ts         Trainingsangebote
│  ├─ needs.ts            Die sechs Grundbedürfnisse (vom Plakat)
│  ├─ faq.ts              Häufige Fragen
│  └─ people.ts           Kundenstimmen, eigene Hunde, Qualifikationen
├─ lib/                   Logik ohne UI: Datum, Verfügbarkeit, E-Mail, Validierung
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
Terminanfrage. Jede Karte verlinkt auf `/termine?angebot=<id>` und wählt das Angebot dort vor.

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

## Termine verwalten – `src/config/availability.ts`

```ts
export const availabilityConfig = {
  isExampleData: true,          // → auf false setzen, sobald echte Zeiten eingetragen sind
  slotDurationMinutes: 60,      // Dauer eines Zeitfensters
  bookingWindowDays: 90,        // so weit im Voraus kann angefragt werden
  minLeadTimeHours: 24,         // Mindestvorlauf

  weeklySchedule: {             // 0 = So, 1 = Mo … 6 = Sa
    1: ["09:00", "10:30", "15:00"],
    // …
  },
  blockedDates: ["2026-12-24"],                       // ganze Tage sperren (Urlaub, Feiertage)
  bookedSlots: [{ date: "2026-12-01", time: "09:00" }], // einzelne Slots als „belegt“ markieren
  extraSlots: [{ date: "2026-12-05", times: ["14:00"] }], // zusätzliche Slots an einzelnen Tagen
};
```

Regeln in der Oberfläche:

- Tage ohne freie Zeitfenster, vergangene Tage und Tage außerhalb des Buchungsfensters sind nicht wählbar.
- Belegte Slots und Slots innerhalb des Mindestvorlaufs werden angezeigt, sind aber deaktiviert.
- Datums- und Uhrzeitangaben werden in der lokalen Zeit des Besuchers ausgewertet (für eine Trainerin in
  Deutschland mit Kundschaft in Deutschland unproblematisch).

Nach jeder Änderung neu bauen bzw. deployen – die Daten sind statisch.

### Wie funktioniert die Anfrage?

Es handelt sich um eine **unverbindliche Terminanfrage**, keine Buchung. Beim Absenden wird per
`mailto:` das E-Mail-Programm des Besuchers mit einer vorformulierten Nachricht geöffnet.

⚠️ Dabei gibt es **keine garantierte Übermittlung**: Die Anfrage kommt erst an, wenn der Besucher die
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
  für Angebots- und Zeitwahl, Kalender mit ausführlichen Screenreader-Beschriftungen

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

**Google Calendar / echte Verfügbarkeiten**
1. Einen neuen Provider implementieren, der das Interface `AvailabilityProvider`
   (`src/lib/booking/availability.ts`) erfüllt – z. B. Abfrage der Free/Busy-Zeiten über einen Route Handler.
2. In `BookingWidget.tsx` den statischen Provider durch den neuen ersetzen.

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
  Der Kalender rechnet clientseitig mit der aktuellen Uhrzeit.
- **Keine zusätzlichen UI-/Datums-Bibliotheken:** Kalender und Formulare sind schlank selbst umgesetzt
  (natives `Intl` für Datumsformate, `<details>` für die FAQ).
- **Platzhalter statt erfundener Inhalte:** Angebote, Preise, Kundenstimmen, Qualifikationen, Kontaktdaten
  und Rechtstexte sind sichtbar markiert.

## Offene Informationen

- Name der Trainerin, Kurzbiografie, ausführliche Vorstellung
- Qualifikationen, Zertifikate, Erfahrung (inkl. ggf. Erlaubnis nach § 11 TierSchG)
- Eigene Hunde (Namen, Beschreibungen, Fotos)
- Konkrete Trainingsangebote (Name, Beschreibung, Zielgruppe, Dauer, ggf. Preise)
- Echte Verfügbarkeiten / Zeitfenster
- E-Mail-Adresse, Telefonnummer (optional), Trainingsgebiet/Ort
- Social-Media-Profile
- Antworten für die FAQ
- Echte Kundenstimmen (mit Einverständnis)
- Impressumsangaben und vollständige Datenschutzerklärung (inkl. Hosting-Anbieter)
- Hochauflösende Fotos und Logo als SVG
- Ziel-Domain

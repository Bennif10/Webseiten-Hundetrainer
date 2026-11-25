# Webseiten-Hundetrainer

Sammlung der Websites für Hundetrainerinnen und Hundetrainer.
Jedes Kundenprojekt liegt in einem **eigenen Unterordner** und ist ein eigenständiges Next.js-Projekt
mit eigener `package.json`, eigener README und eigenen Abhängigkeiten.

## Projekte

| Ordner                         | Kunde                              | Status                                  |
| ------------------------------ | ---------------------------------- | --------------------------------------- |
| [`fairpfoten/`](./fairpfoten)  | Fairpfoten Hundetraining           | Live über GitHub Pages: https://www.fairpfoten.online |

## Ein Projekt lokal starten

```bash
cd fairpfoten
npm install
npm run dev
```

Details zu jedem Projekt stehen in dessen eigener `README.md`.

## Neues Kundenprojekt anlegen

1. Neuen Ordner anlegen, Name = Marke des Kunden in Kleinbuchstaben, ohne Leerzeichen
   (z. B. `pfotenglueck/`).
2. Als Startpunkt ein bestehendes Projekt kopieren – **ohne** `node_modules/` und `.next/` –
   oder ein neues Next.js-Projekt im Ordner erstellen.
3. Kundendaten anpassen: `src/config/site.ts`, `src/data/*`, `src/config/inquiry.ts`,
   Bilder in `public/images/`, Farben in `src/app/globals.css`.
4. Fragebogen (`docs/Fragebogen-Hundetrainerin.md`) an den Kunden schicken.
5. Projekt in die Tabelle oben eintragen und committen.

## Hosting

Dieses Repository veröffentlicht **Fairpfoten** über GitHub Pages
(Workflow `.github/workflows/deploy-fairpfoten.yml`). GitHub Pages erlaubt nur **eine** Website pro
Repository – für weitere Kunden entweder ein eigenes Repository je Kunde anlegen oder einen Hoster
wie Netlify oder Cloudflare Pages nutzen, der mehrere Projekte aus einem Repository bauen kann.

## Regeln

- Keine Passwörter, API-Keys oder `.env.local`-Dateien committen (siehe `.gitignore`).
- Persönliche Kundendaten (Adresse, Telefon) erst committen, wenn sie ohnehin öffentlich
  auf der Website stehen sollen – das Repository ist ggf. öffentlich einsehbar.

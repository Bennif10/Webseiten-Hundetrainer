# Livegang-Checkliste: www.fairpfoten.online über GitHub Pages

Alles im Code ist erledigt (statischer Export, Domain-Datei, automatisches Deployment,
Impressum, Datenschutzerklärung). Diese Schritte musst du selbst erledigen – in dieser Reihenfolge.

---

## 1. GitHub Pages einschalten (2 Minuten)

1. Öffne https://github.com/Bennif10/Webseiten-Hundetrainer/settings/pages
2. Unter **Build and deployment → Source** wählst du **GitHub Actions**.
3. Öffne den Reiter **Actions** im Repository. Falls der Workflow „Deploy Fairpfoten“ dort rot
   (fehlgeschlagen) ist, weil Pages beim Push noch nicht eingeschaltet war:
   Workflow anklicken → **Re-run all jobs**.
4. Wenn er grün ist, ist die Seite vorläufig unter einer GitHub-Adresse erreichbar
   (steht beim Workflow unter „deploy“).

> ⚠️ **Dein Repository ist aktuell privat.** GitHub Pages für private Repositories gibt es nur mit einem
> kostenpflichtigen Plan (GitHub Pro, ca. 4 $/Monat). Mit dem kostenlosen Plan musst du das Repository
> vorher öffentlich machen: Settings → General → ganz unten „Danger Zone“ → **Change visibility** → Public.
> Dann ist der komplette Code für alle sichtbar – inklusive Fragebogen und Referenzplakat in
> `fairpfoten/docs/`. Personenbezogen steht darin nur, was ohnehin auf der Website erscheint;
> trotzdem vorher kurz durchsehen.

## 2. Domain bestätigen (Schutz vor Missbrauch, 5 Minuten + Wartezeit)

1. Öffne https://github.com/settings/pages (deine **Konto**-Einstellungen, nicht das Repository).
2. **Add a domain** → `fairpfoten.online` eingeben.
3. GitHub zeigt dir einen **TXT-Eintrag** (Name beginnt mit `_github-pages-challenge-bennif10`).
   Diesen beim Domain-Anbieter anlegen (siehe Schritt 3) und danach bei GitHub auf **Verify** klicken.

## 3. DNS beim Domain-Anbieter einstellen

Im Kundenbereich deines Domain-Anbieters unter „DNS-Einstellungen“ / „DNS-Records“:

| Typ   | Name / Host                              | Wert                       |
| ----- | ---------------------------------------- | -------------------------- |
| CNAME | `www`                                    | `bennif10.github.io`       |
| A     | `@` (bzw. leer = Hauptdomain)            | `185.199.108.153`          |
| A     | `@`                                      | `185.199.109.153`          |
| A     | `@`                                      | `185.199.110.153`          |
| A     | `@`                                      | `185.199.111.153`          |
| TXT   | `_github-pages-challenge-bennif10`       | (Wert aus Schritt 2)       |

Optional für IPv6 zusätzlich AAAA-Einträge für `@`:
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`

Wichtig:
- Vorhandene **A-/AAAA-/CNAME-Einträge** für `@` und `www`, die auf eine Parkseite des Anbieters zeigen,
  **löschen**.
- MX-Einträge (E-Mail) nicht anfassen.
- Änderungen brauchen meist 15 Minuten bis einige Stunden, selten bis zu 24 Stunden.

## 4. Domain bei GitHub eintragen und HTTPS aktivieren

1. Zurück zu https://github.com/Bennif10/Webseiten-Hundetrainer/settings/pages
2. Unter **Custom domain** steht nach dem ersten erfolgreichen Deployment bereits
   `www.fairpfoten.online` (kommt aus der Datei `fairpfoten/public/CNAME`). Falls nicht: eintragen → **Save**.
3. Warten, bis der **DNS check successful** ist.
4. Haken bei **Enforce HTTPS** setzen. (Ist der Haken ausgegraut: GitHub erstellt das Zertifikat noch –
   etwas später nochmal schauen.)

## 5. Testen

- https://www.fairpfoten.online öffnet die Seite mit Schloss-Symbol.
- https://fairpfoten.online (ohne www) leitet auf die www-Adresse weiter.
- Alle Menüpunkte, Impressum und Datenschutz durchklicken.
- Auf dem Handy eine Anfrage bis zum E-Mail-Programm durchspielen.

## 6. Vor bzw. kurz nach dem Livegang (rechtlich)

- [ ] **Impressum und Datenschutzerklärung prüfen lassen** – z. B. mit einem Generator (eRecht24,
      IT-Recht Kanzlei) oder anwaltlich. Insbesondere den Abschnitt zu GitHub Pages / USA-Übermittlung.
- [ ] **GitHub-Nutzungsbedingungen beachten:** GitHub Pages ist laut GitHub nicht dafür gedacht, als
      kostenloses Hosting für ein Online-Geschäft zu dienen. Eine reine Informationsseite ohne Shop ist
      üblich, liegt aber in einer Grauzone. Wenn ihr auf Nummer sicher gehen wollt: später zu einem
      deutschen Hoster wechseln (die Seite ist statisch und lässt sich überall hochladen).
- [ ] **Bildrechte:** Wer hat das Foto auf der Startseite gemacht? Einverständnis einholen und ggf.
      den Bildnachweis im Impressum anpassen.
- [ ] **Hundeteamschule Anita Balser:** Einverständnis für die Namensnennung und den übernommenen Text.
- [ ] **Markenrecherche „Fairpfoten“** beim DPMA (https://register.dpma.de).

## 7. Danach

- [ ] Seite bei der **Google Search Console** anmelden und die Sitemap
      `https://www.fairpfoten.online/sitemap.xml` einreichen.
- [ ] Optional: **Google-Unternehmensprofil** für Ebersbach an der Fils anlegen und auf die Website verlinken.
- [ ] Offene Inhalte aus der README nachziehen (Social Media, Startseitenfoto in hoher Auflösung, Logo,
      Kundenstimmen).

---

**Änderungen an der Website** gehen ab jetzt automatisch online: Datei ändern → committen → auf `main`
pushen → nach ca. 2 Minuten ist die neue Version live.

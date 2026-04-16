# twentyhours studio — Website

Portfolio website von Esti (Estibaliz Rodriguez Martin), Presentation Designer.
GitHub Pages, reines HTML/CSS/JS, kein Build-Tool.

## Dateistruktur

```
/                       ← Englische Hauptseiten
├── index.html          ← Homepage (EN)
├── index-de.html       ← Homepage (DE) — Alias, leitet zu /de/
├── about-de.html       ← Über mich (DE)
├── contact-de.html     ← Kontakt (DE)
├── portfolio-de.html   ← Portfolio-Übersicht (DE)
├── styles.css          ← Globales Stylesheet
├── script.js           ← Globales JavaScript
├── images/             ← Alle Bilder
├── flags/              ← Flaggen-Icons für Sprachauswahl
├── about/index.html    ← Über mich (EN)
├── contact/index.html  ← Kontakt (EN)
├── portfolio/index.html ← Portfolio-Übersicht (EN)
├── projects/           ← Einzelne Projektseiten
│   ├── investor-pitch-deck/
│   ├── startup-pitch-deck/
│   └── ... (viele weitere)
└── de/                 ← Deutsche Unterseiten
    ├── index.html
    ├── about/
    ├── contact/
    └── portfolio/
```

## Sprachen — wichtigste Regel

Die Website ist **zweisprachig (EN + DE)**. Jede inhaltliche Änderung muss in **beiden Versionen** gemacht werden.

| Englisch | Deutsch |
|----------|---------|
| `index.html` | `de/index.html` |
| `about/index.html` | `de/about/index.html` |
| `contact/index.html` | `de/contact/index.html` |
| `portfolio/index.html` | `de/portfolio/index.html` |

Immer fragen: *Wurde das auch in der anderen Sprache geändert?*

## Deployment

Push auf `main` → GitHub Pages veröffentlicht automatisch.
Kein Build-Schritt nötig. Was gepusht wird, ist live.

```bash
git add .
git commit -m "Beschreibung der Änderung"
git push
```

## Lokal testen

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

Manueller Browser-Refresh nach Änderungen (Cmd+R).

## Was zu beachten ist

- Alle Pfade sind absolut (`/about/`, `/images/`) — funktioniert nur mit lokalem Server, nicht mit `file://`
- `CNAME` nicht löschen — enthält die Custom Domain für GitHub Pages
- `styles.css` ist global — Änderungen dort wirken sich auf alle Seiten aus
- Projektseiten in `/projects/` haben eigene Styles über `project-styles.css`

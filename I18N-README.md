# Frango – PL/EN i18n

- `locales/pl.json` – Polish texts
- `locales/en.json` – English texts
- `js/i18n.js` – language loader and PL/EN switch
- `index.html` – current page with `data-i18n` markers

The language selection is saved in `localStorage` under `frango-language`.
Polish is the default language.

The JSON files are loaded with `fetch()`, so test the site through a web server (GitHub Pages or VS Code Live Server), not by opening `index.html` directly with `file://`.

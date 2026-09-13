(() => {
  const supported = ["pl", "en"];
  const defaultLanguage = "pl";
  const storageKey = "frango-language";

  async function loadTranslations(lang) {
    const response = await fetch(`locales/${lang}.json`, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Could not load ${lang}.json`);
    return response.json();
  }

  function getValue(obj, path) {
    return path.split(".").reduce((value, key) => value?.[key], obj);
  }

  function applyTranslations(translations, lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = getValue(translations, element.dataset.i18n);
      if (value !== undefined) element.textContent = value;
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const value = getValue(translations, element.dataset.i18nAlt);
      if (value !== undefined) element.alt = value;
    });

    document.querySelectorAll("[data-i18n-meta]").forEach((element) => {
      const value = getValue(translations, element.dataset.i18nMeta);
      if (value !== undefined) element.setAttribute("content", value);
    });

    const title = getValue(translations, "meta.title");
    if (title) document.title = title;

    document.querySelectorAll(".lang-btn").forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    try {
      localStorage.setItem(storageKey, lang);
    } catch (_) {}
  }

  async function setLanguage(lang) {
    if (!supported.includes(lang)) return;
    try {
      const translations = await loadTranslations(lang);
      applyTranslations(translations, lang);
    } catch (error) {
      console.error("Frango i18n:", error);
    }
  }

  function getInitialLanguage() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (supported.includes(saved)) return saved;
    } catch (_) {}
    return defaultLanguage;
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".lang-btn").forEach((button) => {
      button.addEventListener("click", () => setLanguage(button.dataset.lang));
    });
    setLanguage(getInitialLanguage());
  });
})();

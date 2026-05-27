const THEME_KEY = "et_theme";
const CURRENCY_KEY = "et_currency";

export function getStoredTheme() {
  if (typeof window === "undefined") return "system";
  return localStorage.getItem(THEME_KEY) || "system";
}

export function setStoredTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

export function getStoredCurrency() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CURRENCY_KEY);
}

export function setStoredCurrency(currency) {
  localStorage.setItem(CURRENCY_KEY, currency);
}

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else if (theme === "light") {
    root.classList.remove("dark");
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", prefersDark);
  }
}

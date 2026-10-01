"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { copy, type Copy, type Locale } from "@/lib/copy";

type Theme = "light" | "dark";

type Prefs = {
  locale: Locale;
  theme: Theme;
  t: Copy;
  setLocale: (locale: Locale) => void;
  toggleTheme: () => void;
};

const PrefsContext = createContext<Prefs | null>(null);

function readLocale(): Locale {
  try {
    const stored = localStorage.getItem("csd-locale");
    if (stored === "pt" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  return document.documentElement.lang === "pt" ? "pt" : "en";
}

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem("csd-theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* ignore */
  }
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [theme, setTheme] = useState<Theme>("light");

  useLayoutEffect(() => {
    const nextLocale = readLocale();
    const nextTheme = readTheme();
    setLocaleState(nextLocale);
    setTheme(nextTheme);
    document.documentElement.lang = nextLocale === "pt" ? "pt" : "en";
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next === "pt" ? "pt" : "en";
    try {
      localStorage.setItem("csd-locale", next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("csd-theme", next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo<Prefs>(
    () => ({ locale, theme, t: copy[locale], setLocale, toggleTheme }),
    [locale, theme, setLocale, toggleTheme],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const value = useContext(PrefsContext);
  if (!value) throw new Error("usePrefs must be used within PrefsProvider");
  return value;
}

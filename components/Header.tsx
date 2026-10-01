"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { bookingUrl, media } from "@/lib/media";
import { usePrefs } from "@/components/prefs";

export function Header() {
  const { t, locale, theme, setLocale, toggleTheme } = usePrefs();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      document.documentElement.style.setProperty("--nav-h", `${el.offsetHeight}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => observer.disconnect();
  }, [locale]);

  return (
    <header className="site-header" ref={ref}>
      <a className="skip" href="#hero">
        {t.skip}
      </a>
      <div className="nav-primary">
        <a className="brand" href="#hero" aria-label="City Skin Doctor">
          <Image
            className="brand-img"
            src={media.logo}
            alt="City Skin Doctor"
            width={712}
            height={451}
            priority
          />
        </a>
        <nav className="nav-pill" aria-label="Primary">
          {t.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-tools">
          <div className="locale" role="group" aria-label={t.language}>
            <button type="button" aria-pressed={locale === "en"} onClick={() => setLocale("en")}>
              EN
            </button>
            <button type="button" aria-pressed={locale === "pt"} onClick={() => setLocale("pt")}>
              PT
            </button>
          </div>
          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? t.themeToLight : t.themeToDark}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <a className="book" href={bookingUrl} target="_blank" rel="noreferrer">
            {t.book}
            <span className="sr-only">, {t.newTab}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M16.5 3.5a8.2 8.2 0 1 0 4 12.2A8 8 0 0 1 16.5 3.5Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" />
    </svg>
  );
}

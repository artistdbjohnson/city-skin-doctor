"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { media } from "@/lib/media";
import { usePrefs } from "@/components/prefs";

const SESSION_KEY = "csd-pathway-open";

function shouldSkip() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hash = window.location.hash.length > 1;
  let seen = false;
  try {
    seen = sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    seen = false;
  }
  return reduce || hash || seen;
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
  document.documentElement.dataset.open = "done";
  document.body.style.overflow = "";
  document.querySelector(".site-header")?.removeAttribute("inert");
  document.querySelector("main")?.removeAttribute("inert");
  document.querySelector(".site-footer")?.removeAttribute("inert");
}

export function Opening() {
  const { t } = usePrefs();
  const skipRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<"seals" | "paths" | "exit" | "done">("seals");

  useLayoutEffect(() => {
    if (shouldSkip()) {
      document.documentElement.dataset.open = "skip";
      setPhase("done");
      return;
    }
    document.documentElement.dataset.open = "play";
  }, []);

  useEffect(() => {
    if (shouldSkip()) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const toPaths = window.setTimeout(() => setPhase("paths"), 1600);
    const toExit = window.setTimeout(() => setPhase("exit"), 3300);
    const toDone = window.setTimeout(() => {
      markSeen();
      setPhase("done");
    }, 4100);

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      markSeen();
      setPhase("done");
    };
    window.addEventListener("keydown", onKey);
    skipRef.current?.focus();

    const background = [
      document.querySelector(".site-header"),
      document.querySelector("main"),
      document.querySelector(".site-footer"),
    ];
    background.forEach((node) => node?.setAttribute("inert", ""));

    return () => {
      window.clearTimeout(toPaths);
      window.clearTimeout(toExit);
      window.clearTimeout(toDone);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      background.forEach((node) => node?.removeAttribute("inert"));
    };
  }, []);

  function finish() {
    markSeen();
    setPhase("done");
  }

  const className = [
    "pathway-open",
    phase === "paths" ? "is-paths" : "",
    phase === "exit" ? "is-exit" : "",
    phase === "done" ? "is-done" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      role="dialog"
      aria-modal={phase !== "done"}
      aria-hidden={phase === "done"}
      aria-label={t.openLabel}
    >
      <button type="button" className="open-skip" onClick={finish} ref={skipRef}>
        {t.skipOpen}
      </button>
      <div className="open-inner">
        <p className="kicker">{t.openKicker}</p>
        <div className="seals" style={{ marginTop: "1rem" }}>
          <div className="seal-lg">
            <Image src={media.hiw} alt="" width={444} height={113} priority />
            <p>
              {t.regulatedBy} {t.hiw}
            </p>
          </div>
          <div className="seal-lg cqc">
            <Image src={media.cqc} alt="" width={135} height={64} priority />
            <p>
              {t.regulatedBy} {t.cqc}
            </p>
          </div>
        </div>
        <div className="paths">
          {t.paths.map((path) => (
            <div className="path-tile" key={path.n}>
              <p className="index">{path.n}</p>
              <div>
                <strong>{path.k}</strong>
                <span>{path.d}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
